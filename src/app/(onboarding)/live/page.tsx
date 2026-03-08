"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDndMonitor,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { AppShell } from "@/components/layout/AppShell";
import { LiveTopbar } from "@/components/live/LiveTopbar";
import { LiveStaging } from "@/components/live/LiveStaging";
import {
  LiveNomineeList,
  getNomineeIdFromDroppableId,
} from "@/components/live/LiveNomineeList";
import { LiveBallotNav } from "@/components/live/LiveBallotNav";
import { ConfettiCelebration } from "@/components/live/ConfettiCelebration";
import {
  AWARD_STATUE_ID,
  AwardStatueDragPreview,
} from "@/components/live/AwardStatueDraggable";
import { STAGING_DROPPABLE_ID } from "@/components/live/LiveStaging";
import {
  AWARD_SHOW_ID,
  categories,
  getNomineesForCategory,
} from "@/data/oscar-2026";
import {
  getDeclaredWinners,
  setDeclaredWinner,
  clearDeclaredWinner,
  getCorrectGuessCount,
} from "@/lib/live/storage";
import type { BallotSummary, UserSummary } from "@/lib/live/types";
import type { BallotChoice } from "@/lib/ballot/types";
import { useSession } from "@/lib/store/session";
import { createClient } from "@/lib/supabase/client";
import { getBallotsByUser, getChoicesForBallot } from "@/lib/queries/ballots";
import { getProfilesByGroup } from "@/lib/queries/profiles";
import { MOCK_BALLOTS, MOCK_CHOICES } from "./mock-data";

/** User is in the lead if their best ballot has the most correct guesses. */
function getLeaderUserIds(
  users: UserSummary[],
  ballots: BallotSummary[],
  choices: BallotChoice[],
  declaredWinners: Record<string, string>
): string[] {
  if (users.length === 0 || ballots.length === 0) return [];
  const ballotsByUser = new Map<string, BallotSummary[]>();
  for (const b of ballots) {
    if (!ballotsByUser.has(b.userId)) ballotsByUser.set(b.userId, []);
    ballotsByUser.get(b.userId)!.push(b);
  }
  let maxScore = 0;
  const userScores = new Map<string, number>();
  for (const user of users) {
    const userBallots = ballotsByUser.get(user.id) ?? [];
    const best = userBallots.length === 0 ? 0 : Math.max(...userBallots.map((b) => getCorrectGuessCount(b.id, choices, declaredWinners)));
    userScores.set(user.id, best);
    if (best > maxScore) maxScore = best;
  }
  return users.filter((u) => userScores.get(u.id) === maxScore).map((u) => u.id);
}

/** Ballot ids belonging to the user(s) in the lead (for topbar star). */
function getLeaderBallotIds(
  users: UserSummary[],
  ballots: BallotSummary[],
  choices: BallotChoice[],
  declaredWinners: Record<string, string>
): string[] {
  const leaderUserIds = new Set(getLeaderUserIds(users, ballots, choices, declaredWinners));
  return ballots.filter((b) => leaderUserIds.has(b.userId)).map((b) => b.id);
}

/** For current category, map nomineeId -> ballots that picked that nominee (prototype: from mock choices). */
function getBallotsWhoPickedNominee(
  categoryId: string,
  ballots: BallotSummary[],
  choices: BallotChoice[]
): Record<string, BallotSummary[]> {
  const byNominee: Record<string, BallotSummary[]> = {};
  const ballotMap = new Map(ballots.map((b) => [b.id, b]));
  choices
    .filter((c) => c.categoryId === categoryId)
    .forEach((c) => {
      if (!byNominee[c.nomineeId]) byNominee[c.nomineeId] = [];
      const ballot = ballotMap.get(c.ballotId);
      if (ballot) byNominee[c.nomineeId].push(ballot);
    });
  return byNominee;
}

/** Inner content that uses useDndMonitor; must be a child of DndContext. */
function LivePageContent({
  myBallots,
  users,
  categories: categoryList,
  currentCategoryIndex,
  setCurrentCategoryIndex,
  currentBallotIndex,
  setCurrentBallotIndex,
  ballotsWhoPickedNominee,
  currentCategory,
  nominees,
  declaredWinnerId,
  selectedBallotNomineeId,
  onSelectWinner,
}: {
  /** Current user's ballots only (for bottom nav). */
  myBallots: BallotSummary[];
  /** All users (for nominee card avatars). */
  users: UserSummary[];
  /** Category list for topbar dropdown. */
  categories: { id: string; name: string }[];
  currentCategoryIndex: number;
  setCurrentCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  currentBallotIndex: number;
  setCurrentBallotIndex: React.Dispatch<React.SetStateAction<number>>;
  ballotsWhoPickedNominee: Record<string, BallotSummary[]>;
  currentCategory: (typeof categories)[number] | undefined;
  nominees: ReturnType<typeof getNomineesForCategory>;
  declaredWinnerId: string | undefined;
  selectedBallotNomineeId: string | null;
  onSelectWinner: (nomineeId: string) => void;
}) {
  const [overId, setOverId] = useState<string | number | null>(null);

  useDndMonitor({
    onDragOver: (event) => setOverId(event.over?.id ?? null),
    onDragEnd: () => setOverId(null),
    onDragCancel: () => setOverId(null),
  });

  const overIdStr = overId != null ? String(overId) : null;
  const overNomineeId = useMemo(
    () => getNomineeIdFromDroppableId(overIdStr),
    [overIdStr]
  );
  const isOverNominee =
    overIdStr != null && overIdStr.startsWith("nominee-");

  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      <div className="shrink-0 border-b-0">
        <LiveTopbar
          categories={categoryList}
          currentCategoryIndex={currentCategoryIndex}
          onSelectCategoryIndex={setCurrentCategoryIndex}
        />
        <h2 className="text-center text-3xl font-display font-bold py-3">
          {currentCategory?.name ?? "—"}
        </h2>
      </div>
      {myBallots.length > 1 && (
        <LiveBallotNav
          ballots={myBallots}
          currentBallotIndex={currentBallotIndex}
          onSelectIndex={setCurrentBallotIndex}
        />
      )}
      <div className="bg-live-card-bg px-4 py-2 pb-8 rounded-[24px]">
        <LiveStaging
          showAwardStatue={!declaredWinnerId}
          shouldWiggle={true}
          isOverNominee={isOverNominee}
        />
        <LiveNomineeList
          nominees={nominees}
          declaredWinnerNomineeId={declaredWinnerId}
          ballotsWhoPickedNominee={ballotsWhoPickedNominee}
          users={users}
          overNomineeId={overNomineeId}
          isOverNominee={isOverNominee}
          selectedBallotNomineeId={selectedBallotNomineeId}
          onSelectWinner={onSelectWinner}
        />
      </div>
    </div>
  );
}

/** Empty state when user has no ballots. No group: still show user ballots (handled by data layer); this is only for zero ballots. */
function LiveEmptyState() {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center py-12 px-4 text-center">
      <p className="text-muted-foreground mb-4">Create a ballot first to track winners and see the leaderboard.</p>
      <Link
        href="/ballot"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Go to ballots
      </Link>
    </div>
  );
}

export default function LivePage() {
  const { user, profile } = useSession();
  const [supabase] = useState(() => createClient());
  const [declaredWinners, setDeclaredWinners] = useState<Record<string, string>>(
    () => ({})
  );
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentBallotIndex, setCurrentBallotIndex] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [myBallots, setMyBallots] = useState<BallotSummary[]>([]);
  const [myChoices, setMyChoices] = useState<BallotChoice[]>([]);
  const [allUsers, setAllUsers] = useState<UserSummary[]>([]);

  useEffect(() => {
    setDeclaredWinners(getDeclaredWinners(AWARD_SHOW_ID));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user?.id) {
      setMyBallots([]);
      return;
    }
    getBallotsByUser(supabase, user.id).then(setMyBallots).catch(console.error);
  }, [user?.id, supabase]);

  useEffect(() => {
    if (myBallots.length === 0) {
      setMyChoices([]);
      return;
    }
    Promise.all(myBallots.map((b) => getChoicesForBallot(supabase, b.id)))
      .then((results) => setMyChoices(results.flat()))
      .catch(console.error);
  }, [myBallots, supabase]);

  useEffect(() => {
    if (!profile) return;
    getProfilesByGroup(supabase, profile.groupId)
      .then((profiles) =>
        setAllUsers(profiles.map((p) => ({ id: p.id, name: p.nickname ?? p.email })))
      )
      .catch(console.error);
  }, [profile?.groupId, supabase]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const currentCategory = categories[currentCategoryIndex];
  const nominees = currentCategory
    ? getNomineesForCategory(currentCategory.id)
    : [];
  const declaredWinnerId = currentCategory
    ? declaredWinners[currentCategory.id]
    : undefined;

  const announceWinner = (nomineeName: string) => {
    setLiveAnnouncement(`Winner declared: ${nomineeName}`);
    setConfettiTrigger((t) => t + 1);
    setTimeout(() => setLiveAnnouncement(""), 3000);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null);
    const { active, over } = event;
    if (active.id !== AWARD_STATUE_ID || !currentCategory || over == null) return;

    const overIdStr = String(over.id);
    if (overIdStr.startsWith("nominee-")) {
      const nomineeId = overIdStr.slice("nominee-".length);
      setDeclaredWinner(AWARD_SHOW_ID, currentCategory.id, nomineeId);
      setDeclaredWinners((prev) => ({ ...prev, [currentCategory.id]: nomineeId }));
      const nominee = nominees.find((n) => n.id === nomineeId);
      announceWinner(nominee?.name ?? "Winner");
    } else if (overIdStr === STAGING_DROPPABLE_ID) {
      clearDeclaredWinner(AWARD_SHOW_ID, currentCategory.id);
      setDeclaredWinners((prev) => {
        const next = { ...prev };
        delete next[currentCategory.id];
        return next;
      });
    }
  };

  const handleSelectWinner = (nomineeId: string) => {
    if (!currentCategory) return;
    const nominee = nominees.find((n) => n.id === nomineeId);
    setDeclaredWinner(AWARD_SHOW_ID, currentCategory.id, nomineeId);
    setDeclaredWinners((prev) => ({ ...prev, [currentCategory.id]: nomineeId }));
    announceWinner(nominee?.name ?? "Winner");
  };

  /** All ballots (all users) for leader calculation and topbar. */
  const allBallots = MOCK_BALLOTS;

  const leaderUserIds = useMemo(
    () => getLeaderUserIds(allUsers, allBallots, MOCK_CHOICES, declaredWinners),
    [allUsers, allBallots, declaredWinners]
  );

  const ballotsWhoPickedNominee = useMemo(
    () =>
      currentCategory
        ? getBallotsWhoPickedNominee(
            currentCategory.id,
            allBallots,
            MOCK_CHOICES
          )
        : {},
    [currentCategory, allBallots]
  );

  /** Current (my) ballot's choice for current category (for "Your pick" highlight). */
  const selectedBallotNomineeId = useMemo(() => {
    const ballot = myBallots[currentBallotIndex];
    if (!ballot || !currentCategory) return null;
    const choice = myChoices.find(
      (c) => c.ballotId === ballot.id && c.categoryId === currentCategory.id
    );
    return choice?.nomineeId ?? null;
  }, [myBallots, myChoices, currentBallotIndex, currentCategory]);

  if (!mounted) {
    return (
      <AppShell variant="dark" showLogo={true} showAvatar={false}>
        <div className="max-w-md mx-auto w-full flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto flex flex-col" />
        </div>
      </AppShell>
    );
  }

  if (myBallots.length === 0) {
    return (
      <AppShell variant="dark" showLogo={true} showAvatar={false}>
        <div className="max-w-md mx-auto w-full flex flex-col min-h-0">
          <LiveTopbar
            categories={categories.map((c) => ({ id: c.id, name: c.name }))}
            currentCategoryIndex={currentCategoryIndex}
            onSelectCategoryIndex={setCurrentCategoryIndex}
          />
          <LiveEmptyState />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <div
        role="status"
        aria-live="polite"
        aria-atomic={true}
        className="sr-only"
      >
        {liveAnnouncement}
      </div>
      <ConfettiCelebration trigger={confettiTrigger} />
      <div className="max-w-md mx-auto w-full flex flex-col min-h-0">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <DragOverlay>
            {activeDragId === AWARD_STATUE_ID ? (
              <AwardStatueDragPreview />
            ) : null}
          </DragOverlay>
          <LivePageContent
            myBallots={myBallots}
            users={allUsers}
            categories={categories.map((c) => ({ id: c.id, name: c.name }))}
            currentCategoryIndex={currentCategoryIndex}
            setCurrentCategoryIndex={setCurrentCategoryIndex}
            currentBallotIndex={currentBallotIndex}
            setCurrentBallotIndex={setCurrentBallotIndex}
            ballotsWhoPickedNominee={ballotsWhoPickedNominee}
            currentCategory={currentCategory}
            nominees={nominees}
            declaredWinnerId={declaredWinnerId}
            selectedBallotNomineeId={selectedBallotNomineeId}
            onSelectWinner={handleSelectWinner}
          />
        </DndContext>
      </div>
    </AppShell>
  );
}

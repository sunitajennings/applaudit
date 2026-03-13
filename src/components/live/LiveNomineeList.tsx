"use client";

import { useDroppable } from "@dnd-kit/core";
import { Check } from "lucide-react";
import type { Nominee } from "@/lib/ballot/types";
import type { BallotSummary, UserSummary } from "@/lib/live/types";
import { Avatar } from "@/components/shared/Avatar";
import { AwardStatueDraggable } from "@/components/live/AwardStatueDraggable";
import { cn } from "@/lib/utils";

export interface LiveNomineeListProps {
  nominees: Nominee[];
  /** Declared winner nominee id for this category, if any. */
  declaredWinnerNomineeId?: string;
  /** Per-nominee list of ballots that picked this nominee (for avatar display). */
  ballotsWhoPickedNominee?: Record<string, BallotSummary[]>;
  /** Users (for avatar initials by ballot.userId). */
  users?: UserSummary[];
  /** Id of the nominee currently being dragged over (for enlarge card). */
  overNomineeId?: string | null;
  /** When rendering statue on winning card, pass through for shake when over another nominee. */
  isOverNominee?: boolean;
  /** Nominee id that the selected ballot picked for this category (highlight as "your pick"). */
  selectedBallotNomineeId?: string | null;
  /** Keyboard-friendly: set winner for this category without drag. */
  onSelectWinner?: (nomineeId: string) => void;
}

function getNomineeIdFromDroppableId(overId: string | null): string | null {
  if (overId == null || typeof overId !== "string") return null;
  if (overId.startsWith("nominee-")) return overId.slice("nominee-".length);
  return null;
}

export function getNomineeDroppableId(nomineeId: string): string {
  return `nominee-${nomineeId}`;
}

function initialsFromUserName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "??";
}

/** Nominee list: droppable cards, draggable AwardStatue on winner, drag-over enlarge. */
export function LiveNomineeList({
  nominees,
  declaredWinnerNomineeId,
  ballotsWhoPickedNominee = {},
  users = [],
  overNomineeId = null,
  isOverNominee = false,
  selectedBallotNomineeId = null,
  onSelectWinner,
}: LiveNomineeListProps) {
  const userMap = new Map(users.map((u) => [u.id, u]));
  return (
    <section className="flex flex-col gap-2" aria-label="Nominees">
      {nominees.map((nominee) => {
        const isWinner = declaredWinnerNomineeId === nominee.id;
        const isOver = overNomineeId === nominee.id;
        const isSelectedBallotPick = selectedBallotNomineeId === nominee.id;
        const ballots = ballotsWhoPickedNominee[nominee.id] ?? [];
        return (
          <div key={nominee.id} className="py-1 min-h-0">
            <NomineeCard
              nominee={nominee}
              isWinner={isWinner}
              isOver={isOver}
              ballots={ballots}
              userMap={userMap}
              showDraggableStatue={isWinner}
              isOverNominee={isOverNominee}
              isSelectedBallotPick={isSelectedBallotPick}
              onSelectWinner={onSelectWinner}
            />
          </div>
        );
      })}
    </section>
  );
}

interface NomineeCardProps {
  nominee: Nominee;
  isWinner: boolean;
  isOver: boolean;
  ballots: BallotSummary[];
  userMap: Map<string, UserSummary>;
  showDraggableStatue: boolean;
  isOverNominee: boolean;
  isSelectedBallotPick?: boolean;
  onSelectWinner?: (nomineeId: string) => void;
}

function NomineeCard({
  nominee,
  isWinner,
  isOver,
  ballots,
  userMap,
  showDraggableStatue,
  isOverNominee,
  isSelectedBallotPick = false,
  onSelectWinner,
}: NomineeCardProps) {
  const { setNodeRef, isOver: isOverThis } = useDroppable({
    id: getNomineeDroppableId(nominee.id),
  });

  const enlarged = isOver || isOverThis;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative flex items-center gap-3 rounded-3xl border px-4 py-6 transition-all duration-200 cursor-pointer",
        "border-live-card-border bg-live-card-bg hover:bg-live-card-bg/80",
        "text-live-foreground",
        isWinner && !isSelectedBallotPick && "border-live-winner-border border-3 bg-live-winner-bg text-live-winner-foreground hover:bg-live-winner-bg-hover",
        isSelectedBallotPick && !isWinner && "border-live-pick-border bg-live-pick-card-bg hover:bg-[#593A46]",
        isSelectedBallotPick && isWinner && "border-live-pick-border bg-live-pick-card-bg hover:bg-[#593A46]",
        enlarged && "scale-[1.02] ring-2 ring-live-winner-ring"
      )}
    >
      {isSelectedBallotPick && (
        <span
          className="absolute -top-2 right-2 flex items-center gap-1 rounded-full bg-live-pill-bg border border-live-pill-border px-2 py-0.5 text-xs font-medium text-live-pill-foreground shadow-sm"
          aria-label="Your pick"
        >
          <Check className="size-3.5 shrink-0" strokeWidth={3} />
          your pick
        </span>
      )}
      {showDraggableStatue ? (
        <AwardStatueDraggable
          shouldWiggle={false}
          isOverNominee={isOverNominee}
        />
      ) : null}
      <div className="flex flex-col min-w-0 flex-1 text-base font-medium">
        <span
          className={cn(
            "text-xl text-medium",
            isWinner && !isSelectedBallotPick ? "text-live-winner-foreground" : "text-live-foreground"
          )}
        >
          {nominee.name}
        </span>
        {nominee.movie != null && nominee.movie !== "" && (
          <em
            className={cn(
              "font-normal text-xl truncate",
              isWinner && !isSelectedBallotPick ? "text-live-winner-foreground/80" : "text-muted"
            )}
          >
            {nominee.movie}
          </em>
        )}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {ballots.length > 0 && (
          <div
            className="flex -space-x-2"
            aria-label={`${ballots.length} person(s) picked this nominee`}
          >
            {ballots.slice(0, 4).map((ballot) => {
              const user = userMap.get(ballot.userId);
              const name = user?.name || ballot.userNickname;
              const initials = name ? initialsFromUserName(name) : "?";
              return (
                <Avatar
                  key={ballot.id}
                  initials={initials}
                  size="sm"
                  className="ring-2 ring-background"
                />
              );
            })}
            {ballots.length > 4 && (
              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium ring-2 ring-background">
                +{ballots.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { getNomineeIdFromDroppableId };

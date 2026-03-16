"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { getCorrectGuessCount } from "@/lib/live/storage";
import type { UserSummary, BallotSummary, LeaderboardUserRow } from "@/lib/live/types";
import type { BallotChoice } from "@/lib/ballot/types";
import { AWARD_SHOW_ID } from "@/data/oscar-2026";
import { useLiveData } from "@/lib/live/useLiveData";
import { LeaderboardHero } from "@/components/live/LeaderboardHero";
import { LeaderboardList } from "@/components/live/LeaderboardList";

/**
 * Rank users by their best ballot's correct-guess count.
 * You're in the lead if your (best) ballot has the most wins so far.
 */
function getRankedUsers(
  users: UserSummary[],
  ballots: BallotSummary[],
  choices: BallotChoice[],
  declaredWinners: Record<string, string>,
  bonusPoints: Record<string, number>
): LeaderboardUserRow[] {
  const ballotsByUser = new Map<string, BallotSummary[]>();
  for (const b of ballots) {
    if (!ballotsByUser.has(b.userId)) ballotsByUser.set(b.userId, []);
    ballotsByUser.get(b.userId)!.push(b);
  }

  return users
    .map((user) => {
      const userBallots = ballotsByUser.get(user.id) ?? [];
      const bestScore =
        userBallots.length === 0
          ? 0
          : Math.max(
              ...userBallots.map((b) =>
                getCorrectGuessCount(b.id, choices, declaredWinners) + (bonusPoints[b.id] ?? 0)
              )
            );
      return { user, correctCount: bestScore };
    })
    .sort((a, b) => b.correctCount - a.correctCount);
}

function getLeaders(ranked: LeaderboardUserRow[]): LeaderboardUserRow[] {
  if (ranked.length === 0) return [];
  const topScore = ranked[0]!.correctCount;
  return ranked.filter((r) => r.correctCount === topScore);
}

export default function LeaderboardPage() {
  const [mounted, setMounted] = useState(false);
  const { allBallots, allChoices, allUsers, isDataLoading, isSessionLoading, declaredWinners, bonusPoints } = useLiveData(AWARD_SHOW_ID);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rankedUsers = useMemo(
    () => getRankedUsers(allUsers, allBallots, allChoices, declaredWinners, bonusPoints),
    [allUsers, allBallots, allChoices, declaredWinners, bonusPoints]
  );
  const leaders = useMemo(() => getLeaders(rankedUsers), [rankedUsers]);
  const nonLeaderRanked = useMemo(
    () => rankedUsers.filter((r) => !leaders.some((l) => l.user.id === r.user.id)),
    [rankedUsers, leaders]
  );

  if (!mounted) {
    return (
      <AppShell variant="light" showLogo={true} showAvatar={false}>
        <PageTransition className="max-w-md mx-auto w-full">
          <div className="flex flex-col min-h-0 flex-1">
            <div className="flex-1" />
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  if (isSessionLoading || isDataLoading) {
    return (
      <AppShell variant="light" showLogo={true} showAvatar={false}>
        <PageTransition className="max-w-md mx-auto w-full">
          <div className="flex flex-col min-h-0 flex-1"><div className="flex-1" /></div>
        </PageTransition>
      </AppShell>
    );
  }

  return (
    <AppShell variant="light" showLogo={true} showAvatar={false}>
      <PageTransition className="max-w-md mx-auto w-full flex flex-col min-h-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/ballot" aria-label="Back to ballots">
              <ChevronLeft className="size-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-display font-bold flex-1 text-center pr-9">
            Leaderboard
          </h1>
          <Button variant="outline" asChild>
            <Link href="/live" aria-label="Back to live" className="flex items-center gap-1.5">
              <ArrowRight className="size-4" />
              Back to show
            </Link>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col py-6">
          <LeaderboardHero leaders={leaders} />
          <LeaderboardList rankedUsers={nonLeaderRanked} />
        </div>
      </PageTransition>
    </AppShell>
  );
}

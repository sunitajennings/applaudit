"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import {
  getDeclaredWinners,
  getCorrectGuessCount,
} from "@/lib/live/storage";
import type { UserSummary, BallotSummary, LeaderboardUserRow } from "@/lib/live/types";
import type { BallotChoice } from "@/lib/ballot/types";
import { AWARD_SHOW_ID } from "@/data/oscar-2026";
import { MOCK_USERS, MOCK_BALLOTS, MOCK_CHOICES } from "../mock-data";
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
  declaredWinners: Record<string, string>
): LeaderboardUserRow[] {
  const ballotsByUser = new Map<string, BallotSummary[]>();
  for (const b of ballots) {
    if (!ballotsByUser.has(b.userId)) ballotsByUser.set(b.userId, []);
    ballotsByUser.get(b.userId)!.push(b);
  }
  const userMap = new Map(users.map((u) => [u.id, u]));

  return users
    .map((user) => {
      const userBallots = ballotsByUser.get(user.id) ?? [];
      const bestScore =
        userBallots.length === 0
          ? 0
          : Math.max(
              ...userBallots.map((b) =>
                getCorrectGuessCount(b.id, choices, declaredWinners)
              )
            );
      return { user, correctCount: bestScore };
    })
    .sort((a, b) => b.correctCount - a.correctCount);
}

function getLeaders(ranked: LeaderboardUserRow[]): LeaderboardUserRow[] {
  if (ranked.length === 0) return [];
  const topScore = ranked[0]!.correctCount;
  const tied = ranked.filter((r) => r.correctCount === topScore);
  return tied.length === 0 ? [] : [tied[0]!];
}

export default function LeaderboardPage() {
  const [declaredWinners, setDeclaredWinners] = useState<Record<string, string>>(
    () => ({})
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDeclaredWinners(getDeclaredWinners(AWARD_SHOW_ID));
    setMounted(true);
  }, []);

  const rankedUsers = useMemo(
    () => getRankedUsers(MOCK_USERS, MOCK_BALLOTS, MOCK_CHOICES, declaredWinners),
    [declaredWinners]
  );
  const leaders = useMemo(() => getLeaders(rankedUsers), [rankedUsers]);
  const nonLeaderRanked = useMemo(
    () => rankedUsers.filter((r) => !leaders.some((l) => l.user.id === r.user.id)),
    [rankedUsers, leaders]
  );

  if (!mounted) {
    return (
      <AppShell variant="dark" showLogo={true} showAvatar={false}>
        <div className="max-w-md mx-auto w-full flex flex-col min-h-0">
          <div className="flex-1" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell variant="dark" showLogo={true} showAvatar={false}>
      <div className="max-w-md mx-auto w-full flex flex-col min-h-0">
        <header className="flex items-center justify-between gap-3 py-3 border-b border-border">
          <Link
            href="/live"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ← Back to live
          </Link>
        </header>
        <div className="flex-1 overflow-y-auto flex flex-col py-6">
          <LeaderboardHero leaders={leaders} />
          <LeaderboardList rankedUsers={nonLeaderRanked} />
        </div>
      </div>
    </AppShell>
  );
}

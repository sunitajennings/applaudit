"use client";

import type { LeaderboardUserRow } from "@/lib/live/types";

export interface LeaderboardListProps {
  /** Ranked users (typically excluding leaders shown in hero). */
  rankedUsers: LeaderboardUserRow[];
}

/** List: user name, score (best ballot's correct guesses). Dumb UI. */
export function LeaderboardList({ rankedUsers }: LeaderboardListProps) {
  if (rankedUsers.length === 0) {
    return (
      <section className="py-4" aria-label="Leaderboard list">
        <p className="text-muted-foreground text-sm text-center">
          No other players to show
        </p>
      </section>
    );
  }

  return (
    <section className="py-4" aria-label="Leaderboard list">
      <ul className="space-y-2">
        {rankedUsers.map(({ user, correctCount }) => (
          <li
            key={user.id}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
          >
            <span className="font-medium">{user.name}</span>
            <span className="text-muted-foreground text-sm">
              {correctCount} correct
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

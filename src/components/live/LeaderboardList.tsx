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
      <section className="px-4 pt-6 pb-4" aria-label="Leaderboard list">
        <p className="font-display text-base text-muted-foreground text-center">
          No other players to show
        </p>
      </section>
    );
  }

  return (
    <section className="pt-6 pb-4 w-3/4 mx-auto" aria-label="Leaderboard list">
      <ul className="space-y-3">
        {rankedUsers.map(({ user, correctCount }) => (
          <li
            key={user.id}
            className="flex items-center justify-between"
          >
            <span className="font-display font-medium text-base text-foreground">{user.name}</span>
            <span className="font-display text-base text-muted-foreground">
              {correctCount} pick{correctCount !== 1 ? "s" : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { Star } from "lucide-react";
import type { LeaderboardUserRow } from "@/lib/live/types";

export interface LeaderboardHeroProps {
  /** User(s) in the lead (best ballot has most correct guesses). Can be a tie. */
  leaders: LeaderboardUserRow[];
}

/** Hero: AwardStatue image, leader user name(s), "Guessed X correct winners". Dumb UI. */
export function LeaderboardHero({ leaders }: LeaderboardHeroProps) {
  if (leaders.length === 0) {
    return (
      <section className="text-center py-8" aria-label="Leaderboard hero">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/40 mb-4">
          <Star className="w-8 h-8" strokeWidth={1.5} fill="currentColor" />
        </div>
        <p className="text-muted-foreground">No one on the board yet</p>
      </section>
    );
  }

  const count = leaders[0]!.correctCount;
  const names = leaders.map((l) => l.user.name).join(" | ");

  return (
    <section className="text-center py-8" aria-label="Leaderboard hero">
      <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/40 mb-4">
        <Star className="w-8 h-8" strokeWidth={1.5} fill="currentColor" />
      </div>
      <h2 className="text-xl font-semibold text-foreground">{names}</h2>
      <p className="text-muted-foreground mt-1">
        Guessed {count} correct winner{count !== 1 ? "s" : ""}
      </p>
    </section>
  );
}

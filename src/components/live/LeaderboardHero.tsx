"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import type { LeaderboardUserRow } from "@/lib/live/types";

export interface LeaderboardHeroProps {
  /** User(s) in the lead (best ballot has most correct guesses). Can be a tie. */
  leaders: LeaderboardUserRow[];
}

/** Hero: Current Leader card with award image, single leader name, "X picks". */
export function LeaderboardHero({ leaders }: LeaderboardHeroProps) {
  const leader = leaders[0];

  return (
    <Card variant="dark" className="overflow-hidden shadow-md w-3/4 mx-auto" aria-labelledby="leaderboard-current-leader">
      <CardHeader>
        <h2 id="leaderboard-current-leader" className="text-lg font-display font-bold leading-none">
          Current Leader
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-1 pb-6">
        <div className="w-[56px] h-[142px] flex items-center justify-center">
          <Image
            src="/images/award.svg"
            alt=""
            width={56}
            height={142}
          />
        </div>
        {leader ? (
          <>
            <p className="font-display font-bold text-lg text-white">
              {leader.user.name}
            </p>
            <p className="font-display text-base text-[#FEF6DA]">
              {leader.correctCount} pick{leader.correctCount !== 1 ? "s" : ""}
            </p>
          </>
        ) : (
          <p className="font-display text-base text-[#FEF6DA]">
            No one on the board yet
          </p>
        )}
      </CardContent>
    </Card>
  );
}

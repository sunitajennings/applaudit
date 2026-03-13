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

/** Hero: Current Leader card with award image, leader name(s), "X picks". */
export function LeaderboardHero({ leaders }: LeaderboardHeroProps) {
  const topScore = leaders[0]?.correctCount;

  return (
    <Card variant="dark" className="overflow-hidden shadow-md w-3/4 mx-auto" aria-labelledby="leaderboard-current-leader">
      <CardHeader>
        <h2 id="leaderboard-current-leader" className="text-lg font-display font-bold leading-none">
          {leaders.length > 1 ? "Current Leaders" : "Current Leader"}
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
        {leaders.length > 0 ? (
          <>
            <p className="font-display font-bold text-lg text-white text-center">
              {leaders.map((l) => l.user.name).join(" & ")}
            </p>
            <p className="font-display text-base text-[#FEF6DA]">
              {topScore} pick{topScore !== 1 ? "s" : ""}
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

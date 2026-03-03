"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { BallotSummary } from "@/lib/live/types";

export interface LiveBallotNavProps {
  ballots: BallotSummary[];
  currentBallotIndex: number;
  onSelectIndex?: (index: number) => void;
}

/**
 * Ballot switcher using shadcn Tabs, styled as a pill: dark container (#261C29),
 * active tab light beige (#FDFCF5) with dark border, inactive tab muted pink text (#EE8C93).
 */
export function LiveBallotNav({
  ballots,
  currentBallotIndex,
  onSelectIndex,
}: LiveBallotNavProps) {
  if (ballots.length === 0) return null;

  const value = ballots[currentBallotIndex]?.id ?? ballots[0]!.id;

  const handleValueChange = (v: string) => {
    const i = ballots.findIndex((b) => b.id === v);
    if (i >= 0) onSelectIndex?.(i);
  };

  return (
    <nav className="py-4 flex items-center justify-center" aria-label="Ballot switcher">
      <Tabs
        value={value}
        onValueChange={handleValueChange}
        className="w-full max-w-[280px]"
      >
        <TabsList
          className={cn(
            "w-full rounded-full h-10 p-0.5 gap-0",
            "bg-[#261C29]",
            "inline-flex"
          )}
        >
          {ballots.map((ballot) => (
            <TabsTrigger
              key={ballot.id}
              value={ballot.id}
              className={cn(
                "flex-1 rounded-full border-2 text-sm font-medium transition-colors",
                "data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#EE8C93] data-[state=inactive]:border-transparent",
                "data-[state=active]:bg-[#FDFCF5] data-[state=active]:text-[#261C29] data-[state=active]:border-[#261C29]"
              )}
              aria-label={`Ballot: ${ballot.name}`}
            >
              {ballot.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}

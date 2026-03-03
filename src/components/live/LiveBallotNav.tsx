"use client";

import { useCallback, useEffect, useRef } from "react";
import type { BallotSummary } from "@/lib/live/types";

export interface LiveBallotNavProps {
  ballots: BallotSummary[];
  currentBallotIndex: number;
  onSelectIndex?: (index: number) => void;
}

/** Ballot switcher: tabs with arrows and horizontal swipe/scroll to switch ballots. */
export function LiveBallotNav({
  ballots,
  currentBallotIndex,
  onSelectIndex,
}: LiveBallotNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastReportedIndexRef = useRef<number>(currentBallotIndex);
  const isProgrammaticScrollRef = useRef(false);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el || ballots.length === 0) return;
      const i = Math.max(0, Math.min(index, ballots.length - 1));
      isProgrammaticScrollRef.current = true;
      const tab = el.querySelector(`[data-ballot-index="${i}"]`);
      if (tab) {
        tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 400);
    },
    [ballots.length]
  );

  useEffect(() => {
    if (lastReportedIndexRef.current !== currentBallotIndex) {
      lastReportedIndexRef.current = currentBallotIndex;
      scrollToIndex(currentBallotIndex);
    }
  }, [currentBallotIndex, scrollToIndex]);

  const handleScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;
    const el = scrollRef.current;
    if (!el || ballots.length === 0 || !onSelectIndex) return;
    const scrollLeft = el.scrollLeft;
    const tabWidth = el.scrollWidth / ballots.length;
    const index = tabWidth > 0 ? Math.round(scrollLeft / tabWidth) : 0;
    const clamped = Math.max(0, Math.min(index, ballots.length - 1));
    if (clamped !== lastReportedIndexRef.current) {
      lastReportedIndexRef.current = clamped;
      onSelectIndex(clamped);
    }
  }, [ballots.length, onSelectIndex]);

  if (ballots.length === 0) return null;

  return (
    <nav className="py-4 flex items-center justify-center gap-2" aria-label="Ballot switcher">
      <button
        type="button"
        onClick={() => onSelectIndex?.(Math.max(0, currentBallotIndex - 1))}
        disabled={currentBallotIndex <= 0}
        className="p-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:pointer-events-none shrink-0"
        aria-label="Previous ballot"
      >
        ‹
      </button>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-1 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth flex-1 min-w-0 justify-center py-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {ballots.map((ballot, i) => (
          <button
            key={ballot.id}
            type="button"
            data-ballot-index={i}
            onClick={() => onSelectIndex?.(i)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors shrink-0 snap-center ${
              i === currentBallotIndex
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            aria-label={`Ballot: ${ballot.name}`}
            aria-current={i === currentBallotIndex ? "true" : undefined}
          >
            {ballot.name}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onSelectIndex?.(Math.min(ballots.length - 1, currentBallotIndex + 1))}
        disabled={currentBallotIndex >= ballots.length - 1}
        className="p-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:pointer-events-none shrink-0"
        aria-label="Next ballot"
      >
        ›
      </button>
    </nav>
  );
}

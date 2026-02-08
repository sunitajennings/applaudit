"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CategoryCard } from "@/components/ballot/CategoryCard";
import { BallotSummary } from "@/components/ballot/BallotSummary";
import { categories, getNomineesForCategory } from "@/data/oscar-2026";
import { setBallotChoices } from "@/lib/ballot/storage";
import { cn } from "@/lib/utils";
import type { Ballot, BallotChoice } from "@/lib/ballot/types";

interface BallotVotingProps {
  ballot: Ballot;
  initialChoices: BallotChoice[];
  onSave: () => void;
}

export function BallotVoting({ ballot, initialChoices, onSave }: BallotVotingProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToIndexRef = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState<"cards" | "summary">("cards");

  const [choices, setChoices] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const c of initialChoices) {
      map[c.categoryId] = c.nomineeId;
    }
    return map;
  });

  const totalCategories = categories.length;
  const total = totalCategories + 1; // +1 for "Back to Ballots" card at end

  const persistChoices = useCallback(
    (next: Record<string, string>) => {
      const list: BallotChoice[] = Object.entries(next).map(([categoryId, nomineeId]) => ({
        ballotId: ballot.id,
        categoryId,
        nomineeId,
      }));
      setBallotChoices(ballot.id, list);
    },
    [ballot.id]
  );

  const handleSelect = useCallback(
    (categoryId: string, nomineeId: string) => {
      const next = { ...choices, [categoryId]: nomineeId };
      setChoices(next);
      persistChoices(next);
    },
    [choices, persistChoices]
  );

  const SLIDE_WIDTH_RATIO = 0.85;

  const goTo = useCallback(
    (index: number) => {
      const i = Math.max(0, Math.min(index, total - 1));
      setCurrentIndex(i);
      const container = scrollRef.current;
      if (container) {
        const W = container.offsetWidth;
        const slideW = W * SLIDE_WIDTH_RATIO;
        const scrollLeft = Math.max(0, i * slideW - (W - slideW) / 2);
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    },
    [total]
  );

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const W = container.offsetWidth;
    const slideW = W * SLIDE_WIDTH_RATIO;
    const viewportCenter = scrollLeft + W / 2;
    const index = Math.floor(viewportCenter / slideW);
    setCurrentIndex(Math.max(0, Math.min(index, total - 1)));
  }, [total]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // When returning from summary to a specific category, scroll to that card after mount
  useEffect(() => {
    if (view !== "cards" || scrollToIndexRef.current === null) return;
    const container = scrollRef.current;
    if (!container) return;
    const i = scrollToIndexRef.current;
    scrollToIndexRef.current = null;
    const W = container.offsetWidth;
    const slideW = W * SLIDE_WIDTH_RATIO;
    const scrollLeft = Math.max(0, i * slideW - (W - slideW) / 2);
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [view]);

  const handleEditCategory = useCallback(
    (categoryId: string) => {
      const index = categories.findIndex((c) => c.id === categoryId);
      if (index >= 0) {
        scrollToIndexRef.current = index;
        setCurrentIndex(index);
        setView("cards");
      }
    },
    []
  );

  if (view === "summary") {
    return (
      <BallotSummary
        ballot={ballot}
        choices={choices}
        onEdit={() => setView("cards")}
        onEditCategory={handleEditCategory}
        onSave={onSave}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-0 flex-1 gap-3">
      <div className="flex items-center justify-between py-2 shrink-0 w-full px-2">
        {categories.map((category, index) => {
          const hasChoice = choices[category.id] != null;
          const isCurrent = index === currentIndex;
          return (
            <button
              key={category.id}
              type="button"
              aria-label={hasChoice ? `Category ${index + 1} (selected)` : `Category ${index + 1}`}
              onClick={() => goTo(index)}
              className={cn(
                "shrink-0 transition-colors flex items-center justify-center rounded-full",
                hasChoice
                  ? "size-5 text-primary"
                  : "size-2.5 rounded-full",
                !hasChoice && (isCurrent ? "bg-primary scale-125" : "bg-muted-foreground/40 hover:bg-muted-foreground/60"),
                isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}
            >
              {hasChoice ? (
                <Check className="size-3.5 shrink-0" strokeWidth={3} />
              ) : null}
            </button>
          );
        })}
        <button
          type="button"
          aria-label="Back to Ballots"
          onClick={() => goTo(totalCategories)}
          className={cn(
            "shrink-0 transition-colors flex items-center justify-center rounded-full",
            currentIndex === totalCategories
              ? "size-5 text-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
              : "size-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
          )}
        >
          {currentIndex === totalCategories && (
            <List className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
          )}
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-1 min-h-0 max-h-[78vh] overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-x"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {categories.map((category, index) => {
          const isPrev = index === currentIndex - 1;
          const isNext = index === currentIndex + 1;
          const isPeek = isPrev || isNext;
          return (
            <div
              key={category.id}
              data-card-index={index}
              className={cn(
                "shrink-0 w-[85%] min-w-[85%] snap-center flex justify-center items-stretch",
                isPeek && "opacity-60"
              )}
            >
              <div className="w-full max-w-md flex flex-col min-h-0">
                <CategoryCard
                  category={category}
                  nominees={getNomineesForCategory(category.id)}
                  selectedNomineeId={choices[category.id] ?? null}
                  onSelect={(nomineeId) => handleSelect(category.id, nomineeId)}
                />
              </div>
            </div>
          );
        })}
        {/* Final slide: Back to Ballots card */}
        <div
          data-card-index={totalCategories}
          className={cn(
            "shrink-0 w-[85%] min-w-[85%] snap-center flex justify-center items-stretch",
            currentIndex === totalCategories - 1 && "opacity-60"
          )}
        >
          <div className="w-full max-w-md flex flex-col min-h-0">
            <Card variant="dark" className="w-full h-full flex flex-col items-center justify-center rounded-3xl p-8 gap-6">
              <p className="font-display text-muted-foreground text-center text-xl">
                Ballot autosaved! <br /> All done?
              </p>
              <Button asChild size="2xl" className="w-full max-w-xs">
                <Link href="/ballot">Back to My Ballots</Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="xl"
                onClick={() => setView("summary")}
                className="w-full max-w-xs"
              >
                Review my picks
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

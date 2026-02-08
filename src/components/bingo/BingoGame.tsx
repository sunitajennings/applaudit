"use client";

import { useCallback, useState } from "react";
import { BingoCard } from "./BingoCard";
import { generateCard, checkWin, GRID_ROWS, GRID_COLS } from "@/lib/bingo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function createEmptyMarked(): boolean[][] {
  return Array(GRID_ROWS)
    .fill(null)
    .map(() => Array(GRID_COLS).fill(false));
}

export function BingoGame() {
  const [card, setCard] = useState(() => generateCard());
  const [marked, setMarked] = useState<boolean[][]>(() => createEmptyMarked());
  const [hasWon, setHasWon] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [expandedPhrase, setExpandedPhrase] = useState<string | null>(null);

  const handlePlayAgain = useCallback(() => {
    setCard(generateCard());
    setMarked(createEmptyMarked());
    setHasWon(false);
    setShowCelebration(false);
  }, []);

  const handleMarkCell = useCallback(
    (row: number, col: number) => {
      if (hasWon) return;
      const currentlyMarked = marked[row]?.[col];
      setMarked((prev) => {
        const next = prev.map((r, rIdx) =>
          r.map((c, cIdx) =>
            rIdx === row && cIdx === col ? !currentlyMarked : c
          )
        );
        if (!currentlyMarked && checkWin(next)) {
          setHasWon(true);
          setShowCelebration(true);
        }
        return next;
      });
    },
    [marked, hasWon]
  );

  return (
    <div className="space-y-6">
      {hasWon && (
        <div className="flex justify-end">
          <Button onClick={handlePlayAgain} size="sm">
            Play again
          </Button>
        </div>
      )}

      {showCelebration && (
        <div
          className="rounded-lg border-2 border-primary bg-primary/10 p-4 text-center animate-in fade-in"
          role="alert"
        >
          <p className="font-display font-bold text-primary text-lg">
            Bingo!
          </p>
          <p className="text-sm text-muted-foreground">
            Get a new card and keep playing.
          </p>
        </div>
      )}

      <Dialog open={!!expandedPhrase} onOpenChange={(open) => !open && setExpandedPhrase(null)}>
        <DialogContent showCloseButton={true}>
          <DialogHeader>
            <DialogTitle className="text-lg sr-only">Phrase</DialogTitle>
          </DialogHeader>
          <p className="text-2xl font-medium text-center leading-relaxed p-16">
            {expandedPhrase}
          </p>
        </DialogContent>
      </Dialog>

      <BingoCard
        grid={card.grid}
        clues={card.clues}
        marked={marked}
        onExpandPhrase={setExpandedPhrase}
        onMarkCell={handleMarkCell}
      />

      <p className="text-center text-xs text-muted-foreground pt-2">
        Tap a square to read the clue.
        Double-tap to mark or remove a marker.
      </p>
    </div>
  );
}

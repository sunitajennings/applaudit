"use client";

import { useRef, useCallback } from "react";
import {
  GRID_ROWS,
  GRID_COLS,
  FREE_ROW,
  FREE_COL,
  BINGO_FREE_LABEL,
  type BingoGrid,
  type BingoClues,
} from "@/lib/bingo";
import { cn } from "@/lib/utils";
import { BingoTokenPlaceholder } from "./BingoToken";

export type MarkedGrid = boolean[][];

const BINGO_LETTERS = ["B", "I", "N", "G", "O"];

function cellId(row: number, col: number): string {
  return `cell-${row}-${col}`;
}

const DOUBLE_TAP_MS = 400;
const SINGLE_TAP_DELAY_MS = 300;

interface BingoCellProps {
  row: number;
  col: number;
  value: number; // 0 = FREE, 1-24 = number
  clue: string | null;
  marked: boolean;
  onExpandClue: (phrase: string) => void;
  onMarkCell?: (row: number, col: number) => void;
}

function BingoCell({
  row,
  col,
  value,
  clue,
  marked,
  onExpandClue,
  onMarkCell,
}: BingoCellProps) {
  const id = cellId(row, col);
  const isFree = value === 0;

  const lastTapTime = useRef<number>(0);
  const singleTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerMarkOrUnmark = useCallback(() => {
    if (singleTapTimer.current) {
      clearTimeout(singleTapTimer.current);
      singleTapTimer.current = null;
    }
    if (onMarkCell) onMarkCell(row, col);
  }, [onMarkCell, row, col]);

  const triggerClue = useCallback(() => {
    if (!isFree && clue) onExpandClue(clue);
  }, [isFree, clue, onExpandClue]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTapTime.current < DOUBLE_TAP_MS) {
      lastTapTime.current = 0;
      triggerMarkOrUnmark();
      return;
    }
    lastTapTime.current = now;
    if (singleTapTimer.current) clearTimeout(singleTapTimer.current);
    singleTapTimer.current = setTimeout(() => {
      singleTapTimer.current = null;
      triggerClue();
    }, SINGLE_TAP_DELAY_MS);
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      data-cell-id={id}
      className={cn(
        "relative flex flex-col items-center justify-center min-h-[2.75rem] sm:min-h-[4rem] md:min-h-[5rem] p-0.5 sm:p-1.5 rounded-md sm:rounded-lg border border-border sm:border-2 bg-card text-card-foreground transition-colors",
        isFree && "bg-muted/50",
        marked && "bg-primary/10 border-primary/50"
      )}
    >
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
        className={cn(
          "w-full h-full min-h-0 flex flex-col items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 sm:ring-offset-2 cursor-pointer",
          "hover:bg-muted/50"
        )}
        title={clue ?? undefined}
      >
        <span
          className={cn(
            "w-full min-w-0 overflow-hidden text-center p-2 justify-center flex-1 flex items-center",
            isFree
              ? "font-display font-bold text-xs sm:text-base text-center"
              : "text-xs leading-tight text-center sm:line-clamp-3 px-0.5"
          )}
        >
          {isFree ? BINGO_FREE_LABEL : (clue ?? String(value))}
        </span>
      </button>
      {marked && (
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <BingoTokenPlaceholder />
        </span>
      )}
    </div>
  );
}

interface BingoCardProps {
  grid: BingoGrid;
  clues: BingoClues;
  marked: MarkedGrid;
  onExpandPhrase: (phrase: string) => void;
  onMarkCell?: (row: number, col: number) => void;
}

export function BingoCard({
  grid,
  clues,
  marked,
  onExpandPhrase,
  onMarkCell,
}: BingoCardProps) {
  return (
    <div className="w-full max-w-md mx-auto min-w-0 overflow-hidden space-y-1 sm:space-y-2 px-0">
      {/* B I N G O header */}
      <div
        className="grid gap-0.5 sm:gap-1.5"
        style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
      >
        {BINGO_LETTERS.map((letter) => (
          <div
            key={letter}
            className="flex items-center justify-center rounded-md sm:rounded-lg border border-border sm:border-2 bg-muted/50 py-1 sm:py-2 font-display font-bold text-sm== sm:text-lg"
          >
            {letter}
          </div>
        ))}
      </div>

      {/* 5x5 grid */}
      <div
        className="grid gap-0.5 sm:gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, r) =>
          row.map((value, c) => (
            <BingoCell
              key={cellId(r, c)}
              row={r}
              col={c}
              value={value}
              clue={value > 0 ? clues[value - 1] ?? null : null}
              marked={marked[r]?.[c] ?? false}
              onExpandClue={onExpandPhrase}
              onMarkCell={onMarkCell}
            />
          ))
        )}
      </div>
    </div>
  );
}

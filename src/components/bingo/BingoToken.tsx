"use client";

import { useDraggable } from "@dnd-kit/core";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface BingoTokenProps {
  id: UniqueIdentifier;
  disabled?: boolean;
  className?: string;
}

/**
 * Draggable circle with see-through center (ring style) for bingo.
 */
export function BingoToken({ id, disabled, className }: BingoTokenProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      {...listeners}
      {...attributes}
      disabled={disabled}
      aria-label="Bingo token"
      className={cn(
        "touch-none rounded-full border-2 border-primary bg-transparent cursor-grab active:cursor-grabbing",
        "size-8 sm:size-10 shrink-0",
        "transition-opacity",
        isDragging && "opacity-50 z-10",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
      style={{
        // Ring: see-through center (transparent fill already via bg-transparent)
        boxShadow: "inset 0 0 0 2px transparent",
      }}
    />
  );
}

/**
 * Static token visual for when a cell is marked (same ring style).
 */
export function BingoTokenPlaceholder({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "rounded-full border-2 border-primary bg-primary/10 shrink-0 inline-block size-6 sm:size-8 md:size-10",
        className
      )}
    />
  );
}

"use client";

import { useDroppable } from "@dnd-kit/core";
import { AwardStatueDraggable } from "@/components/live/AwardStatueDraggable";
import { cn } from "@/lib/utils";

const STAGING_DROPPABLE_ID = "staging";

export interface LiveStagingProps {
  /** Show the draggable AwardStatue here (when current category has no declared winner). */
  showAwardStatue?: boolean;
  /** Pass to AwardStatue for wiggle when in staging. */
  shouldWiggle?: boolean;
  /** Pass to AwardStatue for shake when dragging over a nominee. */
  isOverNominee?: boolean;
}

/** Staging: "And the winner is…" + draggable AwardStatue when showAwardStatue; droppable zone to return statue. */
export function LiveStaging({
  showAwardStatue = false,
  shouldWiggle = true,
  isOverNominee = false,
}: LiveStagingProps) {
  const { setNodeRef, isOver } = useDroppable({ id: STAGING_DROPPABLE_ID });

  return (
    <section className="py-4" aria-label="Staging area">
      <div
        ref={setNodeRef}
        className={cn(
          "flex items-center justify-between gap-4 rounded-lg transition-all duration-200",
          isOver && "ring-2 ring-amber-500/50 ring-offset-2 ring-offset-background"
        )}
      >
        <p className="text-lg font-medium text-foreground">And the winner is…</p>
        {showAwardStatue ? (
          <AwardStatueDraggable
            shouldWiggle={shouldWiggle}
            isOverNominee={isOverNominee}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0"
            aria-hidden
          >
            <span className="text-amber-500/40 text-xs">+</span>
          </div>
        )}
      </div>
    </section>
  );
}

export { STAGING_DROPPABLE_ID };

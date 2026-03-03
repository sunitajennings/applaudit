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

/** Staging: "And the award goes to..." + draggable AwardStatue when showAwardStatue; droppable zone with dashed border to return statue. */
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
          "flex items-center justify-between gap-4 rounded-3xl bg-[#2B1927] px-4 py-3 transition-all duration-200 px-16",
          isOver && "ring-2 ring-amber-500/50 ring-offset-2 ring-offset-background"
        )}
      >
        <p className="text-xl font-display font-bold text-[#FEF6DA] leading-tight max-w-[60%]">
          And the award goes to...
        </p>
        <div className="shrink-0 rounded-2xl border-2 border-dashed border-white/70 p-2 min-w-[4.5rem] min-h-[4.5rem] flex items-center justify-center">
          {showAwardStatue ? (
            <AwardStatueDraggable
              shouldWiggle={shouldWiggle}
              isOverNominee={isOverNominee}
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full bg-white/10 border border-dashed border-white/30 flex items-center justify-center"
              aria-hidden
            >
              <span className="text-white/40 text-xs">+</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { STAGING_DROPPABLE_ID };

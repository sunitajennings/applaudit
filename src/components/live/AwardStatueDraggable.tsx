"use client";

import { useDraggable } from "@dnd-kit/core";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AWARD_STATUE_ID = "awardStatue";

export interface AwardStatueDraggableProps {
  /** When true, play occasional wiggle (e.g. when statue is in staging). */
  shouldWiggle?: boolean;
  /** When true, apply shake while dragging over a nominee. */
  isOverNominee?: boolean;
  className?: string;
}

export function AwardStatueDraggable({
  shouldWiggle = false,
  isOverNominee = false,
  className,
}: AwardStatueDraggableProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: AWARD_STATUE_ID,
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/40 cursor-grab active:cursor-grabbing touch-none shrink-0",
        isDragging && "opacity-90 z-10",
        className
      )}
      aria-label="Award statue - drag to nominee to declare winner"
      animate={
        shouldWiggle && !isDragging
          ? {
              rotate: [0, -8, 8, -6, 6, 0],
              transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2.5,
              },
            }
          : isOverNominee && isDragging
            ? {
                rotate: [0, -6, 6, -4, 4, 0],
                transition: {
                  duration: 0.25,
                  repeat: Infinity,
                  repeatDelay: 0.05,
                },
              }
            : undefined
      }
    >
      <Star className="w-7 h-7" strokeWidth={1.5} fill="currentColor" />
    </motion.div>
  );
}

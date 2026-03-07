"use client";

import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AWARD_STATUE_ID = "awardStatue";

/** Preview shown in DragOverlay: award image with wiggle, follows cursor during drag. */
export function AwardStatueDragPreview() {
  return (
    <motion.div
      className="flex items-center justify-center cursor-grabbing touch-none shrink-0 min-w-12 min-h-12"
      aria-hidden
      animate={{
        rotate: [0, -6, 6, -4, 4, 0],
        transition: {
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 0.08,
        },
      }}
    >
      <Image
        src="/images/award.svg"
        alt=""
        width={28}
        height={71}
        className="h-12 w-auto object-contain pointer-events-none"
      />
    </motion.div>
  );
}

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
        "flex items-center justify-center cursor-grab active:cursor-grabbing touch-none shrink-0 min-w-12 min-h-12",
        isDragging && "opacity-0 pointer-events-none",
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
      <Image
        src="/images/award.svg"
        alt=""
        width={100}
        height={100}
        className="h-16 w-auto object-contain pointer-events-none"
      />
    </motion.div>
  );
}

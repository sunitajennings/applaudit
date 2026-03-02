"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMOJI = "👏";
const COUNT = 24;
const DURATION_MS = 1200;
const SPREAD = 120;

export interface ConfettiCelebrationProps {
  /** Increment to trigger a new burst. */
  trigger: number;
}

/**
 * Clapping-hands emoji burst: absolute positioned, short duration then remove.
 * Trigger by changing the `trigger` prop (e.g. increment from parent).
 */
export function ConfettiCelebration({ trigger }: ConfettiCelebrationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger <= 0) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), DURATION_MS);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!visible) return null;

  const particles = Array.from({ length: COUNT }, (_, i) => {
    const angle = (i / COUNT) * 2 * Math.PI + Math.random() * 0.5;
    const distance = SPREAD + Math.random() * 60;
    const x = Math.cos(angle) * distance + (Math.random() - 0.5) * 40;
    const y = Math.sin(angle) * distance + (Math.random() - 0.5) * 40;
    const delay = Math.random() * 0.15;
    const size = 14 + Math.random() * 10;
    return { id: i, x, y, delay, size };
  });

  return (
    <AnimatePresence>
      <div
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
        aria-hidden
      >
        {particles.map(({ id, x, y, delay, size }) => (
          <motion.span
            key={`${trigger}-${id}`}
            className="absolute text-2xl"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: -size / 2,
              marginTop: -size / 2,
              fontSize: size,
            }}
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              x,
              y,
              transition: {
                duration: DURATION_MS / 1000,
                delay,
                ease: "easeOut",
              },
            }}
            exit={{ opacity: 0 }}
          >
            {EMOJI}
          </motion.span>
        ))}
      </div>
    </AnimatePresence>
  );
}

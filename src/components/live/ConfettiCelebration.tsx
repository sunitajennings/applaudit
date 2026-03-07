"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMOJI = "👏";
const COUNT = 28;
const DURATION_MS = 5000;
const SIZE_MIN = 28;
const SIZE_MAX = 56;

export interface ConfettiCelebrationProps {
  /** Increment to trigger a new burst. */
  trigger: number;
}

/**
 * Clapping-hands emoji rain: falls from the top with varied sizes.
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
    const leftPercent = Math.random() * 100;
    const delay = Math.random() * 0.4;
    const duration = 3 + Math.random() * 2;
    const size = SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN);
    const drift = (Math.random() - 0.5) * 80;
    return { id: i, leftPercent, delay, duration, size, drift };
  });

  return (
    <AnimatePresence>
      <div
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        aria-hidden
      >
        {particles.map(({ id, leftPercent, delay, duration, size, drift }) => (
          <motion.span
            key={`${trigger}-${id}`}
            className="absolute"
            style={{
              left: `${leftPercent}%`,
              top: "-5%",
              marginLeft: -size / 2,
              marginTop: -size / 2,
              fontSize: size,
            }}
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={{
              opacity: 0.9,
              y: "110vh",
              x: drift,
              transition: {
                duration,
                delay,
                ease: "linear",
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

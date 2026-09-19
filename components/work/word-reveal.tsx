"use client";

import { motion, useReducedMotion } from "motion/react";

/* Masked word-by-word rise for display headlines — the standard intro
   on type-led designer sites. Falls back to plain text under
   reduced-motion and on touch-only devices it's still instant enough. */

export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <h1 className={className}>{text}</h1>;

  return (
    <h1 className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: delay + i * 0.055,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}

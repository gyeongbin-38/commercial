"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/* Quiet entrance: fade + short rise, staggered by `delay`.
   `as` lets it render as li etc. */
export function Pop({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span" | "section";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];

  if (reduce) return <M className={className}>{children}</M>;

  return (
    <M
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </M>
  );
}

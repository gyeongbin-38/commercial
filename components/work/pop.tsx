"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/* DesignJoy-style spring pop: elements scale up from below with a
   slight tilt and overshoot, staggered by `delay`. The signature
   "everything pops" feel. `as` lets it render as li etc. */
export function Pop({
  children,
  delay = 0,
  rotate = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  rotate?: number;
  className?: string;
  as?: "div" | "li" | "span" | "section";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];

  if (reduce) return <M className={className}>{children}</M>;

  return (
    <M
      initial={{ opacity: 0, y: 36, scale: 0.82, rotate }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 21,
        delay,
      }}
      className={className}
    >
      {children}
    </M>
  );
}

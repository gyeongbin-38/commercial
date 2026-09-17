"use client";

import { motion, useScroll, useSpring } from "motion/react";

/* Thin scroll-position bar pinned to the top edge. */
export function WorkScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 h-[2px] origin-left bg-[var(--wk-accent)]"
      style={{ scaleX }}
    />
  );
}

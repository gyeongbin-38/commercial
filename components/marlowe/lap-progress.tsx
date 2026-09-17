"use client";

import { motion, useScroll, useSpring } from "motion/react";

/* Lap-progress bar: scroll position read as race progress. The small
   square at the leading edge is the car on track. */
export function MarLapProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 h-[3px] origin-left bg-[var(--mar-volt)]"
      style={{ scaleX }}
    >
      <span className="absolute top-[-3px] right-0 h-[9px] w-[9px] bg-[var(--mar-volt)]" />
    </motion.div>
  );
}

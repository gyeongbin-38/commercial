"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

/* Butter-smooth wheel scrolling for the studio page. Skipped entirely
   under prefers-reduced-motion; anchors still work via lenis.scrollTo. */
export function WorkSmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({
      duration: 0.45,
      smoothWheel: true,
      anchors: true,
    });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}

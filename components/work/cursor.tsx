"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

/* Custom cursor: a small accent dot that tracks the pointer and a lagged
   ring that swells over interactive elements. mix-blend-difference keeps
   it legible over light paper and dark screenshots alike. Pointer-fine
   devices only; never renders under reduced-motion. */
export function WorkCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 400, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 400, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer:fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest?.("a, button, [data-cursor]"));
    };
    const press = (e: PointerEvent) => setDown(e.type === "pointerdown");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", press);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", press);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-white mix-blend-difference"
        style={{
          x: rx,
          y: ry,
          width: 34,
          height: 34,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: down ? 0.7 : hover ? 1.8 : 1,
          opacity: 0.85,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {/* instant dot */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full bg-white mix-blend-difference"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: down ? 2.4 : hover ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
}

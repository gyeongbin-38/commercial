"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { MAR_MARQUEE } from "@/lib/marlowe-data";

function Strip({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {MAR_MARQUEE.map((item) => (
        <span key={item} className="flex items-center">
          <span className="mar-display px-6 text-[1.75rem] leading-none text-[var(--mar-on-volt)]">
            {item}
          </span>
          <span
            className="mar-checker h-4 w-4 rounded-[var(--mar-r-micro)]"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );
}

/* Velocity marquee: base drift left, scroll velocity adds speed and can
   flip direction. Pauses on hover, static under reduced motion. */
export function MarMarquee() {
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const x = useMotionValue(0);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 320 });
  const factor = useTransform(smooth, [-1800, 0, 1800], [-3, 1, 3], {
    clamp: true,
  });

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    const half = track.current ? track.current.scrollWidth / 2 : 0;
    if (!half) return;
    let next = x.get() - 85 * factor.get() * (delta / 1000);
    next %= half;
    if (next > 0) next -= half;
    x.set(next);
  });

  return (
    <section
      className="overflow-hidden py-6"
      aria-label="Marlowe highlights"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="w-[110%] -translate-x-[5%] -rotate-1 bg-[var(--mar-volt)] py-3">
        <motion.div ref={track} className="flex w-max" style={{ x }}>
          <Strip />
          <Strip ariaHidden />
        </motion.div>
      </div>
    </section>
  );
}

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
import { WORK_MARQUEE } from "@/lib/work-data";

function Strip({
  items,
  ariaHidden = false,
}: {
  items: string[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="wk-marquee-item">{item}</span>
          <span className="wk-marquee-dot" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

/* Velocity marquee: steady drift, scroll velocity adds speed and can
   flip direction. Pauses on hover, static under reduced motion.
   `reverse` drifts the other way — used for the deliverables ticker. */
export function WorkMarquee({
  items = WORK_MARQUEE,
  reverse = false,
  label = "Services",
  className = "",
}: {
  items?: string[];
  reverse?: boolean;
  label?: string;
  className?: string;
}) {
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
    const dir = reverse ? 70 : -70;
    let next = x.get() + dir * factor.get() * (delta / 1000);
    next %= half;
    if (next > 0) next -= half;
    x.set(next);
  });

  return (
    <div
      className={`overflow-hidden border-b border-[var(--wk-line-soft)] py-4 ${className}`}
      aria-label={label}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div ref={track} className="flex w-max" style={{ x }}>
        <Strip items={items} />
        <Strip items={items} ariaHidden />
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { WORK_PROJECTS } from "@/lib/work-data";

const SHOTS = WORK_PROJECTS.map((p) => ({
  src: p.screenshot,
  href: p.href,
  name: p.name,
}));

/* Inline media chip inside the hero headline: cycles through the four
   live demos so the claim carries its own proof. Click opens the site. */
export function WorkChip({ offset = 0 }: { offset?: number }) {
  const [i, setI] = useState(offset % SHOTS.length);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % SHOTS.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const current = SHOTS[i];
  return (
    <a
      href={current.href}
      target="_blank"
      rel="noopener"
      className="wk-chip"
      title={current.name}
      aria-label={`${current.name} — open live demo`}
    >
      {SHOTS.map((s, j) => (
        <img
          key={s.src}
          src={s.src}
          alt=""
          aria-hidden="true"
          className="wk-chip-img"
          style={{ opacity: j === i ? 1 : 0 }}
        />
      ))}
    </a>
  );
}

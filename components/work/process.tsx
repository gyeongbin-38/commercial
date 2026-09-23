"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { WORK_PROCESS } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";
import { Pop } from "./pop";

/* Each step owns its own progress bar; they fill one after another as
   the section scrolls through, so position on the page maps to a step,
   not to one global meter. */

export function WorkProcess() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  const n = WORK_PROCESS.length;

  return (
    <section id="process" className="wk-cv scroll-mt-20">
      <div className="wk-container py-16 min-[900px]:py-24">
        <Reveal>
          <h2 className="wk-h2 max-w-[22ch]">
            Brief to launch in four steps
          </h2>
        </Reveal>

        <Reveal>
          <p className="wk-lead mt-4 max-w-[34rem] text-[0.9375rem]">
            The Growth and Custom arc below. The Launch package compresses
            the same arc into 5 days because you bring the copy and the
            direction.
          </p>
        </Reveal>

        <ol
          ref={ref}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WORK_PROCESS.map((s, i) => (
            <Pop as="li" key={s.step} delay={0.07 * i} className="h-full">
              <StepBar
                progress={scrollYProgress}
                index={i}
                total={n}
                reduce={!!reduce}
              />
              <div className="h-full pt-5">
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-[0.8125rem] font-semibold tracking-[0.08em] text-[var(--wk-accent-dim)]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {s.step}
                  </span>
                  <span className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[var(--wk-muted)]">
                    {s.day}
                  </span>
                </div>
                <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--wk-muted)]">
                  {s.body}
                </p>
              </div>
            </Pop>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepBar({
  progress,
  index,
  total,
  reduce,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduce: boolean;
}) {
  // Slice the section scroll into equal segments; this bar fills only
  // while its own segment is passing.
  const scaleX = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, 1],
  );
  return (
    <div
      className="h-[2px] w-full bg-[var(--wk-line)]"
      role="presentation"
    >
      <motion.div
        className="h-full w-full origin-left bg-[var(--wk-accent)]"
        style={{ scaleX: reduce ? 1 : scaleX }}
      />
    </div>
  );
}

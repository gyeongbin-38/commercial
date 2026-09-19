"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { WORK_PROCESS } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";
import { Pop } from "./pop";

export function WorkProcess() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="scroll-mt-20">
      <div className="wk-container py-16 min-[900px]:py-24">
        <Reveal>
          <h2 className="wk-h2 max-w-[22ch]">
            Brief to launch in four steps
          </h2>
        </Reveal>

        <ol
          ref={ref}
          className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Accent line draws across the steps as you scroll through */}
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute -top-px left-0 h-[2px] w-full origin-left bg-[var(--wk-accent)]"
              style={{ scaleX }}
            />
          )}
          {WORK_PROCESS.map((s, i) => (
            <Pop as="li" key={s.step} delay={0.07 * i} className="h-full">
              <div className="h-full border-t-2 border-[var(--wk-ink)] pt-5">
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-[0.8125rem] font-semibold tracking-[0.08em] text-[var(--wk-accent)]"
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

"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { PATH_PHASES } from "@/lib/fieldstone-data";

/* The path reads as one connected journey, not four cards: a spine runs
   down the list and fills as you scroll — position on the page is
   progress through the program. Each stop names its program and the
   concrete outcome a founder walks out with. */

export function FsPath() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="path" className="scroll-mt-20 bg-[var(--fs-tint)]">
      <div className="fs-container py-16 min-[900px]:py-24">
        <h2 className="fs-h2 max-w-[38rem]">
          The path from idea to investment
        </h2>
        <p className="fs-lead mt-4 max-w-[34rem]">
          Every program feeds the next. Enter wherever your company
          actually is.
        </p>

        <ol ref={ref} className="relative mt-12 max-w-[46rem]">
          {/* spine: track + scroll-driven fill */}
          <span
            className="absolute bottom-6 left-[0.5625rem] top-6 w-px bg-[var(--fs-line)]"
            aria-hidden="true"
          />
          <motion.span
            className="absolute bottom-6 left-[0.5625rem] top-6 w-px origin-top bg-[var(--fs-green)]"
            style={{ scaleY: reduce ? 1 : fill }}
            aria-hidden="true"
          />

          {PATH_PHASES.map((p) => (
            <li key={p.num} className="relative pb-10 pl-10 last:pb-0">
              <span
                className="absolute left-0 top-1.5 flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full border border-[var(--fs-line)] bg-[var(--fs-tint)]"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--fs-green)]" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-[1.25rem] font-bold tracking-tight">
                  <span className="fs-serif mr-2 text-[0.9375rem] font-medium text-[var(--fs-muted)]">
                    {p.num}
                  </span>
                  {p.name}
                </h3>
                <span className="rounded-full border border-[var(--fs-line)] px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[var(--fs-muted)]">
                  {p.program}
                </span>
              </div>
              <p className="mt-2 max-w-[36rem] text-[0.9375rem] leading-relaxed text-[var(--fs-muted)]">
                {p.body}
              </p>
              <p className="mt-2.5 text-[0.8125rem] font-semibold text-[var(--fs-green)]">
                You leave with: {p.outcome}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

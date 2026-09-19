"use client";

import {
  FormInput,
  PenTool,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { WORK_CAPABILITIES } from "@/lib/work-data";
import { Pop } from "./pop";

/* Compact capability grid: three groups — design/build, inquiry flow,
   launch/handoff — plus a packages link. */

const CAP_ICONS: Record<string, LucideIcon> = {
  "Design and build, one hand": PenTool,
  "Inquiry flow that works": FormInput,
  "Launch and handoff": Rocket,
};

const tile =
  "wk-bento h-full rounded-[var(--wk-r-md)] border border-[var(--wk-line)] bg-[var(--wk-card)] p-6";

export function WorkBento() {
  return (
    <section className="border-b border-[var(--wk-line-soft)] bg-[var(--wk-bg-deep)]">
      <div className="wk-container py-16 min-[900px]:py-20">
        <Pop>
          <h2 className="wk-h2 max-w-[22ch]">
            The parts clients don&apos;t see until they&apos;re missing
          </h2>
        </Pop>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
          {WORK_CAPABILITIES.map((c, i) => {
            const Icon = CAP_ICONS[c.title] ?? PenTool;
            return (
              <Pop
                as="li"
                key={c.title}
                delay={0.06 + i * 0.05}
                className={`${tile} flex flex-col gap-3`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="text-[var(--wk-accent-dim)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[0.9375rem] font-semibold tracking-tight">
                    {c.title}
                  </p>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-[var(--wk-muted)]">
                    {c.body}
                  </p>
                </div>
              </Pop>
            );
          })}

          <Pop
            as="li"
            delay={0.24}
            className="wk-bento flex h-full flex-col justify-between gap-4 rounded-[var(--wk-r-md)] bg-[var(--wk-accent-dim)] p-6 text-[var(--wk-on-accent)]"
          >
            <p className="text-[0.9375rem] font-semibold tracking-tight">
              All of it, standard on every build
            </p>
            <a
              href="#packages"
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.1em]"
            >
              See packages
              <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M7 2v9m0 0l-3.5-3.5M7 11l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Pop>
        </ul>
      </div>
    </section>
  );
}

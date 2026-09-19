"use client";

import {
  Accessibility,
  CheckCircle2,
  FormInput,
  MonitorSmartphone,
  Rocket,
  Search,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { WORK_CAPABILITIES, WORK_PROJECTS } from "@/lib/work-data";
import { Pop } from "./pop";

/* Bento grid: a looping site recording, four real stats, and one tile
   per capability. Every tile spring-pops in — the DesignJoy pattern,
   restrained palette. */

const CAP_ICONS: Record<string, LucideIcon> = {
  "Responsive at every size": MonitorSmartphone,
  "SEO out of the box": Search,
  "Accessible by default": Accessibility,
  "Forms that actually work": FormInput,
  "Motion with restraint": Zap,
  "Deployed, not delivered as a zip": Rocket,
  "Checked on the live site": CheckCircle2,
};

const STATS: { n: string; label: string }[] = [
  { n: "5", label: "live sites shipped" },
  { n: "4", label: "viewports QA'd" },
  { n: "5–10", label: "days to launch" },
  { n: "1", label: "pair of hands" },
];

const orbit = WORK_PROJECTS[0];

const tile =
  "wk-bento h-full rounded-[var(--wk-r-md)] border border-[var(--wk-line)] bg-[var(--wk-card)] p-5";

export function WorkBento() {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-[var(--wk-line-soft)] bg-[var(--wk-bg-deep)]">
      <div className="wk-container py-16 min-[900px]:py-20">
        <Pop>
          <h2 className="wk-h2 max-w-[22ch]">
            The parts clients don&apos;t see until they&apos;re missing
          </h2>
        </Pop>

        <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {/* Looping recording tile — ambient motion inside the grid */}
          <Pop
            as="li"
            className="wk-bento relative col-span-2 row-span-2 min-h-[220px] overflow-hidden rounded-[var(--wk-r-md)] border border-[var(--wk-line)] bg-[#141312] lg:min-h-[300px]"
            delay={0.05}
          >
            {reduce ? (
              <img
                src={orbit.screenshot}
                alt="Orbit site preview"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <video
                src={orbit.video}
                className="h-full w-full object-cover object-top"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Orbit site recording"
              />
            )}
            <span className="absolute bottom-3 left-3 rounded-[var(--wk-r-sm)] bg-black/50 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white/90">
              Recorded, not mocked
            </span>
          </Pop>

          {STATS.map((s, i) => (
            <Pop
              as="li"
              key={s.label}
              delay={0.08 + i * 0.05}
              className={`${tile} flex flex-col justify-between gap-4`}
            >
              <span className="wk-price text-[2rem] lg:text-[2.5rem]">
                {s.n}
              </span>
              <span className="text-[0.8125rem] font-medium text-[var(--wk-muted)]">
                {s.label}
              </span>
            </Pop>
          ))}

          {WORK_CAPABILITIES.map((c, i) => {
            const Icon = CAP_ICONS[c.title] ?? CheckCircle2;
            return (
              <Pop
                as="li"
                key={c.title}
                delay={0.12 + i * 0.04}
                className={`${tile} flex flex-col gap-3`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="text-[var(--wk-accent)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[0.875rem] font-semibold tracking-tight">
                    {c.title}
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-[var(--wk-muted)]">
                    {c.body}
                  </p>
                </div>
              </Pop>
            );
          })}

          <Pop
            as="li"
            delay={0.4}
            className="wk-bento flex h-full flex-col justify-between gap-4 rounded-[var(--wk-r-md)] bg-[var(--wk-accent)] p-5 text-[var(--wk-on-accent)]"
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

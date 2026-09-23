"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

/* Stage → program matcher. Picking where you are surfaces the program
   built for that stage, with the terms and the next action attached. */

const STAGES = [
  {
    id: "idea",
    label: "Idea",
    hint: "A hunch, not yet tested",
    program: "Idea Studio",
    terms: "4 weeks · Evenings, hybrid · Free for accepted founders",
    why: "Idea Studio exists for exactly this: weekly critiques and customer-interview reps that end in a go or no-go decision — before you quit the day job.",
  },
  {
    id: "validating",
    label: "Validating",
    hint: "Talking to customers, testing demand",
    program: "Idea Studio",
    terms: "4 weeks · Evenings, hybrid · Free for accepted founders",
    why: "You're already doing the interviews — Idea Studio gives them structure and a decision deadline, so validation ends in an answer.",
  },
  {
    id: "building",
    label: "Building",
    hint: "Working product, early revenue",
    program: "Launch Accelerator",
    terms: "12 weeks · Cohort of up to 12 teams · Small warrant, disclosed before you sign",
    why: "The accelerator is built for founders past the idea stage: operator sessions, a shared workspace and a pitch day in front of our investor network.",
  },
  {
    id: "raising",
    label: "Raising",
    hint: "Preparing a round or financing",
    program: "Capital Pathways",
    terms: "Ongoing · One-on-one · Free for accepted founders",
    why: "Capital Pathways pairs you with an advisor who has sat on the other side of the table — pitch deck to term sheet.",
  },
] as const;

export function FsStageMatch() {
  const [stage, setStage] = useState<(typeof STAGES)[number] | null>(null);

  return (
    <div className="fs-card-flat mt-10 p-6 min-[700px]:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[var(--fs-green-deep)]">
            Not sure where you fit?
          </p>
          <p className="fs-h3 mt-2">Pick your current stage.</p>
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Your current stage"
        >
          {STAGES.map((s) => {
            const active = stage?.id === s.id;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={active}
                onClick={() => setStage(s)}
                className={`min-h-11 rounded-full border px-4 text-[0.8125rem] font-semibold transition-colors ${
                  active
                    ? "border-[var(--fs-green)] bg-[var(--fs-green)] text-white"
                    : "border-[var(--fs-line)] bg-white text-[var(--fs-ink)] hover:border-[var(--fs-green-deep)]"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {stage && (
        <div
          className="mt-6 flex flex-col gap-4 border-t pt-6 min-[700px]:flex-row min-[700px]:items-center min-[700px]:justify-between"
          style={{ borderColor: "var(--fs-line-soft)" }}
          aria-live="polite"
        >
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--fs-muted)]">
              {stage.label} · {stage.hint}
            </p>
            <p className="fs-h3 mt-1.5">
              Recommended: <span className="text-[var(--fs-green-deep)]">{stage.program}</span>
            </p>
            <p className="mt-1 text-[0.8125rem] font-semibold text-[var(--fs-muted)]">
              {stage.terms}
            </p>
            <p className="mt-2.5 max-w-[38rem] text-[0.9375rem] leading-relaxed text-[var(--fs-muted)]">
              {stage.why}
            </p>
          </div>
          <a
            href="#apply"
            className="fs-btn fs-btn-accent shrink-0 self-start min-[700px]:self-center"
          >
            Apply to {stage.program}
            <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}

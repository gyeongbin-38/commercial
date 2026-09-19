"use client";

import { useState } from "react";
import { WORK_FAQS } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";
import { Pop } from "./pop";

export function WorkFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-[var(--wk-bg-deep)]">
      <div className="wk-container py-16 min-[900px]:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <h2 className="wk-h2">Asked before you ask</h2>
              <p className="wk-lead mt-4 max-w-[22rem] text-[0.9375rem]">
                Anything else? Send it over email. Replies go out within 24
                hours.
              </p>
            </div>
          </Reveal>

          <ul className="flex flex-col gap-3">
            {WORK_FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Pop
                  as="li"
                  key={f.q}
                  delay={0.05 * i}
                  className="wk-card overflow-hidden"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`wk-faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="text-[0.9375rem] font-semibold tracking-tight">
                      {f.q}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "none",
                      }}
                    >
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="var(--wk-ink)"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div
                    id={`wk-faq-panel-${i}`}
                    className="wk-faq-panel"
                    data-open={isOpen}
                    aria-hidden={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[0.875rem] leading-relaxed text-[var(--wk-muted)]">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </Pop>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

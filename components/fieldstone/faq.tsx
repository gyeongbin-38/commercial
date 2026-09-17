"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FS_FAQS } from "@/lib/fieldstone-data";

export function FsFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-[var(--fs-tint)]">
      <div className="fs-container py-16 min-[900px]:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="fs-h2">Questions, answered</h2>
            <p className="fs-lead mt-4 max-w-[24rem]">
              Anything else, write to us. A person on the programs team
              replies within two business days.
            </p>
            <a
              href="mailto:hello@fieldstone.works"
              className="fs-btn fs-btn-ghost mt-7"
            >
              Ask a question
            </a>
          </div>

          <ul className="flex flex-col gap-3">
            {FS_FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="fs-card-flat overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`fs-faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="text-[0.9375rem] font-semibold">
                      {f.q}
                    </span>
                    <Plus
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="shrink-0 text-[var(--fs-pine)] transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "none",
                      }}
                    />
                  </button>
                  <div
                    id={`fs-faq-panel-${i}`}
                    hidden={!isOpen}
                    className="px-5 pb-5"
                  >
                    <p className="text-[0.875rem] font-medium leading-relaxed text-[var(--fs-muted)]">
                      {f.a}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

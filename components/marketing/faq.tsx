"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { FAQS } from "@/lib/demo-data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="tile scroll-mt-14 bg-parchment">
      <div className="mx-auto max-w-[720px] px-5">
        <Reveal className="text-center">
          <h2 className="text-display-md text-ink">Questions, answered.</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ul>
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-b border-hairline first:border-t">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-body-strong text-ink">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                      }
                      className="shrink-0 text-action"
                    >
                      <ChevronDown size={18} strokeWidth={2} aria-hidden="true" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-body pb-6 pr-10 text-ink-80">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 text-center">
          <p className="text-caption text-ink-48">
            Something else on your mind?{" "}
            <a href="#get-started" className="link">
              Ask us directly
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

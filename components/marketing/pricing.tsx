"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const PLANS = [
  {
    name: "Solo",
    monthly: 12,
    yearly: 10,
    blurb: "For one person keeping every client warm.",
    features: [
      "1 seat",
      "Unlimited clients",
      "Follow-up queue",
      "Client timelines",
      "Calendar sync",
    ],
    cta: "Start with Solo",
    featured: false,
  },
  {
    name: "Studio",
    monthly: 29,
    yearly: 24,
    blurb: "For studios and small teams sharing client work.",
    features: [
      "3 seats included",
      "Everything in Solo",
      "Automations",
      "Pipeline board",
      "Workload view",
    ],
    cta: "Start with Studio",
    featured: true,
  },
  {
    name: "Team",
    monthly: 59,
    yearly: 49,
    blurb: "For agencies that live in the pipeline together.",
    features: [
      "10 seats included",
      "Everything in Studio",
      "Shared workspaces",
      "Priority support",
      "Export API",
    ],
    cta: "Start with Team",
    featured: false,
  },
] as const;

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section id="pricing" className="tile scroll-mt-14 bg-canvas">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal>
          <h2 className="text-display-md text-ink">
            Priced like a tool, not a platform.
          </h2>
          <p className="text-lead mx-auto mt-4 max-w-[600px] text-ink-80">
            Every plan starts with 14 days free. No card required, cancel
            anytime, export everything.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            className="mt-8 inline-flex rounded-full border border-hairline bg-pearl p-1"
            role="group"
            aria-label="Billing period"
          >
            {(["Monthly", "Yearly"] as const).map((label) => {
              const active = (label === "Yearly") === yearly;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setYearly(label === "Yearly")}
                  className={`relative rounded-full px-5 py-2 text-[14px] transition-colors ${
                    active ? "text-ink" : "text-ink-48"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-full border border-hairline bg-canvas"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative">
                    {label}
                    {label === "Yearly" && (
                      <span className="ml-1.5 text-[12px] text-action">
                        2 months free
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1080px] gap-4 px-5 md:grid-cols-3">
        {PLANS.map((plan, i) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <Reveal key={plan.name} delay={0.08 * i} className="h-full">
              <div
                className={`card flex h-full flex-col p-7 ${
                  plan.featured ? "ring-2 ring-action" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-tagline text-ink">{plan.name}</p>
                  {plan.featured && (
                    <span className="chip">Most popular</span>
                  )}
                </div>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={price}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="tnum text-display-lg inline-block text-ink"
                    >
                      ${price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-body text-ink-48">
                    {" "}
                    / month{yearly ? ", billed yearly" : ""}
                  </span>
                </p>
                <p className="text-caption mt-2 text-ink-80">{plan.blurb}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="text-caption flex items-start gap-2.5 text-ink-80"
                    >
                      <Check
                        size={15}
                        strokeWidth={2}
                        className="mt-0.5 shrink-0 text-ink"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#get-started"
                  className={`btn mt-7 w-full ${
                    plan.featured ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mx-auto mt-8 max-w-[980px] px-5 text-center">
        <p className="text-caption text-ink-48">
          Prices in USD. Demo pricing for a concept product; no checkout is
          connected. Need more than 10 seats?{" "}
          <a href="#get-started" className="link">
            Talk to us
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}

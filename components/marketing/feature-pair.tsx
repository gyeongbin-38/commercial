"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Zap } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { AppWindow } from "@/components/product/app-ui";
import { AUTOMATIONS, WEEK_BARS } from "@/lib/demo-data";

function AutomationMock() {
  const [on, setOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(AUTOMATIONS.map((a) => [a.id, a.on])),
  );
  const reduce = useReducedMotion();

  return (
    <AppWindow title="Orbit · Automations" className="mx-auto max-w-[480px]">
      <ul className="divide-y divide-hairline">
        {AUTOMATIONS.map((a) => (
          <li key={a.id} className="flex items-center gap-3 px-5 py-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-parchment text-ink-80">
              <Zap size={15} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-caption-strong block text-ink">
                When {a.when.toLowerCase()}
              </span>
              <span className="text-caption block text-ink-48">
                then {a.then}
              </span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={on[a.id]}
              aria-label={`${a.when}, ${a.then}`}
              onClick={() => setOn((s) => ({ ...s, [a.id]: !s[a.id] }))}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                on[a.id] ? "bg-action" : "bg-chip"
              }`}
            >
              <motion.span
                layout
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 500, damping: 32 }
                }
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-canvas shadow-[0_1px_3px_rgba(0,0,0,0.25)] ${
                  on[a.id] ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-hairline bg-pearl px-5 py-3">
        <p className="text-caption text-ink-48">
          {Object.values(on).filter(Boolean).length} of {AUTOMATIONS.length}{" "}
          active. Try the switches.
        </p>
      </div>
    </AppWindow>
  );
}

function WeekBarsMock() {
  const reduce = useReducedMotion();
  const max = Math.max(...WEEK_BARS.map((b) => b.value));

  return (
    <AppWindow title="Orbit · This week" className="mx-auto max-w-[480px]">
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-end justify-between">
          <p className="text-caption-strong text-ink">Follow-ups per day</p>
          <span className="chip tnum">35 this week</span>
        </div>
        <div className="mt-5 flex h-32 items-end gap-3">
          {WEEK_BARS.map((b, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              {reduce ? (
                <div
                  className={`w-full rounded-xs ${
                    b.value === max ? "bg-action" : "bg-ink-80"
                  }`}
                  style={{ height: `${(b.value / max) * 100}%` }}
                />
              ) : (
                <motion.div
                  className={`w-full rounded-xs ${
                    b.value === max ? "bg-action" : "bg-ink-80"
                  }`}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(b.value / max) * 100}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.05 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              )}
              <span className="text-fine text-ink-48">{b.day}</span>
            </div>
          ))}
        </div>
        <p className="text-fine mt-4 text-ink-48">
          Thursday is heavy. Orbit can spread non-urgent nudges to Friday.
        </p>
      </div>
    </AppWindow>
  );
}

export function FeaturePair() {
  return (
    <section>
      <div className="grid lg:grid-cols-2">
        {/* Automations, canvas half */}
        <div className="tile bg-canvas px-5">
          <div className="mx-auto max-w-[520px]">
            <Reveal>
              <p className="text-caption-strong text-ink-48">Automations</p>
              <h2 className="text-display-md mt-2 text-ink">
                Let Orbit do the remembering.
              </h2>
              <p className="text-body mt-4 text-ink-80">
                Small rules that fire at the right moment: a check-in after
                a proposal is accepted, a nudge when an invoice drifts. You
                write them once in plain language.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="mt-8">
              <AutomationMock />
            </Reveal>
          </div>
        </div>

        {/* Week load, tile-2 half */}
        <div className="tile bg-tile-2 px-5">
          <div className="mx-auto max-w-[520px]">
            <Reveal>
              <p className="text-caption-strong text-muted-dark">
                Workload view
              </p>
              <h2 className="text-display-md mt-2 text-on-dark">
                See the week at a glance.
              </h2>
              <p className="text-body mt-4 text-muted-dark">
                Follow-ups, bookings and deadlines laid over seven days,
                so you can smooth the load before Friday becomes a wall.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="mt-8">
              <WeekBarsMock />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

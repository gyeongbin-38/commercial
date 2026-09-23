"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  Check,
  Inbox,
  ListChecks,
  Undo2,
  Users,
  Zap,
} from "lucide-react";
import {
  AppWindow,
  KindIcon,
  Sidebar,
  StatusChip,
} from "@/components/product/app-ui";
import { OrbitField } from "@/components/ui/orbit-field";
import { FOLLOWUPS_TODAY, PIPELINE_COUNTS } from "@/lib/demo-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const SIDEBAR_ITEMS = [
  { label: "Inbox", icon: Inbox, badge: 2 },
  { label: "Follow-ups", icon: ListChecks, badge: 5 },
  { label: "Clients", icon: Users },
  { label: "Bookings", icon: CalendarDays },
  { label: "Automations", icon: Zap },
];

/* The hero demo plays one complete workflow instead of showing a static
   dashboard: an overdue follow-up is spotlighted, the visitor picks the
   next action, and the queue visibly reschedules it. Local state only. */

type HeroAction = "sent" | "snoozed" | "call";

const ACTION_LABEL: Record<HeroAction, string> = {
  sent: "Reminder sent — reply window open",
  snoozed: "Snoozed · back Friday",
  call: "Call booked · Fri 10:00",
};

const ACTION_BTN: { id: HeroAction; label: string }[] = [
  { id: "sent", label: "Send reminder" },
  { id: "snoozed", label: "Snooze +2d" },
  { id: "call", label: "Call instead" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [acted, setActed] = useState<HeroAction | null>(null);
  const focus = FOLLOWUPS_TODAY.find((f) => f.overdue) ?? FOLLOWUPS_TODAY[0];
  const rest = FOLLOWUPS_TODAY.filter((f) => f.id !== focus.id);
  const open = FOLLOWUPS_TODAY.length - (acted ? 1 : 0);
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: EASE },
        };

  return (
    <section id="top" className="tile relative overflow-hidden bg-canvas pt-24 md:pt-28">
      <OrbitField className="pointer-events-none absolute left-1/2 top-[57%] w-[265vw] max-w-none -translate-x-1/2 -translate-y-1/2 min-[480px]:w-[210vw] sm:w-[165vw] lg:w-[128vw]" />
      <div className="relative mx-auto max-w-[980px] px-5 text-center">
        <motion.p
          {...rise(0)}
          className="text-caption-strong text-ink-48"
        >
          Client operations for small teams
        </motion.p>
        <motion.h1
          {...rise(0.08)}
          className="text-display-xl mt-3 text-ink"
        >
          Keep every client moving forward.
        </motion.h1>
        <motion.p
          {...rise(0.16)}
          className="text-lead mx-auto mt-5 max-w-[640px] text-ink-80"
        >
          Orbit gathers your leads, follow-ups, bookings and active work into
          one calm workspace, so the next right thing is always on top.
        </motion.p>
        <motion.div
          {...rise(0.24)}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#demo" className="btn btn-primary btn-lg">
            Explore the demo
          </a>
          <a href="#get-started" className="btn btn-ghost btn-lg">
            Request access
          </a>
        </motion.div>
        <motion.p {...rise(0.3)} className="mt-6">
          <span className="inline-flex items-center rounded-full border border-hairline bg-pearl px-3.5 py-1.5 text-fine text-ink-48">
            Concept product · Self-directed design demo
          </span>
        </motion.p>
      </div>

      <motion.div
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, y: 44 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.38, ease: EASE },
            })}
        className="relative mx-auto mt-14 max-w-[1100px] px-5 md:mt-16"
      >
        <AppWindow title="Orbit · Follow-ups" className="relative">
          <div className="flex">
            <Sidebar items={SIDEBAR_ITEMS} active="Follow-ups" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
                <p className="text-caption-strong text-ink">
                  Today · {open} open
                </p>
                <span className="chip">Thu, Sep 17</span>
              </div>
              <ul className="divide-y divide-hairline">
                <AnimatePresence initial={false}>
                  {(acted ? [...rest, focus] : [focus, ...rest]).map((f) => {
                    const isFocus = f.id === focus.id;
                    const dim = !isFocus || !!acted;
                    return (
                      <motion.li
                        key={f.id}
                        layout
                        transition={
                          reduce
                            ? { duration: 0.15 }
                            : { type: "spring", stiffness: 380, damping: 34 }
                        }
                        className={`px-5 py-3 transition-opacity ${dim ? "opacity-55" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-parchment text-ink-80">
                            <KindIcon kind={f.kind} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={`text-caption-strong block truncate text-ink ${isFocus && acted ? "line-through" : ""}`}
                            >
                              {f.client}
                            </span>
                            <span className="text-caption block truncate text-ink-48">
                              {isFocus && acted ? ACTION_LABEL[acted] : f.task}
                            </span>
                          </span>
                          {isFocus ? (
                            acted ? (
                              <StatusChip tone="ok">
                                <Check size={11} strokeWidth={2.5} aria-hidden="true" />
                                {" "}Handled
                              </StatusChip>
                            ) : (
                              <StatusChip tone="warn">3d overdue</StatusChip>
                            )
                          ) : f.overdue ? (
                            <StatusChip tone="warn">3d overdue</StatusChip>
                          ) : (
                            <span className="chip tnum">{f.due}</span>
                          )}
                        </div>
                        {isFocus && !acted ? (
                          <div className="mt-2.5 flex flex-wrap gap-1.5 pl-10">
                            {ACTION_BTN.map((a) => (
                              <button
                                key={a.id}
                                type="button"
                                onClick={() => setActed(a.id)}
                                className="rounded-full border border-hairline bg-pearl px-3 py-1.5 text-[0.75rem] font-semibold text-ink transition-colors hover:border-ink-24 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-[#1463e8]"
                              >
                                {a.label}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
              <div className="flex items-center justify-between border-t border-hairline bg-pearl px-5 py-2.5">
                <p className="text-caption text-ink-48" aria-hidden="true">
                  {acted
                    ? `${focus.client} handled — ${ACTION_LABEL[acted].toLowerCase()}.`
                    : "One overdue item. Pick the next move."}
                </p>
                <p className="sr-only" role="status" aria-live="polite">
                  {acted
                    ? `${focus.client} handled: ${ACTION_LABEL[acted]}. ${open} items left today.`
                    : ""}
                </p>
                {acted ? (
                  <button
                    type="button"
                    onClick={() => setActed(null)}
                    className="flex items-center gap-1.5 rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[0.6875rem] font-semibold text-ink-80 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-[#1463e8]"
                  >
                    <Undo2 size={11} strokeWidth={2} aria-hidden="true" />
                    Undo
                  </button>
                ) : null}
              </div>
              <div className="grid grid-cols-2 gap-px border-t border-hairline bg-hairline sm:grid-cols-4">
                {PIPELINE_COUNTS.map((p) => (
                  <div key={p.stage} className="bg-canvas px-4 py-3">
                    <p className="tnum text-body-strong text-ink">
                      {p.count}
                      <span className="text-ink-48"> / {p.total}</span>
                    </p>
                    <p className="text-fine text-ink-48">{p.stage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AppWindow>
      </motion.div>
    </section>
  );
}

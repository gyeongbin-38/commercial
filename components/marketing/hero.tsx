"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  Inbox,
  ListChecks,
  Users,
  Zap,
} from "lucide-react";
import {
  AppWindow,
  KindIcon,
  Sidebar,
  StatusChip,
} from "@/components/product/app-ui";
import { FOLLOWUPS_TODAY, PIPELINE_COUNTS } from "@/lib/demo-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const SIDEBAR_ITEMS = [
  { label: "Inbox", icon: Inbox, badge: 2 },
  { label: "Follow-ups", icon: ListChecks, badge: 5 },
  { label: "Clients", icon: Users },
  { label: "Bookings", icon: CalendarDays },
  { label: "Automations", icon: Zap },
];

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: EASE },
        };

  return (
    <section id="top" className="tile bg-canvas">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <motion.p
          {...rise(0)}
          className="text-caption-strong text-ink-48"
        >
          Client operations for small teams
        </motion.p>
        <motion.h1
          {...rise(0.08)}
          className="text-display mt-3 text-ink"
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
          <a href="#get-started" className="btn btn-primary">
            Start free trial
          </a>
          <a href="#demo" className="btn btn-ghost">
            See it in action
          </a>
        </motion.div>
        <motion.p {...rise(0.3)} className="text-fine mt-4 text-ink-48">
          14 days free · No card required · Export anytime
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
        className="mx-auto mt-14 max-w-[1100px] px-5"
      >
        <AppWindow title="Orbit · Follow-ups">
          <div className="flex">
            <Sidebar items={SIDEBAR_ITEMS} active="Follow-ups" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
                <p className="text-caption-strong text-ink">Today</p>
                <span className="chip">Thu, Sep 17</span>
              </div>
              <ul className="divide-y divide-hairline">
                {FOLLOWUPS_TODAY.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center gap-3 px-5 py-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-parchment text-ink-80">
                      <KindIcon kind={f.kind} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-caption-strong block truncate text-ink">
                        {f.client}
                      </span>
                      <span className="text-caption block truncate text-ink-48">
                        {f.task}
                      </span>
                    </span>
                    {f.overdue ? (
                      <StatusChip tone="warn">3d overdue</StatusChip>
                    ) : (
                      <span className="chip tnum">{f.due}</span>
                    )}
                  </li>
                ))}
              </ul>
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

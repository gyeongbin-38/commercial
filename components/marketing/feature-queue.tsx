"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Check, Undo2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import {
  AppWindow,
  KindIcon,
  StatusChip,
} from "@/components/product/app-ui";
import { FOLLOWUPS_TODAY, FOLLOWUPS_WEEK } from "@/lib/demo-data";

/* Interactive follow-up queue — marking an item done sinks it to the
   bottom of today's list, announces the reschedule, and offers Undo.
   Rows are never unmounted (only reordered), so keyboard focus stays
   on the button that was pressed. Local demo state only. */

const NEXT_FOLLOWUP: Record<string, string> = {
  f1: "Thu",
  f2: "Fri",
  f3: "Mon",
  f4: "Wed",
  f5: "Thu",
};

const spring = { type: "spring" as const, stiffness: 380, damping: 34 };

export function FeatureQueue() {
  const today = FOLLOWUPS_TODAY.slice(0, 4);
  const [done, setDone] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const reduce = useReducedMotion();

  const remaining = today.length - done.length;
  const lastDoneId = done[done.length - 1];
  const lastDone = today.find((f) => f.id === lastDoneId);

  const markDone = (id: string) => {
    const item = today.find((f) => f.id === id);
    if (!item) return;
    setDone((d) => [...d, id]);
    setAnnouncement(
      `${item.client} done. ${remaining - 1} left today. Next follow-up queued for ${NEXT_FOLLOWUP[id] ?? "later this week"}.`,
    );
  };

  const undo = () => {
    if (!lastDone) return;
    setDone((d) => d.slice(0, -1));
    setAnnouncement(`${lastDone.client} restored to today's queue.`);
  };

  const ordered = [
    ...today.filter((f) => !done.includes(f.id)),
    ...today.filter((f) => done.includes(f.id)),
  ];

  return (
    <section id="product" className="tile scroll-mt-14 bg-canvas">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-caption-strong text-ink-48">Follow-up queue</p>
          <h2 className="text-display-lg mt-2 text-ink">
            Know exactly who needs you today.
          </h2>
          <p className="text-body mt-4 text-ink-80">
            Every morning, Orbit sorts your open loops into one queue:
            overdue first, then today, then this week. Reply, call or nudge,
            and the next step reschedules itself. Nothing depends on
            remembering anymore.
          </p>
          <ul className="text-body mt-6 flex flex-col gap-2.5 text-ink-80">
            <li className="flex gap-2.5">
              <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              Overdue items surface first, never silently
            </li>
            <li className="flex gap-2.5">
              <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              Done for the day means actually done
            </li>
            <li className="flex gap-2.5">
              <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              Next week&apos;s work is already queued
            </li>
          </ul>
          <p className="text-fine mt-5 text-ink-48">
            Try it — mark an item done in the panel. Demo data; nothing is
            saved.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <AppWindow title="Orbit · Follow-ups" className="mx-auto max-w-[520px]">
            <div className="px-5 pt-4 pb-1">
              <p className="text-fine font-semibold uppercase tracking-wide text-ink-48">
                Today · {remaining} of {today.length}
              </p>
            </div>
            <LayoutGroup>
              <ul className="divide-y divide-hairline">
                <AnimatePresence initial={false}>
                  {ordered.map((f) => {
                    const isDone = done.includes(f.id);
                    return (
                      <motion.li
                        key={f.id}
                        layout
                        transition={reduce ? { duration: 0.15 } : spring}
                        className={`flex items-center gap-3 px-5 py-3 ${isDone ? "opacity-45" : ""}`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-parchment text-ink-80">
                          <KindIcon kind={f.kind} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`text-caption-strong block truncate text-ink ${isDone ? "line-through" : ""}`}
                          >
                            {f.client}
                          </span>
                          <span className="text-caption block truncate text-ink-48">
                            {isDone
                              ? `Follow-up queued · ${NEXT_FOLLOWUP[f.id] ?? "later"}`
                              : f.task}
                          </span>
                        </span>
                        {isDone ? (
                          <StatusChip tone="ok">Done</StatusChip>
                        ) : f.overdue ? (
                          <StatusChip tone="warn">3d overdue</StatusChip>
                        ) : (
                          <span className="chip tnum">{f.due}</span>
                        )}
                        {isDone ? (
                          <button
                            type="button"
                            onClick={undo}
                            aria-label={`Undo done for ${f.client}`}
                            className="-m-1.5 p-1.5 text-ink-48 transition-colors hover:text-ink"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pearl ring-1 ring-hairline">
                              <Undo2 size={13} strokeWidth={1.75} aria-hidden="true" />
                            </span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => markDone(f.id)}
                            aria-label={`Mark ${f.client} done`}
                            className="-m-1.5 p-1.5 text-ink-48 transition-colors hover:text-ink"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pearl ring-1 ring-hairline">
                              <Check size={14} strokeWidth={2} aria-hidden="true" />
                            </span>
                          </button>
                        )}
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </LayoutGroup>
            {remaining === 0 && (
              <p className="border-t border-hairline px-5 py-2.5 text-caption-strong text-ink">
                Today&apos;s queue is clear.
              </p>
            )}
            <div className="border-t border-hairline px-5 pt-3 pb-1">
              <p className="text-fine font-semibold uppercase tracking-wide text-ink-48">
                This week · 5
              </p>
            </div>
            <ul className="divide-y divide-hairline">
              {FOLLOWUPS_WEEK.slice(0, 3).map((f) => (
                <li
                  key={f.id}
                  className="flex items-center gap-3 px-5 py-2.5 opacity-70"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-parchment text-ink-80">
                    <KindIcon kind={f.kind} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-caption block truncate text-ink">
                      {f.client}
                    </span>
                  </span>
                  <span className="chip tnum">{f.due}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-hairline bg-pearl px-5 py-3">
              <p className="text-caption text-ink-48" aria-hidden="true">
                {lastDone
                  ? `${lastDone.client} done — next follow-up queued ${NEXT_FOLLOWUP[lastDone.id] ?? "later this week"}.`
                  : "Clear today's five and you're done. The rest can wait."}
              </p>
              <p className="sr-only" role="status" aria-live="polite">
                {announcement}
              </p>
            </div>
          </AppWindow>
        </Reveal>
      </div>
    </section>
  );
}

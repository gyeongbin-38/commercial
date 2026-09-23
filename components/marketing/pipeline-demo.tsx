"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { AppWindow, Avatar } from "@/components/product/app-ui";
import { CLIENTS, STAGES } from "@/lib/demo-data";
import type { Stage } from "@/lib/demo-data";

const STAGE_ORDER = STAGES.map((s) => s.id);
const initialStages = Object.fromEntries(
  CLIENTS.map((c) => [c.id, c.stage]),
) as Record<string, Stage>;

const spring = { type: "spring" as const, stiffness: 380, damping: 34 };

export function PipelineDemo({
  header,
  compact = false,
}: {
  header?: React.ReactNode;
  /** Compact shows only the last two stages — one move demonstrates the mechanism. */
  compact?: boolean;
}) {
  const [stages, setStages] = useState<Record<string, Stage>>(initialStages);
  const [moves, setMoves] = useState(0);
  const reduce = useReducedMotion();
  const visibleStages = compact ? STAGES.slice(2) : STAGES;
  const visibleIds = visibleStages.map((s) => s.id);

  const total = useMemo(
    () =>
      CLIENTS.reduce(
        (sum, c) => sum + Number(c.value.replace(/[$,]/g, "")),
        0,
      ),
    [],
  );

  const move = (id: string, dir: 1 | -1) => {
    setStages((s) => {
      const idx = STAGE_ORDER.indexOf(s[id]);
      const next = STAGE_ORDER[idx + dir];
      if (!next || (compact && !visibleIds.includes(next))) return s;
      return { ...s, [id]: next };
    });
    setMoves((m) => m + 1);
  };

  const reset = () => {
    setStages(initialStages);
    setMoves(0);
  };

  return (
    <section id="demo" className="tile scroll-mt-14 bg-canvas">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        {header ?? (
          <Reveal>
            <p className="text-caption-strong text-ink-48">Interactive demo</p>
            <h2 className="text-display-lg mt-2 text-ink">
              Try the pipeline. It&apos;s the real thing.
            </h2>
            <p className="text-lead mx-auto mt-4 max-w-[620px] text-ink-80">
              Move a client forward. This board behaves exactly like the
              product. No signup required.
            </p>
          </Reveal>
        )}
      </div>

      <Reveal delay={0.12} className="mx-auto mt-12 max-w-[1440px] px-5">
        <AppWindow title="Orbit · Pipeline">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5 sm:px-5">
            <p className="text-caption-strong tnum text-ink">
              Pipeline · ${total.toLocaleString("en-US")}
            </p>
            <div className="flex items-center gap-3">
              <span className="chip tnum hidden sm:inline-flex">
                {moves} {moves === 1 ? "move" : "moves"}
              </span>
              <button type="button" onClick={reset} className="btn-pearl">
                <RotateCcw size={13} strokeWidth={1.75} aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>

          <LayoutGroup>
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto bg-pearl p-3 sm:p-4">
              {visibleStages.map((stage) => {
                const cards = CLIENTS.filter((c) => stages[c.id] === stage.id);
                return (
                  <div
                    key={stage.id}
                    className="flex w-[270px] shrink-0 snap-start flex-col rounded-md bg-parchment p-2 sm:w-auto sm:min-w-[220px] sm:flex-1"
                  >
                    <div className="flex items-center justify-between px-2 pt-1 pb-2">
                      <p className="text-caption-strong text-ink">
                        {stage.label}
                      </p>
                      <span className="tnum text-fine text-ink-48">
                        {cards.length}
                      </span>
                    </div>
                    <div className="flex min-h-[120px] flex-col gap-2">
                      <AnimatePresence mode="popLayout">
                        {cards.map((c) => {
                          const idx = STAGE_ORDER.indexOf(stages[c.id]);
                          const firstVisible = compact
                            ? STAGE_ORDER.indexOf(visibleIds[0])
                            : 0;
                          return (
                            <motion.article
                              key={c.id}
                              layout
                              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                              transition={reduce ? { duration: 0.15 } : spring}
                              className="card rounded-md p-3"
                            >
                              <div className="flex items-center gap-2.5">
                                <Avatar initials={c.initials} />
                                <div className="min-w-0 flex-1">
                                  <p className="text-caption-strong truncate text-ink">
                                    {c.company}
                                  </p>
                                  <p className="text-fine truncate text-ink-48">
                                    {c.contact}
                                  </p>
                                </div>
                                <span className="tnum text-caption-strong text-ink">
                                  {c.value}
                                </span>
                              </div>
                              <p className="text-caption mt-2.5 leading-snug text-ink-80">
                                {c.nextTask}
                              </p>
                              <div className="mt-2.5 flex items-center justify-between">
                                <span className="chip tnum">{c.nextDue}</span>
                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => move(c.id, -1)}
                                    disabled={idx <= firstVisible}
                                    aria-label={`Move ${c.company} back`}
                                    className="-m-1.5 p-1.5 text-ink-48 transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-25"
                                  >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pearl ring-1 ring-hairline">
                                      <ArrowLeft size={13} strokeWidth={1.75} aria-hidden="true" />
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => move(c.id, 1)}
                                    disabled={idx === STAGE_ORDER.length - 1}
                                    aria-label={`Move ${c.company} forward`}
                                    className="-m-1.5 ml-2 p-1.5 text-ink-48 transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-25"
                                  >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pearl ring-1 ring-hairline">
                                      <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </motion.article>
                          );
                        })}
                      </AnimatePresence>
                      {cards.length === 0 && (
                        <p className="text-fine flex flex-1 items-center justify-center py-6 text-ink-48">
                          No clients here
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="border-t border-hairline bg-pearl px-5 py-3">
            <p className="text-fine text-ink-48">
              Demo data. Moves aren&apos;t saved.{" "}
              {compact ? (
                <>
                  The full four-stage board runs on{" "}
                  <a
                    href="/orbit#demo"
                    className="underline underline-offset-2 hover:text-ink"
                  >
                    Orbit
                  </a>
                  .
                </>
              ) : (
                "In Orbit, each move updates the follow-up queue automatically."
              )}
            </p>
          </div>
        </AppWindow>
      </Reveal>
    </section>
  );
}

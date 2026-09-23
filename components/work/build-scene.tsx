"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* The hero's key scene: the claim "design and build, one pair of hands"
   is shown, not stated. One stage cycles concept sketch → shipped build
   (the real /orbit route in a scaled iframe) → the same build reflowing
   at a phone width. Visitors drive it with the step rail. */

type Step = "sketch" | "build" | "mobile";

const STEPS: { id: Step; label: string; meta: string }[] = [
  { id: "sketch", label: "Concept", meta: "Day 1–3 · direction" },
  { id: "build", label: "Build", meta: "Day 7 · shipped" },
  { id: "mobile", label: "Mobile", meta: "390px · same build" },
];

const STAGE_W = { sketch: 1280, build: 1280, mobile: 390 } as const;

/* Abstract wireframe of a landing hero — layout blocks in pencil-gray,
   matching the real page's rhythm so the sketch→build swap reads as the
   same design gaining fidelity. */
function Wireframe() {
  const bar = "rounded-full bg-[#d8d4cc]";
  const box = "rounded-lg border border-dashed border-[#c9c4ba] bg-[#efece6]";
  return (
    <div
      className="flex h-full w-full flex-col bg-[#f4f1ec] px-[6%] py-[4%]"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <span className={`${bar} h-2.5 w-14`} />
        <span className="flex gap-3">
          <span className={`${bar} h-2 w-10`} />
          <span className={`${bar} h-2 w-10`} />
          <span className={`${bar} h-2 w-10`} />
        </span>
        <span className={`${box} h-6 w-16 !border-solid`} />
      </div>
      <div className="mt-[9%] flex flex-col items-center gap-3">
        <span className={`${bar} h-2 w-28`} />
        <span className={`${bar} h-5 w-[52%]`} />
        <span className={`${bar} h-5 w-[38%]`} />
        <span className={`${bar} mt-1 h-2.5 w-[44%] opacity-70`} />
        <span className="mt-3 flex gap-3">
          <span className={`${box} h-8 w-24 !border-solid`} />
          <span className={`${box} h-8 w-24`} />
        </span>
      </div>
      <div className="mx-auto mt-[8%] w-[86%] flex-1 rounded-t-xl border border-b-0 border-dashed border-[#c9c4ba] bg-white/70 p-[3%]">
        <div className="flex h-full gap-[3%]">
          <span className="flex w-[22%] flex-col gap-2 border-r border-dashed border-[#e0dcd4] pr-[3%]">
            <span className={`${bar} h-2 w-full`} />
            <span className={`${bar} h-2 w-4/5`} />
            <span className={`${bar} h-2 w-full`} />
            <span className={`${bar} h-2 w-3/5`} />
          </span>
          <span className="flex flex-1 flex-col gap-2.5">
            <span className={`${bar} h-2.5 w-1/3`} />
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="flex items-center gap-2">
                <span className={`${box} h-5 w-5 !rounded-full`} />
                <span className={`${bar} h-2 flex-1`} />
                <span className={`${bar} h-2 w-8`} />
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export function BuildScene() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>("sketch");
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Frame keeps its layout width; only the transform changes between
  // desktop and phone, so toggling is a live reflow, not a reload.
  const contentW = STAGE_W[step];
  const scale = size.w ? Math.min(1, size.w / contentW) : 1;
  const frameH = size.h && scale ? size.h / scale : 0;
  const active = STEPS.find((s) => s.id === step)!;

  return (
    <figure>
      <div className="wk-atlas-frame" role="group" aria-label="Concept to shipped build, shown live">
        <span className="wk-atlas-bar" aria-hidden="true">
          <span className="wk-atlas-dots">
            <i /> <i /> <i />
          </span>
          <span className="wk-atlas-url">
            gyeongbinbak.com/orbit
          </span>
          <span className="wk-atlas-live">
            <i />
            {step === "sketch" ? "Sketch" : "Live"}
          </span>
        </span>

        <div ref={shellRef} className="wk-atlas-screen relative">
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: step === "sketch" ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
            style={{ pointerEvents: step === "sketch" ? "auto" : "none" }}
          >
            <Wireframe />
          </motion.div>

          {size.w ? (
            <motion.iframe
              ref={frameRef}
              src="/orbit"
              title="Orbit — live site inside the hero stage"
              onLoad={() => setLoaded(true)}
              className="absolute left-1/2 top-0 border-0 bg-white"
              initial={false}
              animate={{
                scale,
                opacity: step === "sketch" || !loaded ? 0 : 1,
              }}
              transition={{
                scale: reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 210, damping: 30 },
                opacity: { duration: reduce ? 0 : 0.35 },
              }}
              style={{
                width: contentW,
                height: frameH,
                transformOrigin: "top center",
                x: "-50%",
                pointerEvents: step === "sketch" ? "none" : "auto",
              }}
              tabIndex={step === "sketch" ? -1 : undefined}
            />
          ) : null}

          {step !== "sketch" && !loaded ? (
            <span className="absolute inset-0 grid place-items-center bg-[#f4f1ec] text-[0.75rem] font-semibold text-[var(--wk-muted)]">
              Loading the live page…
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex items-center gap-1 rounded-full border border-[var(--wk-line)] bg-[var(--wk-bg)] p-1"
          role="group"
          aria-label="Build stage"
        >
          {STEPS.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={step === s.id}
              onClick={() => setStep(s.id)}
              className={`rounded-full px-3 py-1.5 text-[0.75rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--wk-accent)] ${
                step === s.id
                  ? "bg-[var(--wk-ink)] text-[var(--wk-bg)]"
                  : "text-[var(--wk-muted)] hover:text-[var(--wk-ink)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-[0.75rem] font-medium text-[var(--wk-muted)]">
          {active.meta}
        </p>
      </div>
    </figure>
  );
}

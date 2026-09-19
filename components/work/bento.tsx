"use client";

import { useRef, useState } from "react";
import {
  FormInput,
  PenTool,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { WORK_CAPABILITIES, WORK_PROJECTS } from "@/lib/work-data";
import { Pop } from "./pop";

/* Compact capability grid: one looping site recording plus three
   groups — design/build, inquiry flow, launch/handoff. */

const CAP_ICONS: Record<string, LucideIcon> = {
  "Design and build, one hand": PenTool,
  "Inquiry flow that works": FormInput,
  "Launch and handoff": Rocket,
};

const orbit = WORK_PROJECTS[0];

const tile =
  "wk-bento h-full rounded-[var(--wk-r-md)] border border-[var(--wk-line)] bg-[var(--wk-card)] p-5";

export function WorkBento() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPaused(false)).catch(() => {});
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <section className="border-b border-[var(--wk-line-soft)] bg-[var(--wk-bg-deep)]">
      <div className="wk-container py-16 min-[900px]:py-20">
        <Pop>
          <h2 className="wk-h2 max-w-[22ch]">
            The parts clients don&apos;t see until they&apos;re missing
          </h2>
        </Pop>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {/* Looping recording tile */}
          <Pop
            as="li"
            className="wk-bento relative min-h-[220px] overflow-hidden rounded-[var(--wk-r-md)] border border-[var(--wk-line)] bg-[#141312] sm:col-span-2 lg:row-span-2 lg:min-h-[300px]"
            delay={0.05}
          >
            {reduce ? (
              <img
                src={orbit.screenshot}
                alt="Orbit site preview"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <video
                ref={videoRef}
                src={orbit.video}
                className="h-full w-full object-cover object-top"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Orbit site recording"
              />
            )}
            <span className="absolute bottom-3 left-3 rounded-[var(--wk-r-sm)] bg-black/50 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white/90">
              Recorded, not mocked
            </span>
            {!reduce ? (
              <button
                type="button"
                onClick={toggleVideo}
                aria-label={paused ? "Play recording" : "Pause recording"}
                className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              >
                {paused ? (
                  <svg width="9" height="10" viewBox="0 0 9 10" aria-hidden="true">
                    <path d="M1.5 1l6 4-6 4z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="9" height="10" viewBox="0 0 9 10" aria-hidden="true">
                    <path d="M1 1h2.5v8H1zM5.5 1H8v8H5.5z" fill="currentColor" />
                  </svg>
                )}
              </button>
            ) : null}
          </Pop>

          {WORK_CAPABILITIES.map((c, i) => {
            const Icon = CAP_ICONS[c.title] ?? PenTool;
            return (
              <Pop
                as="li"
                key={c.title}
                delay={0.08 + i * 0.05}
                className={`${tile} flex flex-col gap-3 ${
                  i === WORK_CAPABILITIES.length - 1 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="text-[var(--wk-accent-dim)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[0.9375rem] font-semibold tracking-tight">
                    {c.title}
                  </p>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-[var(--wk-muted)]">
                    {c.body}
                  </p>
                </div>
              </Pop>
            );
          })}

          <Pop
            as="li"
            delay={0.28}
            className="wk-bento flex h-full flex-col justify-between gap-4 rounded-[var(--wk-r-md)] bg-[var(--wk-accent-dim)] p-5 text-[var(--wk-on-accent)]"
          >
            <p className="text-[0.9375rem] font-semibold tracking-tight">
              All of it, standard on every build
            </p>
            <a
              href="#packages"
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.1em]"
            >
              See packages
              <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M7 2v9m0 0l-3.5-3.5M7 11l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Pop>
        </ul>
      </div>
    </section>
  );
}

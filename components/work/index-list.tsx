"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { WORK_PROJECTS } from "@/lib/work-data";

/* Editorial work index — the designer-portfolio pattern: terse rows,
   and a preview panel that chases the pointer and plays the actual site
   recording on hover. Mobile and reduced-motion get the same rows plus
   a static thumbnail, no chase. */

const ACCENTS: Record<string, string> = {
  orbit: "#4a8dff",
  moapoint: "#7fa3d4",
  fieldstone: "#6fae8d",
  marlowe: "#d7f23f",
  plugview: "#70a7ff",
};

export function WorkIndex() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 160, damping: 22, mass: 0.5 });
  const py = useSpring(y, { stiffness: 160, damping: 22, mass: 0.5 });
  const rotRaw = useMotionValue(0);
  const rot = useSpring(rotRaw, { stiffness: 240, damping: 16 });
  const lastX = useRef(0);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer:fine)");
    const update = () =>
      setFine(mq.matches && window.innerWidth >= 900 && !reduce);
    update();
    window.addEventListener("resize", update);
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, [reduce]);

  const preview = fine && active !== null;
  const activeProject = active !== null ? WORK_PROJECTS[active] : null;

  const moveTo = (cx: number, cy: number) => {
    x.set(cx);
    y.set(cy);
    // Velocity tilt: lean into the pointer's travel, then settle flat.
    const dx = cx - lastX.current;
    lastX.current = cx;
    rotRaw.set(Math.max(-9, Math.min(9, dx * 0.35)));
    if (settle.current) clearTimeout(settle.current);
    settle.current = setTimeout(() => rotRaw.set(0), 80);
  };

  return (
    <div className="wk-container pb-16 min-[900px]:pb-24">
      <ul ref={listRef} className="border-t border-[var(--wk-line)]">
        {WORK_PROJECTS.map((p, i) => (
          <li
            key={p.id}
            className="group border-b border-[var(--wk-line)]"
          >
            <a
              href={p.href}
              target="_blank"
              rel="noopener"
              className="flex items-baseline gap-5 py-6 transition-colors min-[900px]:py-7"
              onPointerEnter={(e) => {
                if (!fine) return;
                setActive(i);
                moveTo(e.clientX, e.clientY);
              }}
              onPointerMove={(e) => {
                if (fine && active === i) moveTo(e.clientX, e.clientY);
              }}
              onPointerLeave={() => setActive(null)}
              onFocus={(e) => {
                if (!fine) return;
                const r = e.currentTarget.getBoundingClientRect();
                moveTo(r.right - 240, r.top + r.height / 2);
                setActive(i);
              }}
              onBlur={() => setActive(null)}
            >
              <span
                className="w-7 shrink-0 text-[0.75rem] font-semibold text-[var(--wk-muted)]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-[clamp(1.45rem,3.2vw,2.4rem)] font-bold leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--wk-accent-dim)]">
                    {p.name}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--wk-line)] px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-[var(--wk-muted)]"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: ACCENTS[p.id] }}
                      aria-hidden="true"
                    />
                    {p.id === "plugview" ? "Live build" : "Concept"}
                  </span>
                </span>
                <span className="mt-1 block max-w-[34rem] truncate text-[0.875rem] text-[var(--wk-muted)] max-[700px]:whitespace-normal max-[700px]:leading-snug">
                  {p.kind} · {p.description.split(".")[0]}.
                </span>
              </span>
              <span className="hidden shrink-0 text-[0.8125rem] font-medium text-[var(--wk-muted)] min-[700px]:block">
                {p.year}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                aria-hidden="true"
                className="shrink-0 self-center text-[var(--wk-ink)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--wk-accent-dim)]"
              >
                <path
                  d="M4 14L14 4M6 4h8v8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            {/* Static thumb on touch / small screens — no chase needed */}
            <div className="relative mb-6 aspect-video overflow-hidden rounded-[var(--wk-r-md)] border border-[var(--wk-line)] bg-[#141312] min-[900px]:hidden">
              <Image
                src={p.screenshot}
                alt={`${p.name} site preview`}
                fill
                sizes="100vw"
                className="object-cover"
                style={{
                  objectPosition:
                    "mediaPos" in p ? p.mediaPos : "50% 0%",
                }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Pointer-chasing preview with the live recording */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden min-[900px]:block"
        style={{ x: px, y: py }}
      >
        <motion.div
          className="relative aspect-video w-[400px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[var(--wk-r-lg)] border border-[var(--wk-line)] bg-[#141312] shadow-[0_30px_70px_-20px_rgba(27,25,23,0.45)]"
          style={{ rotate: rot }}
          animate={{
            opacity: preview ? 1 : 0,
            scale: preview ? 1 : 0.88,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          {activeProject ? (
            <>
              <Image
                src={activeProject.screenshot}
                alt=""
                fill
                sizes="400px"
                className="object-cover"
                style={{
                  objectPosition:
                    "mediaPos" in activeProject
                      ? activeProject.mediaPos
                      : "50% 0%",
                }}
              />
              {activeProject.video ? (
                <video
                  key={activeProject.id}
                  src={activeProject.video}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    objectPosition:
                      "mediaPos" in activeProject
                        ? activeProject.mediaPos
                        : "50% 0%",
                  }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : null}
            </>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}

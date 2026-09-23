"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { WORK_PROJECTS } from "@/lib/work-data";

/* Work index — three featured projects with always-visible media
   (screenshot by default, the real recording plays on hover/focus and
   can be paused), then two compact rows. Clicking a card navigates
   straight to the project page — the real thing beats a cramped
   preview. Videos are muted ambient loops with an explicit pause
   control; reduced-motion never autoplays. */

type Project = (typeof WORK_PROJECTS)[number];

const ACCENTS: Record<string, string> = {
  orbit: "#4a8dff",
  moapoint: "#7fa3d4",
  fieldstone: "#6fae8d",
  marlowe: "#d7f23f",
  plugview: "#70a7ff",
};

const FEATURED_IDS = ["plugview", "orbit", "marlowe"];
const COMPACT_IDS = ["moapoint", "fieldstone"];

function StatusBadge({ id }: { id: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--wk-line)] px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-[var(--wk-muted)]">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: ACCENTS[id] }}
        aria-hidden="true"
      />
      {id === "plugview" ? "Live product" : "Concept"}
    </span>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className={className}>
      <path
        d="M4 14L14 4M6 4h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PauseButton({
  videoRef,
  label,
  dark = false,
  className = "right-3 top-3",
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      aria-label={paused ? `Play ${label} preview` : `Pause ${label} preview`}
      aria-pressed={paused}
      onClick={() => {
        const v = videoRef.current;
        if (!v) return;
        if (paused) {
          setPaused(false);
          v.play().catch(() => {});
        } else {
          setPaused(true);
          v.pause();
        }
      }}
      className={`absolute z-10 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-[var(--wk-accent)] ${className} ${
        dark
          ? "border-white/20 bg-black/45 text-white hover:bg-black/60"
          : "border-[var(--wk-line)] bg-[var(--wk-bg)]/90 text-[var(--wk-ink)] hover:bg-[var(--wk-bg)]"
      }`}
    >
      {paused ? (
        <Play size={15} aria-hidden="true" />
      ) : (
        <Pause size={15} aria-hidden="true" />
      )}
    </button>
  );
}

function FeaturedCard({
  p,
  large = false,
}: {
  p: Project;
  large?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const play = () => {
    if (paused || reduce) return;
    videoRef.current?.play().catch(() => {});
  };
  const stop = () => videoRef.current?.pause();

  return (
    <div
      className="wk-card group relative overflow-hidden"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocusCapture={play}
      onBlurCapture={stop}
    >
      <a
        href={p.href}
        className={large ? "grid min-[900px]:grid-cols-[1.2fr_0.8fr]" : "block"}
      >
        <span className="relative block aspect-[16/10] overflow-hidden bg-[#141312]">
          <Image
            src={p.screenshot}
            alt={`${p.name} site preview`}
            fill
            sizes={large ? "(min-width:900px) 55vw, 100vw" : "(min-width:900px) 44vw, 100vw"}
            className="object-cover"
            style={{
              objectPosition: "mediaPos" in p ? p.mediaPos : "50% 0%",
            }}
          />
          {p.video ? (
            <video
              ref={videoRef}
              src={p.video}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                paused
                  ? "opacity-0"
                  : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
              }`}
              style={{
                objectPosition: "mediaPos" in p ? p.mediaPos : "50% 0%",
              }}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : null}
        </span>
        <span
          className={`flex flex-col gap-2 p-5 min-[700px]:p-7 ${
            large ? "min-[900px]:justify-center min-[900px]:p-9" : ""
          }`}
        >
          <span className="flex items-center gap-3">
            <StatusBadge id={p.id} />
            <span className="text-[0.8125rem] font-medium text-[var(--wk-muted)]">
              {p.year}
            </span>
          </span>
          <span
            className={`font-bold leading-tight tracking-tight transition-colors group-hover:text-[var(--wk-accent-dim)] ${
              large
                ? "text-[clamp(1.7rem,3.4vw,2.6rem)]"
                : "text-[clamp(1.35rem,2.6vw,1.9rem)]"
            }`}
          >
            {p.name}
          </span>
          <span className="text-[0.8125rem] font-medium text-[var(--wk-muted)]">
            {p.kind} · {p.role}
          </span>
          {large ? (
            <span className="mt-1 max-w-[30rem] text-[0.9375rem] leading-relaxed text-[var(--wk-muted)]">
              {p.description}
            </span>
          ) : null}
          <span className="mt-1 text-[0.8125rem] leading-snug text-[var(--wk-ink)]">
            {p.proof}
          </span>
          <span className="wk-link-arrow mt-2">
            Open site <ArrowIcon className="h-4 w-4" />
          </span>
        </span>
      </a>
      {p.video ? <PauseButton videoRef={videoRef} label={p.name} /> : null}
    </div>
  );
}

export function WorkIndex() {
  const featured = FEATURED_IDS.map(
    (id) => WORK_PROJECTS.find((p) => p.id === id)!
  );
  const compact = COMPACT_IDS.map(
    (id) => WORK_PROJECTS.find((p) => p.id === id)!
  );

  return (
    <div className="wk-container pb-16 min-[900px]:pb-24">
      <div className="grid gap-5 min-[900px]:gap-7">
        <FeaturedCard p={featured[0]} large />
        <div className="grid gap-5 min-[700px]:grid-cols-2 min-[900px]:gap-7">
          <FeaturedCard p={featured[1]} />
          <FeaturedCard p={featured[2]} />
        </div>
      </div>

      <ul className="mt-12 border-t border-[var(--wk-line)] min-[900px]:mt-16">
        {compact.map((p) => (
          <li key={p.id} className="group border-b border-[var(--wk-line)]">
            <a
              href={p.href}
              className="flex items-center gap-4 py-5 min-[900px]:py-6"
            >
              <span className="relative hidden aspect-video w-28 shrink-0 overflow-hidden rounded-[var(--wk-r-md)] border border-[var(--wk-line)] bg-[#141312] min-[700px]:block">
                <Image
                  src={p.screenshot}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                  style={{
                    objectPosition: "mediaPos" in p ? p.mediaPos : "50% 0%",
                  }}
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-[clamp(1.2rem,2.4vw,1.7rem)] font-bold leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--wk-accent-dim)]">
                    {p.name}
                  </span>
                  <StatusBadge id={p.id} />
                </span>
                <span className="mt-1 block max-w-[34rem] text-[0.875rem] leading-snug text-[var(--wk-muted)]">
                  {p.kind} · {p.role} · {p.proof.replace("Proof to try: ", "Try: ")}
                </span>
              </span>
              <span className="hidden shrink-0 text-[0.8125rem] font-medium text-[var(--wk-muted)] min-[700px]:block">
                {p.year}
              </span>
              <ArrowIcon className="shrink-0 text-[var(--wk-ink)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--wk-accent-dim)]" />
            </a>

            {/* Static thumb on touch / small screens */}
            <div className="relative mb-5 aspect-video overflow-hidden rounded-[var(--wk-r-md)] border border-[var(--wk-line)] bg-[#141312] min-[700px]:hidden">
              <Image
                src={p.screenshot}
                alt={`${p.name} site preview`}
                fill
                sizes="100vw"
                className="object-cover"
                style={{
                  objectPosition: "mediaPos" in p ? p.mediaPos : "50% 0%",
                }}
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { WORK_PROJECTS } from "@/lib/work-data";

/* Work gallery. On desktop the five projects ride a sideways rail driven
   by vertical scroll, with prev/next buttons as an alternative control.
   On mobile and under reduced-motion it is a plain vertical list — same
   media, same captions. Screenshots stay in their own colors: text lives
   in a caption below the image, never over it. The site recording plays
   only while a card is mostly visible, and can be paused. */

const ACCENTS: Record<string, string> = {
  orbit: "#4a8dff",
  moapoint: "#7fa3d4",
  fieldstone: "#6fae8d",
  marlowe: "#d7f23f",
  plugview: "#70a7ff",
};

export function WorkShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [range, setRange] = useState(0);
  const [centers, setCenters] = useState<number[]>([]);
  const [vw, setVw] = useState(1200);
  const [vh, setVh] = useState(900);

  // Wide AND tall enough for the rail; short windows get the list too.
  const rail = !reduce && vw >= 900 && vh >= 620;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -range]);
  const springX = useSpring(rawX, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });
  const x = rail ? springX : rawX;

  const [active, setActive] = useState(0);
  useMotionValueEvent(x, "change", (v) => {
    if (!centers.length) return;
    const vp = vw / 2;
    let best = 0;
    let bestD = Infinity;
    centers.forEach((c, i) => {
      const d = Math.abs(c + v - vp);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
  });

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      const w = window.innerWidth;
      setVw(w);
      setVh(window.innerHeight);
      setRange(Math.max(0, t.scrollWidth - w));
      setCenters(
        Array.from(t.children).map((el) => {
          const li = el as HTMLElement;
          return li.offsetLeft + li.offsetWidth / 2;
        }),
      );
    };
    measure();
    const id = setTimeout(measure, 900);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(id);
    };
  }, [rail]);

  const goTo = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap || !centers.length) return;
    const p = range > 0 ? (centers[i] - vw / 2) / range : 0;
    const top =
      wrap.getBoundingClientRect().top +
      window.scrollY +
      Math.min(1, Math.max(0, p)) * (wrap.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapRef}
      className={rail ? "relative" : undefined}
      style={rail ? { height: "420svh" } : undefined}
    >
      <div
        className={
          rail
            ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden"
            : "wk-container pb-16"
        }
      >
        <motion.ul
          ref={trackRef}
          style={rail ? { x } : undefined}
          className={
            rail
              ? "flex w-max items-start gap-[4vw] px-[21vw] will-change-transform"
              : "flex flex-col gap-16"
          }
        >
          {WORK_PROJECTS.map((p, i) => (
            <Card
              key={p.id}
              project={p}
              index={i}
              rail={rail}
              trackX={x}
              center={centers[i] ?? 0}
              vw={vw}
            />
          ))}
        </motion.ul>

        {rail ? (
          <div className="mt-6 flex items-center justify-center gap-5 px-6">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--wk-line)] bg-[var(--wk-card)] text-[var(--wk-ink)] transition-colors hover:border-[var(--wk-ink)] disabled:opacity-30 disabled:hover:border-[var(--wk-line)]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M9 3L5 7l4 4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
            <span
              className="text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--wk-ink)]"
              style={{ fontVariantNumeric: "tabular-nums" }}
              aria-live="polite"
            >
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="relative h-[2px] w-32 overflow-hidden rounded-full bg-[var(--wk-line)] min-[760px]:w-48">
              <motion.span
                className="absolute inset-0 origin-left bg-[var(--wk-accent-dim)]"
                style={{ scaleX: reduce ? scrollYProgress : progress }}
              />
            </span>
            <span
              className="text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--wk-muted)]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {String(WORK_PROJECTS.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === WORK_PROJECTS.length - 1}
              aria-label="Next project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--wk-line)] bg-[var(--wk-card)] text-[var(--wk-ink)] transition-colors hover:border-[var(--wk-ink)] disabled:opacity-30 disabled:hover:border-[var(--wk-line)]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Card({
  project: p,
  index: i,
  rail,
  trackX,
  center,
  vw,
}: {
  project: (typeof WORK_PROJECTS)[number];
  index: number;
  rail: boolean;
  trackX: MotionValue<number>;
  center: number;
  vw: number;
}) {
  const liRef = useRef<HTMLLIElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  // A subtle swell as the card reaches center — the only transform left,
  // so neighboring work stays legible enough to compare.
  const centered = vw / 2 - center;
  const scale = useTransform(
    trackX,
    [centered - vw * 0.8, centered, centered + vw * 0.8],
    [0.96, 1, 0.96],
  );

  // Play the site recording while the card is mostly visible; pause on
  // exit. A manual pause wins until the card leaves and returns.
  useEffect(() => {
    const el = liRef.current;
    const video = videoRef.current;
    if (!el || !video || !rail) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.55) {
          if (userPaused.current) return;
          if (!video.src) video.src = video.dataset.src!;
          video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
          userPaused.current = false;
        }
      },
      { threshold: [0, 0.55, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rail]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      if (!video.src) video.src = video.dataset.src!;
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
      setPlaying(false);
    }
  };

  const isProduct = p.id === "plugview";
  const accent = ACCENTS[p.id] ?? "#1b1917";
  const mediaPos = "mediaPos" in p ? p.mediaPos : "50% 0%";

  return (
    <motion.li
      ref={liRef}
      style={rail ? { scale } : undefined}
      className={rail ? "w-[58vw] shrink-0" : "w-full"}
    >
      <div
        className={`relative overflow-hidden rounded-[var(--wk-r-lg)] border border-[var(--wk-line)] bg-[#141312] ${
          rail ? "h-[46svh]" : "aspect-video"
        }`}
      >
        <img
          src={p.screenshot}
          alt={`${p.name} site, top of page`}
          className="h-full w-full object-cover"
          style={{ objectPosition: mediaPos }}
          loading={i === 0 ? "eager" : "lazy"}
          draggable={false}
        />
        {rail && p.video ? (
          <video
            ref={videoRef}
            data-src={p.video}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: mediaPos }}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : null}
        {rail && p.video ? (
          <button
            type="button"
            onClick={toggleVideo}
            aria-label={playing ? `Pause ${p.name} recording` : `Play ${p.name} recording`}
            className="absolute bottom-3 right-3 flex h-8 items-center gap-1.5 rounded-full bg-black/60 px-3 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-black/80"
          >
            {playing ? (
              <svg width="9" height="10" viewBox="0 0 9 10" aria-hidden="true">
                <path d="M1 1h2.5v8H1zM5.5 1H8v8H5.5z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="9" height="10" viewBox="0 0 9 10" aria-hidden="true">
                <path d="M1.5 1l6 4-6 4z" fill="currentColor" />
              </svg>
            )}
            {playing ? "Pause" : "Play"}
          </button>
        ) : null}
      </div>

      <div className="mt-4 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[var(--wk-muted)]">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: accent }}
              aria-hidden="true"
            />
            <span className="text-[var(--wk-ink)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            {" · "}
            {isProduct ? "Live product build" : "Concept site"}
            {" · "}
            {p.lang}
          </p>
          <h3 className="mt-1.5 text-[clamp(1.5rem,2.6vw,2.25rem)] font-bold leading-tight tracking-tight">
            {p.name}
          </h3>
          <p className="mt-1 text-[0.8125rem] font-medium text-[var(--wk-muted)]">
            {p.kind} · {p.year}
          </p>
          <p className="mt-2.5 max-w-[36rem] text-[0.9375rem] leading-relaxed text-[var(--wk-ink-soft)]">
            {p.description}
          </p>
          {"note" in p && p.note ? (
            <p className="mt-2 max-w-[36rem] border-l-2 border-[var(--wk-line)] pl-3 text-[0.8125rem] leading-relaxed text-[var(--wk-muted)]">
              {p.note}
            </p>
          ) : null}
          <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={p.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-[var(--wk-ink)] underline decoration-[var(--wk-line)] underline-offset-4 transition-colors hover:decoration-[var(--wk-ink)]"
            >
              Visit live site
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M3 11L11 3M5 3h6v6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <ul className="hidden flex-wrap gap-x-4 min-[1100px]:flex">
              {p.tags.map((t) => (
                <li
                  key={t}
                  className="text-[0.8125rem] font-medium text-[var(--wk-muted)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { WORK_PROJECTS } from "@/lib/work-data";

/* Horizontal rail showcase: vertical scroll drives a sideways gallery.
   The track skews with scroll velocity, each card swells as it reaches
   the viewport center, its media counter-drifts for depth, and the
   site recording plays while a card is mostly visible. */

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
  const x = reduce ? rawX : springX;

  // Velocity-reactive skew: the rail leans into fast scrolling.
  const xv = useVelocity(x);
  const skewX = useSpring(
    useTransform(xv, [-2400, 2400], [4.5, -4.5]),
    { damping: 30, stiffness: 220 },
  );

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = WORK_PROJECTS.length;
    setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1)))));
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
  }, []);

  return (
    <div ref={wrapRef} className="relative" style={{ height: "480svh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.ul
          ref={trackRef}
          style={reduce ? { x } : { x, skewX }}
          className="flex w-max items-stretch gap-[3.5vw] px-[8vw] will-change-transform"
        >
          {WORK_PROJECTS.map((p, i) => (
            <Card
              key={p.id}
              project={p}
              index={i}
              total={WORK_PROJECTS.length}
              trackX={x}
              center={centers[i] ?? 0}
              vw={vw}
            />
          ))}
        </motion.ul>

        {/* Bottom progress: counter + filling line (dark on paper bg) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-4 px-6 min-[760px]:bottom-8">
          <span
            className="text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--wk-ink)]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="relative h-[2px] w-32 overflow-hidden rounded-full bg-[var(--wk-line)] min-[760px]:w-48">
            <motion.span
              className="absolute inset-0 origin-left bg-[var(--wk-accent)]"
              style={{ scaleX: reduce ? scrollYProgress : progress }}
            />
          </span>
          <span
            className="text-[0.75rem] font-semibold tracking-[0.16em] text-[var(--wk-muted)]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {String(WORK_PROJECTS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

function Card({
  project: p,
  index: i,
  total: n,
  trackX,
  center,
  vw,
}: {
  project: (typeof WORK_PROJECTS)[number];
  index: number;
  total: number;
  trackX: MotionValue<number>;
  center: number;
  vw: number;
}) {
  const liRef = useRef<HTMLLIElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  // Card swells and brightens as it reaches the viewport center.
  const centered = vw / 2 - center; // trackX value when this card is centered
  const scale = useTransform(
    trackX,
    [centered - vw * 0.75, centered, centered + vw * 0.75],
    [0.92, 1, 0.92],
  );
  const opacity = useTransform(
    trackX,
    [centered - vw * 1.1, centered, centered + vw * 1.1],
    [0.4, 1, 0.4],
  );
  // Media counter-drift: depth as the rail slides.
  const mediaX = useTransform(trackX, (v) => v * -0.045);

  // Play the site recording while the card is mostly visible.
  useEffect(() => {
    const el = liRef.current;
    const video = videoRef.current;
    if (!el || !video || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.55) {
          if (!video.src) video.src = video.dataset.src!;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.55, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const isProduct = p.id === "plugview";
  const accent = ACCENTS[p.id] ?? "#ffffff";

  return (
    <motion.li
      ref={liRef}
      style={reduce ? undefined : { scale, opacity }}
      className="relative h-[66svh] w-[84vw] shrink-0 overflow-hidden rounded-[var(--wk-r-lg)] border border-black/10 bg-[#141312] min-[760px]:h-[74svh] min-[900px]:w-[62vw]"
    >
      <motion.div
        style={reduce ? undefined : { x: mediaX }}
        className="absolute -inset-x-[10%] inset-y-0"
      >
        <img
          src={p.screenshot}
          alt={`${p.name} site`}
          className="h-full w-full object-cover object-top"
          loading={i === 0 ? "eager" : "lazy"}
          draggable={false}
        />
        {!reduce && p.video ? (
          <video
            ref={videoRef}
            data-src={p.video}
            className="absolute inset-0 h-full w-full object-cover object-top"
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : null}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />

      <div className="absolute left-5 top-5 flex items-center gap-3 text-white/85 min-[760px]:left-8 min-[760px]:top-7">
        <span
          className="text-[clamp(1.4rem,2.4vw,2rem)] font-bold leading-none tracking-tight"
          style={{ color: accent }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-7 bg-white/40" aria-hidden="true" />
        <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em]">
          {isProduct ? "Live product build" : "Concept site"}
        </span>
      </div>

      <span className="absolute right-5 top-5 rounded-md border border-white/25 bg-black/30 px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide text-white/90 min-[760px]:right-8 min-[760px]:top-7">
        {p.lang}
      </span>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-7 text-white min-[760px]:px-8 min-[760px]:pb-9">
        <p
          className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em]"
          style={{ color: accent }}
        >
          {p.kind} · {p.year}
        </p>
        <h3 className="mt-2 text-[clamp(1.9rem,4.2vw,3.6rem)] font-bold leading-none tracking-tight">
          {p.name}
        </h3>
        <p className="mt-3 hidden max-w-[34rem] text-[0.9375rem] leading-relaxed text-white/75 min-[760px]:block">
          {p.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-5">
          <a
            href={p.href}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
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
                className="text-[0.8125rem] font-medium text-white/55"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  );
}

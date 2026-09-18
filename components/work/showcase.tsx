"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { WORK_PROJECTS } from "@/lib/work-data";

/* Full-viewport sticky deck: each project panel pins at top while the
   next slides over it. Covered panels scale down and dim. Panels whose
   site has a hover recording play it muted once they're mostly visible.
*/

const ACCENTS: Record<string, string> = {
  orbit: "#4a8dff",
  moapoint: "#7fa3d4",
  fieldstone: "#6fae8d",
  marlowe: "#d7f23f",
  plugview: "#70a7ff",
};

export function WorkShowcase() {
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start start", "end start"],
  });
  const n = WORK_PROJECTS.length;

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1)))));
  });
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "-20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative">
      <ul ref={listRef} className="relative">
        {WORK_PROJECTS.map((p, i) => (
          <Panel
            key={p.id}
            project={p}
            index={i}
            total={n}
            listProgress={scrollYProgress}
          />
        ))}
      </ul>
      <nav
        aria-label="Project progress"
        className={`fixed right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2.5 transition-opacity duration-300 min-[760px]:right-8 ${
          inView ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {WORK_PROJECTS.map((p, i) => (
          <span
            key={p.id}
            aria-hidden="true"
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </nav>
    </div>
  );
}

function Panel({
  project: p,
  index: i,
  total: n,
  listProgress,
}: {
  project: (typeof WORK_PROJECTS)[number];
  index: number;
  total: number;
  listProgress: MotionValue<number>;
}) {
  const liRef = useRef<HTMLLIElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  // How much this panel is covered by the next one (0..1).
  const cover = useTransform(listProgress, (v) =>
    Math.min(1, Math.max(0, v * (n - 1) - i)),
  );
  const scale = useTransform(cover, [0, 1], [1, 0.94]);
  const brightness = useTransform(cover, [0, 1], [1, 0.5]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  // Entry parallax: media settles as the panel arrives.
  const { scrollYProgress: entry } = useScroll({
    target: liRef,
    offset: ["start end", "start start"],
  });
  const mediaY = useTransform(entry, [0, 1], ["7%", "0%"]);
  const mediaScale = useTransform(entry, [0, 1], [1.14, 1.05]);

  // Play the site recording while the panel is mostly visible.
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

  // Content block rises in as the panel arrives.
  const contentY = useTransform(entry, [0.2, 1], [44, 0]);
  const contentOpacity = useTransform(entry, [0.25, 0.9], [0, 1]);

  return (
    <li ref={liRef} className="sticky top-0 h-[100svh]">
      <motion.div
        style={{ scale, filter }}
        className="relative h-full w-full origin-center overflow-hidden rounded-t-[26px] border-t border-black/10 bg-[#141312] will-change-transform"
      >
        <motion.div
          style={reduce ? undefined : { y: mediaY, scale: mediaScale }}
          className="absolute -inset-[8%]"
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />

        <div className="absolute left-5 top-6 flex items-center gap-3 text-white/85 min-[760px]:left-10 min-[760px]:top-9">
          <span
            className="text-[0.8125rem] font-semibold tracking-[0.18em]"
            style={{ color: accent }}
          >
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-white/40" aria-hidden="true" />
          <span className="text-[0.8125rem] font-medium uppercase tracking-[0.14em]">
            {isProduct ? "Live product build" : "Concept site"}
          </span>
        </div>

        <span className="absolute right-5 top-6 rounded-md border border-white/25 bg-black/30 px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide text-white/90 min-[760px]:right-10 min-[760px]:top-9">
          {p.lang}
        </span>

        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="absolute inset-x-0 bottom-0 px-5 pb-9 text-white min-[760px]:px-10 min-[760px]:pb-12"
        >
          <p
            className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em]"
            style={{ color: accent }}
          >
            {p.kind} · {p.year}
          </p>
          <h3 className="mt-2 text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-none tracking-tight">
            {p.name}
          </h3>
          <p className="mt-3 max-w-[38rem] text-[0.9375rem] leading-relaxed text-white/75 min-[760px]:text-[1rem]">
            {p.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-5">
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
            <ul className="hidden flex-wrap gap-x-4 min-[900px]:flex">
              {p.tags.map((t) => (
                <li key={t} className="text-[0.8125rem] font-medium text-white/55">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </li>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Monitor, Pause, Play, Smartphone, X } from "lucide-react";
import { WORK_PROJECTS } from "@/lib/work-data";

/* Work index — three featured projects with always-visible media
   (screenshot by default, the real recording plays on hover/focus and
   can be paused), then two compact rows. Clicking any card opens a
   case-note aside instead of leaving the page; modifier clicks still
   open the live site in a new tab. Videos are muted ambient loops with
   an explicit pause control; reduced-motion never autoplays. */

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

/* Live-stage aside — instead of screenshots or recordings, the real
   site runs inside a scaled iframe: every scroll animation, hover and
   3D scene works in place. Plain click opens it, modifier clicks still
   go straight to the live demo. Dialog semantics: focus enters on open,
   Tab is trapped, Escape/overlay close, focus returns to the card. */
const STAGE_WIDTHS = { desktop: 1280, mobile: 390 } as const;
type Device = keyof typeof STAGE_WIDTHS;

function DeviceToggle({
  device,
  onChange,
}: {
  device: Device;
  onChange: (d: Device) => void;
}) {
  return (
    <span className="flex items-center gap-0.5 rounded-full border border-white/20 bg-black/45 p-1 backdrop-blur-md">
      {(["desktop", "mobile"] as const).map((d) => (
        <button
          key={d}
          type="button"
          aria-label={`${d} preview`}
          aria-pressed={device === d}
          onClick={() => onChange(d)}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--wk-accent)] ${
            device === d ? "bg-white/15 text-white" : ""
          }`}
        >
          {d === "desktop" ? (
            <Monitor size={14} aria-hidden="true" />
          ) : (
            <Smartphone size={14} aria-hidden="true" />
          )}
        </button>
      ))}
    </span>
  );
}

/* The stage renders the live route at a fixed device width and scales
   it to the panel, so the desktop layout is preserved instead of
   collapsing to a narrow-column mobile render. */
function LiveStage({
  p,
  device,
  onClose,
}: {
  p: Project;
  device: Device;
  onClose: () => void;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setSize({
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const contentW = STAGE_WIDTHS[device];
  const scale = size.w ? Math.min(1, size.w / contentW) : 1;
  const frameH = size.h && scale ? size.h / scale : 0;

  return (
    <div ref={shellRef} className="relative min-h-0 flex-1 overflow-hidden bg-[#141312]">
      <Image
        src={p.screenshot}
        alt=""
        fill
        sizes="880px"
        className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
        style={{
          objectPosition: "mediaPos" in p ? p.mediaPos : "50% 0%",
        }}
      />
      {!loaded ? (
        <span className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur-md">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: ACCENTS[p.id] }}
            aria-hidden="true"
          />
          Loading live site
        </span>
      ) : null}
      {size.w ? (
        <iframe
          ref={frameRef}
          src={p.href}
          title={`${p.name} — live site preview`}
          onLoad={() => {
            setLoaded(true);
            try {
              frameRef.current?.contentDocument?.addEventListener(
                "keydown",
                (e) => {
                  if (e.key === "Escape") onClose();
                },
              );
            } catch {}
          }}
          className="absolute left-1/2 top-0 border-0 transition-opacity duration-500"
          style={{
            width: contentW,
            height: frameH,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
            opacity: loaded ? 1 : 0,
          }}
        />
      ) : null}
      <span className="pointer-events-none absolute bottom-3 left-4 z-10 font-mono text-[0.625rem] tracking-wide text-white/50">
        gyeongbinbak.com{p.href} · {contentW}px
      </span>
    </div>
  );
}

function ProjectAside({
  p,
  onClose,
  returnFocus,
}: {
  p: Project;
  onClose: () => void;
  returnFocus: React.RefObject<HTMLElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [device, setDevice] = useState<Device>(() =>
    typeof window !== "undefined" && window.innerWidth < 768
      ? "mobile"
      : "desktop",
  );

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), iframe",
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      returnFocus.current?.focus?.();
    };
  }, [onClose, returnFocus]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-[rgba(27,25,23,0.45)] backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.2 }}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${p.name} — live preview`}
        className="fixed inset-y-0 right-0 z-[100] flex w-[min(880px,96vw)] flex-col overflow-hidden border-l border-[var(--wk-line)] bg-[var(--wk-bg)] shadow-[-24px_0_60px_-24px_rgba(27,25,23,0.35)]"
        initial={{ x: reduce ? 0 : "100%" }}
        animate={{ x: 0 }}
        exit={{ x: reduce ? 0 : "100%" }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 34 }}
      >
        <span
          className="absolute inset-x-0 top-0 z-20 h-[2px]"
          style={{ background: ACCENTS[p.id] }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between gap-3"
          initial={reduce ? false : { y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-md">
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: ACCENTS[p.id] }}
                aria-hidden="true"
              />
              Live preview
            </span>
            <DeviceToggle device={device} onChange={setDevice} />
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-[var(--wk-accent)]"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </motion.div>

        <LiveStage p={p} device={device} onClose={onClose} />

        <motion.div
          className="border-t border-[var(--wk-line)] px-6 py-5"
          initial={reduce ? false : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[1.5rem] font-bold leading-none tracking-tight">
              {p.name}
            </h3>
            <p className="text-[0.8125rem] font-medium text-[var(--wk-muted)]">
              {p.kind} · {p.year}
            </p>
          </div>
          <a
            href={p.href}
            target="_blank"
            rel="noopener"
            className="wk-btn wk-btn-primary mt-4 w-full"
          >
            Open live site <ArrowIcon className="h-4 w-4" />
          </a>
          <p className="mt-2.5 text-center text-[0.75rem] text-[var(--wk-muted)]">
            Opens in a new tab
            {p.id === "plugview" ? " — live product build" : " — fictional concept brand"}
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}

function FeaturedCard({
  p,
  large = false,
  onOpen,
}: {
  p: Project;
  large?: boolean;
  onOpen: (trigger: HTMLElement) => void;
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
        target="_blank"
        rel="noopener"
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
            return;
          e.preventDefault();
          onOpen(e.currentTarget);
        }}
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
            Preview <ArrowIcon className="h-4 w-4" />
          </span>
        </span>
      </a>
      {p.video ? <PauseButton videoRef={videoRef} label={p.name} /> : null}
    </div>
  );
}

export function WorkIndex() {
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const featured = FEATURED_IDS.map(
    (id) => WORK_PROJECTS.find((p) => p.id === id)!
  );
  const compact = COMPACT_IDS.map(
    (id) => WORK_PROJECTS.find((p) => p.id === id)!
  );
  const open = WORK_PROJECTS.find((p) => p.id === openId) ?? null;

  const handleOpen = (id: string) => (trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setOpenId(id);
  };

  return (
    <div className="wk-container pb-16 min-[900px]:pb-24">
      <div className="grid gap-5 min-[900px]:gap-7">
        <FeaturedCard p={featured[0]} large onOpen={handleOpen(featured[0].id)} />
        <div className="grid gap-5 min-[700px]:grid-cols-2 min-[900px]:gap-7">
          <FeaturedCard p={featured[1]} onOpen={handleOpen(featured[1].id)} />
          <FeaturedCard p={featured[2]} onOpen={handleOpen(featured[2].id)} />
        </div>
      </div>

      <ul className="mt-12 border-t border-[var(--wk-line)] min-[900px]:mt-16">
        {compact.map((p) => (
          <li key={p.id} className="group border-b border-[var(--wk-line)]">
            <a
              href={p.href}
              target="_blank"
              rel="noopener"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
                  return;
                e.preventDefault();
                triggerRef.current = e.currentTarget;
                setOpenId(p.id);
              }}
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

      <AnimatePresence>
        {open ? (
          <ProjectAside
            key={open.id}
            p={open}
            onClose={() => setOpenId(null)}
            returnFocus={triggerRef}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

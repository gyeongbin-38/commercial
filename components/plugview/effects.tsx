"use client";

import { useRef, useSyncExternalStore, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/* Magnetic pull toward the cursor. Springs back on leave. */
export function PvMagnetic({
  children,
  strength = 0.22,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14 });
  const sy = useSpring(y, { stiffness: 160, damping: 14 });

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x: sx, y: sy }}
      onMouseMove={(event) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((event.clientX - (r.left + r.width / 2)) * strength);
        y.set((event.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/*
 * Hero preview stage: holds the asset sheet at a staged perspective tilt.
 * Base pose is rotateX 6 / rotateY -14; the pointer adds ±4deg of drift and
 * the whole panel bobs slowly. Reduced motion keeps the static tilt.
 */
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(min-width: 1024px)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false
  );
}

export function HeroPreviewStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(py, [0, 1], [9, 3]),
    { stiffness: 140, damping: 22, mass: 0.7 }
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-19, -9]),
    { stiffness: 140, damping: 22, mass: 0.7 }
  );

  function movePointer(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set(Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)));
    py.set(Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)));
  }

  if (!desktop) return <>{children}</>;

  return (
    <div
      ref={ref}
      onPointerMove={movePointer}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      style={{ perspective: 1600 }}
    >
      <motion.div
        style={
          reduce
            ? { rotateX: 6, rotateY: -14, transformStyle: "preserve-3d" }
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        animate={reduce ? undefined : { y: [0, -11, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

/*
 * Liquid logo mark. Two SMIL-driven displacement filters melt the mark:
 * a calm idle melt, and a hotter melt swapped in on hover. Filters are
 * static (no SMIL) under prefers-reduced-motion.
 */
export function LiquidMark({ size = 30 }: { size?: number }) {
  const reduce = useReducedMotion();
  const fontSize = Math.round(size * 0.52);

  return (
    <span
      className="pv-liquid"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width="0" height="0" className="absolute" focusable="false">
        <defs>
          <filter
            id="pv-liquid-calm"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.028"
              numOctaves="2"
              seed="8"
              result="noise"
            >
              {!reduce && (
                <animate
                  attributeName="baseFrequency"
                  values="0.012 0.028;0.016 0.036;0.012 0.028"
                  dur="11s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              {!reduce && (
                <animate
                  attributeName="scale"
                  values="3;9;5;11;3"
                  dur="9s"
                  repeatCount="indefinite"
                />
              )}
            </feDisplacementMap>
          </filter>
          <filter
            id="pv-liquid-hot"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.045"
              numOctaves="2"
              seed="3"
              result="noise"
            >
              {!reduce && (
                <animate
                  attributeName="baseFrequency"
                  values="0.02 0.045;0.03 0.06;0.02 0.045"
                  dur="5s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              {!reduce && (
                <animate
                  attributeName="scale"
                  values="12;20;14;22;12"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              )}
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>
      <span className="pv-liquid-face" style={{ fontSize }}>
        P
      </span>
    </span>
  );
}

const TICKER_ITEMS = [
  "Hero Section",
  "Pricing Cards",
  "Login Form",
  "Stats Strip",
  "Command Menu",
  "Data Table",
  "Kanban Board",
  "Chart Kit",
  "Navbar",
  "Modal",
  "Feature Grid",
  "Footer",
];

/* Live-inventory marquee of asset names. Pauses on hover; CSS handles loop. */
export function AssetTicker() {
  const row = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="pv-ticker border-b border-white/10" aria-hidden="true">
      <div className="pv-ticker-track">
        {row.map((item, i) => (
          <span key={i} className="pv-ticker-item">
            <span className="pv-ticker-dot" />
            <span className="pv-ticker-name">{item}</span>
            <span className="pv-mono pv-ticker-tag">
              PV-{String((i % TICKER_ITEMS.length) + 1).padStart(2, "0")}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

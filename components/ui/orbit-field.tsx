"use client";

import { useId } from "react";
import { useReducedMotion } from "motion/react";

/**
 * OrbitField — the page's one signature visual. The Orbit mark's own
 * geometry scaled into a quiet field behind the hero product window:
 * hairline elliptical rings tilted -24° (the mark's angle), with small
 * satellite dots drifting along them. The blue dot leads — the next
 * right thing is always on top.
 *
 * Pure SVG/SMIL, no dependencies. Static under prefers-reduced-motion.
 * Decorative only (aria-hidden).
 */

const CX = 720;
const CY = 450;

type Dot = { r: number; fill: string; dur: number; begin: string; phi: number };
type Ring = {
  rx: number;
  ry: number;
  strokeWidth: number;
  faint?: boolean;
  dots: Dot[];
};

const RINGS: Ring[] = [
  {
    rx: 470,
    ry: 198,
    strokeWidth: 1.25,
    dots: [
      { r: 3.5, fill: "var(--color-chip)", dur: 56, begin: "-40s", phi: 80 },
    ],
  },
  {
    rx: 620,
    ry: 262,
    strokeWidth: 1.5,
    dots: [
      { r: 6, fill: "var(--color-action)", dur: 44, begin: "0s", phi: -35 },
      { r: 3.5, fill: "var(--color-chip)", dur: 44, begin: "-26s", phi: 150 },
    ],
  },
  {
    rx: 745,
    ry: 318,
    strokeWidth: 1,
    faint: true,
    dots: [
      { r: 4, fill: "var(--color-chip)", dur: 68, begin: "-14s", phi: 250 },
    ],
  },
];

function ringPath(rx: number, ry: number) {
  return `M ${CX - rx} ${CY} A ${rx} ${ry} 0 1 0 ${CX + rx} ${CY} A ${rx} ${ry} 0 1 0 ${CX - rx} ${CY} Z`;
}

export function OrbitField({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <svg
      viewBox="0 0 1440 900"
      aria-hidden="true"
      className={`overflow-visible ${className}`}
    >
      <g transform={`rotate(-24 ${CX} ${CY})`}>
        {RINGS.map((ring, ri) => {
          const id = `${uid}-ring-${ri}`;
          return (
            <g key={ri}>
              <path
                id={id}
                d={ringPath(ring.rx, ring.ry)}
                fill="none"
                stroke="var(--color-hairline)"
                strokeWidth={ring.strokeWidth}
                opacity={ring.faint ? 0.55 : 1}
              />
              {ring.dots.map((dot, di) =>
                reduce ? (
                  <circle
                    key={di}
                    r={dot.r}
                    fill={dot.fill}
                    cx={CX + ring.rx * Math.cos((dot.phi * Math.PI) / 180)}
                    cy={CY + ring.ry * Math.sin((dot.phi * Math.PI) / 180)}
                  />
                ) : (
                  <circle key={di} r={dot.r} fill={dot.fill}>
                    <animateMotion
                      dur={`${dot.dur}s`}
                      begin={dot.begin}
                      repeatCount="indefinite"
                    >
                      <mpath href={`#${id}`} />
                    </animateMotion>
                  </circle>
                ),
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { WORK_PROJECTS } from "@/lib/work-data";

/* Pointer-parallax stack of site screenshots. Each layer moves at a
   different depth; springs ease it back when the pointer leaves.
   No idle animation — it only responds to the pointer. */

const LAYERS = [
  { i: 0, x: "6%",  y: "4%",  r: -5, depth: 26, w: "62%" },
  { i: 1, x: "34%", y: "16%", r: 4,  depth: 44, w: "58%" },
  { i: 2, x: "8%",  y: "46%", r: -2, depth: 60, w: "60%" },
  { i: 4, x: "42%", y: "52%", r: 6,  depth: 80, w: "55%" },
];

export function HeroCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const reduce = useReducedMotion();

  // Cards drift apart as the hero scrolls out — a quiet send-off that
  // reads as depth, not decoration.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={ref}
      className="relative h-[260px] w-full select-none min-[900px]:h-[460px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {LAYERS.map((l) => (
        <CollageLayer
          key={l.i}
          layer={l}
          sx={sx}
          sy={sy}
          scroll={reduce ? null : scrollYProgress}
        />
      ))}
    </div>
  );
}

function CollageLayer({
  layer,
  sx,
  sy,
  scroll,
}: {
  layer: (typeof LAYERS)[number];
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  scroll: MotionValue<number> | null;
}) {
  const p = WORK_PROJECTS[layer.i];
  const zero = useMotionValue(0);
  const src = scroll ?? zero;
  const x = useTransform(sx, (v) => v * layer.depth);
  const drift = useTransform(src, [0, 1], [0, -layer.depth * 2.4]);
  const y = useTransform([sy, drift], (v) => {
    const [a, b] = v as [number, number];
    return a * layer.depth * 0.7 + b;
  });
  const rot = useTransform(src, [0, 1], [layer.r, layer.r * 1.7]);

  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noopener"
      aria-label={`${p.name} live site`}
      className="wk-collage-card"
      style={{
        left: layer.x,
        top: layer.y,
        width: layer.w,
        rotate: scroll ? rot : layer.r,
        x,
        y,
      }}
    >
      <Image
        src={p.screenshot}
        alt={`${p.name} site preview`}
        className="wk-collage-img"
        fill
        sizes="(max-width: 900px) 65vw, 380px"
        priority={layer.i === 4}
        draggable={false}
      />
    </motion.a>
  );
}

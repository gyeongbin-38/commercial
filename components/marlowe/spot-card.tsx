"use client";

import { useRef } from "react";

/* Cursor spotlight: feeds --mx/--my CSS vars that the .mar-spot
   ::after gradient reads. Presentational only, safe to skip on touch. */
export function MarSpotCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`mar-spot h-full rounded-[var(--mar-r-lg)] ${className}`}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}

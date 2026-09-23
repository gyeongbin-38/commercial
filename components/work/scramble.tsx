"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#";

/* Text that scrambles through glyphs on pointer hover, settling
   left-to-right. Decorative hover only — no layout or meaning change. */
export function Scramble({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  const run = () => {
    if (reduce) return;
    cancelAnimationFrame(frame.current);
    let step = 0;
    const total = text.length * 3 + 8;
    const tick = () => {
      step += 1;
      const settled = Math.floor((step / total) * text.length * 1.4);
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < settled) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (step < total) frame.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    frame.current = requestAnimationFrame(tick);
  };

  return (
    <span className={className} onPointerEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";
import { NEXT_RACE } from "@/lib/marlowe-data";

const TARGET = new Date(NEXT_RACE.iso).getTime();

function split(ms: number) {
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

function Cell({ v, label }: { v: number | null; label: string }) {
  return (
    <span className="flex flex-col items-center">
      <span className="mar-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-[var(--mar-volt)] tabular-nums">
        {v === null ? "--" : String(v).padStart(2, "0")}
      </span>
      <span className="mt-1.5 text-[0.625rem] font-extrabold tracking-[0.2em] text-[var(--mar-text-dim)] uppercase">
        {label}
      </span>
    </span>
  );
}

export function MarCountdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, TARGET - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const t = left === null ? null : split(left);

  return (
    <div className="mt-10 flex flex-col gap-6 rounded-[var(--mar-r-xl)] border border-[var(--mar-line)] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="flex items-center gap-2.5 text-[0.75rem] font-extrabold tracking-[0.18em] text-[var(--mar-text)] uppercase">
          <span className="mar-live" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          Next race
        </p>
        <p className="mar-display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)]">
          {NEXT_RACE.round} {NEXT_RACE.gp}
        </p>
        <p className="mt-1 text-[0.75rem] font-bold tracking-[0.12em] text-[var(--mar-text-dim)] uppercase">
          {NEXT_RACE.circuit} / Lights out {NEXT_RACE.date}
        </p>
      </div>

      <div
        className="flex items-start gap-5 sm:gap-8"
        role="timer"
        aria-label={`Countdown to ${NEXT_RACE.gp}`}
      >
        <Cell v={t?.d ?? null} label="Days" />
        <Cell v={t?.h ?? null} label="Hrs" />
        <Cell v={t?.m ?? null} label="Min" />
        <Cell v={t?.s ?? null} label="Sec" />
      </div>
    </div>
  );
}

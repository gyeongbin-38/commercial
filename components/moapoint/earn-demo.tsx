"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { EARN_ROWS } from "@/lib/moapoint-data";

const START_BALANCE = 12_480;

type Earned = { id: number; place: string; points: number };

const fmt = (n: number) => `${n.toLocaleString("ko-KR")}P`;

/* Interactive earn demo: pick an example purchase and watch its points
   land in the demo balance. Fully local — illustrative rates only. */
export function MoaEarnDemo() {
  const reduce = useReducedMotion();
  const [balance, setBalance] = useState(START_BALANCE);
  const [earned, setEarned] = useState<Earned[]>([]);
  const [flash, setFlash] = useState<Earned | null>(null);
  const seq = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const earn = (place: string, points: number) => {
    if (timer.current) clearTimeout(timer.current);
    const entry = { id: ++seq.current, place, points };
    setFlash(entry);
    setEarned((list) => [entry, ...list].slice(0, 3));
    setBalance((b) => b + points);
    timer.current = setTimeout(() => setFlash(null), 1400);
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setBalance(START_BALANCE);
    setEarned([]);
    setFlash(null);
  };

  return (
    <div className="moa-card flex flex-col p-6 lg:col-span-1">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.8125rem] font-bold">오늘의 적립 체험</p>
        <span className="rounded-[var(--moa-r-pill)] bg-[var(--moa-bg)] px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.08em] text-[var(--moa-muted)]">
          Demo
        </span>
      </div>
      <p className="mt-1.5 text-[0.75rem] font-medium leading-relaxed text-[var(--moa-muted)]">
        하루 동선을 골라 결제해보세요. 예시 적립률입니다.
      </p>

      <div
        className="mt-4 flex flex-col gap-2"
        role="group"
        aria-label="결제 예시 선택"
      >
        {EARN_ROWS.map((r) => (
          <button
            key={r.place}
            type="button"
            onClick={() => earn(r.place, r.points)}
            className="flex items-center justify-between gap-3 rounded-[var(--moa-r-md)] border border-[var(--moa-line-soft)] bg-[#f7f8f9] px-4 py-3 text-left transition-colors hover:border-[var(--moa-navy)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--moa-navy)]"
          >
            <span>
              <span className="block text-[0.875rem] font-semibold">
                {r.place}
              </span>
              <span className="block text-[0.6875rem] font-medium text-[var(--moa-muted)]">
                {r.moment} · {r.spent}
              </span>
            </span>
            <span className="shrink-0 rounded-[var(--moa-r-sm)] bg-white px-2 py-1 text-[0.6875rem] font-bold text-[var(--moa-navy)] ring-1 ring-[var(--moa-line-soft)]">
              {r.rate}
            </span>
          </button>
        ))}
      </div>

      {/* balance readout */}
      <div className="moa-navy-panel relative mt-4 overflow-hidden px-4 py-3.5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-white/60">
              앱 잔액
            </p>
            <p
              className="mt-1 text-[1.5rem] font-bold leading-none tracking-tight"
              style={{ fontVariantNumeric: "tabular-nums" }}
              aria-live="polite"
              aria-label={`앱 잔액 ${fmt(balance)}`}
            >
              {fmt(balance)}
            </p>
          </div>
          <AnimatePresence>
            {flash && (
              <motion.span
                key={flash.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-[var(--moa-r-sm)] bg-white/12 px-2.5 py-1.5 text-[0.8125rem] font-bold text-white"
              >
                +{flash.points.toLocaleString("ko-KR")}P 적립
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <ul className="mt-3 flex flex-col gap-1 border-t border-white/12 pt-2.5">
          <AnimatePresence initial={false}>
            {earned.map((e) => (
              <motion.li
                key={e.id}
                initial={reduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between text-[0.6875rem] font-medium text-white/70"
              >
                <span>{e.place} · 결제 적립</span>
                <span className="font-bold text-white">
                  +{e.points.toLocaleString("ko-KR")}P
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
          {earned.length === 0 && (
            <li className="text-[0.6875rem] font-medium text-white/50">
              결제를 선택하면 적립 내역이 여기에 쌓입니다.
            </li>
          )}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[0.6875rem] font-medium leading-relaxed text-[var(--moa-muted)]">
          적립·사용 예시 화면입니다. 실제 결제나 적립이 일어나지 않습니다.
        </p>
        <button
          type="button"
          onClick={reset}
          className="flex shrink-0 items-center gap-1 text-[0.6875rem] font-bold text-[var(--moa-muted)] transition-colors hover:text-[var(--moa-ink)]"
        >
          <RotateCcw size={11} strokeWidth={2.2} aria-hidden="true" />
          초기화
        </button>
      </div>
    </div>
  );
}

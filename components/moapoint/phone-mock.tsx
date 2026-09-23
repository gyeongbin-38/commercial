"use client";

import { useState } from "react";
import { RECENT_ACTIVITY, TRANSACTIONS } from "@/lib/moapoint-data";

type Tab = "home" | "pay" | "history";

const TABS: { id: Tab; label: string }[] = [
  { id: "home", label: "홈" },
  { id: "pay", label: "결제" },
  { id: "history", label: "내역" },
];

function Barcode() {
  const widths = [3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 1];
  return (
    <div
      className="flex h-14 items-stretch justify-center gap-[2px]"
      aria-hidden="true"
    >
      {widths.map((w, i) => (
        <span
          key={i}
          className="bg-[#222832]"
          style={{ width: w * 2 }}
        />
      ))}
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="flex flex-1 flex-col gap-2.5 px-4 pt-3">
      <div className="moa-navy-panel flex items-center justify-between px-4 py-3.5">
        <div>
          <p className="text-[0.6875rem] font-medium text-white/70">
            김서연 님
          </p>
          <p className="mt-0.5 text-[1.375rem] font-bold leading-none tracking-tight">
            12,480<span className="ml-0.5 text-[0.875rem] font-semibold">P</span>
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.6875rem] font-semibold">
          소멸 예정 0P
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["적립 내역", "포인트 선물", "쿠폰함"].map((label) => (
          <div
            key={label}
            className="flex h-14 items-center justify-center rounded-[var(--moa-r-md)] border border-[var(--moa-line-soft)] bg-[#f7f8f9] text-[0.75rem] font-semibold"
          >
            {label}
          </div>
        ))}
      </div>

      <p className="mt-1 px-0.5 text-[0.75rem] font-bold">최근 활동</p>
      <ul className="flex flex-col divide-y divide-[var(--moa-line-soft)]">
        {RECENT_ACTIVITY.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between py-2"
          >
            <div>
              <p className="text-[0.8125rem] font-semibold">{a.place}</p>
              <p className="text-[0.6875rem] font-medium text-[var(--moa-muted)]">
                {a.detail}
              </p>
            </div>
            <span
              className="text-[0.8125rem] font-bold"
              style={{
                color: a.points.startsWith("-") ? "var(--moa-muted)" : "var(--moa-ink)",
              }}
            >
              {a.points}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PayScreen({ usePoints }: { usePoints: boolean }) {
  return (
    <div className="flex flex-1 flex-col gap-3 px-4 pt-3">
      <div className="rounded-[var(--moa-r-md)] border border-[var(--moa-line-soft)] bg-[#f7f8f9] px-4 py-3">
        <Barcode />
        <p className="mt-1.5 text-center text-[0.6875rem] font-semibold tracking-[0.14em] text-[var(--moa-muted)]">
          8804 · 2291 · 5503
        </p>
      </div>

      <div className="flex items-center justify-between rounded-[var(--moa-r-md)] border border-[var(--moa-line-soft)] px-4 py-3">
        <div>
          <p className="text-[0.8125rem] font-semibold">포인트로 결제</p>
          <p className="text-[0.6875rem] font-medium text-[var(--moa-muted)]">
            {usePoints
              ? "보유 12,480P · 결제 시 자동 차감"
              : "포인트 결제 꺼짐 · 이번 결제는 적립만 됩니다"}
          </p>
        </div>
        <span
          className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
          style={{ background: usePoints ? "#222832" : "#dfe3e7" }}
          aria-hidden="true"
        >
          <span
            className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
            style={{
              left: "2px",
              transform: usePoints ? "translateX(20px)" : "none",
            }}
          />
        </span>
      </div>

      <p className="px-0.5 text-center text-[0.6875rem] font-medium leading-relaxed text-[var(--moa-muted)]">
        직원에게 바코드를 보여주세요.
        <br />
        {usePoints
          ? "보유 포인트가 결제 금액에서 먼저 차감됩니다."
          : "결제 금액의 일정 비율이 포인트로 적립됩니다."}
      </p>
    </div>
  );
}

function HistoryScreen() {
  return (
    <div className="flex flex-1 flex-col px-4 pt-3">
      <p className="px-0.5 text-[0.75rem] font-bold">이번 달 내역</p>
      <ul className="mt-1 flex flex-col divide-y divide-[var(--moa-line-soft)]">
        {TRANSACTIONS.map((t) => (
          <li key={t.id} className="flex items-center justify-between py-2.5">
            <div>
              <p className="text-[0.8125rem] font-semibold">{t.place}</p>
              <p className="text-[0.6875rem] font-medium text-[var(--moa-muted)]">
                {t.kind} · {t.date}
              </p>
            </div>
            <span
              className="text-[0.8125rem] font-bold"
              style={{
                color: t.kind === "사용" ? "var(--moa-muted)" : "var(--moa-ink)",
              }}
            >
              {t.points}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PhoneMock() {
  const [tab, setTab] = useState<Tab>("home");
  const [usePoints, setUsePoints] = useState(true);

  return (
    <div
      className="mx-auto w-[17.5rem] max-w-full select-none"
      role="region"
      aria-label="모아포인트 앱 화면 미리보기"
    >
      <div className="rounded-[2rem] border border-[#c9ced4] bg-[#222832] p-[7px] shadow-[rgba(0,0,0,0.18)_0_24px_48px_-12px]">
        <div className="relative flex h-[26.5rem] flex-col overflow-hidden rounded-[1.65rem] bg-white">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 text-[0.625rem] font-semibold">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-[#222832]" />
            <span aria-hidden="true">5G ▮▮▮</span>
          </div>

          <div className="flex items-center justify-between px-4 pt-2">
            <span className="text-[0.875rem] font-bold">모아포인트</span>
            <span
              className="h-6 w-6 rounded-full bg-[#f0f3f5]"
              aria-hidden="true"
            />
          </div>

          {tab === "home" && <HomeScreen />}
          {tab === "pay" && <PayScreen usePoints={usePoints} />}
          {tab === "history" && <HistoryScreen />}

          {/* tab bar */}
          <div className="mt-auto grid grid-cols-3 border-t border-[var(--moa-line-soft)] bg-white pb-2 pt-1.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={tab === t.id}
                onClick={() => setTab(t.id)}
                className="flex flex-col items-center gap-0.5 py-1 text-[0.6875rem] font-semibold transition-colors"
                style={{
                  color: tab === t.id ? "#222832" : "#9aa0a8",
                }}
              >
                <span
                  className="h-1 w-1 rounded-full"
                  style={{
                    background: tab === t.id ? "#222832" : "transparent",
                  }}
                  aria-hidden="true"
                />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* point-payment toggle also flips the mock to the pay tab */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="moa-chip"
          aria-pressed={usePoints}
          onClick={() => {
            setUsePoints((v) => !v);
            setTab("pay");
          }}
        >
          포인트로 결제 {usePoints ? "켜짐" : "꺼짐"}
        </button>
      </div>
    </div>
  );
}

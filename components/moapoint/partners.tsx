"use client";

import { useState } from "react";
import { PARTNER_GROUPS } from "@/lib/moapoint-data";

const ICONS: Record<string, string> = {
  bag: "M6.5 8V6a3.5 3.5 0 017 0v2M4 8h12l-1 11H5L4 8z",
  store:
    "M4 9l1-4h10l1 4M4 9v9h12V9M4 9h12M9 18v-5h2v5",
  food: "M6 3v6m0 0V3m0 6c0 1.5 1 2 2 2s2-.5 2-2V3M6 9v11m8-17v17m0-17c-1.5 0-3 1.5-3 4s1.5 4 3 4",
  plane:
    "M10 4l5-1.5L13 8l4 2.5-1 1L12 10l-2 5-2 .5 1-5.5L5 8l1-2 4 1z",
  bank: "M3 8l7-5 7 5M5 10v6m3-6v6m3-6v6m3-6v6M4 18h12",
};

function GroupIcon({ name }: { name: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#222832"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

const BRAND_COUNT = PARTNER_GROUPS.reduce((n, g) => n + g.brands.length, 0);

/* Category accordion — the partner list is collapsed into browsable
   categories instead of one long wall of brand chips. */
export function MoaPartners() {
  const [openId, setOpenId] = useState<string | null>(
    PARTNER_GROUPS[0]?.label ?? null,
  );

  return (
    <section id="partners" className="bg-white">
      <div className="moa-container py-16 min-[900px]:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="moa-eyebrow">제휴사</p>
            <h2 className="moa-h2 mt-2">
              장보기부터 여행까지,
              <br />
              생활 전반이 적립 구역
            </h2>
          </div>
          <p className="moa-lead max-w-[24rem]">
            {PARTNER_GROUPS.length}개 카테고리, {BRAND_COUNT}개 브랜드.
            카테고리를 눌러 살펴보세요.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNER_GROUPS.map((g) => {
            const open = openId === g.label;
            return (
              <div key={g.label} className="moa-card-flat overflow-hidden">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : g.label)}
                  className="flex w-full items-center gap-2.5 p-5 text-left transition-colors hover:bg-[var(--moa-bg)]/60 focus-visible:outline-2 focus-visible:outline-[var(--moa-navy)]"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--moa-r-md)] bg-[var(--moa-bg)]"
                    aria-hidden="true"
                  >
                    <GroupIcon name={g.icon} />
                  </span>
                  <span className="flex-1 text-[0.9375rem] font-bold">
                    {g.label}
                  </span>
                  <span className="rounded-[var(--moa-r-pill)] bg-[var(--moa-bg)] px-2.5 py-1 text-[0.75rem] font-bold text-[var(--moa-muted)]">
                    {g.brands.length}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                    className={`shrink-0 text-[var(--moa-muted)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M3 5.5L7 9.5L11 5.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <ul className="flex flex-wrap gap-1.5 px-5 pb-5">
                      {g.brands.map((b) => (
                        <li
                          key={b}
                          className="rounded-[var(--moa-r-pill)] border border-[var(--moa-line-soft)] bg-[#f7f8f9] px-3 py-1.5 text-[0.8125rem] font-semibold"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}

          {/* closing card */}
          <div className="moa-navy-panel flex flex-col justify-center p-5">
            <p className="text-[1.0625rem] font-bold leading-snug">
              그 외 12만+ 제휴 매장*
            </p>
            <p className="mt-1.5 text-[0.8125rem] font-medium leading-relaxed text-white/70">
              앱에서 내 주변 적립 가능 매장을 지도로 확인할 수 있습니다.
            </p>
          </div>
        </div>

        <p className="mt-6 text-[0.75rem] font-medium text-[var(--moa-muted)]">
          * 위 제휴사와 매장 수는 가상의 데모용 브랜드·수치이며, 실제 제휴
          현황과 무관합니다.
        </p>
      </div>
    </section>
  );
}

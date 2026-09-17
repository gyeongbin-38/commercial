"use client";

import { useState } from "react";
import { MOA_FAQS } from "@/lib/moapoint-data";

export function MoaFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--moa-bg)]">
      <div className="moa-container py-16 min-[900px]:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="moa-eyebrow">FAQ</p>
            <h2 className="moa-h2 mt-2">자주 묻는 질문</h2>
            <p className="moa-lead mt-4 max-w-[24rem]">
              더 궁금한 점은 앱 내 고객센터 채팅으로 물어보세요. 평일
              09시부터 18시까지 답변드립니다.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {MOA_FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="moa-card overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`moa-faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="text-[0.9375rem] font-semibold">
                      {f.q}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "none",
                      }}
                    >
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="#222832"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div
                    id={`moa-faq-panel-${i}`}
                    hidden={!isOpen}
                    className="px-5 pb-5"
                  >
                    <p className="text-[0.875rem] font-medium leading-relaxed text-[var(--moa-muted)]">
                      {f.a}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

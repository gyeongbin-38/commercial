"use client";

import { useEffect, useState } from "react";
import { MoaWordmark } from "./wordmark";

const LINKS = [
  { href: "/moapoint#earn", label: "적립" },
  { href: "/moapoint#partners", label: "제휴사" },
  { href: "/moapoint#use", label: "사용" },
  { href: "/moapoint#faq", label: "자주 묻는 질문" },
];

export function MoaNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b transition-colors"
      style={{
        background: scrolled || open ? "#ffffff" : "rgba(255,255,255,0.86)",
        borderColor: "var(--moa-line-soft)",
        backdropFilter: "blur(10px)",
      }}
    >
      <nav
        className="moa-container flex h-14 items-center justify-between"
        aria-label="주 메뉴"
      >
        <a href="/moapoint#top" className="shrink-0">
          <MoaWordmark />
        </a>

        <ul className="hidden items-center gap-7 min-[760px]:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[0.875rem] font-semibold text-[var(--moa-muted)] transition-colors hover:text-[var(--moa-ink)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 min-[760px]:flex">
          <a
            href="/moapoint#earn"
            className="moa-btn moa-btn-primary h-9 px-4 text-[0.8125rem]"
          >
            앱 체험하기
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-[var(--moa-r-md)] min-[760px]:hidden"
          aria-expanded={open}
          aria-controls="moa-mobile-nav"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            {open ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="#222832"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3.5 6h13M3.5 10h13M3.5 14h13"
                stroke="#222832"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="moa-mobile-nav"
          className="border-t bg-white min-[760px]:hidden"
          style={{ borderColor: "var(--moa-line-soft)" }}
        >
          <ul className="moa-container flex flex-col py-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[0.9375rem] font-semibold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <a
                href="/moapoint#earn"
                onClick={() => setOpen(false)}
                className="moa-btn moa-btn-primary w-full"
              >
                앱 체험하기
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

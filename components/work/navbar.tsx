"use client";

import { useEffect, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { STUDIO } from "@/lib/work-data";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#packages", label: "Packages" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export function WorkNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Hide on scroll-down past the hero, reveal on any scroll-up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? y;
    if (y < 90 || y < prev - 4) setHidden(false);
    else if (y > prev + 4 && y > 160) {
      setHidden(true);
      setMenuOpen(false);
    }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        hidden && !reduce ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        background:
          scrolled || menuOpen ? "rgba(247,247,245,0.92)" : "transparent",
        borderColor:
          scrolled || menuOpen ? "var(--wk-line-soft)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(10px)" : "none",
      }}
    >
      <nav
        className="wk-container flex h-10 items-center justify-between"
        aria-label="Main"
      >
        <a
          href="#top"
          className="group flex items-center gap-2 text-[0.875rem] font-semibold tracking-tight"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--wk-accent)] text-[0.625rem] font-bold text-[var(--wk-on-accent)] transition-colors group-hover:bg-[#a8380d]">
            {STUDIO.shortName}
          </span>
          <span className="transition-colors group-hover:text-[var(--wk-accent-dim)]">
            {STUDIO.name}
          </span>
        </a>

        <ul className="hidden items-center gap-6 min-[700px]:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className="text-[0.8125rem] font-medium transition-colors"
                style={{
                  color:
                    active === l.href
                      ? "var(--wk-accent-dim)"
                      : "var(--wk-muted)",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={`mailto:${STUDIO.email}`}
            className="wk-btn wk-btn-primary"
            style={{
              height: "2rem",
              paddingInline: "0.875rem",
              fontSize: "0.75rem",
            }}
          >
            Email me
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-[var(--wk-ink)] min-[700px]:hidden"
            aria-expanded={menuOpen}
            aria-controls="wk-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 5.5h12M3 9h12M3 12.5h12"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="wk-mobile-menu"
          className="border-t border-[var(--wk-line-soft)] min-[700px]:hidden"
        >
          <ul className="wk-container flex flex-col pb-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center py-3.5 text-[0.9375rem] font-medium"
                  style={{
                    color:
                      active === l.href
                        ? "var(--wk-accent-dim)"
                        : "var(--wk-ink)",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}

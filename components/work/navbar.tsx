"use client";

import { useEffect, useState } from "react";
import { STUDIO } from "@/lib/work-data";
import { WkMagnetic } from "./magnetic";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#packages", label: "Packages" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export function WorkNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className="sticky top-0 z-40 border-b transition-colors"
      style={{
        background: scrolled ? "rgba(247,247,245,0.92)" : "transparent",
        borderColor: scrolled ? "var(--wk-line-soft)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <nav
        className="wk-container flex h-16 items-center justify-between"
        aria-label="Main"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[0.9375rem] font-semibold tracking-tight"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-[0.6875rem] font-bold text-[var(--wk-on-accent)]"
            style={{ background: "var(--wk-accent)" }}
          >
            {STUDIO.shortName}
          </span>
          {STUDIO.name}
        </a>

        <ul className="hidden items-center gap-7 min-[700px]:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className="text-[0.875rem] font-medium transition-colors"
                style={{
                  color:
                    active === l.href
                      ? "var(--wk-accent)"
                      : "var(--wk-muted)",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <WkMagnetic strength={0.2}>
          <a
            href={`mailto:${STUDIO.email}`}
            className="wk-btn wk-btn-primary h-9 px-4 text-[0.8125rem]"
          >
            Start a project
          </a>
        </WkMagnetic>
      </nav>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FsWordmark } from "./wordmark";

const LINKS = [
  { href: "/fieldstone#programs", label: "Programs" },
  { href: "/fieldstone#path", label: "The Path" },
  { href: "/fieldstone#stories", label: "Stories" },
  { href: "/fieldstone#faq", label: "FAQ" },
];

export function FsNavbar() {
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
        background:
          scrolled || open ? "#ffffff" : "rgba(255,255,255,0.86)",
        borderColor: "var(--fs-line-soft)",
        backdropFilter: "blur(10px)",
      }}
    >
      <nav
        className="fs-container flex h-16 items-center justify-between"
        aria-label="Main menu"
      >
        <a href="/fieldstone#top" className="shrink-0">
          <FsWordmark />
        </a>

        <ul className="hidden items-center gap-8 min-[768px]:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[0.875rem] font-semibold text-[var(--fs-muted)] transition-colors hover:text-[var(--fs-ink)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 min-[768px]:flex">
          <a
            href="/fieldstone#apply"
            className="fs-btn fs-btn-accent min-h-0 h-10 px-5 text-[0.8125rem]"
          >
            Apply
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-[var(--fs-r-md)] min-[768px]:hidden"
          aria-expanded={open}
          aria-controls="fs-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X size={20} strokeWidth={1.8} color="#222121" />
          ) : (
            <Menu size={20} strokeWidth={1.8} color="#222121" />
          )}
        </button>
      </nav>

      {open && (
        <div
          id="fs-mobile-nav"
          className="border-t bg-white min-[768px]:hidden"
          style={{ borderColor: "var(--fs-line-soft)" }}
        >
          <ul className="fs-container flex flex-col py-2">
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
                href="/fieldstone#apply"
                onClick={() => setOpen(false)}
                className="fs-btn fs-btn-accent w-full"
              >
                Apply
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

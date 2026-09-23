"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MarWordmark } from "./wordmark";

const LINKS = [
  { href: "/marlowe#season", label: "Season" },
  { href: "/marlowe#drop", label: "Drop" },
  { href: "/marlowe#media", label: "Media" },
  { href: "/marlowe#team", label: "Team" },
];

export function MarNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        background: "rgba(59, 60, 56, 0.88)",
        borderColor: "var(--mar-line-soft)",
      }}
    >
      <nav
        className="mar-container flex h-16 items-center justify-between"
        aria-label="Main menu"
      >
        <a href="/marlowe#top" className="shrink-0" aria-label="Marlowe home">
          <MarWordmark />
        </a>

        <ul className="hidden items-center gap-8 min-[992px]:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[0.75rem] font-extrabold uppercase tracking-[0.14em] text-[var(--mar-text-dim)] transition-colors hover:text-[var(--mar-volt)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden min-[992px]:flex">
          <a href="/marlowe#drop" className="mar-btn mar-btn-volt min-h-10 px-5">
            Shop
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-[var(--mar-r-sm)] text-[var(--mar-text)] min-[992px]:hidden"
          aria-expanded={open}
          aria-controls="mar-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div
          id="mar-mobile-nav"
          className="border-t min-[992px]:hidden"
          style={{
            borderColor: "var(--mar-line-soft)",
            background: "var(--mar-bg)",
          }}
        >
          <ul className="mar-container flex flex-col py-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="mar-display block py-4 text-2xl"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a
                href="/marlowe#drop"
                onClick={() => setOpen(false)}
                className="mar-btn mar-btn-volt w-full"
              >
                Shop the drop
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

"use client";

import { useRef, useState } from "react";
import { STUDIO } from "@/lib/work-data";

/* One-click email copy with a check confirmation. */
export function CopyEmail({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <button
      type="button"
      className={`wk-btn border transition-colors ${
        variant === "dark"
          ? "border-[var(--wk-dark-line)] px-4 text-[var(--wk-bg)] hover:border-[var(--wk-bg)]"
          : "w-[2.875rem] border-[var(--wk-line)] px-0 text-[var(--wk-ink)] hover:border-[var(--wk-ink)]"
      }`}
      aria-label={copied ? "Email copied" : "Copy email address"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(STUDIO.email);
        } catch {
          return;
        }
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1600);
      }}
    >
      {copied ? (
        <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
          <path
            d="M3 8l3 3 6-7"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
          <rect
            x="5"
            y="5"
            width="8"
            height="8"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M10 5V3.5A1.5 1.5 0 008.5 2H3.5A1.5 1.5 0 002 3.5v5A1.5 1.5 0 003.5 10H5"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
      )}
      <span className="sr-only">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { STUDIO, WORK_PROJECTS } from "@/lib/work-data";

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: "Section" | "Project" | "Action";
  run: () => void;
};

const EMAIL = STUDIO.email;

export function CmdK() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo<Item[]>(
    () => [
      { id: "work", label: "Work", hint: "Selected projects", group: "Section", run: () => scrollToId("work") },
      { id: "packages", label: "Packages", hint: "Fixed-price offers", group: "Section", run: () => scrollToId("packages") },
      { id: "process", label: "Process", hint: "Brief to launch", group: "Section", run: () => scrollToId("process") },
      { id: "faq", label: "FAQ", hint: "Common questions", group: "Section", run: () => scrollToId("faq") },
      ...WORK_PROJECTS.map((p) => ({
        id: `p-${p.id}`,
        label: p.name,
        hint: `${p.kind} · live demo`,
        group: "Project" as const,
        run: () => window.open(p.href, "_blank", "noopener"),
      })),
      {
        id: "email",
        label: "Email me",
        hint: EMAIL,
        group: "Action",
        run: () => {
          window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
            "Landing page project",
          )}`;
        },
      },
      {
        id: "copy",
        label: "Copy email address",
        hint: EMAIL,
        group: "Action",
        run: () => void navigator.clipboard?.writeText(EMAIL).catch(() => {}),
      },
      {
        id: "github",
        label: "Source on GitHub",
        hint: "gyeongbin-38/commercial",
        group: "Action",
        run: () => window.open("https://github.com/gyeongbin-38/commercial", "_blank", "noopener"),
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.hint?.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q),
    );
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open && e.key === "/" && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[index]) {
        e.preventDefault();
        filtered[index].run();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, filtered, index, close]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-i="${index}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  let lastGroup = "";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-6 items-center gap-1 rounded border border-wk-line px-1.5 font-mono text-[0.625rem] text-wk-muted transition-colors hover:border-wk-ink hover:text-wk-ink sm:inline-flex"
        aria-label="Open command palette"
        title="Quick navigation"
      >
        ⌘K
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-[rgba(27,25,23,0.32)] px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
          >
            <motion.div
              className="w-full max-w-lg overflow-hidden rounded-lg border border-wk-line bg-wk-bg shadow-[0_16px_40px_-16px_rgba(27,25,23,0.35)]"
              initial={{ opacity: 0, y: -8, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.99 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-2 border-b border-wk-line px-3.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="text-wk-muted">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  placeholder="Jump to a section, open a project…"
                  className="w-full bg-transparent py-3 text-[0.9375rem] text-wk-ink outline-none placeholder:text-wk-muted/60"
                  aria-label="Search commands"
                />
                <kbd className="rounded border border-wk-line px-1 py-0.5 font-mono text-[0.5625rem] text-wk-muted">
                  ESC
                </kbd>
              </div>
              <div ref={listRef} className="max-h-[19rem] overflow-y-auto p-1.5">
                {filtered.length === 0 && (
                  <p className="px-2.5 py-6 text-center text-[0.8125rem] text-wk-muted">
                    No matches.
                  </p>
                )}
                {filtered.map((item, i) => {
                  const header =
                    item.group !== lastGroup ? ((lastGroup = item.group), item.group) : null;
                  return (
                    <div key={item.id}>
                      {header && (
                        <p className="px-2.5 pb-1 pt-2.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-wk-muted">
                          {header}
                        </p>
                      )}
                      <button
                        type="button"
                        data-i={i}
                        onMouseEnter={() => setIndex(i)}
                        onClick={() => {
                          item.run();
                          close();
                        }}
                        className={`flex w-full items-center justify-between rounded px-2.5 py-2 text-left text-[0.875rem] transition-colors ${
                          i === index ? "bg-wk-ink text-wk-bg" : "text-wk-ink"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span
                          className={`text-[0.6875rem] ${
                            i === index ? "text-wk-bg/60" : "text-wk-muted"
                          }`}
                        >
                          {item.hint}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-3 border-t border-wk-line px-3.5 py-2">
                <span className="font-mono text-[0.5625rem] text-wk-muted">↑↓ move</span>
                <span className="font-mono text-[0.5625rem] text-wk-muted">↵ open</span>
                <span className="ml-auto font-mono text-[0.5625rem] text-wk-muted">/ or ⌘K to open</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function isTypingTarget(t: EventTarget | null) {
  return (
    t instanceof HTMLElement &&
    (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";

/**
 * Sign-in dialog for the fictional product. There is no real account
 * system, so submitting surfaces an honest demo notice that routes the
 * visitor to the lead form. Implements dialog semantics: aria-modal,
 * Esc to close, backdrop click, initial focus, focus return.
 */
export function SignInDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Reset happens in the close handler (an event callback), not an effect.
  const close = () => {
    onClose();
    setSubmitted(false);
    setEmail("");
  };

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => emailRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        setSubmitted(false);
        setEmail("");
      }
      if (e.key === "Tab" && panelRef.current) {
        // Minimal focus trap: keep Tab inside the dialog.
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="signin-title"
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            className="card relative w-full max-w-sm p-8"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close sign in"
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-48 transition-colors hover:bg-parchment hover:text-ink"
            >
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>

            <h2 id="signin-title" className="text-tagline text-ink">
              Sign in to Orbit
            </h2>

            {submitted ? (
              <div className="mt-5">
                <p className="text-caption text-ink-80 leading-relaxed">
                  Orbit is a concept product built as a design demo, so there
                  are no real accounts yet. To see the workspace in action,
                  request access below.
                </p>
                <a
                  href="#get-started"
                  onClick={close}
                  className="btn btn-primary mt-6 w-full"
                >
                  Request access
                </a>
              </div>
            ) : (
              <form
                className="mt-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <label
                  htmlFor="signin-email"
                  className="text-caption-strong block text-ink"
                >
                  Work email
                </label>
                <input
                  ref={emailRef}
                  id="signin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="mt-2 h-11 w-full rounded-full border border-hairline bg-canvas px-5 text-[15px] text-ink placeholder:text-ink-48 focus-visible:outline-2 focus-visible:outline-action-focus"
                />
                <button type="submit" className="btn btn-primary mt-4 w-full">
                  Continue
                </button>
                <p className="text-fine mt-4 text-center text-ink-48">
                  Demo product. Submitting shows what sign-in would do.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

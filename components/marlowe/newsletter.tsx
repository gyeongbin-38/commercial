"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function MarNewsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  return (
    <section id="club" className="mar-container py-16 lg:py-24">
      <div className="rounded-[var(--mar-r-xl)] bg-[var(--mar-volt)] px-6 py-14 text-[var(--mar-on-volt)] md:px-16 md:py-20">
        <div className="max-w-[42rem]">
          <h2 className="mar-display text-[clamp(2.75rem,7vw,6rem)]">
            Get the inside line.
          </h2>
          <p className="mt-5 max-w-[28rem] text-[0.9375rem] font-bold leading-relaxed">
            Race previews, drop alerts and garage access. One email per race
            week, nothing more.
          </p>

          {state === "done" ? (
            <p className="mt-8 inline-flex items-center gap-2 rounded-[var(--mar-r-xl)] bg-[var(--mar-bg-deep)] px-6 py-4 text-[0.8125rem] font-extrabold uppercase tracking-[0.12em] text-[var(--mar-volt)]">
              <Check size={16} aria-hidden="true" />
              You&apos;re in. See you at R07.
            </p>
          ) : (
            <form
              className="mt-8 flex max-w-[30rem] flex-col gap-3 sm:flex-row"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
                setState(ok ? "done" : "error");
              }}
            >
              <label htmlFor="mar-email" className="sr-only">
                Email address
              </label>
              <input
                id="mar-email"
                type="email"
                autoComplete="email"
                placeholder="you@fastmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                aria-invalid={state === "error"}
                aria-describedby={
                  state === "error" ? "mar-email-error" : undefined
                }
                className="h-13 min-h-[3.25rem] flex-1 rounded-[var(--mar-r-xl)] border border-[var(--mar-bg-deep)]/25 bg-[var(--mar-bg-deep)] px-6 text-[0.875rem] font-bold text-[var(--mar-text)] placeholder:text-[var(--mar-text)]/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mar-bg-deep)]"
              />
              <button type="submit" className="mar-btn mar-btn-dark min-h-[3.25rem]">
                Sign up
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </form>
          )}

          {state === "error" && (
            <p
              id="mar-email-error"
              className="mt-3 text-[0.75rem] font-extrabold uppercase tracking-[0.1em]"
            >
              Enter a valid email address.
            </p>
          )}
          <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[var(--mar-on-volt)]/70">
            Demo signup — nothing is sent or stored.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

const PROGRAM_OPTIONS = [
  "Idea Studio",
  "Launch Accelerator",
  "Capital Pathways",
  "Founder Community",
  "Not sure yet",
] as const;

const field =
  "w-full rounded-[var(--fs-r-sm)] border border-white/25 bg-white/10 px-4 py-3 text-[0.875rem] font-medium text-white outline-none transition-colors placeholder:text-white/45 focus:border-white/70";

/* Local application demo — composes and validates a draft entirely in
   the browser. Nothing is sent; the success state says so plainly. */
export function FsApplyForm() {
  const [program, setProgram] = useState<string>("Idea Studio");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const ok =
      name.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(ok ? "done" : "error");
  };

  if (status === "done") {
    return (
      <div className="mx-auto mt-9 max-w-[30rem] rounded-[var(--fs-r-md)] border border-white/25 bg-white/10 px-6 py-7 text-left">
        <p className="flex items-center gap-2 text-[0.9375rem] font-bold text-white">
          <Check size={16} strokeWidth={2.2} aria-hidden="true" />
          Demo application drafted
        </p>
        <p className="mt-2.5 text-[0.8125rem] font-medium leading-relaxed text-white/65">
          {program} · {name.trim()} — nothing was sent or stored. In the
          real program this would open the full intake; here it stays in
          your browser.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white/70 underline underline-offset-4 transition-colors hover:text-white"
        >
          Draft another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="mx-auto mt-9 max-w-[30rem] text-left"
      aria-label="Demo application"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Program</span>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className={`${field} appearance-none`}
          >
            {PROGRAM_OPTIONS.map((p) => (
              <option key={p} value={p} className="text-black">
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            required
            className={field}
          />
        </label>
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Email address</span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@company.com"
          autoComplete="email"
          required
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "fs-apply-error" : undefined}
          className={field}
        />
      </label>
      {status === "error" && (
        <p
          id="fs-apply-error"
          role="alert"
          className="mt-2 text-[0.75rem] font-semibold text-white/85"
        >
          Add your name and a valid email to draft the demo application.
        </p>
      )}
      <button
        type="submit"
        className="fs-btn fs-btn-light mt-5 w-full justify-center"
      >
        Draft a demo application
      </button>
      <p className="mt-3 text-center text-[0.6875rem] font-medium text-white/50">
        Demo only — nothing is sent or stored.
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { STUDIO, WORK_PACKAGES } from "@/lib/work-data";

/* Mini brief — three fields that compose a real email draft via mailto.
   No fake submission, no backend: it opens the visitor's mail client
   with everything already written. */

export function BriefForm() {
  const [product, setProduct] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("Not sure yet");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Brief — ${product || "landing page project"}`;
    const body = [
      `Product / company: ${product || "—"}`,
      `What the page needs to do: ${goal || "—"}`,
      `Budget: ${budget}`,
      "",
      "Timeline, references, anything else:",
    ].join("\n");
    window.location.href = `mailto:${STUDIO.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full rounded-[var(--wk-r-sm)] border border-[var(--wk-dark-line)] bg-transparent px-3 py-2.5 text-[0.875rem] text-[var(--wk-bg)] outline-none transition-colors placeholder:text-[var(--wk-dark-muted)]/70 focus:border-[var(--wk-accent)]";

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-[42rem] rounded-[var(--wk-r-md)] border border-[var(--wk-dark-line)] p-4 sm:p-5"
      aria-label="Quick project brief"
    >
      <p className="mb-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--wk-dark-muted)]">
        Or draft it here — opens your mail app
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Product or company</span>
          <input
            className={field}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Product or company"
            required
          />
        </label>
        <label className="block">
          <span className="sr-only">Budget</span>
          <select
            className={`${field} appearance-none`}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option className="text-black">Not sure yet</option>
            {WORK_PACKAGES.map((p) => (
              <option key={p.id} className="text-black">
                {p.name} — {p.price}
              </option>
            ))}
            <option className="text-black">Something else</option>
          </select>
        </label>
      </div>
      <label className="mt-2.5 block">
        <span className="sr-only">What the page needs to do</span>
        <input
          className={field}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What the page needs to do (e.g. get demo signups)"
          required
        />
      </label>
      <button
        type="submit"
        className="mt-3 inline-flex items-center gap-1.5 rounded-[var(--wk-r-sm)] bg-[var(--wk-accent)] px-4 py-2.5 text-[0.875rem] font-semibold text-[var(--wk-bg)] transition-colors hover:bg-[var(--wk-accent-dim)]"
      >
        Draft the email
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

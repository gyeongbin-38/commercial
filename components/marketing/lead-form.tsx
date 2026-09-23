"use client";

import { useActionState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { requestAccess } from "@/app/actions";
import type { LeadFormState } from "@/app/actions";
import { TEAM_SIZES, TEAM_SIZE_LABELS } from "@/lib/validation/contact";

const initialLeadState: LeadFormState = { status: "idle", errors: {} };

const inputClass =
  "mt-2 h-11 w-full rounded-full border border-hairline bg-canvas px-5 text-[15px] text-ink placeholder:text-ink-48 focus-visible:outline-2 focus-visible:outline-action-focus";

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="text-caption mt-1.5 text-state-warn">
      {error}
    </p>
  );
}

export function LeadForm() {
  const [state, formAction, pending] = useActionState(
    requestAccess,
    initialLeadState,
  );
  const reduce = useReducedMotion();

  return (
    <section id="get-started" className="tile scroll-mt-14 bg-canvas">
      <div className="mx-auto grid max-w-[1080px] items-start gap-12 px-5 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="text-display-lg text-ink">
            Request early access.
          </h2>
          <p className="text-body mt-4 text-ink-80">
            Tell us where to reach you. We&apos;ll share the concept build,
            load your first clients and check in once. No drip campaign,
            no sales call unless you ask for one.
          </p>
          <ul className="text-body mt-6 flex flex-col gap-2.5 text-ink-80">
            <li className="flex gap-2.5">
              <CheckCircle2 size={19} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              Every feature in the concept build
            </li>
            <li className="flex gap-2.5">
              <CheckCircle2 size={19} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              No card required
            </li>
            <li className="flex gap-2.5">
              <CheckCircle2 size={19} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              Your data exports as CSV, anytime
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card p-7 sm:p-8">
            {state.status === "success" ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pearl ring-1 ring-hairline">
                  <CheckCircle2 size={22} strokeWidth={1.75} className="text-state-ok" aria-hidden="true" />
                </span>
                <p className="text-tagline mt-5 text-ink">
                  You&apos;re on the list.
                </p>
                <p className="text-body mt-3 text-ink-80">
                  {state.email
                    ? `We'll reach out to ${state.email} with your workspace link.`
                    : "We'll reach out with your workspace link."}
                </p>
                <p className="text-fine mt-5 text-ink-48">
                  Orbit is a concept product; this demo doesn&apos;t store
                  submissions.
                </p>
              </motion.div>
            ) : (
              <form action={formAction} noValidate={false}>
                <div className="grid gap-5">
                  <div>
                    <label htmlFor="lead-name" className="text-caption-strong text-ink">
                      Your name
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                      aria-invalid={!!state.errors.name}
                      aria-describedby={state.errors.name ? "lead-name-err" : undefined}
                      className={inputClass}
                    />
                    <FieldError id="lead-name-err" error={state.errors.name} />
                  </div>

                  <div>
                    <label htmlFor="lead-email" className="text-caption-strong text-ink">
                      Work email
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@studio.com"
                      aria-invalid={!!state.errors.email}
                      aria-describedby={state.errors.email ? "lead-email-err" : undefined}
                      className={inputClass}
                    />
                    <FieldError id="lead-email-err" error={state.errors.email} />
                  </div>

                  <div>
                    <label htmlFor="lead-company" className="text-caption-strong text-ink">
                      Business or studio
                    </label>
                    <input
                      id="lead-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Lovelace Studio"
                      aria-invalid={!!state.errors.company}
                      aria-describedby={state.errors.company ? "lead-company-err" : undefined}
                      className={inputClass}
                    />
                    <FieldError id="lead-company-err" error={state.errors.company} />
                  </div>

                  <fieldset>
                    <legend className="text-caption-strong text-ink">
                      Team size
                    </legend>
                    <div
                      className="mt-2 flex flex-wrap gap-2"
                      role="radiogroup"
                      aria-describedby={state.errors.teamSize ? "lead-team-err" : undefined}
                    >
                      {TEAM_SIZES.map((size) => (
                        <label key={size} className="cursor-pointer">
                          <input
                            type="radio"
                            name="teamSize"
                            value={size}
                            className="peer sr-only"
                          />
                          <span className="inline-flex h-10 items-center rounded-full border border-hairline bg-pearl px-4 text-utility text-ink-80 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-on-dark peer-focus-visible:outline-2 peer-focus-visible:outline-action-focus">
                            {TEAM_SIZE_LABELS[size]}
                          </span>
                        </label>
                      ))}
                    </div>
                    <FieldError id="lead-team-err" error={state.errors.teamSize} />
                  </fieldset>

                  <div>
                    <label htmlFor="lead-message" className="text-caption-strong text-ink">
                      Anything we should know?{" "}
                      <span className="font-normal text-ink-48">(optional)</span>
                    </label>
                    <textarea
                      id="lead-message"
                      name="message"
                      rows={3}
                      placeholder="We juggle about 20 active clients…"
                      aria-invalid={!!state.errors.message}
                      aria-describedby={state.errors.message ? "lead-message-err" : undefined}
                      className="mt-2 w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder:text-ink-48 focus-visible:outline-2 focus-visible:outline-action-focus"
                    />
                    <FieldError id="lead-message-err" error={state.errors.message} />
                  </div>

                  {/* Honeypot: invisible to humans */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="lead-website">Website</label>
                    <input
                      id="lead-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {state.message && (
                    <p role="alert" className="text-caption text-state-warn">
                      {state.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={pending}
                    className="btn btn-primary w-full disabled:opacity-60"
                  >
                    {pending ? "Sending…" : "Request access"}
                  </button>
                  <p className="text-fine text-center text-ink-48">
                    By continuing you agree to the{" "}
                    <Link href="/orbit/terms" className="link">Terms</Link> and{" "}
                    <Link href="/orbit/privacy" className="link">Privacy notice</Link>.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

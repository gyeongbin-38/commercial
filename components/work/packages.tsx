import { STUDIO, WORK_PACKAGES } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";
import { Pop } from "./pop";

export function WorkPackages() {
  return (
    <section
      id="packages"
      className="wk-dark-section scroll-mt-20 border-y border-[var(--wk-line)]"
    >
      <div className="wk-container py-16 min-[900px]:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="wk-h2 max-w-[20ch]">
              Fixed price, fixed scope, fixed date
            </h2>
            <p className="max-w-[26rem] text-[0.9375rem] leading-relaxed text-[var(--wk-dark-muted)]">
              No hourly billing, no scope creep. You approve the spec and the
              price before work starts; the quote doesn&apos;t move.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[var(--wk-r-md)] border border-[var(--wk-dark-line)] bg-[var(--wk-dark-card)] px-5 py-4">
            <span className="rounded-[var(--wk-r-sm)] bg-[var(--wk-accent-dim)] px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[var(--wk-on-accent)]">
              Launch pricing
            </span>
            <span
              className="flex items-center gap-1.5"
              title="5 founding slots open"
              aria-label="5 founding slots open"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[var(--wk-accent)]"
                  aria-hidden="true"
                />
              ))}
            </span>
            <p className="text-[0.875rem] font-medium text-[var(--wk-dark-muted)]">
              First 5 client slots. I&apos;m building my client list, so early
              partners get the founding rate. Regular pricing goes into
              effect after the slots fill.
            </p>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {WORK_PACKAGES.map((pkg, i) => (
            <li key={pkg.id} className="h-full">
              <Pop delay={0.06 * i} className="h-full">
                <div
                  className="relative flex h-full flex-col rounded-[var(--wk-r-lg)] p-7"
                  style={{
                    background: pkg.featured
                      ? "var(--wk-bg)"
                      : "var(--wk-dark-card)",
                    color: pkg.featured ? "var(--wk-ink)" : "var(--wk-bg)",
                    border: pkg.featured
                      ? "none"
                      : "1px solid var(--wk-dark-line)",
                  }}
                >
                  {pkg.featured && (
                    <p className="absolute -top-3 left-7 rounded-[var(--wk-r-sm)] bg-[var(--wk-accent-dim)] px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[var(--wk-on-accent)]">
                      Recommended
                    </p>
                  )}

                  <div className="flex items-baseline justify-between">
                    <h3 className="wk-h3">{pkg.name}</h3>
                    <span
                      className="text-[0.75rem] font-semibold uppercase tracking-[0.1em]"
                      style={{
                        color: pkg.featured
                          ? "var(--wk-muted)"
                          : "var(--wk-dark-muted)",
                      }}
                    >
                      {pkg.timeline}
                    </span>
                  </div>

                  <p
                    className="mt-3 text-[0.875rem] leading-relaxed"
                    style={{
                      color: pkg.featured
                        ? "var(--wk-muted)"
                        : "var(--wk-dark-muted)",
                    }}
                  >
                    {pkg.summary}
                  </p>

                  <p className="wk-price mt-6">{pkg.price}</p>
                  <p
                    className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em]"
                    style={{
                      color: pkg.featured
                        ? "var(--wk-accent-dim)"
                        : "var(--wk-dark-muted)",
                    }}
                  >
                    founding rate
                  </p>

                  <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-[0.875rem] font-medium"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          aria-hidden="true"
                          className="mt-0.5 shrink-0"
                        >
                          <path
                            d="M2.5 7.5l3 3 6-7"
                            stroke="var(--wk-accent)"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`mailto:${STUDIO.email}?subject=${encodeURIComponent(
                      `${pkg.name} package inquiry`
                    )}`}
                    className={`wk-btn mt-8 w-full ${
                      pkg.featured ? "wk-btn-primary" : "wk-btn-dark"
                    }`}
                  >
                    Start with {pkg.name}
                  </a>
                </div>
              </Pop>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-[0.8125rem] font-medium text-[var(--wk-dark-muted)]">
            50% upfront, balance on launch · extra revision rounds at a fixed
            fee · copywriting and managed hosting available as add-ons
          </p>
        </Reveal>
      </div>
    </section>
  );
}

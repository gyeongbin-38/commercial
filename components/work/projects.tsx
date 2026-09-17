import { WORK_PROJECTS } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";
import { WorkThumb } from "./thumb";
import { WkTilt } from "./tilt";
import { WkParallax } from "./parallax";

export function WorkProjects() {
  return (
    <section id="work" className="scroll-mt-20">
      <div className="wk-container py-16 min-[900px]:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="wk-h2 max-w-[20ch]">
              Four landing systems, end to end
            </h2>
            <p className="wk-lead max-w-[26rem] text-[0.9375rem]">
              Self-directed concept projects. Every brand is fictional and
              disclosed as such on the site. Each one is a full design system:
              tokens, type scale, motion rules, responsive QA.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 min-[760px]:grid-cols-2">
          {WORK_PROJECTS.map((p, i) => (
            <li key={p.id} className="h-full">
              <WkParallax offset={i % 2 === 0 ? 20 : -20} className="h-full">
                <Reveal delay={0.07 * (i % 2)} className="h-full">
                  <WkTilt deg={3} className="h-full">
                    <div className="wk-card wk-card-hover h-full overflow-hidden">
                      <WorkThumb
                        name={p.name}
                        href={p.href}
                        lang={p.lang}
                        screenshot={p.screenshot}
                        video={p.video}
                      />

                  <div className="p-6 min-[900px]:p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="wk-h3">{p.name}</h3>
                      <p className="text-[0.8125rem] font-medium text-[var(--wk-muted)]">
                        {p.kind} · {p.year}
                      </p>
                    </div>

                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--wk-muted)]">
                      {p.description}
                    </p>

                    <ul className="mt-4 flex flex-col gap-1.5">
                      {p.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2.5 text-[0.875rem] font-medium text-[var(--wk-ink-soft)]"
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
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--wk-line-soft)] pt-5">
                      <ul className="flex flex-wrap">
                        {p.tags.map((t) => (
                          <li key={t} className="wk-tag">
                            {t}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener"
                        className="wk-link-arrow"
                      >
                        Visit live site
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 11L11 3M5 3h6v6"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                    </div>
                  </WkTilt>
                </Reveal>
              </WkParallax>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

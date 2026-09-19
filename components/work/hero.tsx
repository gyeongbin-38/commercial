import { STUDIO } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";
import { HeroCollage } from "./hero-collage";

export function WorkHero() {
  return (
    <section id="top" className="overflow-hidden border-b border-[var(--wk-line-soft)]">
      <div className="wk-container grid items-center gap-8 pb-12 pt-10 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:gap-6 min-[900px]:pb-20 min-[900px]:pt-20">
        <div>
          <Reveal>
            <p className="wk-eyebrow">Design + development, one pair of hands</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="wk-h1 mt-5 max-w-[20ch]">
              I design and build landing pages.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-7 flex max-w-[38rem] flex-col gap-5">
              <p className="wk-lead">
                Conversion-focused pages in Next.js — responsive build,
                working forms, SEO, deployment. No handoff: the page that
                ships is the page that was designed.
              </p>
              <p className="flex items-center gap-2.5 text-[0.875rem] font-medium text-[var(--wk-ink)]">
                <span className="wk-dot" aria-hidden="true" />
                {STUDIO.availability}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="wk-btn wk-btn-primary">
                See the work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  aria-hidden="true"
                >
                  <path
                    d="M7 2v9m0 0l-3.5-3.5M7 11l3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href={`mailto:${STUDIO.email}`} className="wk-btn wk-btn-ghost">
                {STUDIO.email}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="min-[900px]:-mr-10">
          <HeroCollage />
        </Reveal>
      </div>
    </section>
  );
}

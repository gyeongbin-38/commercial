import { STUDIO } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";
import { WorkChip } from "./work-chip";
import { WkMagnetic } from "./magnetic";

export function WorkHero() {
  return (
    <section id="top" className="border-b border-[var(--wk-line-soft)]">
      <div className="wk-container pb-16 pt-14 min-[900px]:pb-24 min-[900px]:pt-20">
        <Reveal>
          <p className="wk-eyebrow">Design + development, one pair of hands</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="wk-h1 mt-5 max-w-[20ch]">
            I design <WorkChip offset={0} /> and build{" "}
            <WorkChip offset={2} /> landing pages.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-7 flex max-w-[38rem] flex-col gap-5">
            <p className="wk-lead">
              I design and build conversion-focused landing pages in
              Next.js, from concept to responsive build, forms, SEO and
              deployment. No handoff: the page that ships is the page that
              was designed.
            </p>
            <p className="flex items-center gap-2.5 text-[0.875rem] font-medium text-[var(--wk-ink)]">
              <span className="wk-dot" aria-hidden="true" />
              {STUDIO.availability}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <WkMagnetic>
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
            </WkMagnetic>
            <WkMagnetic>
              <a href={`mailto:${STUDIO.email}`} className="wk-btn wk-btn-ghost">
                {STUDIO.email}
              </a>
            </WkMagnetic>
          </div>
          <p className="mt-6 text-[0.8125rem] font-medium text-[var(--wk-muted)]">
            AI applications major, Seoul KST, remote worldwide, replies
            within 24h, 5-10 days to launch
          </p>
        </Reveal>
      </div>
    </section>
  );
}

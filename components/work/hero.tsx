import { STUDIO } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";
import { BuildScene } from "./build-scene";
import { CopyEmail } from "./copy-email";
import { Magnetic } from "./magnetic";
import { WordReveal } from "./word-reveal";

export function WorkHero() {
  return (
    <section id="top" className="overflow-hidden border-b border-[var(--wk-line-soft)]">
      <div className="wk-container grid items-center gap-8 pb-12 pt-10 min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:gap-6 min-[900px]:pb-20 min-[900px]:pt-16">
        <div>
          <WordReveal
            text="I design and build landing pages."
            className="wk-h1 max-w-[20ch]"
            delay={0.08}
          />

          <Reveal delay={0.16}>
            <div className="mt-7 flex max-w-[38rem] flex-col gap-5">
              <p className="wk-lead">
                For early-stage products — one person designs the page and
                ships it in Next.js: responsive, working forms, SEO.
                Fixed-scope packages for the standard build, scoped work
                for interactive pieces like the demos below.
              </p>
              <p className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-[var(--wk-muted)]">
                <span className="wk-dot" aria-hidden="true" />
                {STUDIO.availability}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
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
              </Magnetic>
              <Magnetic strength={0.25}>
                <a href={`mailto:${STUDIO.email}`} className="wk-btn wk-btn-ghost">
                  Start a project
                </a>
              </Magnetic>
              <CopyEmail variant="light" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="min-[900px]:-mr-10">
          <BuildScene />
        </Reveal>
      </div>
    </section>
  );
}

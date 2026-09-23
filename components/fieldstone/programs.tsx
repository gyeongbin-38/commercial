import { ArrowRight } from "lucide-react";
import { PROGRAMS } from "@/lib/fieldstone-data";
import { FsStageMatch } from "./stage-match";

export function FsPrograms() {
  return (
    <section id="programs" className="scroll-mt-20 bg-white">
      <div className="fs-container py-16 min-[900px]:py-24">
        <p className="fs-eyebrow">Programs</p>
        <h2 className="fs-h2 mt-3 max-w-[36rem]">
          Pick your stage. We built the room.
        </h2>

        <FsStageMatch />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="fs-panel flex flex-col justify-between p-8 min-[700px]:p-10">
            <div>
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white/60">
                Flagship cohort
              </p>
              <h3 className="fs-serif mt-4 text-[2rem] font-medium leading-tight min-[700px]:text-[2.375rem]">
                Launch Accelerator
              </h3>
              <p className="mt-4 max-w-[26rem] text-[1rem] leading-relaxed text-white/75">
                A 12-week cohort for founders with a working product and
                early revenue. Weekly operator sessions, a shared
                workspace and a pitch day in front of our investor
                network.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href="#apply" className="fs-btn fs-btn-light">
                Apply for spring cohort
              </a>
              <p className="text-[0.8125rem] font-medium text-white/55">
                12 teams per cohort · Cohorts run spring and fall
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-4">
            {PROGRAMS.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  className="fs-card-flat group flex h-full flex-col p-6 transition-colors hover:border-[var(--fs-green)]"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="fs-h3">{p.name}</h3>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.8}
                      className="shrink-0 text-[var(--fs-green-deep)] transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-1.5 text-[0.8125rem] font-semibold text-[var(--fs-green-deep)]">
                    {p.length} · {p.format}
                  </p>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--fs-muted)]">
                    {p.body}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { STUDIO, WORK_ABOUT } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";
import { Pop } from "./pop";

export function WorkAbout() {
  return (
    <section id="about" className="wk-cv scroll-mt-20 border-b border-[var(--wk-line-soft)]">
      <div className="wk-container py-16 min-[900px]:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <h2 className="wk-h2 max-w-[16ch]">{WORK_ABOUT.title}</h2>

            <dl className="mt-8 flex flex-col divide-y divide-[var(--wk-line-soft)] border-y border-[var(--wk-line-soft)]">
              {WORK_ABOUT.facts.map((f, i) => (
                <Pop
                  key={f.label}
                  delay={0.05 * i}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="text-[0.8125rem] font-medium text-[var(--wk-muted)]">
                    {f.label}
                  </dt>
                  <dd className="text-[0.875rem] font-semibold tracking-tight text-right">
                    {f.value}
                  </dd>
                </Pop>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            {WORK_ABOUT.bio.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="wk-lead max-w-[30rem]"
              >
                {p}
              </p>
            ))}

            <a
              href={`mailto:${STUDIO.email}`}
              className="wk-link-arrow mt-8"
            >
              Work with me
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}

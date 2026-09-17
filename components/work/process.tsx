import { WORK_CAPABILITIES, WORK_PROCESS } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";

export function WorkCapabilities() {
  return (
    <section className="border-b border-[var(--wk-line-soft)] bg-[var(--wk-bg-deep)]">
      <div className="wk-container py-16 min-[900px]:py-20">
        <Reveal>
          <h2 className="wk-h2 max-w-[22ch]">
            The parts clients don&apos;t see until they&apos;re missing
          </h2>
        </Reveal>

        <ul className="mt-10 border-t border-[var(--wk-line)]">
          {WORK_CAPABILITIES.map((c, i) => (
            <li
              key={c.title}
              className="border-b border-[var(--wk-line)]"
            >
              <Reveal delay={0.04 * i} y={12}>
                <div className="grid gap-1 py-4 min-[760px]:grid-cols-[16rem_1fr] min-[760px]:items-baseline min-[760px]:gap-8">
                  <h3 className="wk-cap-title text-[0.9375rem] font-semibold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-[0.875rem] leading-relaxed text-[var(--wk-muted)]">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WorkProcess() {
  return (
    <section id="process" className="scroll-mt-20">
      <div className="wk-container py-16 min-[900px]:py-24">
        <Reveal>
          <h2 className="wk-h2 max-w-[22ch]">
            Brief to launch in four steps
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {WORK_PROCESS.map((s, i) => (
            <li key={s.step}>
              <Reveal delay={0.07 * i} className="h-full">
                <div className="h-full border-t-2 border-[var(--wk-ink)] pt-5">
                  <div className="flex items-baseline justify-between">
                    <span
                      className="text-[0.8125rem] font-semibold tracking-[0.08em] text-[var(--wk-accent)]"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {s.step}
                    </span>
                    <span className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[var(--wk-muted)]">
                      {s.day}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--wk-muted)]">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

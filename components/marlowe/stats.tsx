import { MAR_STATS } from "@/lib/marlowe-data";
import { Reveal } from "@/components/ui/reveal";
import { MarCountUp } from "./count-up";

export function MarStats() {
  return (
    <section aria-label="Season stats">
      <div className="mar-checker h-[11px]" aria-hidden="true" />
      <div className="bg-[var(--mar-volt)] text-[var(--mar-on-volt)]">
        <div className="mar-container grid grid-cols-2 gap-y-11 py-11 lg:grid-cols-4">
          {MAR_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="text-center">
              <p className="mar-display text-[clamp(3.5rem,7vw,6rem)]">
                <MarCountUp to={Number(s.value)} />
              </p>
              <p className="mt-1 text-[0.75rem] font-extrabold uppercase tracking-[0.18em]">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

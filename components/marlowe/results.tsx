import { ArrowUpRight } from "lucide-react";
import { MAR_RESULTS, MAR_UPCOMING } from "@/lib/marlowe-data";
import { Reveal } from "@/components/ui/reveal";
import { MarCountdown } from "./countdown";

function PosBadge({ pos }: { pos: string }) {
  const styles =
    pos === "P1"
      ? "bg-[var(--mar-volt)] text-[var(--mar-on-volt)]"
      : pos === "DNF"
        ? "border border-[var(--mar-line)] text-[var(--mar-text-dim)]"
        : "border border-[var(--mar-volt)] text-[var(--mar-volt)]";
  return (
    <span
      className={`inline-flex min-w-11 items-center justify-center rounded-[var(--mar-r-sm)] px-2.5 py-1.5 text-[0.75rem] font-extrabold tracking-[0.08em] ${styles}`}
    >
      {pos}
    </span>
  );
}

function GroupLabel({ children }: { children: string }) {
  return (
    <p className="pt-8 pb-2 text-[0.75rem] font-extrabold uppercase tracking-[0.18em] text-[var(--mar-volt)] first:pt-0">
      {children}
    </p>
  );
}

export function MarResults() {
  return (
    <section id="season" className="mar-container py-16 lg:py-24">
      <Reveal>
        <p className="mar-eyebrow text-[var(--mar-volt)]">2026 season</p>
        <h2 className="mar-display mt-3 text-[clamp(2.75rem,6vw,5.5rem)]">
          Race by race<span className="text-[var(--mar-volt)]">.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <MarCountdown />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10">
          <GroupLabel>Completed</GroupLabel>
          <ul>
            {MAR_RESULTS.map((r) => (
              <li
                key={r.round}
                className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-[var(--mar-line-soft)] py-4 transition-colors last:border-b-0 hover:bg-[var(--mar-card-flat)] sm:grid-cols-[3.5rem_1fr_auto_auto] sm:px-3"
              >
                <span className="mar-display text-lg text-[var(--mar-text-dim)] transition-colors group-hover:text-[var(--mar-volt)]">
                  {r.round}
                </span>
                <span className="mar-display text-xl transition-transform group-hover:translate-x-1 sm:text-2xl">
                  {r.gp}
                </span>
                <span className="hidden text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--mar-text-dim)] sm:block">
                  {r.circuit} / {r.date}
                </span>
                <PosBadge pos={r.pos} />
              </li>
            ))}
          </ul>

          <GroupLabel>Up next</GroupLabel>
          <ul>
            {MAR_UPCOMING.map((r) => (
              <li
                key={r.round}
                className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-[var(--mar-line-soft)] py-4 transition-colors last:border-b-0 hover:bg-[var(--mar-card-flat)] sm:grid-cols-[3.5rem_1fr_auto_auto] sm:px-3"
              >
                <span className="mar-display text-lg text-[var(--mar-text-dim)] transition-colors group-hover:text-[var(--mar-volt)]">
                  {r.round}
                </span>
                <span className="mar-display text-xl transition-transform group-hover:translate-x-1 sm:text-2xl">
                  {r.gp}
                </span>
                <span className="hidden text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--mar-text-dim)] sm:block">
                  {r.circuit}
                </span>
                <span className="inline-flex items-center gap-1 text-[0.75rem] font-extrabold uppercase tracking-[0.08em] text-[var(--mar-text-dim)] transition-colors group-hover:text-[var(--mar-volt)]">
                  {r.date}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

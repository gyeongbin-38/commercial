import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import {
  AppWindow,
  KindIcon,
  StatusChip,
} from "@/components/product/app-ui";
import { FOLLOWUPS_TODAY, FOLLOWUPS_WEEK } from "@/lib/demo-data";

export function FeatureQueue() {
  return (
    <section id="product" className="tile scroll-mt-14 bg-canvas">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-caption-strong text-ink-48">Follow-up queue</p>
          <h2 className="text-display-lg mt-2 text-ink">
            Know exactly who needs you today.
          </h2>
          <p className="text-body mt-4 text-ink-80">
            Every morning, Orbit sorts your open loops into one queue:
            overdue first, then today, then this week. Reply, call or nudge,
            and the next step reschedules itself. Nothing depends on
            remembering anymore.
          </p>
          <ul className="text-body mt-6 flex flex-col gap-2.5 text-ink-80">
            <li className="flex gap-2.5">
              <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              Overdue items surface first, never silently
            </li>
            <li className="flex gap-2.5">
              <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              Done for the day means actually done
            </li>
            <li className="flex gap-2.5">
              <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              Next week&apos;s work is already queued
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <AppWindow title="Orbit · Follow-ups" className="mx-auto max-w-[520px]">
            <div className="px-5 pt-4 pb-1">
              <p className="text-fine font-semibold uppercase tracking-wide text-ink-48">
                Today · 5
              </p>
            </div>
            <ul className="divide-y divide-hairline">
              {FOLLOWUPS_TODAY.slice(0, 4).map((f) => (
                <li key={f.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-parchment text-ink-80">
                    <KindIcon kind={f.kind} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-caption-strong block truncate text-ink">
                      {f.client}
                    </span>
                    <span className="text-caption block truncate text-ink-48">
                      {f.task}
                    </span>
                  </span>
                  {f.overdue ? (
                    <StatusChip tone="warn">3d overdue</StatusChip>
                  ) : (
                    <span className="chip tnum">{f.due}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="border-t border-hairline px-5 pt-3 pb-1">
              <p className="text-fine font-semibold uppercase tracking-wide text-ink-48">
                This week · 5
              </p>
            </div>
            <ul className="divide-y divide-hairline">
              {FOLLOWUPS_WEEK.slice(0, 3).map((f) => (
                <li
                  key={f.id}
                  className="flex items-center gap-3 px-5 py-2.5 opacity-70"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-parchment text-ink-80">
                    <KindIcon kind={f.kind} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-caption block truncate text-ink">
                      {f.client}
                    </span>
                  </span>
                  <span className="chip tnum">{f.due}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-hairline bg-pearl px-5 py-3">
              <p className="text-caption text-ink-48">
                Clear today&apos;s five and you&apos;re done. The rest can wait.
              </p>
            </div>
          </AppWindow>
        </Reveal>
      </div>
    </section>
  );
}

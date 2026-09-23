import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { AppWindow, Avatar, KindIcon } from "@/components/product/app-ui";
import { TIMELINE_EVENTS } from "@/lib/demo-data";

export function FeatureTimeline() {
  return (
    <section className="tile bg-tile-1">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
        <Reveal className="lg:order-2">
          <p className="text-caption-strong text-muted-dark">Client timeline</p>
          <h2 className="text-display-lg mt-2 text-on-dark">
            Every client, one timeline.
          </h2>
          <p className="text-body mt-4 text-muted-dark">
            Proposals sent and viewed, invoices paid, bookings confirmed,
            notes from the last call, stacked in order on a single page.
            Walking into a meeting cold stops being a thing.
          </p>
          <a
            href="#demo"
            className="link-dark text-body mt-6 inline-flex items-center gap-1.5"
          >
            Try it in the demo
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={0.12} className="lg:order-1">
          <AppWindow
            title="Orbit · Oyelaran Media"
            className="mx-auto max-w-[520px]"
          >
            <div className="flex items-center gap-3 border-b border-hairline px-5 py-3.5">
              <Avatar initials="MO" />
              <div className="min-w-0 flex-1">
                <p className="text-caption-strong text-ink">Oyelaran Media</p>
                <p className="text-fine text-ink-48">
                  Marcus Oyelaran · Proposal sent
                </p>
              </div>
              <span className="chip tnum">$9,600</span>
            </div>
            <ul className="px-5 py-4">
              {TIMELINE_EVENTS.map((e, i) => (
                <li key={e.text} className="relative flex gap-3 pb-4 last:pb-0">
                  {i < TIMELINE_EVENTS.length - 1 && (
                    <span
                      className="absolute top-8 left-[13px] h-[calc(100%-20px)] w-px bg-hairline"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-parchment text-ink-80 ring-1 ring-hairline">
                    <KindIcon kind={e.icon} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-caption-strong leading-snug text-ink">
                      {e.text}
                    </p>
                    <p className="text-fine mt-0.5 text-ink-48">{e.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-hairline bg-pearl px-5 py-3">
              <p className="text-caption text-ink-48">
                Next: send revised proposal v2 · Today 9:00 AM
              </p>
            </div>
          </AppWindow>
        </Reveal>
      </div>
    </section>
  );
}

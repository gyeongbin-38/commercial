import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const PAINS = [
  {
    title: "Leads go cold in the inbox",
    line: "Every day an inquiry sits unanswered, the odds of winning it drop.",
  },
  {
    title: "Follow-ups live in your head",
    line: "The client you meant to nudge on Tuesday surfaces again three weeks later.",
  },
  {
    title: "Money waits on awkwardness",
    line: "Nobody wants to chase an invoice, so the overdue ones quietly pile up.",
  },
] as const;

export function Problem() {
  return (
    <section className="tile bg-tile-1">
      <div className="mx-auto max-w-[980px] px-5">
        <Reveal className="text-center">
          <h2 className="text-display-md text-on-dark">
            Client details live in five places. None of them remind you.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {PAINS.map((p) => (
              <div key={p.title} className="text-center sm:text-left">
                <p className="text-tagline text-on-dark">{p.title}</p>
                <p className="text-body mt-3 text-muted-dark">{p.line}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.18} className="mt-14 text-center">
          <p className="text-lead-airy mx-auto max-w-[560px] text-muted-dark">
            Orbit replaces the patchwork with one workspace that keeps the
            next step visible.
          </p>
          <a
            href="#product"
            className="link-dark text-body mt-5 inline-flex items-center gap-1.5"
          >
            See how it works
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

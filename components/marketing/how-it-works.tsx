import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    n: "1",
    title: "Import the mess",
    line: "Drop in the spreadsheet and the contact list. Orbit maps names, emails and stages. Most workspaces import in under ten minutes.",
  },
  {
    n: "2",
    title: "Orbit builds your queue",
    line: "Every lead, follow-up and booking gets a next step and a due time. The patchwork becomes one ordered list.",
  },
  {
    n: "3",
    title: "Work the queue daily",
    line: "Open Orbit with your coffee. Clear today's items, close the tab. The next steps reschedule themselves.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how" className="tile scroll-mt-14 bg-parchment">
      <div className="mx-auto max-w-[980px] px-5">
        <Reveal className="text-center">
          <h2 className="text-display-md text-ink">
            Up and running in an afternoon.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.08 * i}>
              <p className="text-display-lg text-ink-48" aria-hidden="true">
                {s.n}
              </p>
              <p className="text-tagline mt-3 text-ink">{s.title}</p>
              <p className="text-body mt-3 text-ink-80">{s.line}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

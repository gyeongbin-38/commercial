import {
  Briefcase,
  Compass,
  Layers,
  PenLine,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PERSONAS } from "@/lib/demo-data";

const PERSONA_ICONS: Record<string, LucideIcon> = {
  pen: PenLine,
  layers: Layers,
  briefcase: Briefcase,
  users: Users,
  compass: Compass,
};

export function Audience() {
  return (
    <section id="solutions" className="tile scroll-mt-14 bg-parchment">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal>
          <h2 className="text-display-md text-ink">
            Built for the people who do the work.
          </h2>
          <p className="text-lead mx-auto mt-4 max-w-[620px] text-ink-80">
            If your business runs on relationships, Orbit keeps the
            operational half out of your way.
          </p>
        </Reveal>
      </div>
      <Reveal
        delay={0.1}
        className="mx-auto mt-12 max-w-[1440px] px-5"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PERSONAS.map((p) => {
            const Icon = PERSONA_ICONS[p.icon] ?? Users;
            return (
              <li key={p.title} className="card p-6 text-left">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-parchment text-ink">
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <p className="text-body-strong mt-4 text-ink">{p.title}</p>
                <p className="text-caption mt-1.5 text-ink-80">{p.line}</p>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

import type { CSSProperties } from "react";
import { MAR_IMAGES } from "@/lib/marlowe-data";
import { MarMagnetic } from "./magnetic";
import { MarTilt } from "./tilt";

function Word({
  text,
  base,
  className = "",
}: {
  text: string;
  base: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className}`}>
      {text.split("").map((c, i) => (
        <span
          key={i}
          className="mar-letter"
          style={{ "--i": base + i } as CSSProperties}
        >
          {c}
        </span>
      ))}
    </span>
  );
}

export function MarHero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <span
        className="mar-outline mar-display pointer-events-none absolute top-10 right-0 hidden text-[clamp(14rem,24vw,26rem)] leading-none select-none lg:block"
        aria-hidden="true"
      >
        71
      </span>

      <div className="mar-container relative grid min-h-[calc(100dvh-4rem)] items-center gap-11 py-11 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="mar-chip mar-rise mb-6">
            <span
              className="h-1.5 w-1.5 bg-[var(--mar-volt)]"
              aria-hidden="true"
            />
            Car 71 / World GP Series
          </span>
          <h1 className="mar-display text-[clamp(4.75rem,12vw,10.5rem)]">
            <Word text="Jett" base={0} />
            <Word
              text="Marlowe"
              base={4}
              className="text-[var(--mar-volt)]"
            />
          </h1>
          <p
            className="mar-lead mar-rise mt-6 max-w-[24rem]"
            style={{ animationDelay: "320ms" }}
          >
            Three wins in. The official home of the #71 car: results, drops
            and everything behind the visor.
          </p>
          <div
            className="mar-rise mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "420ms" }}
          >
            <MarMagnetic>
              <a href="#drop" className="mar-btn mar-btn-volt">
                Shop the drop
              </a>
            </MarMagnetic>
            <a href="#season" className="mar-btn mar-btn-ghost">
              2026 results
            </a>
          </div>
        </div>

        <div className="mar-rise relative z-10" style={{ animationDelay: "200ms" }}>
          <MarTilt className="relative mx-auto max-w-[24rem] lg:ml-auto">
            <div
              className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[var(--mar-r-lg)] bg-[var(--mar-volt)]"
              aria-hidden="true"
            />
            <div className="mar-img-hover relative overflow-hidden rounded-[var(--mar-r-lg)]">
              <img
                src={MAR_IMAGES.hero}
                alt="Front of a race-prepared sports car at night"
                width={900}
                height={1200}
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </MarTilt>
        </div>
      </div>
    </section>
  );
}

import { MAR_IMAGES } from "@/lib/marlowe-data";
import { Reveal } from "@/components/ui/reveal";

export function MarQuote() {
  return (
    <section id="team" className="mar-container py-16 lg:py-24">
      <div className="grid items-center gap-11 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="relative mx-auto max-w-[22rem] lg:mx-0">
            <div
              className="absolute inset-0 -translate-x-3 translate-y-3 rounded-[var(--mar-r-lg)] border border-[var(--mar-volt)]"
              aria-hidden="true"
            />
            <img
              src={MAR_IMAGES.portrait}
              alt="Portrait of the driver in low light"
              width={800}
              height={1000}
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-[var(--mar-r-lg)] object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.09}>
          <blockquote>
            <p className="mar-display text-[clamp(2rem,4.5vw,4rem)]">
              &ldquo;I count the corners where I could have gone faster.&rdquo;
            </p>
            <footer className="mt-6">
              <p className="text-[0.8125rem] font-extrabold uppercase tracking-[0.14em] text-[var(--mar-volt)]">
                Jett Marlowe
              </p>
              <p className="mt-1 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[var(--mar-text-dim)]">
                Driver, #71 - Marlowe Racing
              </p>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

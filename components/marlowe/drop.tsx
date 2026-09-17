import { MAR_PRODUCTS } from "@/lib/marlowe-data";
import { Reveal } from "@/components/ui/reveal";
import { MarAddButton } from "./add-button";
import { MarSpotCard } from "./spot-card";

const SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
] as const;

export function MarDrop() {
  return (
    <section id="drop" className="mar-container py-16 lg:py-24">
      <Reveal>
        <p className="mar-eyebrow text-[var(--mar-volt)]">Latest drop</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="mar-display text-[clamp(2.75rem,6vw,5.5rem)]">
            Wear the <span className="text-[var(--mar-volt)]">71</span>.
          </h2>
          <a
            href="#drop"
            className="mar-btn mar-btn-ghost mb-2 hidden min-h-10 px-5 sm:inline-flex"
          >
            Shop all
          </a>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-[11px] md:grid-cols-12">
        {MAR_PRODUCTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.07} className={SPANS[i]}>
            {p.img ? (
              <MarSpotCard className="mar-card mar-img-hover h-full">
                <div className="overflow-hidden rounded-t-[var(--mar-r-lg)]">
                  <img
                    src={p.img}
                    alt={p.alt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    {p.tag && (
                      <p className="mb-1 text-[0.6875rem] font-extrabold uppercase tracking-[0.14em] text-[var(--mar-volt)]">
                        {p.tag}
                      </p>
                    )}
                    <h3 className="mar-display text-2xl">{p.name}</h3>
                    <p className="mt-1 text-[0.8125rem] font-bold text-[var(--mar-text-dim)]">
                      {p.price}
                    </p>
                  </div>
                  <MarAddButton label="Add" />
                </div>
              </MarSpotCard>
            ) : (
              <article className="flex h-full flex-col justify-between rounded-[var(--mar-r-lg)] bg-[var(--mar-volt)] p-6 text-[var(--mar-on-volt)]">
                <p className="text-[0.6875rem] font-extrabold uppercase tracking-[0.14em]">
                  {p.tag}
                </p>
                <div>
                  <h3 className="mar-display text-[clamp(2.5rem,4vw,3.75rem)]">
                    {p.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-[0.9375rem] font-extrabold">{p.price}</p>
                    <MarAddButton label="Add" dark />
                  </div>
                </div>
              </article>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

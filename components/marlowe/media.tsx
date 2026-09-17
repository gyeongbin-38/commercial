"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { MAR_MEDIA } from "@/lib/marlowe-data";
import { Reveal } from "@/components/ui/reveal";

export function MarMedia() {
  const rail = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("article");
    el.scrollBy({
      left: dir * ((card?.offsetWidth ?? 400) + 11),
      behavior: "smooth",
    });
  };

  return (
    <section id="media" className="py-16 lg:py-24">
      <Reveal className="mar-container">
        <div className="flex items-end justify-between gap-4">
          <h2 className="mar-display text-[clamp(2.75rem,6vw,5.5rem)]">
            From the paddock
            <span className="text-[var(--mar-volt)]">.</span>
          </h2>
          <div className="mb-2 hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous video"
              className="mar-btn mar-btn-ghost h-10 w-10 min-h-0 px-0"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next video"
              className="mar-btn mar-btn-ghost h-10 w-10 min-h-0 px-0"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div
          ref={rail}
          className="mar-rail mt-10 flex snap-x snap-mandatory gap-[11px] overflow-x-auto px-4 md:px-[5.5rem]"
        >
          {MAR_MEDIA.map((m) => (
            <article
              key={m.id}
              className="mar-card mar-img-hover w-[80vw] max-w-[26rem] shrink-0 snap-start sm:w-[26rem]"
            >
              <div className="relative overflow-hidden rounded-t-[var(--mar-r-lg)]">
                <img
                  src={m.img}
                  alt={m.alt}
                  width={800}
                  height={500}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
                <span
                  className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--mar-volt)] text-[var(--mar-on-volt)]"
                  aria-hidden="true"
                >
                  <Play size={15} fill="currentColor" />
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <h3 className="text-[0.8125rem] font-extrabold uppercase tracking-[0.08em]">
                  {m.title}
                </h3>
                <span className="shrink-0 text-[0.75rem] font-bold tabular-nums text-[var(--mar-text-dim)]">
                  {m.length}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

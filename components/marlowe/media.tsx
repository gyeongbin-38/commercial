"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { MAR_MEDIA } from "@/lib/marlowe-data";
import { Reveal } from "@/components/ui/reveal";

/* Photo rail with a real lightbox. The fictional team has no video
   assets, so cards open a full-size still — not a fake play button. */
export function MarMedia() {
  const rail = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = MAR_MEDIA.find((m) => m.id === openId) ?? null;

  const scrollBy = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("article");
    el.scrollBy({
      left: dir * ((card?.offsetWidth ?? 400) + 11),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "Tab") {
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      (triggerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

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
              aria-label="Previous photo"
              className="mar-btn mar-btn-ghost h-10 w-10 min-h-0 px-0"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next photo"
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
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setOpenId(m.id);
                }}
                aria-label={`${m.title} — view photo`}
                aria-haspopup="dialog"
                className="block w-full text-left"
              >
                <span className="relative block overflow-hidden rounded-t-[var(--mar-r-lg)]">
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
                    <Expand size={15} />
                  </span>
                </span>
                <span className="flex items-center justify-between gap-3 p-4">
                  <span className="text-[0.8125rem] font-extrabold uppercase tracking-[0.08em]">
                    {m.title}
                  </span>
                  <span className="shrink-0 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-[var(--mar-text-dim)]">
                    {m.meta}
                  </span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </Reveal>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpenId(null)}
        >
          <figure
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-3">
              <figcaption className="text-[0.8125rem] font-extrabold uppercase tracking-[0.1em] text-white">
                {open.title}
                <span className="ml-3 font-bold text-white/50">
                  {open.meta}
                </span>
              </figcaption>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close photo viewer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <img
              src={open.img}
              alt={open.alt}
              width={800}
              height={500}
              className="aspect-video w-full rounded-[var(--mar-r-lg)] object-cover"
            />
            <p className="mt-3 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white/45">
              Stock photo · fictional event
            </p>
          </figure>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
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

const priceOf = (id: string) =>
  Number(MAR_PRODUCTS.find((p) => p.id === id)?.price.replace(/[$,]/g, "") ?? 0);

/* Demo cart: Add toggles items into a local cart; the summary bar lists
   lines, quantities, removal and a total — no checkout, stated plainly. */
export function MarDrop() {
  const reduce = useReducedMotion();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);

  const ids = Object.keys(cart).filter((id) => cart[id] > 0);
  const count = ids.reduce((n, id) => n + cart[id], 0);
  const total = ids.reduce((n, id) => n + cart[id] * priceOf(id), 0);

  const toggle = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id]) delete next[id];
      else next[id] = 1;
      return next;
    });
  const bump = (id: string, d: number) =>
    setCart((c) => {
      const next = { ...c, [id]: (c[id] ?? 0) + d };
      if (next[id] <= 0) delete next[id];
      return next;
    });

  return (
    <section id="drop" className="mar-container py-16 lg:py-24">
      <Reveal>
        <p className="mar-eyebrow text-[var(--mar-volt)]">Latest drop</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="mar-display text-[clamp(2.75rem,6vw,5.5rem)]">
            Wear the <span className="text-[var(--mar-volt)]">71</span>.
          </h2>
          <p className="mb-2 max-w-[18rem] text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--mar-text-dim)]">
            Demo storefront — adding items builds a local cart, no checkout
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-[11px] md:grid-cols-12">
        {MAR_PRODUCTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.07} className={SPANS[i]}>
            {p.img ? (
              <MarSpotCard className="mar-card mar-img-hover h-full">
                <div className="relative overflow-hidden rounded-t-[var(--mar-r-lg)]">
                  <img
                    src={p.img}
                    alt={p.alt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span
                    className="mar-display absolute left-4 top-4 text-2xl text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]"
                    aria-hidden="true"
                  >
                    71
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    {p.tag && (
                      <p className="mb-1 text-[0.6875rem] font-extrabold uppercase tracking-[0.14em] text-[var(--mar-volt)]">
                        {p.tag}
                      </p>
                    )}
                    <h3 className="mar-display text-2xl">{p.name}</h3>
                    <p className="mt-1 text-[0.8125rem] font-bold tabular-nums text-[var(--mar-text-dim)]">
                      {p.price}
                    </p>
                  </div>
                  <MarAddButton
                    label="Add"
                    added={!!cart[p.id]}
                    onToggle={() => toggle(p.id)}
                  />
                </div>
              </MarSpotCard>
            ) : (
              <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--mar-r-lg)] bg-[var(--mar-volt)] p-6 text-[var(--mar-on-volt)]">
                <span
                  className="mar-display pointer-events-none absolute -right-3 -top-6 text-[7rem] leading-none opacity-20"
                  aria-hidden="true"
                >
                  71
                </span>
                <p className="text-[0.6875rem] font-extrabold uppercase tracking-[0.14em]">
                  {p.tag}
                </p>
                <div>
                  <h3 className="mar-display text-[clamp(2.5rem,4vw,3.75rem)]">
                    {p.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-[0.9375rem] font-extrabold tabular-nums">
                      {p.price}
                    </p>
                    <MarAddButton
                      label="Add"
                      dark
                      added={!!cart[p.id]}
                      onToggle={() => toggle(p.id)}
                    />
                  </div>
                </div>
              </article>
            )}
          </Reveal>
        ))}
      </div>

      {/* demo cart bar */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="sticky bottom-4 z-30 mt-8"
          >
            <div className="rounded-[var(--mar-r-lg)] border border-[var(--mar-line)] bg-[var(--mar-bg-deep)] shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mar-cart-panel"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="flex items-center gap-3 text-[0.8125rem] font-extrabold uppercase tracking-[0.1em] text-[var(--mar-text)]">
                  <ShoppingBag size={16} className="text-[var(--mar-volt)]" aria-hidden="true" />
                  Demo cart · {count} {count === 1 ? "item" : "items"}
                </span>
                <span className="flex items-center gap-4">
                  <span className="mar-display text-lg tabular-nums text-[var(--mar-volt)]">
                    ${total.toLocaleString("en-US")}
                  </span>
                  <span className="text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-[var(--mar-text-dim)]">
                    {open ? "Hide" : "Review"}
                  </span>
                </span>
              </button>

              {open && (
                <div
                  id="mar-cart-panel"
                  className="border-t border-[var(--mar-line-soft)] px-5 pb-5 pt-4"
                >
                  <ul className="flex flex-col divide-y divide-[var(--mar-line-soft)]">
                    {ids.map((id) => {
                      const p = MAR_PRODUCTS.find((x) => x.id === id)!;
                      return (
                        <li
                          key={id}
                          className="flex items-center justify-between gap-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-[0.875rem] font-extrabold uppercase tracking-[0.06em] text-[var(--mar-text)]">
                              {p.name}
                            </p>
                            <p className="text-[0.75rem] font-bold tabular-nums text-[var(--mar-text-dim)]">
                              {p.price} each
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => bump(id, -1)}
                              aria-label={`Decrease ${p.name} quantity`}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--mar-line)] text-[var(--mar-text)] transition-colors hover:border-[var(--mar-volt)] hover:text-[var(--mar-volt)]"
                            >
                              <Minus size={13} aria-hidden="true" />
                            </button>
                            <span
                              className="w-6 text-center text-[0.875rem] font-extrabold tabular-nums text-[var(--mar-text)]"
                              aria-live="polite"
                              aria-label={`${p.name} quantity ${cart[id]}`}
                            >
                              {cart[id]}
                            </span>
                            <button
                              type="button"
                              onClick={() => bump(id, 1)}
                              aria-label={`Increase ${p.name} quantity`}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--mar-line)] text-[var(--mar-text)] transition-colors hover:border-[var(--mar-volt)] hover:text-[var(--mar-volt)]"
                            >
                              <Plus size={13} aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setCart((c) => {
                                  const next = { ...c };
                                  delete next[id];
                                  return next;
                                })
                              }
                              aria-label={`Remove ${p.name} from cart`}
                              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-[var(--mar-text-dim)] transition-colors hover:text-[var(--mar-text)]"
                            >
                              <X size={15} aria-hidden="true" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--mar-line-soft)] pt-4">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[var(--mar-text-dim)]">
                      Demo cart — no checkout, nothing is charged
                    </p>
                    <p className="mar-display text-xl tabular-nums text-[var(--mar-volt)]">
                      ${total.toLocaleString("en-US")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

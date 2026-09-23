import { STATS } from "@/lib/fieldstone-data";

export function FsStats() {
  return (
    <section
      aria-label="Ecosystem impact"
      className="bg-[var(--fs-pine)]"
    >
      <div className="fs-container py-14 min-[900px]:py-20">
        <p className="mb-8 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/50">
          Illustrative figures — fictional ecosystem, concept design
        </p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 min-[900px]:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col border-l pl-5 min-[900px]:pl-6"
              style={{ borderColor: "rgba(255,255,255,0.22)" }}
            >
              <dd className="fs-stat-num fs-stat-num-light order-first">
                {s.value}
                {s.suffix}
              </dd>
              <dt className="mt-3 text-[0.875rem] font-medium text-white/60">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

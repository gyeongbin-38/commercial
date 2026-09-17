import { STORIES } from "@/lib/fieldstone-data";

export function FsStories() {
  return (
    <section id="stories" className="scroll-mt-20 bg-white">
      <div className="fs-container py-16 min-[900px]:py-24">
        <h2 className="fs-h2 max-w-[36rem]">Founders who started here</h2>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {STORIES.map((s, i) => (
            <li
              key={s.name}
              className={`fs-card flex flex-col p-7 ${
                i === 1 ? "lg:translate-y-8" : ""
              }`}
            >
              <blockquote className="fs-serif text-[1.375rem] font-medium leading-[1.35]">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <div className="mt-auto flex items-center gap-3.5 pt-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-[0.9375rem] font-bold">{s.name}</p>
                  <p className="text-[0.8125rem] font-medium text-[var(--fs-muted)]">
                    {s.role} · {s.program}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

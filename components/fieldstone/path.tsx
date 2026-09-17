import { PATH_PHASES } from "@/lib/fieldstone-data";

export function FsPath() {
  return (
    <section id="path" className="scroll-mt-20 bg-[var(--fs-tint)]">
      <div className="fs-container py-16 min-[900px]:py-24">
        <h2 className="fs-h2 max-w-[38rem]">
          The path from idea to investment
        </h2>
        <p className="fs-lead mt-4 max-w-[34rem]">
          Every program feeds the next. Enter wherever your company
          actually is.
        </p>

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PATH_PHASES.map((p) => (
            <li
              key={p.num}
              className="border-t pt-6"
              style={{ borderColor: "var(--fs-line)" }}
            >
              <p
                className="fs-serif text-[2.75rem] font-medium leading-none text-[var(--fs-green)]"
                aria-hidden="true"
              >
                {p.num}
              </p>
              <h3 className="mt-4 text-[1.0625rem] font-bold">{p.name}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--fs-muted)]">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

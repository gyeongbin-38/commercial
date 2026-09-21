import Image from "next/image";
import { WORK_PROJECTS } from "@/lib/work-data";

/* Editorial work index — terse rows plus a hover preview. The preview
   is pure CSS: each row carries its own fixed-position panel revealed
   by :hover / :focus-within, so there is no pointer tracking, no
   springs and no client JS. Videos only render while their row is
   hovered (display:none otherwise). Mobile keeps the inline thumb. */

const ACCENTS: Record<string, string> = {
  orbit: "#4a8dff",
  moapoint: "#7fa3d4",
  fieldstone: "#6fae8d",
  marlowe: "#d7f23f",
  plugview: "#70a7ff",
};

export function WorkIndex() {
  return (
    <div className="wk-container pb-16 min-[900px]:pb-24">
      <ul className="border-t border-[var(--wk-line)]">
        {WORK_PROJECTS.map((p, i) => (
          <li key={p.id} className="group border-b border-[var(--wk-line)]">
            <a
              href={p.href}
              target="_blank"
              rel="noopener"
              className="flex items-baseline gap-5 py-6 transition-colors min-[900px]:py-7"
            >
              <span
                className="w-7 shrink-0 text-[0.75rem] font-semibold text-[var(--wk-muted)]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-[clamp(1.45rem,3.2vw,2.4rem)] font-bold leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--wk-accent-dim)]">
                    {p.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--wk-line)] px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-[var(--wk-muted)]">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: ACCENTS[p.id] }}
                      aria-hidden="true"
                    />
                    {p.id === "plugview" ? "Live build" : "Concept"}
                  </span>
                </span>
                <span className="mt-1 block max-w-[34rem] truncate text-[0.875rem] text-[var(--wk-muted)] max-[700px]:whitespace-normal max-[700px]:leading-snug">
                  {p.kind} · {p.description.split(".")[0]}.
                </span>
              </span>
              <span className="hidden shrink-0 text-[0.8125rem] font-medium text-[var(--wk-muted)] min-[700px]:block">
                {p.year}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                aria-hidden="true"
                className="shrink-0 self-center text-[var(--wk-ink)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--wk-accent-dim)]"
              >
                <path
                  d="M4 14L14 4M6 4h8v8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Static thumb on touch / small screens */}
            <div className="relative mb-6 aspect-video overflow-hidden rounded-[var(--wk-r-md)] border border-[var(--wk-line)] bg-[#141312] min-[900px]:hidden">
              <Image
                src={p.screenshot}
                alt={`${p.name} site preview`}
                fill
                sizes="100vw"
                className="object-cover"
                style={{
                  objectPosition: "mediaPos" in p ? p.mediaPos : "50% 0%",
                }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>

            {/* Desktop hover preview — fixed panel, CSS-only reveal */}
            <div className="wk-index-preview" aria-hidden="true">
              <Image
                src={p.screenshot}
                alt=""
                fill
                sizes="400px"
                className="object-cover"
                style={{
                  objectPosition: "mediaPos" in p ? p.mediaPos : "50% 0%",
                }}
              />
              {p.video ? (
                <video
                  src={p.video}
                  className="absolute inset-0 h-full w-full bg-[#141312] object-cover"
                  style={{
                    objectPosition:
                      "mediaPos" in p ? p.mediaPos : "50% 0%",
                  }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

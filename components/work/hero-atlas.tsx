import Image from "next/image";
import { WORK_PROJECTS } from "@/lib/work-data";

/* Flat product atlas: one real screen in a browser frame with three
   fact panels beside it and a caption row below. No parallax, no
   pointer tracking — the work itself carries the visual. */

const FACTS = [
  { label: "Responsive QA", value: "1440 · 1280 · 834 · 390" },
  { label: "Working forms", value: "Server-validated" },
  { label: "SEO + deploy", value: "Meta · OG · Vercel" },
];

export function HeroAtlas() {
  const p = WORK_PROJECTS.find((w) => w.id === "plugview") ?? WORK_PROJECTS[0];

  return (
    <figure className="wk-atlas">
      <a
        href={p.href}
        target="_blank"
        rel="noopener"
        className="wk-atlas-frame"
        aria-label={`${p.name} live site`}
      >
        <span className="wk-atlas-bar" aria-hidden="true">
          <span className="wk-atlas-dots">
            <i /> <i /> <i />
          </span>
          <span className="wk-atlas-url">gyeongbinbak.com{p.href}</span>
          <span className="wk-atlas-live">
            <i />
            Live product
          </span>
        </span>
        <span className="wk-atlas-screen">
          <Image
            src={p.screenshot}
            alt={`${p.name} site preview`}
            fill
            sizes="(max-width: 900px) 100vw, 560px"
            priority
            className="object-cover"
            style={{ objectPosition: "50% 0%" }}
          />
        </span>
      </a>

      <div className="wk-atlas-facts">
        {FACTS.map((f) => (
          <div key={f.label} className="wk-atlas-fact">
            <span className="wk-atlas-fact-label">{f.label}</span>
            <span className="wk-atlas-fact-value">{f.value}</span>
          </div>
        ))}
      </div>

      <figcaption className="wk-atlas-caption">
        <span>
          <strong>{p.name}</strong> — {p.kind}
        </span>
        <a
          href={p.href}
          target="_blank"
          rel="noopener"
          className="wk-link-arrow"
        >
          Visit site
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M3 11L11 3M5 3h6v6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </figcaption>
    </figure>
  );
}

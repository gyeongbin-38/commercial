import { ArrowUpRight } from "lucide-react";

const COLS = [
  {
    title: "Shop",
    links: [
      { href: "/marlowe#drop", label: "Latest drop" },
      { href: "/marlowe#drop", label: "Team cap" },
      { href: "/marlowe#drop", label: "Hoodies" },
      { href: "/marlowe#drop", label: "Gift cards" },
    ],
  },
  {
    title: "Team",
    links: [
      { href: "/marlowe#season", label: "2026 season" },
      { href: "/marlowe#team", label: "The driver" },
      { href: "/marlowe#media", label: "Media" },
      { href: "/marlowe#club", label: "The club" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/marlowe#club", label: "Contact" },
      { href: "/marlowe#drop", label: "Shipping" },
      { href: "/marlowe#season", label: "Race results" },
    ],
  },
];

const SOCIALS = ["Instagram", "YouTube", "TikTok", "X"];

export function MarFooter() {
  return (
    <footer
      className="border-t border-[var(--mar-line-soft)]"
      aria-label="Footer"
    >
      <div className="mar-container pt-14">
        <p
          className="mar-display text-center text-[clamp(4rem,15vw,15rem)] leading-[0.8] text-[var(--mar-volt)]"
          aria-hidden="true"
        >
          Marlowe
        </p>

        <div className="mt-14 grid gap-10 pb-12 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="max-w-[22rem] text-[0.8125rem] font-bold leading-relaxed text-[var(--mar-text-dim)]">
              The official home of Jett Marlowe and the #71 car. Merch, race
              coverage and everything behind the visor.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Social channels">
              {SOCIALS.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center gap-1 text-[0.75rem] font-extrabold uppercase tracking-[0.14em] text-[var(--mar-text-dim)]"
                >
                  {s}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[var(--mar-text-dim)]/70">
              Fictional brand — no live social channels
            </p>
          </div>

          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.18em] text-[var(--mar-volt)]">
                {c.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[0.8125rem] font-bold text-[var(--mar-text-dim)] transition-colors hover:text-[var(--mar-text)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--mar-line-soft)]">
        <div className="mar-container flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="text-[0.75rem] font-bold text-[var(--mar-text-dim)]">
            &copy; 2026 Marlowe Racing Ltd. All rights reserved.
          </p>
          <p className="max-w-[30rem] text-[0.75rem] font-bold text-[var(--mar-text-dim)]">
            Marlowe Racing is a fictional brand demo. Not affiliated with any
            real driver, team or racing series.
          </p>
          <p className="flex gap-5 text-[0.75rem] font-bold text-[var(--mar-text-dim)]">
            <a
              href="/marlowe/privacy"
              className="transition-colors hover:text-[var(--mar-text)]"
            >
              Privacy
            </a>
            <a
              href="/marlowe/terms"
              className="transition-colors hover:text-[var(--mar-text)]"
            >
              Terms
            </a>
          </p>
        </div>
      </div>
      <div className="mar-checker h-[11px]" aria-hidden="true" />
    </footer>
  );
}

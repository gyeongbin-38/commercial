import { FsWordmark } from "./wordmark";

const COLS = [
  {
    title: "Programs",
    links: [
      { href: "/fieldstone#programs", label: "Launch Accelerator" },
      { href: "/fieldstone#programs", label: "Idea Studio" },
      { href: "/fieldstone#programs", label: "Capital Pathways" },
      { href: "/fieldstone#programs", label: "Founder Community" },
    ],
  },
  {
    title: "Organization",
    links: [
      { href: "/fieldstone#path", label: "The Path" },
      { href: "/fieldstone#stories", label: "Founder Stories" },
      { href: "/fieldstone#faq", label: "FAQ" },
      { href: "/fieldstone#apply", label: "Apply" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/fieldstone/privacy", label: "Privacy" },
      { href: "/fieldstone/terms", label: "Terms" },
    ],
  },
];

export function FsFooter() {
  return (
    <footer
      className="border-t bg-white"
      style={{ borderColor: "var(--fs-line-soft)" }}
    >
      <div className="fs-container grid gap-10 py-12 sm:grid-cols-[1.2fr_1fr_1fr_0.8fr]">
        <div>
          <FsWordmark />
          <p className="mt-4 max-w-[18rem] text-[0.8125rem] font-medium leading-relaxed text-[var(--fs-muted)]">
            An entrepreneurial ecosystem that builds founders and drives
            economic growth.
          </p>
        </div>
        {COLS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-[0.8125rem] font-bold">{c.title}</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[0.8125rem] font-medium text-[var(--fs-muted)] transition-colors hover:text-[var(--fs-ink)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div
        className="border-t"
        style={{ borderColor: "var(--fs-line-soft)" }}
      >
        <div className="fs-container flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="text-[0.75rem] font-medium text-[var(--fs-muted)]">
            © 2026 Fieldstone Ventures
          </p>
          <p className="text-[0.75rem] font-medium text-[var(--fs-muted)]">
            Fieldstone is a fictional brand. Founders, companies and
            figures are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}

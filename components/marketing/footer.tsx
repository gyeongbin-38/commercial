import Link from "next/link";
import { OrbitWordmark } from "@/components/ui/logo";

const COLUMNS: { head: string; links: { label: string; href: string }[] }[] = [
  {
    head: "Product",
    links: [
      { label: "Follow-up queue", href: "/orbit#product" },
      { label: "Pipeline demo", href: "/orbit#demo" },
      { label: "How it works", href: "/orbit#how" },
      { label: "Pricing", href: "/orbit#pricing" },
    ],
  },
  {
    head: "Solutions",
    links: [
      { label: "Freelancers", href: "/orbit#solutions" },
      { label: "Design studios", href: "/orbit#solutions" },
      { label: "Consultants", href: "/orbit#solutions" },
      { label: "Small agencies", href: "/orbit#solutions" },
    ],
  },
  {
    head: "Resources",
    links: [
      { label: "FAQ", href: "/orbit#faq" },
      { label: "Request access", href: "/orbit#get-started" },
      { label: "Interactive demo", href: "/orbit#demo" },
      { label: "About this demo", href: "/orbit/about" },
    ],
  },
  {
    head: "Legal",
    links: [
      { label: "Privacy", href: "/orbit/privacy" },
      { label: "Terms", href: "/orbit/terms" },
      { label: "Security", href: "/orbit/security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-parchment">
      <div className="mx-auto max-w-[1080px] px-5 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div>
            <OrbitWordmark />
            <p className="text-caption mt-3 max-w-[200px] text-ink-80">
              Simple client operations for small teams.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {COLUMNS.map((col) => (
              <div key={col.head}>
                <p className="text-caption-strong text-ink">{col.head}</p>
                <ul className="text-dense mt-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-ink-80 transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-12 border-t border-hairline pt-5">
          <p className="text-fine text-ink-48">
            © 2026 Orbit Labs. Orbit is a concept product built as a design
            demo. All companies, people and figures shown are fictional.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrbitWordmark } from "@/components/ui/logo";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-canvas">
      <header className="flex h-11 items-center bg-void px-5">
        <Link href="/orbit" aria-label="Orbit home" className="flex items-center gap-2">
          <OrbitWordmark onDark />
        </Link>
        <Link
          href="/orbit"
          className="text-nav ml-auto inline-flex items-center gap-1.5 text-muted-dark transition-colors hover:text-on-dark"
        >
          <ArrowLeft size={12} strokeWidth={1.75} aria-hidden="true" />
          Back to Orbit
        </Link>
      </header>
      <main className="mx-auto w-full max-w-[720px] flex-1 px-5 py-16">
        <h1 className="text-display-md text-ink">{title}</h1>
        <p className="text-caption mt-2 text-ink-48">Last updated {updated}</p>
        <div className="text-body mt-8 flex flex-col gap-4 text-ink-80">
          {children}
        </div>
      </main>
      <footer className="bg-parchment">
        <p className="text-fine mx-auto max-w-[720px] px-5 py-6 text-ink-48">
          © 2026 Orbit Labs. Orbit is a concept product. This page is a
          placeholder stub for the demo site.
        </p>
      </footer>
    </div>
  );
}

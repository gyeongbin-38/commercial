import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

/**
 * Global 404 for unmatched URLs. This app has two root layouts
 * ((orbit) and moapoint), so no single root layout can host a 404.
 * Requires `experimental.globalNotFound` in next.config.ts.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-5 text-center text-ink">
        <p className="text-caption-strong text-ink-48">404</p>
        <h1 className="text-display-md mt-3">Page not found</h1>
        <p className="text-body mt-3 max-w-[420px] text-ink-80">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            Portfolio home
          </Link>
          <Link href="/plugview" className="btn btn-ghost">
            Plugview
          </Link>
          <Link href="/orbit" className="btn btn-ghost">
            Orbit
          </Link>
        </div>
      </body>
    </html>
  );
}

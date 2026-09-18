import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Orbit: Simple Client Operations for Small Teams",
    template: "%s | Orbit",
  },
  description:
    "Manage leads, follow-ups, bookings and client work from one simple workspace. Orbit keeps every client, follow-up and next step in one place.",
  applicationName: "Orbit",
  keywords: [
    "client management",
    "freelancer CRM",
    "small business workspace",
    "client pipeline",
    "follow-up tracker",
  ],
  openGraph: {
    type: "website",
    siteName: "Orbit",
    title: "Orbit: Simple Client Operations for Small Teams",
    description:
      "Manage leads, follow-ups, bookings and client work from one simple workspace.",
    url: "/orbit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit: Simple Client Operations for Small Teams",
    description:
      "Manage leads, follow-ups, bookings and client work from one simple workspace.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function OrbitLayout({ children }: LayoutProps<"/orbit">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}

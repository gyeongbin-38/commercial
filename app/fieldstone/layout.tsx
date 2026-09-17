import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./fieldstone.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-f-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-f-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fieldstone Ventures: Where Ideas Become Companies",
    template: "%s | Fieldstone Ventures",
  },
  description:
    "A fictional entrepreneurial ecosystem that builds founders and drives economic growth. Programs, mentors and capital access, from first idea to first round and beyond. (Design demo)",
  applicationName: "Fieldstone Ventures",
  keywords: [
    "startup accelerator",
    "founder programs",
    "entrepreneurship",
    "venture ecosystem",
    "capital readiness",
  ],
  openGraph: {
    type: "website",
    siteName: "Fieldstone Ventures",
    title: "Fieldstone Ventures: Where Ideas Become Companies",
    description:
      "Programs, mentors and capital access for people building businesses in our region.",
    url: "/fieldstone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fieldstone Ventures: Where Ideas Become Companies",
    description:
      "Programs, mentors and capital access for people building businesses in our region.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#15332b",
  width: "device-width",
  initialScale: 1,
};

export default function FieldstoneLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body
        className="fs-body"
        style={{
          fontFamily:
            "var(--font-f-sans), 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}

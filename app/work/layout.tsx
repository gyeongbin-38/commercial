import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./work.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-work",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gyeongbin Bak, Landing pages, designed and built",
  description:
    "One-person studio for conversion-focused landing pages. Design and Next.js development in a single hand. Selected concept work, fixed-price packages.",
  openGraph: {
    type: "website",
    title: "Gyeongbin Bak, Landing pages, designed and built",
    description:
      "One-person studio for conversion-focused landing pages. Design and Next.js development in a single hand.",
    url: "/work",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
  width: "device-width",
  initialScale: 1,
};

export default function WorkLayout({ children }: LayoutProps<"/work">) {
  return (
    <html lang="en" className={plexSans.variable}>
      <body
        className="wk-body"
        style={{
          fontFamily:
            "var(--font-work), 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}

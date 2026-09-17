import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import "./marlowe.css";

const anton = Anton({
  variable: "--font-mar-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-mar-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MARLOWE | Jett Marlowe, Driver of the #71",
    template: "%s | MARLOWE",
  },
  description:
    "The official hub of Grand Prix driver Jett Marlowe. 2026 race results, the latest merch drop, onboard footage and behind-the-scenes access. (Fictional brand demo)",
  applicationName: "MARLOWE",
  keywords: [
    "racing driver",
    "grand prix",
    "motorsport",
    "racing merch",
    "jett marlowe",
  ],
  openGraph: {
    type: "website",
    siteName: "MARLOWE",
    title: "MARLOWE | Jett Marlowe, Driver of the #71",
    description:
      "Race results, merch drops and onboard footage from the world of Jett Marlowe.",
    url: "/marlowe",
  },
  twitter: {
    card: "summary_large_image",
    title: "MARLOWE | Jett Marlowe, Driver of the #71",
    description:
      "Race results, merch drops and onboard footage from the world of Jett Marlowe.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#3b3c38",
  width: "device-width",
  initialScale: 1,
};

export default function MarloweLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable}`}>
      <body
        className="mar-body"
        style={{
          fontFamily:
            "var(--font-mar-sans), Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}

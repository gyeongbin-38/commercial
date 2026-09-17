import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "./plugview.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Plugview | See it live. Ship it fast.",
    template: "%s | Plugview",
  },
  description:
    "A live React UI asset market for choosing, customizing, and shipping polished interface blocks.",
  applicationName: "Plugview",
  keywords: [
    "React UI assets",
    "Tailwind components",
    "UI asset market",
    "live component preview",
    "Plugview",
  ],
  openGraph: {
    type: "website",
    siteName: "Plugview",
    title: "Plugview | See it live. Ship it fast.",
    description: "Choose, customize, and ship polished React UI from a live preview.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plugview | React UI Asset Market",
    description: "Choose, customize, and ship polished React UI from a live preview.",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="pv-body min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

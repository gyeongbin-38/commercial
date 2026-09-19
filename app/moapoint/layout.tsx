import type { Metadata } from "next";
import localFont from "next/font/local";
import "./moapoint.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.subset.woff2",
  variable: "--font-moa",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "모아포인트 MOA POINT | 적립은 어디서든, 사용은 현금처럼",
  description:
    "모아 제휴 브랜드와 전국 12만 매장에서 쌓이는 통합 멤버십. 1포인트부터 1원처럼 사용하는 모아포인트. (가상의 브랜드 데모)",
  openGraph: {
    title: "모아포인트 MOA POINT",
    description: "적립은 어디서든. 사용은 현금처럼. 하나로 모으는 통합 멤버십.",
    type: "website",
  },
};

export default function MoaPointLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body
        className="moa-body"
        style={{ fontFamily: "var(--font-moa), Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}

import { ImageResponse } from "next/og";

export const alt = "모아포인트 MOA POINT, 하나로 모으는 통합 멤버십";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function MoaPointOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f0f3f5",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#222832",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#222832" }}>
            모아포인트
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 64,
            fontWeight: 700,
            color: "#222832",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          적립은 어디서든.
          <br />
          사용은 현금처럼.
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 26,
            fontWeight: 500,
            color: "#5f646c",
          }}
        >
          하나로 모으는 통합 멤버십 · 1P = 1원
        </div>
      </div>
    ),
    size,
  );
}

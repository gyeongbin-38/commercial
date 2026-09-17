import { ImageResponse } from "next/og";

export const alt =
  "Gyeongbin Bak — landing pages that look designed and ship fast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function WorkOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f7f7f5",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#e04f16",
              color: "#fdfdfc",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            GB
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1b1917",
              letterSpacing: "-0.01em",
            }}
          >
            Gyeongbin Bak
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#6f6a60",
              marginLeft: "auto",
            }}
          >
            Design + development
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: "#1b1917",
            maxWidth: 1000,
          }}
        >
          <span>I design and build</span>
          <span>
            landing <span style={{ color: "#6f6a60" }}>pages.</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            fontWeight: 600,
            color: "#6f6a60",
          }}
        >
          <span>Seoul, KST · remote worldwide</span>
          <span style={{ color: "#e04f16" }}>5 founding client slots open</span>
        </div>
      </div>
    ),
    size,
  );
}

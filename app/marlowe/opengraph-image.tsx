import { ImageResponse } from "next/og";

export const alt = "MARLOWE - Jett Marlowe, driver of the #71";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function MarloweOgImage() {
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
          background: "#3b3c38",
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
              background: "#d2ff00",
              color: "#282c20",
              fontSize: 28,
              fontWeight: 800,
              padding: "8px 16px",
              borderRadius: 6,
            }}
          >
            71
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#b9bab0",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            World GP Series
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 150,
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#f4f4ed" }}>Jett</span>
          <span style={{ color: "#d2ff00" }}>Marlowe</span>
        </div>

        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#b9bab0",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Results / Drops / Onboard footage
        </div>
      </div>
    ),
    size,
  );
}

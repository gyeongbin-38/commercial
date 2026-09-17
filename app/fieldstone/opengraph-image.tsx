import { ImageResponse } from "next/og";

export const alt = "Fieldstone Ventures: where ideas become companies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function FieldstoneOgImage() {
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
          background: "#15332b",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 38,
              fontWeight: 600,
              color: "#ffffff",
              fontFamily: "Georgia, serif",
            }}
          >
            Fieldstone
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.22em",
            }}
          >
            VENTURES
          </div>
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 72,
            fontWeight: 500,
            color: "#ffffff",
            lineHeight: 1.02,
            fontFamily: "Georgia, serif",
            display: "flex",
            flexDirection: "column",
          }}
        >
          Where ideas
          <br />
          become companies.
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 26,
            fontWeight: 400,
            color: "#a8cec2",
          }}
        >
          Programs, mentors and capital access for founders in our region.
        </div>
      </div>
    ),
    size,
  );
}

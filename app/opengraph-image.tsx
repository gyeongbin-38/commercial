import { ImageResponse } from "next/og";

export const alt = "Orbit: Simple Client Operations for Small Teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64">
          <g transform="rotate(-24 32 32)">
            <ellipse
              cx="32"
              cy="32"
              rx="25"
              ry="10.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4.5"
            />
            <circle cx="57" cy="32" r="6.5" fill="#2997ff" />
          </g>
          <circle cx="32" cy="32" r="10" fill="#ffffff" />
        </svg>
        <div
          style={{
            marginTop: 36,
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Orbit
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            fontWeight: 400,
            color: "#cccccc",
            letterSpacing: "-0.01em",
          }}
        >
          Keep every client moving forward.
        </div>
      </div>
    ),
    { ...size },
  );
}

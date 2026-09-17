export function MoaWordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2" aria-label="모아포인트">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="22"
          height="22"
          rx="5"
          fill={light ? "#ffffff" : "#222832"}
        />
        <path
          d="M6 15V7l5 5 5-5v8"
          fill="none"
          stroke={light ? "#222832" : "#ffffff"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-[1.0625rem] font-bold tracking-tight"
        style={{ color: light ? "#ffffff" : "#222832" }}
      >
        모아포인트
      </span>
    </span>
  );
}

export function OrbitMark({
  size = 22,
  onDark = false,
  className = "",
}: {
  size?: number;
  onDark?: boolean;
  className?: string;
}) {
  const ring = onDark ? "#ffffff" : "#1d1d1f";
  const dot = onDark ? "#2997ff" : "#0066cc";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
    >
      <g transform="rotate(-24 32 32)">
        <ellipse
          cx="32"
          cy="32"
          rx="25"
          ry="10.5"
          fill="none"
          stroke={ring}
          strokeWidth="4.5"
        />
        <circle cx="57" cy="32" r="6.5" fill={dot} />
      </g>
      <circle cx="32" cy="32" r="10" fill={ring} />
    </svg>
  );
}

export function OrbitWordmark({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold tracking-[-0.015em] ${
        onDark ? "text-on-dark" : "text-ink"
      } ${className}`}
    >
      <OrbitMark size={20} onDark={onDark} />
      <span className="text-[19px] leading-none">Orbit</span>
    </span>
  );
}

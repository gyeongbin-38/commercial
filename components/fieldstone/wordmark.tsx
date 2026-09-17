export function FsWordmark({ light = false }: { light?: boolean }) {
  return (
    <span
      className="inline-flex items-baseline gap-2.5"
      aria-label="Fieldstone Ventures"
    >
      <span
        className="fs-serif text-[1.5rem] font-semibold leading-none tracking-tight"
        style={{ color: light ? "#ffffff" : "var(--fs-pine)" }}
      >
        Fieldstone
      </span>
      <span
        className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em]"
        style={{
          color: light ? "rgba(255,255,255,0.75)" : "var(--fs-muted)",
        }}
      >
        Ventures
      </span>
    </span>
  );
}

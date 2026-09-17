export function MarWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="mar-display text-[1.375rem] leading-none tracking-normal">
        Marlowe
      </span>
      <span
        className="mar-display flex h-5 w-7 items-center justify-center rounded-[var(--mar-r-micro)] bg-[var(--mar-volt)] text-[0.8125rem] leading-none text-[var(--mar-on-volt)]"
        aria-hidden="true"
      >
        71
      </span>
    </span>
  );
}

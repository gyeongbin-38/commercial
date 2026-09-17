const STATS = [
  {
    value: "12만+",
    label: "제휴 매장",
    sub: "모아 브랜드부터 동네 제휴 매장까지",
  },
  {
    value: "1P = 1원",
    label: "포인트 가치",
    sub: "계산할 필요 없이 현금처럼",
  },
  {
    value: "5년",
    label: "포인트 유효기간",
    sub: "천천히 모아도 충분한 시간",
  },
];

export function MoaStats() {
  return (
    <section aria-label="서비스 지표" className="bg-[var(--moa-bg)]">
      <div className="moa-container grid gap-4 py-10 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="moa-card px-6 py-6">
            <p className="text-[1.625rem] font-bold tracking-tight">
              {s.value}
            </p>
            <p className="mt-1 text-[0.9375rem] font-semibold">{s.label}</p>
            <p className="mt-0.5 text-[0.8125rem] font-medium text-[var(--moa-muted)]">
              {s.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { PARTNER_GROUPS } from "@/lib/moapoint-data";

const ICONS: Record<string, string> = {
  bag: "M6.5 8V6a3.5 3.5 0 017 0v2M4 8h12l-1 11H5L4 8z",
  store:
    "M4 9l1-4h10l1 4M4 9v9h12V9M4 9h12M9 18v-5h2v5",
  food: "M6 3v6m0 0V3m0 6c0 1.5 1 2 2 2s2-.5 2-2V3M6 9v11m8-17v17m0-17c-1.5 0-3 1.5-3 4s1.5 4 3 4",
  plane:
    "M10 4l5-1.5L13 8l4 2.5-1 1L12 10l-2 5-2 .5 1-5.5L5 8l1-2 4 1z",
  bank: "M3 8l7-5 7 5M5 10v6m3-6v6m3-6v6m3-6v6M4 18h12",
};

function GroupIcon({ name }: { name: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#222832"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

export function MoaPartners() {
  return (
    <section id="partners" className="bg-white">
      <div className="moa-container py-16 min-[900px]:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="moa-eyebrow">제휴사</p>
            <h2 className="moa-h2 mt-2">
              장보기부터 여행까지,
              <br />
              생활 전반이 적립 구역
            </h2>
          </div>
          <p className="moa-lead max-w-[24rem]">
            5개 카테고리, 19개 브랜드. 모아 제휴 네트워크는 계속 늘어나고
            있습니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNER_GROUPS.map((g, i) => (
            <div
              key={g.label}
              className={`moa-card-flat p-5 ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-[var(--moa-r-md)] bg-[var(--moa-bg)]"
                  aria-hidden="true"
                >
                  <GroupIcon name={g.icon} />
                </span>
                <p className="text-[0.9375rem] font-bold">{g.label}</p>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.brands.map((b) => (
                  <li
                    key={b}
                    className="rounded-[var(--moa-r-pill)] border border-[var(--moa-line-soft)] bg-[#f7f8f9] px-3 py-1.5 text-[0.8125rem] font-semibold"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* closing card */}
          <div className="moa-navy-panel flex flex-col justify-center p-5">
            <p className="text-[1.0625rem] font-bold leading-snug">
              그 외 12만+ 제휴 매장
            </p>
            <p className="mt-1.5 text-[0.8125rem] font-medium leading-relaxed text-white/70">
              앱에서 내 주변 적립 가능 매장을 지도로 확인할 수 있습니다.
            </p>
          </div>
        </div>

        <p className="mt-6 text-[0.75rem] font-medium text-[var(--moa-muted)]">
          * 위 제휴사는 가상의 데모용 브랜드이며, 실제 제휴 현황과 무관합니다.
        </p>
      </div>
    </section>
  );
}

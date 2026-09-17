import { EARN_ROWS } from "@/lib/moapoint-data";

export function MoaEarn() {
  return (
    <section id="earn" className="bg-[var(--moa-bg)]">
      <div className="moa-container py-16 min-[900px]:py-20">
        <p className="moa-eyebrow">적립</p>
        <h2 className="moa-h2 mt-2 max-w-[30rem]">
          결제할 때마다 자동으로 쌓이는 포인트
        </h2>
        <p className="moa-lead mt-4 max-w-[34rem]">
          제휴 매장에서 결제하고 바코드만 보여주세요. 적립률은 매장마다
          다르지만, 쌓이는 방식은 어디나 같습니다.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {/* receipt card */}
          <div className="moa-card p-6 lg:col-span-1">
            <p className="text-[0.8125rem] font-bold">오늘의 적립 예시</p>
            <ul className="mt-4 flex flex-col divide-y divide-[var(--moa-line-soft)]">
              {EARN_ROWS.map((r) => (
                <li
                  key={r.place}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-[0.875rem] font-semibold">{r.place}</p>
                    <p className="text-[0.75rem] font-medium text-[var(--moa-muted)]">
                      {r.spent}
                    </p>
                  </div>
                  <span className="text-[0.875rem] font-bold">{r.earned}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-[var(--moa-r-md)] bg-[var(--moa-bg)] px-4 py-3 text-[0.75rem] font-medium leading-relaxed text-[var(--moa-muted)]">
              위 적립 내역은 예시이며 실제 적립률은 매장 및 프로모션에 따라
              달라집니다.
            </p>
          </div>

          {/* navy card — partner card earn */}
          <div className="moa-navy-panel flex flex-col justify-between p-6 lg:col-span-1">
            <div>
              <p className="text-[0.8125rem] font-semibold text-white/70">
                제휴 카드 적립
              </p>
              <p className="mt-2 text-[1.25rem] font-bold leading-snug">
                모아 제휴 카드로
                <br />
                추가 적립
              </p>
              <p className="mt-3 text-[0.8125rem] font-medium leading-relaxed text-white/70">
                제휴 카드로 결제하면 매장 적립 위에 카드 적립이 한 번 더
                쌓입니다. 두 번 적립되는 구조입니다.
              </p>
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div className="rounded-[var(--moa-r-md)] bg-white/10 px-4 py-3">
                <p className="text-[0.6875rem] font-medium text-white/60">
                  매장 + 카드
                </p>
                <p className="mt-0.5 text-[1.25rem] font-bold">최대 3% 적립</p>
              </div>
              <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                <rect width="40" height="40" rx="10" fill="#ffffff" fillOpacity="0.12" />
                <path
                  d="M13 26V14l7 7 7-7v12"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* soft card — auto earn */}
          <div className="moa-card-flat flex flex-col justify-between p-6 lg:col-span-1">
            <div>
              <p className="text-[0.8125rem] font-bold text-[var(--moa-muted)]">
                자동 적립
              </p>
              <p className="mt-2 text-[1.25rem] font-bold leading-snug">
                말하지 않아도
                <br />
                알아서 적립
              </p>
              <p className="mt-3 text-[0.8125rem] font-medium leading-relaxed text-[var(--moa-muted)]">
                온라인 몰은 로그인만 하면 자동 연동되고, 오프라인은 바코드
                스캔 한 번이면 끝. 영수증을 챙길 필요가 없습니다.
              </p>
            </div>
            <ul className="mt-6 flex flex-col gap-2">
              {["온라인 몰 자동 연동", "바코드 스캔 즉시 적립", "적립 누락 시 앱에서 소급 신청"].map(
                (t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 text-[0.8125rem] font-semibold"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <circle cx="8" cy="8" r="8" fill="#222832" />
                      <path
                        d="M5 8.2l2 2 4-4.4"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

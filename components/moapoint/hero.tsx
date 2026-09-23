import { PhoneMock } from "./phone-mock";

/* The earn→spend loop stated as one glanceable cycle; the phone beside
   it is the working demo, not a screenshot. */
const CYCLE = ["결제", "+P 적립", "포인트로 사용"];

export function MoaHero() {
  return (
    <section id="top" className="overflow-hidden bg-white">
      <div className="moa-container grid items-center gap-12 py-16 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:py-24">
        <div className="moa-fade-in">
          <span className="moa-chip mb-5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--moa-navy)]"
              aria-hidden="true"
            />
            하나로 모으는 통합 멤버십 · 1P = 1원
          </span>
          <h1 className="moa-h1">
            적립은 어디서든.
            <br />
            사용은 현금처럼.
          </h1>

          <ol
            className="mt-7 flex max-w-[24rem] items-center gap-2"
            aria-label="포인트 순환: 결제에서 적립, 적립에서 사용"
          >
            {CYCLE.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className="rounded-[var(--moa-r-pill)] border border-[var(--moa-line-soft)] bg-[var(--moa-bg)] px-3.5 py-2 text-[0.8125rem] font-bold">
                  {s}
                </span>
                {i < CYCLE.length - 1 ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="shrink-0 text-[var(--moa-muted)]">
                    <path d="M2 7h9m0 0L8 4m3 3l-3 3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0 text-[var(--moa-muted)]">
                    <path d="M13.5 8a5.5 5.5 0 11-1.6-3.9M13.5 2.5v2.4h-2.4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))}
          </ol>

          <p className="moa-lead mt-6 max-w-[26rem]">
            결제할 때마다 포인트가 쌓이고, 쌓인 포인트는 1포인트부터
            1원처럼 다시 쓸 수 있습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#earn" className="moa-btn moa-btn-primary">
              적립 체험해보기
            </a>
            <a href="#partners" className="moa-btn moa-btn-ghost">
              제휴 매장 보기
            </a>
          </div>
          <p className="mt-6 text-[0.8125rem] font-medium text-[var(--moa-muted)]">
            디자인 데모 · 옆의 폰 화면과 적립 체험은 브라우저에서 바로 작동합니다
          </p>
        </div>

        <div
          className="moa-fade-in"
          style={{ animationDelay: "120ms" }}
        >
          <PhoneMock />
          <p className="mt-3 text-center text-[0.75rem] font-semibold text-[var(--moa-muted)]">
            폰 안의 탭을 눌러보세요 — 실제로 화면이 바뀝니다
          </p>
        </div>
      </div>
    </section>
  );
}

import { PhoneMock } from "./phone-mock";

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
            하나로 모으는 통합 멤버십
          </span>
          <h1 className="moa-h1">
            적립은 어디서든.
            <br />
            사용은 현금처럼.
          </h1>
          <p className="moa-lead mt-5 max-w-[26rem]">
            모아 제휴 브랜드와 전국 12만 매장에서 결제할 때마다 포인트가
            쌓이고, 쌓인 포인트는 1포인트부터 1원처럼 쓸 수 있습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#download" className="moa-btn moa-btn-primary">
              무료로 시작하기
            </a>
            <a href="#partners" className="moa-btn moa-btn-ghost">
              제휴 매장 보기
            </a>
          </div>
          <p className="mt-6 text-[0.8125rem] font-medium text-[var(--moa-muted)]">
            가입 무료 · 휴대폰 인증 1회 · 실물 카드 불필요
          </p>
        </div>

        <div
          className="moa-fade-in"
          style={{ animationDelay: "120ms" }}
        >
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

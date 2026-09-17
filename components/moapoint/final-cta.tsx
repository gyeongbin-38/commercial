import { MoaWordmark } from "./wordmark";

export function MoaFinalCta() {
  return (
    <section id="download" className="bg-white">
      <div className="moa-container py-16 min-[900px]:py-20">
        <div className="moa-navy-panel px-6 py-14 text-center sm:px-12">
          <div className="flex justify-center">
            <MoaWordmark light />
          </div>
          <h2 className="mx-auto mt-6 max-w-[28rem] text-[1.75rem] font-bold leading-snug tracking-tight min-[700px]:text-[2.25rem]">
            오늘 결제부터
            <br />
            포인트로 돌려받으세요
          </h2>
          <p className="mx-auto mt-4 max-w-[26rem] text-[0.9375rem] font-medium leading-relaxed text-white/70">
            가입은 무료, 발급은 1분. 내일 장보기부터 바로 적립됩니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#top" className="moa-btn moa-btn-light">
              모아포인트 앱 다운로드
            </a>
            <a
              href="#faq"
              className="moa-btn border border-white/30 text-white transition-colors hover:bg-white/10"
            >
              자주 묻는 질문
            </a>
          </div>
          <p className="mt-6 text-[0.75rem] font-medium text-white/50">
            Android 8.0+ · iOS 15+ 지원
          </p>
        </div>
      </div>
    </section>
  );
}

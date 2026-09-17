const STEPS = [
  {
    step: "01",
    title: "앱 다운로드",
    body: "스토어에서 모아포인트 앱을 받거나 웹에서 바로 가입합니다.",
  },
  {
    step: "02",
    title: "휴대폰 인증",
    body: "본인 인증 한 번으로 멤버십이 발급됩니다. 실물 카드는 필요 없습니다.",
  },
  {
    step: "03",
    title: "바코드로 적립·사용",
    body: "매장에서 바코드를 보여주면 적립과 사용이 동시에 됩니다.",
  },
];

export function MoaSteps() {
  return (
    <section aria-label="시작 방법" className="bg-white">
      <div className="moa-container py-16 min-[900px]:py-20">
        <p className="moa-eyebrow">시작하기</p>
        <h2 className="moa-h2 mt-2">가입부터 적립까지 3단계</h2>

        <ol className="mt-10 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.step} className="moa-card-flat relative p-6">
              <p
                className="text-[2rem] font-bold leading-none text-[var(--moa-line)]"
                aria-hidden="true"
              >
                {s.step}
              </p>
              <p className="mt-4 text-[1rem] font-bold">{s.title}</p>
              <p className="mt-2 text-[0.875rem] font-medium leading-relaxed text-[var(--moa-muted)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

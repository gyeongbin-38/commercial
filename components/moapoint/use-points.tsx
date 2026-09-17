const USES = [
  {
    title: "매장에서 바로 차감",
    body: "결제 단계에서 보유 포인트가 먼저 차감됩니다. 1포인트부터 쓸 수 있어서 소액도 아깝지 않습니다.",
  },
  {
    title: "온라인 몰 결제",
    body: "모아ON, 라온백화점몰 결제 화면에서 사용할 포인트를 직접 입력할 수 있습니다.",
  },
  {
    title: "쿠폰·상품권 교환",
    body: "앱 내 포인트몰에서 커피 쿠폰부터 상품권까지 포인트로 교환합니다.",
  },
  {
    title: "포인트 선물하기",
    body: "가족이나 친구에게 포인트를 보낼 수 있습니다. 받은 포인트는 유효기간이 새로 시작됩니다.",
  },
];

export function MoaUsePoints() {
  return (
    <section id="use" className="bg-[var(--moa-bg)]">
      <div className="moa-container py-16 min-[900px]:py-20">
        <p className="moa-eyebrow">사용</p>
        <h2 className="moa-h2 mt-2 max-w-[32rem]">
          쌓인 포인트, 쓸 곳은 네 가지
        </h2>
        <p className="moa-lead mt-4 max-w-[34rem]">
          모아포인트는 1포인트가 1원입니다. 환산도, 최소 사용 단위도 따로
          외울 필요가 없습니다.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {USES.map((u, i) => (
            <div key={u.title} className="moa-card p-6">
              <div className="flex items-start gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--moa-navy)] text-[0.875rem] font-bold text-white"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[1rem] font-bold">{u.title}</p>
                  <p className="mt-1.5 text-[0.875rem] font-medium leading-relaxed text-[var(--moa-muted)]">
                    {u.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

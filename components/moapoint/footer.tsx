import { MoaWordmark } from "./wordmark";

const COLS = [
  {
    title: "서비스",
    links: [
      { href: "#earn", label: "포인트 적립" },
      { href: "#use", label: "포인트 사용" },
      { href: "#partners", label: "제휴사" },
      { href: "#faq", label: "자주 묻는 질문" },
    ],
  },
  {
    title: "고객지원",
    links: [
      { href: "#faq", label: "고객센터" },
      { href: "/moapoint/terms", label: "이용약관" },
      { href: "/moapoint/privacy", label: "개인정보처리방침" },
    ],
  },
];

export function MoaFooter() {
  return (
    <footer className="border-t bg-white" style={{ borderColor: "var(--moa-line-soft)" }}>
      <div className="moa-container grid gap-10 py-12 sm:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <MoaWordmark />
          <p className="mt-4 max-w-[20rem] text-[0.8125rem] font-medium leading-relaxed text-[var(--moa-muted)]">
            적립은 어디서든, 사용은 현금처럼. 하나로 모으는 통합
            멤버십입니다.
          </p>
        </div>
        {COLS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-[0.8125rem] font-bold">{c.title}</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[0.8125rem] font-medium text-[var(--moa-muted)] transition-colors hover:text-[var(--moa-ink)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t" style={{ borderColor: "var(--moa-line-soft)" }}>
        <div className="moa-container flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="text-[0.75rem] font-medium text-[var(--moa-muted)]">
            모아멤버스 주식회사 · 대표 김모아 · 사업자등록번호 000-00-00000
          </p>
          <p className="text-[0.75rem] font-medium text-[var(--moa-muted)]">
            가상의 브랜드로 만든 디자인 데모이며 실제 서비스와 무관합니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

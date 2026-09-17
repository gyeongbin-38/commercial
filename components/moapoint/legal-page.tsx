import { MoaNavbar } from "./navbar";
import { MoaFooter } from "./footer";

export function MoaLegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <MoaNavbar />
      <main className="moa-container max-w-[46rem] py-14">
        <p className="moa-eyebrow">모아포인트</p>
        <h1 className="moa-h2 mt-2">{title}</h1>
        <p className="mt-2 text-[0.8125rem] font-medium text-[var(--moa-muted)]">
          시행일 {updated}
        </p>
        <div className="mt-8 flex flex-col gap-6 text-[0.9375rem] font-medium leading-[1.7] text-[var(--moa-ink-soft)]">
          {children}
        </div>
      </main>
      <MoaFooter />
    </>
  );
}

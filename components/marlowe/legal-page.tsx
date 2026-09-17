import { MarNavbar } from "./navbar";
import { MarFooter } from "./footer";

export function MarLegalPage({
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
      <MarNavbar />
      <main className="mar-container max-w-[46rem] py-16">
        <p className="mar-eyebrow text-[var(--mar-volt)]">Marlowe Racing</p>
        <h1 className="mar-display mt-3 text-[clamp(2.5rem,5vw,4rem)]">
          {title}
        </h1>
        <p className="mt-3 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[var(--mar-text-dim)]">
          Effective {updated}
        </p>
        <div className="mt-10 flex flex-col gap-6 text-[0.9375rem] font-medium leading-[1.7] text-[var(--mar-text-dim)]">
          {children}
        </div>
      </main>
      <MarFooter />
    </>
  );
}

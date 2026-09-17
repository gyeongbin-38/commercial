import { FsNavbar } from "./navbar";
import { FsFooter } from "./footer";

export function FsLegalPage({
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
      <FsNavbar />
      <main className="fs-container max-w-[46rem] py-14">
        <p className="fs-eyebrow">Fieldstone Ventures</p>
        <h1 className="fs-h2 mt-3">{title}</h1>
        <p className="mt-2 text-[0.8125rem] font-medium text-[var(--fs-muted)]">
          Effective {updated}
        </p>
        <div className="mt-8 flex flex-col gap-6 text-[0.9375rem] leading-[1.7] text-[var(--fs-ink)]">
          {children}
        </div>
      </main>
      <FsFooter />
    </>
  );
}

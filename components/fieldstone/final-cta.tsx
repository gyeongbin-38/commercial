import { FsApplyForm } from "./apply-form";

export function FsFinalCta() {
  return (
    <section id="apply" className="scroll-mt-20 bg-white">
      <div className="fs-container py-16 min-[900px]:py-24">
        <div className="fs-panel px-6 py-14 text-center sm:px-12 min-[900px]:py-20">
          <h2 className="fs-serif mx-auto max-w-[44rem] text-[2.25rem] font-medium leading-[1.08] min-[700px]:text-[3.25rem]">
            Start building where you are.
          </h2>
          <p className="mx-auto mt-5 max-w-[28rem] text-[1rem] leading-relaxed text-white/70">
            Spring cohort applications are open. Idea Studio enrolls every
            quarter — pick a program and draft the application below.
          </p>
          <FsApplyForm />
          <p className="mt-7 text-[0.75rem] font-medium text-white/50">
            No tuition for founder-facing programs
          </p>
        </div>
      </div>
    </section>
  );
}

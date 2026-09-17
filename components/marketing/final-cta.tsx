import { Reveal } from "@/components/ui/reveal";
import { OrbitMark } from "@/components/ui/logo";

export function FinalCta() {
  return (
    <section className="tile bg-tile-3">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal>
          <OrbitMark size={44} onDark className="mx-auto" />
          <h2 className="text-display-lg mt-6 text-on-dark">
            Your next client is already in your inbox.
          </h2>
          <p className="text-lead mx-auto mt-4 max-w-[560px] text-muted-dark">
            Start the trial. Bring the spreadsheet. Orbit handles the rest.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#get-started" className="btn btn-primary">
              Start free trial
            </a>
            <a href="#pricing" className="btn btn-ghost-dark">
              See pricing
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

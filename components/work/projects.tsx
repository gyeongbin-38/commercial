import { Reveal } from "@/components/ui/reveal";
import { WorkShowcase } from "./showcase";

export function WorkProjects() {
  return (
    <section id="work" className="scroll-mt-20">
      <div className="wk-container pt-16 pb-10 min-[900px]:pt-24 min-[900px]:pb-14">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="wk-h2 max-w-[20ch]">
              Four landing systems and a live product
            </h2>
            <p className="wk-lead max-w-[26rem] text-[0.9375rem]">
              Four self-directed concept systems (fictional brands, disclosed
              on each site) plus Plugview, a live product build. Screenshots
              and recordings are of the actual pages.
            </p>
          </div>
        </Reveal>
      </div>

      <WorkShowcase />
    </section>
  );
}

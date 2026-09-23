import { Reveal } from "@/components/ui/reveal";
import { WorkIndex } from "./index-list";

export function WorkProjects() {
  return (
    <section id="work" className="wk-cv scroll-mt-20">
      <div className="wk-container pt-16 pb-10 min-[900px]:pt-24 min-[900px]:pb-14">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="wk-h2 max-w-[20ch]">
              One live product and four concept systems
            </h2>
            <p className="wk-lead max-w-[26rem] text-[0.9375rem]">
              Plugview is a real product build; the other four are
              self-directed concept systems with fictional brands, disclosed
              on each site. Click a card — the live site opens right here.
            </p>
          </div>
        </Reveal>
      </div>

      <WorkIndex />
    </section>
  );
}

"use client";

import { PipelineDemo } from "@/components/marketing/pipeline-demo";
import { Reveal } from "@/components/ui/reveal";

/* The actual interactive demo component that ships on /orbit — same
   code, same behavior, embedded here framed as a case study rather
   than product marketing. Runs on local state; nothing is saved. */
export function WorkTryIt() {
  return (
    <PipelineDemo
      compact
      header={
        <Reveal>
          <p className="text-caption-strong text-ink-48">
            Case study · Orbit
          </p>
          <h2 className="text-display-lg mt-2 text-ink">
            One move shows you the mechanism
          </h2>
          <p className="text-lead mx-auto mt-4 max-w-[620px] text-ink-80">
            A compact cut of the pipeline demo I built for Orbit —
            same component, same spring layout animation. Send a proposal
            card to Active. Demo data only; nothing is saved.
          </p>
        </Reveal>
      }
    />
  );
}

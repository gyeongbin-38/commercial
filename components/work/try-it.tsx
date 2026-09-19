"use client";

import { PipelineDemo } from "@/components/marketing/pipeline-demo";
import { Pop } from "./pop";

/* The actual interactive demo component that ships on /orbit —
   same code, same behavior, embedded here so visitors can touch
   the work instead of reading about it. Frame springs in. */
export function WorkTryIt() {
  return (
    <Pop rotate={-1.5}>
      <PipelineDemo />
    </Pop>
  );
}

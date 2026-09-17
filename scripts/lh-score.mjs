// Print Lighthouse scores from a JSON report: node scripts/lh-score.mjs <file>
import { readFileSync, existsSync } from "node:fs";

const file = process.argv[2];
if (!file || !existsSync(file)) {
  console.log("no output file:", file);
  process.exit(1);
}
const d = JSON.parse(readFileSync(file, "utf8"));
const c = d.categories;
console.log("performance:", Math.round(c.performance.score * 100));
for (const k of [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "speed-index",
]) {
  const a = d.audits[k];
  if (a) console.log(`${k}: ${a.displayValue}`);
}

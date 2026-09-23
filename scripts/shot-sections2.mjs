import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

mkdirSync("shots-after", { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

const shots = [
  ["/", "#work", "home-work-1440"],
  ["/", "#faq", "home-faq-1440"],
  ["/plugview", "#market", "plugview-market-1440"],
  ["/plugview", "#make", "plugview-make-1440"],
  ["/moapoint", "#earn", "moa-earn2-1440"],
  ["/fieldstone", "#programs", "fieldstone-programs-1440"],
];

for (const [route, sel, name] of shots) {
  await p.goto(`http://localhost:3100${route}`, { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(2000);
  await p.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "start" }), sel);
  await p.waitForTimeout(1600);
  await p.screenshot({ path: `shots-after/${name}.png`, timeout: 90000 });
  console.log("shot", name);
}
await b.close();

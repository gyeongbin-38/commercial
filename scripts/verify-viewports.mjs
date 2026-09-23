import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

mkdirSync("shots-after", { recursive: true });
const b = await chromium.launch();
const routes = ["", "orbit", "moapoint", "fieldstone", "marlowe", "plugview"];

for (const vw of [1280, 834, 320]) {
  const p = await b.newPage({ viewport: { width: vw, height: 900 } });
  for (const r of routes) {
    await p.goto(`http://localhost:3100/${r}`, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    await p.waitForTimeout(1800);
    const ov = await p.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    await p.screenshot({
      path: `shots-after/${r || "home"}-${vw}.png`,
      timeout: 90000,
    });
    console.log(`${r || "home"} @${vw} overflow=${ov}px`);
  }
  await p.close();
}
await b.close();

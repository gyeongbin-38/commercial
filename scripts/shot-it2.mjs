import { chromium } from "playwright-core";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("console", (m) => {
  if (m.type() === "error") errs.push(m.text());
});

await p.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
await p.waitForTimeout(1800);
await p.screenshot({ path: "shots-root/it2-hero.png" });

await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.28));
await p.waitForTimeout(1400);
await p.screenshot({ path: "shots-root/it2-deck1.png" });

await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.48));
await p.waitForTimeout(1400);
await p.screenshot({ path: "shots-root/it2-deck2.png" });

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

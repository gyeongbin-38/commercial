import { chromium } from "playwright-core";

const b = await chromium.launch();

async function shot(page, y, name) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `shots-root/audit-${name}.png` });
}

// Desktop pass — every section
const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
d.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await d.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
await d.waitForTimeout(1500);
const H = await d.evaluate(() => document.body.scrollHeight);
console.log("page height:", H);
await shot(d, 0, "d0-hero");
await shot(d, H * 0.12, "d1-deck-orbit");
await shot(d, H * 0.22, "d2-deck-mid");
await shot(d, H * 0.32, "d3-deck-mid");
await shot(d, H * 0.42, "d4-deck-end");
await shot(d, H * 0.52, "d5-tryit");
await shot(d, H * 0.62, "d6-after");
await shot(d, H * 0.72, "d7-packages");
await shot(d, H * 0.82, "d8-process");
await shot(d, H * 0.93, "d9-faq-footer");

// Mobile pass
const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
m.on("console", (mm) => { if (mm.type() === "error") errs.push("M:" + mm.text()); });
await m.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
await m.waitForTimeout(1500);
const MH = await m.evaluate(() => document.body.scrollHeight);
await shot(m, 0, "m0-hero");
await shot(m, MH * 0.25, "m1-deck");
await shot(m, MH * 0.55, "m2-tryit");
await shot(m, MH * 0.75, "m3-packages");
await shot(m, MH * 0.95, "m4-footer");

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

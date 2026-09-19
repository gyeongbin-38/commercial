import { chromium } from "playwright-core";

const b = await chromium.launch();
const errs = [];

const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
d.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await d.goto("https://gyeongbinbak.com", {
  waitUntil: "networkidle",
  timeout: 30000,
});
await d.waitForTimeout(1500);

const top = await d.evaluate(() => {
  const el = document.querySelector("#work");
  return el ? el.getBoundingClientRect().top + window.scrollY : 0;
});

for (const [name, off] of [["r1", 900], ["r2", 2200], ["r3", 3800], ["r4", 5200]]) {
  await d.evaluate((y) => window.scrollTo(0, y), top + off);
  await d.waitForTimeout(1300);
  await d.screenshot({ path: `shots-root/rail-${name}.png` });
}

const m = await b.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
m.on("console", (mm) => {
  if (mm.type() === "error") errs.push("M:" + mm.text());
});
await m.goto("https://gyeongbinbak.com", {
  waitUntil: "networkidle",
  timeout: 30000,
});
await m.waitForTimeout(1200);
const mt = await m.evaluate(() => {
  const el = document.querySelector("#work");
  return el ? el.getBoundingClientRect().top + window.scrollY : 0;
});
await m.evaluate((y) => window.scrollTo(0, y), mt + 2000);
await m.waitForTimeout(1300);
await m.screenshot({ path: "shots-root/rail-m.png" });

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

import { chromium } from "playwright-core";

const b = await chromium.launch();
const errs = [];

const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
d.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await d.goto("https://gyeongbinbak.com", {
  waitUntil: "networkidle",
  timeout: 30000,
});
await d.waitForTimeout(1800);
await d.screenshot({ path: "shots-root/dj-hero.png" });

const targets = [
  ["bento", "The parts clients"],
  ["packages", "Fixed price, fixed scope"],
  ["process", "Brief to launch"],
  ["faq", "Asked before"],
  ["footer", "Tell me what the page"],
];
for (const [name, text] of targets) {
  const el = d.locator(`h2:has-text("${text}")`).first();
  await el.scrollIntoViewIfNeeded();
  await d.waitForTimeout(1600);
  await d.screenshot({ path: `shots-root/dj-${name}.png` });
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
const el = m.locator('h2:has-text("The parts clients")').first();
await el.scrollIntoViewIfNeeded();
await m.waitForTimeout(1400);
await m.screenshot({ path: "shots-root/dj-m-bento.png" });

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

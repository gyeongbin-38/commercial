import { chromium } from "playwright-core";

const b = await chromium.launch();
const errs = [];

const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
d.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await d.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
await d.waitForTimeout(1500);
const H = await d.evaluate(() => document.body.scrollHeight);

// fully-arrived orbit panel (just past hero+marquee)
await d.evaluate((y) => window.scrollTo(0, y), H * 0.14);
await d.waitForTimeout(1400);
await d.screenshot({ path: "shots-root/fix-panel.png" });

const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
m.on("console", (mm) => { if (mm.type() === "error") errs.push("M:" + mm.text()); });
await m.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
await m.waitForTimeout(1200);
await m.screenshot({ path: "shots-root/fix-mobile-hero.png" });

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

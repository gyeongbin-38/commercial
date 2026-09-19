import { chromium } from "playwright-core";

const b = await chromium.launch();
const errs = [];
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await p.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 30000 });
await p.waitForTimeout(1500);
await p.screenshot({ path: "shots-root/idx-hero.png" });

// hover a row → preview should follow
await p.evaluate(() => document.getElementById("work")?.scrollIntoView());
await p.waitForTimeout(800);
const row = await p.locator('a:has-text("Fieldstone Ventures")').first();
const box = await row.boundingBox();
await p.mouse.move(box.x + 300, box.y + 20, { steps: 10 });
await p.waitForTimeout(900);
await p.screenshot({ path: "shots-root/idx-hover.png" });

// mobile rows
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 30000 });
await m.waitForTimeout(1000);
await m.evaluate(() => document.getElementById("work")?.scrollIntoView());
await m.waitForTimeout(600);
await m.screenshot({ path: "shots-root/idx-mobile.png" });

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

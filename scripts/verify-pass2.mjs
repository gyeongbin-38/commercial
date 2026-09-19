import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

mkdirSync("shots-pass2", { recursive: true });
const b = await chromium.launch();
const errs = [];
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
p.on("pageerror", (e) => errs.push(e.message));
await p.goto("http://localhost:3111", { waitUntil: "networkidle", timeout: 30000 });
await p.waitForTimeout(1200);
await p.screenshot({ path: "shots-pass2/hero.png" });

// --- CmdK palette ---
await p.keyboard.press("k");
await p.waitForTimeout(400);
await p.screenshot({ path: "shots-pass2/cmdk.png" });
const dialog = await p.locator('[role="dialog"]').count();
console.log("cmdk dialog open:", dialog === 1);

await p.keyboard.type("field");
await p.waitForTimeout(250);
await p.keyboard.press("Escape");
await p.waitForTimeout(300);

// --- Index hover preview + velocity tilt ---
await p.evaluate(() => document.getElementById("work")?.scrollIntoView());
await p.waitForTimeout(800);
const row = p.locator('a:has-text("Marlowe")').first();
const box = await row.boundingBox();
await p.mouse.move(box.x + 200, box.y + 30, { steps: 20 });
await p.waitForTimeout(150);
const transform = await p.evaluate(() => {
  const el = document.querySelector(".fixed.z-\\[80\\] > div");
  return el ? getComputedStyle(el).transform : "none";
});
console.log("preview transform (should have rotation ≠ none):", transform);
await p.waitForTimeout(700);
await p.screenshot({ path: "shots-pass2/index-hover.png" });

// --- Footer brief form ---
await p.evaluate(() => document.querySelector("footer")?.scrollIntoView());
await p.waitForTimeout(800);
const brief = await p.locator('form[aria-label="Quick project brief"]').count();
console.log("brief form present:", brief === 1);
await p.screenshot({ path: "shots-pass2/footer.png" });

console.log("console errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

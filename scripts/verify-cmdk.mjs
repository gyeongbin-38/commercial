import { chromium } from "playwright-core";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const misses = [];
p.on("response", (r) => { if (r.status() === 404) misses.push(r.url()); });
await p.goto("http://localhost:3111", { waitUntil: "networkidle", timeout: 30000 });
await p.waitForTimeout(800);

// Ctrl+K path
await p.keyboard.press("Control+k");
await p.waitForTimeout(350);
console.log("ctrl+k dialog:", await p.locator('[role="dialog"]').count());
await p.keyboard.type("pack");
await p.waitForTimeout(200);
await p.keyboard.press("Enter");
await p.waitForTimeout(900);
const y = await p.evaluate(() => window.scrollY);
console.log("after Enter on Packages, scrollY:", y);
await p.screenshot({ path: "shots-pass2/cmdk-after-enter.png" });

// "/" path
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(400);
await p.keyboard.press("/");
await p.waitForTimeout(350);
console.log("'/'' dialog:", await p.locator('[role="dialog"]').count());
await p.screenshot({ path: "shots-pass2/cmdk-open.png" });

console.log("404s:", misses.length ? misses.join(" | ") : "none");
await b.close();

import { chromium } from "playwright-core";
let browser = null;
for (const channel of ["msedge", "chrome"]) {
  try { browser = await chromium.launch({ channel, headless: true }); break; } catch {}
}
const page = await browser.newPage({ viewport: { width: 1440, height: 500 } });
await page.goto(process.argv[2] ?? "http://localhost:3001/plugview", { waitUntil: "networkidle" });
await page.locator('section[aria-label="Plugview capabilities"]').scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.screenshot({ path: "shots-pv/stats-1440.png" });
const text = await page.locator('section[aria-label="Plugview capabilities"]').textContent();
console.log("stats text:", JSON.stringify(text));
await browser.close();

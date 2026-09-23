// Aside removed — cards must navigate straight to the project page.
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3100";
const b = await chromium.launch();
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.locator("#work").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);

// Click the first featured card (Plugview) — expect same-tab navigation
await page.locator('#work a[href="/plugview"]').first().click();
await page.waitForURL("**/plugview", { timeout: 10000 });
console.log("PASS card click navigates to", page.url());

// No dialog should exist anywhere
const dlg = await page.locator('[role="dialog"]').count();
console.log(dlg === 0 ? "PASS no aside/dialog" : "FAIL dialog still present");

// Back to home, check a compact row link too
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
await page.locator("#work").scrollIntoViewIfNeeded();
await page.locator('#work a[href="/moapoint"]').first().click();
await page.waitForURL("**/moapoint", { timeout: 10000 });
console.log("PASS compact row navigates to", page.url());

// Home overflow still clean
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);
const over = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
console.log(over === 0 ? "PASS home overflow 0" : `FAIL home overflow ${over}px`);

await page.screenshot({ path: "shots-redesign/home-noaside-1440.png" });
await b.close();

import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

mkdirSync("shots-after", { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3100/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2000);

// scroll to work, click featured Orbit card
await p.evaluate(() => document.querySelector("#work")?.scrollIntoView());
await p.waitForTimeout(1200);
await p.locator('a[href="/orbit"]').first().dispatchEvent("click");
await p.waitForTimeout(900);

const dialog = p.locator('[role="dialog"][aria-modal="true"]');
console.log("aside open:", await dialog.count());
console.log("aria-label:", await dialog.getAttribute("aria-label"));
console.log("focus on close:", await p.evaluate(() => document.activeElement?.getAttribute("aria-label")));
console.log("body overflow:", await p.evaluate(() => document.body.style.overflow));

// live iframe stage
await p.waitForTimeout(2500);
const stage = await p.evaluate(() => {
  const f = document.querySelector('[role="dialog"] iframe');
  if (!f) return null;
  const r = f.getBoundingClientRect();
  const t = new DOMMatrixReadOnly(getComputedStyle(f).transform);
  return {
    attrW: f.getAttribute("width") || f.style.width,
    styleW: f.style.width,
    scale: t.a.toFixed(3),
    renderedW: Math.round(r.width),
    insideDoc: (() => { try { return f.contentDocument?.title ? "same-origin ok" : "empty"; } catch (e) { return "blocked"; } })(),
  };
});
console.log("iframe stage:", JSON.stringify(stage));
console.log("has Open live site:", await dialog.locator('a[target="_blank"]').count());

// device toggle -> mobile re-render at 390px
await dialog.getByLabel("mobile preview").dispatchEvent("click");
await p.waitForTimeout(800);
const mobW = await p.evaluate(() => document.querySelector('[role="dialog"] iframe')?.style.width);
console.log("mobile toggle frame width:", mobW);
await p.screenshot({ path: "shots-after/aside-orbit-1440.png", timeout: 60000 });

// Tab trap: cycle focus — should stay inside dialog
for (let i = 0; i < 5; i++) await p.keyboard.press("Tab");
const stillIn = await p.evaluate(() =>
  document.querySelector('[role="dialog"]')?.contains(document.activeElement),
);
console.log("focus trapped inside after 5 tabs:", stillIn);

// Esc closes + focus restored
await p.keyboard.press("Escape");
await p.waitForTimeout(700);
console.log("dialog closed:", (await p.locator('[role="dialog"]').count()) === 0);
console.log(
  "focus restored:",
  await p.evaluate(() => document.activeElement?.getAttribute("href")),
);
console.log("overflow restored:", await p.evaluate(() => document.body.style.overflow === ""));

// compact row also opens aside
await p.evaluate(() => document.querySelector("#work")?.scrollIntoView());
await p.waitForTimeout(600);
await p.locator('a[href="/moapoint"]').first().dispatchEvent("click");
await p.waitForTimeout(800);
console.log("compact row opens aside:", await p.locator('[role="dialog"]').count());
await p.screenshot({ path: "shots-after/aside-moa-1440.png", timeout: 60000 });
await p.keyboard.press("Escape");

// overlay click closes
await p.locator('a[href="/marlowe"]').first().dispatchEvent("click");
await p.waitForTimeout(800);
await p.mouse.click(300, 450); // click left of the 480px panel
await p.waitForTimeout(600);
console.log("overlay click closes:", (await p.locator('[role="dialog"]').count()) === 0);

// mobile
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3100/", { waitUntil: "domcontentloaded" });
await m.waitForTimeout(1800);
await m.evaluate(() => document.querySelector("#work")?.scrollIntoView());
await m.waitForTimeout(800);
await m.locator('a[href="/orbit"]').first().dispatchEvent("click");
await m.waitForTimeout(900);
await m.screenshot({ path: "shots-after/aside-390.png", timeout: 60000 });
const mOv = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log("mobile aside open, overflow:", mOv, "px");
await m.close();

await b.close();

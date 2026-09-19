import { chromium } from "playwright-core";

const BASE = "http://localhost:3000";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
await p.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
await p.waitForTimeout(1200);

// scroll into rail
const work = await p.evaluate(() => document.getElementById("work")?.offsetTop ?? 0);
await p.evaluate((y) => window.scrollTo(0, y + 100), work);
await p.waitForTimeout(800);

// Tab until a "Visit live site" link is focused, keep tabbing through cards
let hits = [];
for (let i = 0; i < 40; i++) {
  await p.keyboard.press("Tab");
  await p.waitForTimeout(120);
  const info = await p.evaluate(() => {
    const el = document.activeElement;
    const counter = [...document.querySelectorAll("span")].find((s) => /^0[1-5]$/.test(s.textContent?.trim() ?? "") && s.getAttribute("aria-live"));
    return {
      tag: el?.tagName,
      text: el?.textContent?.trim().slice(0, 30),
      href: el?.getAttribute("href"),
      counter: counter?.textContent?.trim(),
    };
  });
  if (info.text?.includes("Visit live site") || info.text === "Pause" || info.text === "Play") {
    hits.push(info);
    if (hits.length >= 4) break;
  }
}
console.log("focus trail:");
hits.forEach((h) => console.log(`  counter=${h.counter} | ${h.tag} ${h.text} -> ${h.href ?? ""}`));

// Esc focus return on mobile menu
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
await m.waitForTimeout(800);
await m.click('button[aria-controls="wk-mobile-menu"]');
await m.waitForTimeout(300);
await m.focus('#wk-mobile-menu a[href="#faq"]');
await m.keyboard.press("Escape");
await m.waitForTimeout(300);
const focused = await m.evaluate(() => document.activeElement?.getAttribute("aria-label"));
console.log("after Esc, focused:", focused);

// collage srcset present?
const srcset = await p.evaluate(() => {
  const img = document.querySelector(".wk-collage-img");
  return img?.getAttribute("srcset") ? "yes" : "no";
});
console.log("collage srcset:", srcset);

await b.close();

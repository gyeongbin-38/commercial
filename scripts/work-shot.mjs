import { chromium } from "playwright-core";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("pageerror", (e) => console.log("PAGE_ERR:", String(e).slice(0, 300)));
p.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE_ERR:", m.text().slice(0, 200));
});
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(2500);
await p.screenshot({ path: "work-hero.png" });
// work index + hover preview check
await p.evaluate(() => document.querySelector("#work")?.scrollIntoView());
await p.waitForTimeout(1200);
const row = p.locator("ul li a").first();
await row.hover();
await p.waitForTimeout(700);
await p.screenshot({ path: "work-index.png" });
const previewVisible = await p.evaluate(() => {
  const el = document.querySelector(".wk-index-preview");
  return el ? getComputedStyle(el).display : "none";
});
console.log("preview display on hover:", previewVisible);
// mobile
await p.setViewportSize({ width: 390, height: 844 });
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(800);
await p.screenshot({ path: "work-mobile.png" });
await b.close();
console.log("done");

import { chromium } from "playwright-core";

const b = await chromium.launch();
const errs = [];

const p = await b.newPage({ viewport: { width: 390, height: 844 } });
p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await p.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
await p.waitForTimeout(1500);
console.log("mobile menu btn:", !!(await p.$('button[aria-controls="wk-mobile-menu"]')));
const srcset = await p.evaluate(() => document.querySelector(".wk-collage-img")?.getAttribute("srcset") ? "yes" : "no");
console.log("collage srcset:", srcset);
await p.close();

const d = await b.newPage({ viewport: { width: 1366, height: 768 } });
d.on("console", (m) => { if (m.type() === "error") errs.push(`desktop: ${m.text()}`); });
await d.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
await d.waitForTimeout(1500);
const work = await d.evaluate(() => document.getElementById("work")?.offsetTop ?? 0);
await d.evaluate((y) => window.scrollTo(0, y + 2000), work);
await d.waitForTimeout(1200);
const linkOk = await d.evaluate(() => {
  const link = [...document.querySelectorAll("a")].find((a) => {
    if (!a.textContent?.includes("Visit live site")) return false;
    const r = a.getBoundingClientRect();
    return r.top > 0 && r.bottom < innerHeight && r.left > 0 && r.right < innerWidth;
  });
  if (!link) return "none visible";
  const r = link.getBoundingClientRect();
  const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
  return el === link || link.contains(el) ? "OK" : "blocked";
});
console.log("live 1366x768 link:", linkOk);
await d.close();

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

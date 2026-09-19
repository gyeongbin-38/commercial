import { chromium } from "playwright-core";

const BASE = "http://localhost:3000";
const b = await chromium.launch();
const errs = [];

// 1) Short viewports — controls must not intercept card links
for (const [w, h] of [[900, 620], [1024, 640], [1280, 720]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.on("console", (m) => { if (m.type() === "error") errs.push(`${w}x${h}: ${m.text()}`); });
  await p.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1200);
  const work = await p.evaluate(() => document.getElementById("work")?.offsetTop ?? 0);
  // scroll to rail middle
  await p.evaluate((y) => window.scrollTo(0, y + 1500), work);
  await p.waitForTimeout(1200);
  const res = await p.evaluate(() => {
    const link = [...document.querySelectorAll("a")].find((a) => {
      if (!a.textContent?.includes("Visit live site")) return false;
      const r = a.getBoundingClientRect();
      return r.top > 0 && r.bottom < innerHeight && r.left > 0 && r.right < innerWidth;
    });
    if (!link) return "no fully-visible link";
    const r = link.getBoundingClientRect();
    const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return el === link || link.contains(el) ? "OK" : `blocked by: ${el?.tagName}.${el?.className}`;
  });
  console.log(`${w}x${h} link click target: ${res}`);
  await p.screenshot({ path: `shots-root/audit-${w}x${h}.png` });
  await p.close();
}

// 2) Mobile menu at 390
{
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  p.on("console", (m) => { if (m.type() === "error") errs.push(`mobile: ${m.text()}`); });
  await p.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1000);
  const btn = await p.$('button[aria-controls="wk-mobile-menu"]');
  const btnBox = btn ? await btn.boundingBox() : null;
  console.log("mobile menu button:", btnBox ? `${Math.round(btnBox.width)}x${Math.round(btnBox.height)}px` : "MISSING");
  await btn.click();
  await p.waitForTimeout(400);
  await p.screenshot({ path: "shots-root/audit-mobile-menu.png" });
  // tap Packages link
  await p.click('#wk-mobile-menu a[href="#packages"]');
  await p.waitForTimeout(1200);
  const url = p.url();
  console.log("menu nav:", url.includes("#packages") ? "OK" : url);
  await p.close();
}

// 3) Demo gray contrast — computed color of ink-48 text
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1000);
  const c = await p.evaluate(() => {
    const el = document.querySelector(".text-ink-48");
    return el ? getComputedStyle(el).color : "not found";
  });
  console.log("ink-48 computed:", c);
  // faq lead size — should now be 15px (utility wins)
  const fs = await p.evaluate(() => {
    const el = [...document.querySelectorAll("p")].find((e) => e.textContent?.includes("Anything else?"));
    return el ? getComputedStyle(el).fontSize : "not found";
  });
  console.log("faq lead font-size:", fs);
  await p.screenshot({ path: "shots-root/audit-desktop.png" });
  await p.close();
}

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

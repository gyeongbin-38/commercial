import { chromium } from "playwright-core";

const b = await chromium.launch();
const errs = [];

// 1366x768 — short desktop: captions must not clip in the sticky rail
{
  const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  await p.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1500);
  const work = await p.evaluate(() => document.getElementById("work")?.offsetTop ?? 0);
  await p.evaluate((y) => window.scrollTo(0, y + 400), work);
  await p.waitForTimeout(1200);
  await p.screenshot({ path: "shots-root/short-768-c1.png" });
  await p.evaluate((y) => window.scrollTo(0, y + 2400), work);
  await p.waitForTimeout(1200);
  await p.screenshot({ path: "shots-root/short-768-c4.png" });
  await p.close();
}

// Very short — below the 620px rail threshold, must fall back to list
{
  const p = await b.newPage({ viewport: { width: 1100, height: 560 } });
  p.on("console", (m) => { if (m.type() === "error") errs.push(`560h: ${m.text()}`); });
  await p.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1500);
  await p.evaluate(() => document.getElementById("work")?.scrollIntoView());
  await p.waitForTimeout(600);
  await p.screenshot({ path: "shots-root/short-560-work.png" });
  await p.close();
}

// Bento — new 2x2 grid
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1500);
  await p.evaluate(() => {
    const h = [...document.querySelectorAll("h2")].find((e) =>
      e.textContent.includes("clients don't see"),
    );
    h?.scrollIntoView({ block: "start" });
  });
  await p.waitForTimeout(900);
  await p.screenshot({ path: "shots-root/short-bento.png" });
  await p.close();
}

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

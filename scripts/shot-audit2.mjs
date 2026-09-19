import { chromium } from "playwright-core";

const b = await chromium.launch();
const errs = [];

// Desktop widths — rail mode
for (const w of [1440, 1280]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  p.on("console", (m) => { if (m.type() === "error") errs.push(`${w}: ${m.text()}`); });
  await p.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `shots-root/a2-${w}-hero.png` });
  const work = await p.evaluate(() => document.getElementById("work")?.offsetTop ?? 0);
  await p.evaluate((y) => window.scrollTo(0, y + 1200), work);
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `shots-root/a2-${w}-rail.png` });
  await p.close();
}

// Tablet — below the 900px rail boundary, should read as a list
{
  const p = await b.newPage({ viewport: { width: 834, height: 1112 } });
  p.on("console", (m) => { if (m.type() === "error") errs.push(`834: ${m.text()}`); });
  await p.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1500);
  await p.evaluate(() => document.getElementById("work")?.scrollIntoView());
  await p.waitForTimeout(800);
  await p.screenshot({ path: "shots-root/a2-834-work.png" });
  await p.close();
}

// Reduced-motion — showcase must read as a plain vertical list
{
  const p = await b.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  p.on("console", (m) => { if (m.type() === "error") errs.push(`rm: ${m.text()}`); });
  await p.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1500);
  await p.evaluate(() => document.getElementById("work")?.scrollIntoView());
  await p.waitForTimeout(600);
  await p.screenshot({ path: "shots-root/a2-rm-work.png" });
  await p.close();
}

// Keyboard — tab from top, check no focus lands offscreen in the rail
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1200);
  const focusTrail = [];
  for (let i = 0; i < 22; i++) {
    await p.keyboard.press("Tab");
    await p.waitForTimeout(90);
    const info = await p.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        text: (el.textContent || "").trim().slice(0, 40),
        href: el.getAttribute("href"),
        visible: r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight,
        offscreen: r.right < 0 || r.left > innerWidth,
      };
    });
    if (info) focusTrail.push(info);
  }
  console.log("focus trail:");
  for (const f of focusTrail)
    console.log(`  ${f.tag} "${f.text}" href=${f.href} visible=${f.visible} offscreen=${f.offscreen}`);
  await p.close();
}

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

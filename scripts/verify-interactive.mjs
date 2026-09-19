import { chromium } from "playwright-core";

const BASE = "http://localhost:3000";
const b = await chromium.launch();
const errs = [];

const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await p.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
await p.waitForTimeout(1800);
await p.screenshot({ path: "shots-root/int-hero.png" });

// move pointer over a link — cursor ring should swell (blend dot visible)
await p.mouse.move(200, 200);
await p.mouse.move(560, 720, { steps: 10 });
await p.waitForTimeout(400);
await p.screenshot({ path: "shots-root/int-cursor.png", clip: { x: 400, y: 600, width: 400, height: 220 } });

// scroll to rail, hover media for tilt/glare
const work = await p.evaluate(() => document.getElementById("work")?.offsetTop ?? 0);
await p.evaluate((y) => window.scrollTo(0, y + 1500), work);
await p.waitForTimeout(1400);
await p.mouse.move(683, 350, { steps: 12 });
await p.waitForTimeout(400);
await p.screenshot({ path: "shots-root/int-rail.png" });

// process bars
await p.evaluate(() => document.getElementById("process")?.scrollIntoView({ block: "center" }));
await p.waitForTimeout(1200);
await p.screenshot({ path: "shots-root/int-process.png" });

// video element state on active card
const vid = await p.evaluate(() => {
  const v = document.querySelector("video");
  return v ? { ready: v.readyState, playing: !v.paused, src: v.src.split("/").pop() } : "none";
});
console.log("video:", JSON.stringify(vid));

console.log("errors:", errs.length ? errs.join(" | ") : "none");
await b.close();

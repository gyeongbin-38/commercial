import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

/* Captures fresh plugview assets from the live site:
   - hero screenshot (1600x1000, 8:5) -> tmp plugview-shot.png
   - scroll recording (1280x720 webm) -> tmp video dir
   Post-process to webp/small webm with ffmpeg. */

mkdirSync("tmp-assets", { recursive: true });

const b = await chromium.launch({
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});

// --- screenshot ---
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.goto("https://gyeongbinbak.com/plugview", {
  waitUntil: "networkidle",
  timeout: 90000,
});
await p.waitForTimeout(8000);
await p.screenshot({ path: "tmp-assets/plugview-shot.png", timeout: 120000 });
await p.close();

// --- scroll recording ---
const ctx = await b.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: "tmp-assets", size: { width: 1280, height: 720 } },
});
const v = await ctx.newPage();
await v.goto("https://gyeongbinbak.com/plugview", {
  waitUntil: "networkidle",
  timeout: 90000,
});
await v.waitForTimeout(5000);
// slow scroll through hero -> deck -> contact, then back up
for (const y of [400, 900, 1400, 1900]) {
  await v.evaluate((yy) => window.scrollTo({ top: yy, behavior: "smooth" }), y);
  await v.waitForTimeout(1600);
}
await v.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
await v.waitForTimeout(1800);
const video = v.video();
await ctx.close();
const path = await video.path();
console.log("video saved:", path);
await b.close();
console.log("done");

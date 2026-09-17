// Card hover previews: node scripts/preview-videos.mjs
// Records a short scroll-through of each demo into public/work/*.webm
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const base = "https://commercial-nine-ashen.vercel.app";
const out = "public/work";
const tmp = "tmp-videos";
mkdirSync(out, { recursive: true });
mkdirSync(tmp, { recursive: true });

const sites = [
  { id: "orbit", path: "/" },
  { id: "moapoint", path: "/moapoint" },
  { id: "fieldstone", path: "/fieldstone" },
  { id: "marlowe", path: "/marlowe" },
];

const channels = ["msedge", "chrome"];
let browser = null;
for (const channel of channels) {
  try {
    browser = await chromium.launch({ channel, headless: true });
    break;
  } catch {}
}
if (!browser) browser = await chromium.launch({ headless: true });

for (const site of sites) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: tmp, size: { width: 1280, height: 800 } },
  });
  const page = await context.newPage();
  await page.goto(`${base}${site.path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  // Slow scroll through the page like a reader.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.35;
    for (let y = 0; y < document.body.scrollHeight * 0.5; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 260));
    }
  });
  const video = page.video();
  await context.close();
  if (video) {
    const src = await video.path();
    const { copyFileSync, renameSync } = await import("node:fs");
    copyFileSync(src, `${out}/${site.id}.webm`);
    console.log(`${site.id}: recorded`);
  } else {
    console.log(`${site.id}: no video produced`);
  }
}

await browser.close();

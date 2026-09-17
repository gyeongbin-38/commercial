// Screenshot QA helper: node scripts/shot.mjs <url> <outDir>
// Tries installed browsers (Edge, Chrome) before falling back to a
// downloaded chromium build.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3001";
const out = process.argv[3] ?? "shots";
mkdirSync(out, { recursive: true });

const channels = ["msedge", "chrome"];
let browser = null;
for (const channel of channels) {
  try {
    browser = await chromium.launch({ channel, headless: true });
    console.log(`launched channel: ${channel}`);
    break;
  } catch {}
}
if (!browser) {
  try {
    browser = await chromium.launch({ headless: true });
    console.log("launched bundled chromium");
  } catch (e) {
    console.error("no browser available:", e.message);
    process.exit(1);
  }
}

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
];

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  // Fold capture first (before scrolling).
  await page.screenshot({ path: `${out}/${vp.name}-fold.png` });
  // Scroll through the page like a real reader so `whileInView`
  // reveals (once: true) fire and finish before the full capture.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/${vp.name}-full.png`, fullPage: true });
  console.log(
    `${vp.name}: captured. console errors: ${errors.length ? errors.join(" | ") : "none"}`,
  );
  await page.close();
}

await browser.close();

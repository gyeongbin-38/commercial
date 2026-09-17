// Work-card thumbnails: node scripts/thumbs.mjs
// Captures the hero fold of each live demo site into public/work/.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const base = "https://commercial-nine-ashen.vercel.app";
const out = "public/work";
mkdirSync(out, { recursive: true });

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
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  await page.goto(`${base}${site.path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/${site.id}.png` });
  console.log(`${site.id}: captured`);
  await page.close();
}

await browser.close();

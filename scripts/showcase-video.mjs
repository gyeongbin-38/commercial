// Showcase video: one continuous take of slate -> site -> slate -> ...
// Usage: node scripts/showcase-video.mjs  (produces video/showcase.webm)
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const base = "https://gyeongbinbak.com";
const outDir = "video";
const tmpDir = "tmp-showcase";
mkdirSync(outDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const projects = [
  { id: "orbit", name: "Orbit", kind: "B2B SaaS marketing site", lang: "EN" },
  { id: "moapoint", name: "MOA POINT", kind: "Korean fintech membership landing", lang: "KO" },
  { id: "fieldstone", name: "Fieldstone Ventures", kind: "Editorial founder-ecosystem landing", lang: "EN" },
  { id: "marlowe", name: "Marlowe Racing", kind: "Motorsport driver hub", lang: "EN" },
  { id: "plugview", name: "Plugview", kind: "Live product, UI asset market", lang: "EN" },
];

const slate = (kicker, title, sub, foot) => {
  const file = path.resolve(tmpDir, `slate-${Math.random().toString(36).slice(2)}.html`);
  writeFileSync(
    file,
    `<!doctype html><html><body style="margin:0;height:100vh;display:flex;flex-direction:column;justify-content:center;background:#f6f4ee;color:#191817;font-family:'Segoe UI',system-ui,sans-serif;padding:0 96px;">
      <div style="font-size:15px;letter-spacing:.22em;text-transform:uppercase;color:#c2410c;font-weight:600;">${kicker}</div>
      <div style="font-size:64px;font-weight:700;letter-spacing:-0.02em;margin-top:14px;line-height:1.05;">${title}</div>
      <div style="font-size:20px;color:#6b675f;margin-top:16px;">${sub}</div>
      <div style="position:absolute;left:96px;bottom:56px;font-size:14px;color:#9a958c;">${foot}</div>
    </body></html>`
  );
  return `file:///${file.replace(/\\/g, "/")}`;
};

const channels = ["msedge", "chrome"];
let browser = null;
for (const channel of channels) {
  try {
    browser = await chromium.launch({ channel, headless: true });
    break;
  } catch {}
}
if (!browser) browser = await chromium.launch({ headless: true });

const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: tmpDir, size: { width: 1280, height: 720 } },
});
const page = await context.newPage();

const hold = (ms) => page.waitForTimeout(ms);
const scrollThrough = async (ms) => {
  // Stepped smooth-ish scroll: rAF can stall under video recording,
  // so drive it with setTimeout like preview-videos.mjs.
  await page.evaluate(async (dur) => {
    const max = Math.min(
      document.body.scrollHeight - innerHeight,
      innerHeight * 6
    );
    const steps = Math.max(1, Math.round(dur / 120));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const ease = 1 - Math.pow(1 - t, 2);
      window.scrollTo({ top: max * ease, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
  }, ms);
};

// Intro card
console.log("intro slate");
await page.goto(
  slate(
    "Portfolio",
    "Landing pages, designed and built.",
    "Gyeongbin Bak — one person, design + Next.js",
    "gyeongbinbak.com"
  )
);
await hold(3200);

for (let i = 0; i < projects.length; i++) {
  const p = projects[i];
  console.log(`${p.id}: slate`);
  await page.goto(
    slate(
      `Project ${String(i + 1).padStart(2, "0")} / 05 · ${p.lang}`,
      p.name,
      p.kind,
      `${base}/${p.id}`
    )
  );
  await hold(2400);
  console.log(`${p.id}: site`);
  await page.goto(`${base}/${p.id}`, { waitUntil: "domcontentloaded" });
  await hold(2000);
  await scrollThrough(7000);
  await hold(800);
  console.log(`${p.id}: done`);
}

// End card
await page.goto(
  slate(
    "Fixed price · 5-10 day delivery",
    "Let's build yours.",
    "gyeongbinb38@gmail.com",
    "gyeongbinbak.com"
  )
);
await hold(4000);

const video = page.video();
await context.close();
await browser.close();

const src = await video.path();
const { copyFileSync } = await import("node:fs");
copyFileSync(src, `${outDir}/showcase.webm`);
console.log(`recorded: ${outDir}/showcase.webm`);

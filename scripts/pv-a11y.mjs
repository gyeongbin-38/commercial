// Plugview a11y spot checks: keyboard focus + reduced-motion + flat hero.
// node scripts/pv-a11y.mjs <url> <outDir>
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3001/plugview";
const out = process.argv[3] ?? "shots-pv";
mkdirSync(out, { recursive: true });

let browser = null;
for (const channel of ["msedge", "chrome"]) {
  try { browser = await chromium.launch({ channel, headless: true }); break; } catch {}
}
if (!browser) browser = await chromium.launch({ headless: true });

const results = [];
const check = (name, ok, detail = "") =>
  results.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

// Atlas present, old image treatment gone
const heroState = await page.evaluate(() => ({
  atlas: !!document.querySelector(".pv-atlas"),
  scanLine: !!document.querySelector(".pv-scan-line"),
  liveDot: !!document.querySelector(".pv-live-dot"),
  heroImg: !!document.querySelector('main section img[src*="plugview-screen"]'),
  preserve3d: !!document.querySelector('#top [style*="preserve-3d"], main section [style*="transform-style"]'),
}));
check("atlas panel present in hero", heroState.atlas);
check(
  "old image/3D treatment removed",
  !heroState.scanLine && !heroState.liveDot && !heroState.heroImg && !heroState.preserve3d,
  JSON.stringify(heroState),
);

let ctaFocused = false;
for (let i = 0; i < 14; i++) {
  await page.keyboard.press("Tab");
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const s = getComputedStyle(el);
    return { text: el.textContent?.trim().slice(0, 30), outline: s.outlineStyle !== "none" ? s.outlineWidth : s.boxShadow };
  });
  if (info?.text?.startsWith("Explore assets")) {
    ctaFocused = true;
    check("keyboard reaches hero primary CTA with focus", true, `outline: ${info.outline}`);
    break;
  }
}
if (!ctaFocused) check("keyboard reaches hero primary CTA", false, "not focused in 14 tabs");
await page.close();

const rp = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await rp.goto(url, { waitUntil: "networkidle" });
await rp.waitForTimeout(600);
const rm = await rp.evaluate(() => {
  const atlas = document.querySelector(".pv-atlas");
  const hero = document.querySelector("main > section");
  const animated = [...document.querySelectorAll(".pv-atlas *")].filter(
    (el) => getComputedStyle(el).animationName !== "none" || getComputedStyle(el).transitionDuration !== "0s",
  );
  return {
    atlasTransform: atlas ? getComputedStyle(atlas).transform : "missing",
    heroTransform: hero ? getComputedStyle(hero).transform : "missing",
    animatedInside: animated.length,
  };
});
check(
  "reduced-motion: atlas static, no transforms",
  rm.atlasTransform === "none" && rm.animatedInside === 0,
  JSON.stringify(rm),
);
await rp.screenshot({ path: `${out}/pv-fold-reduced.png` });
await rp.close();

console.log(results.join("\n"));
await browser.close();
process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);

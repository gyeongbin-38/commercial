// Post-redesign verification: new key scenes + regressions + shots.
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3100";
const results = [];
const ok = (name, pass, extra = "") => {
  results.push({ name, pass, extra });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${extra ? " — " + extra : ""}`);
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.setDefaultTimeout(15000);

// ---------- / hub: BuildScene ----------
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
const stageBtns = await page.locator('[role="group"][aria-label*="build" i] button, [aria-label*="stage" i] button').count();
const buildSceneBtns = await page.evaluate(() => {
  const btns = [...document.querySelectorAll("button")].map((b) => b.textContent?.trim());
  return btns.filter((t) => /concept|build|device|sketch|wireframe/i.test(t ?? ""));
});
ok("hub: build-scene stage controls exist", buildSceneBtns.length >= 2, JSON.stringify(buildSceneBtns));
// click through stages, check iframe mounts on live stage
for (const label of buildSceneBtns.slice(0, 3)) {
  await page.getByRole("button", { name: new RegExp(label, "i") }).first().click().catch(() => {});
  await page.waitForTimeout(400);
}
const heroIframe = await page.locator("section iframe").count();
ok("hub: build-scene iframe mounts", heroIframe >= 1, `iframes=${heroIframe}`);

// card order: plugview first
const order = await page.evaluate(() =>
  [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute("href")),
);
ok("hub: plugview card present", order.includes("/plugview"));

// ---------- /orbit: overdue workflow ----------
await page.goto(`${BASE}/orbit`, { waitUntil: "networkidle" });
const orbitActs = await page.evaluate(() =>
  [...document.querySelectorAll("button")].map((b) => b.textContent?.trim()).filter((t) => /reminder|snooze|call/i.test(t ?? "")),
);
ok("orbit: hero action buttons", orbitActs.length >= 2, JSON.stringify(orbitActs));
if (orbitActs.length) {
  await page.getByRole("button", { name: /snooze/i }).first().click();
  await page.waitForTimeout(900);
  const handled = await page.evaluate(() =>
    /done|handled|queued|reschedul/i.test(document.body.innerText),
  );
  const undo = await page.getByRole("button", { name: /undo/i }).count();
  ok("orbit: action → handled state + undo", handled && undo > 0);
}

// ---------- /moapoint: cycle + accordion ----------
await page.goto(`${BASE}/moapoint`, { waitUntil: "networkidle" });
const cycle = await page.evaluate(() =>
  /결제/.test(document.body.innerText) && /적립/.test(document.body.innerText),
);
const tabs = await page.locator('[aria-expanded]').count();
ok("moapoint: earn cycle + partner accordions", cycle && tabs >= 5, `toggles=${tabs}`);
// open an accordion
const accBtn = page.locator("#partners button[aria-expanded]").nth(1);
await accBtn.click();
await page.waitForTimeout(400);
ok("moapoint: accordion expands", (await accBtn.getAttribute("aria-expanded")) === "true");

// ---------- /fieldstone: journey spine ----------
await page.goto(`${BASE}/fieldstone`, { waitUntil: "networkidle" });
const spine = await page.evaluate(() => {
  const t = document.body.innerText;
  return {
    outcomes: (t.match(/You leave with/g) || []).length,
    concept: /Concept figure|fictional|Illustrative/i.test(t),
    programs: /Idea Studio|Launch Accelerator|Capital Pathways/.test(t),
  };
});
ok("fieldstone: outcomes×4 + concept label + program tags",
  spine.outcomes >= 4 && spine.concept && spine.programs,
  JSON.stringify(spine));

// ---------- /marlowe: season board + h1 a11y ----------
await page.goto(`${BASE}/marlowe`, { waitUntil: "networkidle" });
const mar = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  const t = document.body.innerText;
  return {
    h1Label: h1?.getAttribute("aria-label"),
    board: /solenne coast|vulcan pass/i.test(t) && /187 pts/i.test(t),
    fictional: /Fictional team/i.test(t),
  };
});
ok("marlowe: h1 aria-label + season board + fictional label",
  mar.h1Label === "Jett Marlowe" && mar.board && mar.fictional,
  JSON.stringify(mar));

// ---------- /plugview: interactive hero queue ----------
await page.goto(`${BASE}/plugview`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
const pvBtn = page.locator('button[aria-pressed]').first();
const pvHas = await pvBtn.count();
ok("plugview: hero queue button exists", pvHas > 0);
if (pvHas) {
  await pvBtn.dispatchEvent("click");
  await page.waitForTimeout(500);
  const open3 = await page.evaluate(() => /3 OPEN/.test(document.body.innerText));
  ok("plugview: queue click → 3 OPEN", open3);
}

// ---------- overflow sweep ----------
for (const route of ["/", "/orbit", "/moapoint", "/fieldstone", "/marlowe", "/plugview"]) {
  for (const w of [1440, 390]) {
    const p = await ctx.newPage();
    await p.setViewportSize({ width: w, height: 900 });
    await p.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(1200);
    const over = await p.evaluate(() =>
      Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
    );
    ok(`overflow ${route} @${w}`, over === 0, `${over}px`);
    await p.close();
  }
}

// ---------- screenshots ----------
await page.setViewportSize({ width: 1440, height: 900 });
const shots = [
  ["/", "home"], ["/orbit", "orbit"], ["/moapoint", "moapoint"],
  ["/fieldstone", "fieldstone"], ["/marlowe", "marlowe"], ["/plugview", "plugview"],
];
const snap = async (p, path) => {
  try {
    await p.screenshot({ path, timeout: 45000 });
  } catch {
    console.log(`  (shot skipped: ${path})`);
  }
};
for (const [route, name] of shots) {
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2200);
  await snap(page, `shots-redesign/${name}-1440.png`);
}
await page.setViewportSize({ width: 390, height: 844 });
for (const [route, name] of shots) {
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1800);
  await snap(page, `shots-redesign/${name}-390.png`);
}
console.log("\nScreenshots → shots-redesign/");

const fails = results.filter((r) => !r.pass);
console.log(`\n${results.length - fails.length}/${results.length} passed`);
await browser.close();
process.exit(fails.length ? 1 : 0);

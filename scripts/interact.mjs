// Interaction QA: exercises every interactive element on the page.
// node scripts/interact.mjs <url>
import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:3001";

let browser = null;
for (const channel of ["msedge", "chrome"]) {
  try {
    browser = await chromium.launch({ channel, headless: true });
    break;
  } catch {}
}
if (!browser) browser = await chromium.launch({ headless: true });

const results = [];
const check = (name, ok, detail = "") =>
  results.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push(String(e)));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

// --- 1. Desktop nav link scrolls to section ---
await page.click('nav >> text="Pricing"');
let scrolledTo = false;
for (let i = 0; i < 20 && !scrolledTo; i++) {
  await page.waitForTimeout(250);
  scrolledTo = await page.evaluate(() => {
    const el = document.querySelector("#pricing");
    return el ? Math.abs(el.getBoundingClientRect().top) < 200 : false;
  });
}
check("nav link scrolls to #pricing", scrolledTo);

// --- 2. Sign-in dialog: open, submit, demo notice, Esc closes ---
await page.click('nav >> text="Sign in"');
await page.waitForSelector('[role="dialog"]', { timeout: 3000 });
check("sign-in dialog opens", true);
const focused = await page.evaluate(
  () => document.activeElement?.id === "signin-email",
);
check("dialog focuses email input", focused);
await page.fill("#signin-email", "test@studio.com");
await page.click('[role="dialog"] >> text="Continue"');
await page.waitForTimeout(300);
const demoNotice = await page.locator('[role="dialog"]').textContent();
check(
  "sign-in shows honest demo notice",
  demoNotice.includes("concept product"),
);
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
const dialogGone = (await page.locator('[role="dialog"]').count()) === 0;
check("Escape closes dialog", dialogGone);

// --- 3. Pipeline demo: move forward, move back, reset ---
await page.locator("#demo").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
const movesChip = page.locator("#demo .chip", { hasText: "move" });
const card = page.locator("#demo article").first();
const company = await card.locator("p").first().textContent();
const stageOf = async (name) =>
  page.evaluate((n) => {
    const cols = [...document.querySelectorAll("#demo .snap-start")];
    for (const col of cols) {
      if (col.textContent.includes(n))
        return col.querySelector("p").textContent;
    }
    return null;
  }, company);
const stageBefore = await stageOf(company);
await page.getByLabel(`Move ${company} forward`).click();
await page.waitForTimeout(500);
const stageAfter = await stageOf(company);
check(
  "pipeline card moves forward",
  stageBefore !== stageAfter,
  `${stageBefore} -> ${stageAfter}`,
);
const moveCount = await movesChip.textContent();
check("move counter increments", moveCount?.trim().startsWith("1"));
await page.getByLabel(`Move ${company} back`).click();
await page.waitForTimeout(500);
check("pipeline card moves back", (await stageOf(company)) === stageBefore);
await page.locator("#demo >> text=Reset").click();
await page.waitForTimeout(400);
const resetCount = await movesChip.textContent();
check("reset restores 0 moves", resetCount?.trim().startsWith("0"));

// --- 4. Pricing toggle ---
await page.locator("#pricing").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const studio = page.locator("#pricing .card", { hasText: "Studio" });
const priceBefore = await studio.locator(".tnum").first().textContent();
await page.click('button:has-text("Yearly")');
await page.waitForTimeout(500);
const priceAfter = await studio.locator(".tnum").first().textContent();
check(
  "yearly toggle changes Studio price",
  priceBefore !== priceAfter,
  `${priceBefore} -> ${priceAfter}`,
);
const pressed = await page
  .locator('button:has-text("Yearly")')
  .getAttribute("aria-pressed");
check("aria-pressed reflects billing state", pressed === "true");

// --- 5. FAQ accordion ---
await page.locator("#faq").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const faqButtons = page.locator("#faq button[aria-expanded]");
const second = faqButtons.nth(1);
await second.click();
await page.waitForTimeout(500);
check(
  "FAQ item expands",
  (await second.getAttribute("aria-expanded")) === "true",
);
const panelVisible = await page.locator("#faq-panel-1").isVisible();
check("FAQ panel content visible", panelVisible);

// --- 6. Lead form: validation errors then success ---
await page.locator("#get-started").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.click('button:has-text("Request access")');
await page.waitForTimeout(1500);
const errCount = await page.locator("#get-started [role='alert']").count();
check("empty submit shows field errors", errCount >= 3, `${errCount} errors`);

await page.fill("#lead-name", "Ada Lovelace");
await page.fill("#lead-email", "ada@lovelace.studio");
await page.fill("#lead-company", "Lovelace Studio");
await page.locator('#get-started label:has-text("2 to 5")').click();
await page.click('button:has-text("Request access")');
await page.waitForTimeout(2000);
const successText = await page.locator("#get-started").textContent();
check(
  "valid submit shows success state",
  successText.includes("on the list"),
);
check(
  "success echoes submitted email",
  successText.includes("ada@lovelace.studio"),
);

// --- 7. Mobile: hamburger menu ---
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(url, { waitUntil: "networkidle" });
await mobile.waitForTimeout(600);
await mobile.click('button[aria-label="Open menu"]');
await mobile.waitForTimeout(500);
const menuLink = mobile.locator('div.fixed >> text="Pricing"');
check("mobile menu opens with links", await menuLink.isVisible());
await menuLink.click();
await mobile.waitForTimeout(600);
const menuClosed =
  (await mobile.locator('button[aria-label="Close menu"]').count()) === 0;
check("mobile menu closes after nav click", menuClosed);
await mobile.close();

check(
  "zero console errors across run",
  consoleErrors.length === 0,
  consoleErrors.slice(0, 3).join(" | "),
);

console.log(results.join("\n"));
await browser.close();
process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);

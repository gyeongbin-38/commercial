/*
 * Internal link + hash-anchor check.
 * Crawls every rendered route, collects href values, and verifies:
 *   - "#id" resolves to an element id on the same page
 *   - "/path#id" resolves to a real route AND the id on that page
 *   - "/path" resolves to a real route (2xx)
 * External links, mailto: and tel: are skipped.
 *
 * Usage: start a server (`npm run start` or `npm run dev`), then
 *   PORT=3000 node scripts/link-check.mjs
 */

const BASE = `http://localhost:${process.env.PORT ?? 3000}`;

const ROUTES = [
  "/",
  "/orbit",
  "/orbit/privacy",
  "/orbit/terms",
  "/orbit/security",
  "/orbit/about",
  "/moapoint",
  "/moapoint/privacy",
  "/moapoint/terms",
  "/fieldstone",
  "/fieldstone/privacy",
  "/fieldstone/terms",
  "/marlowe",
  "/marlowe/privacy",
  "/marlowe/terms",
  "/plugview",
];

const hrefRe = /href="([^"]+)"/g;
const idRe = /id="([^"]+)"/g;

async function fetchPage(path) {
  const res = await fetch(BASE + path, { redirect: "follow" });
  return { status: res.status, html: res.ok ? await res.text() : "" };
}

const pages = new Map();
async function getPage(path) {
  if (!pages.has(path)) pages.set(path, await fetchPage(path));
  return pages.get(path);
}

const idsOf = (html) => new Set([...html.matchAll(idRe)].map((m) => m[1]));

let failures = 0;
let checked = 0;

for (const route of ROUTES) {
  const page = await getPage(route);
  if (!page.html) {
    console.log(`FAIL ${route} — route returned ${page.status}`);
    failures++;
    continue;
  }
  const ids = idsOf(page.html);
  const hrefs = [...new Set([...page.html.matchAll(hrefRe)].map((m) => m[1]))];

  for (const href of hrefs) {
    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("data:")
    )
      continue;
    checked++;

    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (id && !ids.has(id)) {
        console.log(`FAIL ${route} — "${href}" has no matching id on this page`);
        failures++;
      }
      continue;
    }

    const [path, hash] = href.split("#");
    if (!path.startsWith("/")) continue;
    const target = await getPage(path);
    if (!target.html) {
      console.log(`FAIL ${route} — "${href}" → ${path} returned ${target.status}`);
      failures++;
      continue;
    }
    if (hash && !idsOf(target.html).has(hash)) {
      console.log(`FAIL ${route} — "${href}" → no #${hash} on ${path}`);
      failures++;
    }
  }
}

console.log(`\n${checked} internal links checked across ${ROUTES.length} routes.`);
if (failures) {
  console.log(`${failures} broken link(s) found.`);
  process.exit(1);
}
console.log("All internal links resolve.");

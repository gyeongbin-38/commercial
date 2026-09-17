// Subset the MOA POINT Pretendard font to the characters the site
// actually uses: node scripts/subset-font.mjs
// Source: app/moapoint/fonts/PretendardVariable.woff2 (full, ~2MB)
// Output: app/moapoint/fonts/PretendardVariable.subset.woff2
import subsetFont from "subset-font";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const SRC = "scripts/fonts/PretendardVariable.woff2";
const OUT = "app/moapoint/fonts/PretendardVariable.subset.woff2";

// Scan site source for every character that can reach the page.
const SCAN_DIRS = ["app/moapoint", "components/moapoint", "lib"];
const SCAN_EXTS = new Set([".ts", ".tsx", ".css", ".svg", ".md"]);
const SCAN_FILES = ["lib/moapoint-data.ts"];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (SCAN_EXTS.has(extname(p))) yield p;
  }
}

const chars = new Set();
const seen = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    if (file.includes("fonts") || file.endsWith(".woff2")) continue;
    seen.push(file);
    for (const ch of readFileSync(file, "utf8")) chars.add(ch);
  }
}
for (const file of SCAN_FILES) {
  seen.push(file);
  for (const ch of readFileSync(file, "utf8")) chars.add(ch);
}

// Safety net: printable ASCII + general/CJK punctuation + Hangul jamo.
const ranges = [
  [0x0020, 0x007e], // printable ASCII
  [0x1100, 0x11ff], // Hangul jamo
  [0x2000, 0x206f], // general punctuation (– — ‘ ’ “ ” …)
  [0x2190, 0x21ff], // arrows
  [0x3000, 0x303f], // CJK punctuation
  [0x3130, 0x318f], // Hangul compatibility jamo
  [0xff00, 0xff60], // fullwidth forms
];
for (const [lo, hi] of ranges) {
  for (let cp = lo; cp <= hi; cp++) chars.add(String.fromCodePoint(cp));
}

const text = [...chars].join("");
const input = readFileSync(SRC);
const output = await subsetFont(input, text, { targetFormat: "woff2" });
writeFileSync(OUT, output);

const kib = (b) => `${(b / 1024).toFixed(0)} KB`;
console.log(`scanned ${seen.length} files, ${chars.size} unique chars`);
console.log(`${SRC}: ${kib(input.byteLength)}`);
console.log(`${OUT}: ${kib(output.byteLength)}`);

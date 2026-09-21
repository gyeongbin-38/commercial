import { chromium } from "playwright-core";

const b = await chromium.launch({
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE_ERR:", m.text().slice(0, 300));
});
p.on("pageerror", (e) => console.log("PAGE_ERR:", String(e).slice(0, 400)));
await p.goto("https://gyeongbinbak.com/plugview", {
  waitUntil: "networkidle",
  timeout: 90000,
});
await p.waitForTimeout(7000);
await p.screenshot({ path: "pv-live-hero.png", timeout: 120000 });
const canvases = await p.evaluate(() => document.querySelectorAll("canvas").length);
console.log("canvas count:", canvases);
await b.close();
console.log("done");

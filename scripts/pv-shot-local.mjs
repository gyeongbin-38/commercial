import { chromium } from "playwright-core";

const b = await chromium.launch({
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE_ERR:", m.text().slice(0, 300));
});
p.on("pageerror", (e) => console.log("PAGE_ERR:", String(e).slice(0, 400)));
await p.goto("http://localhost:3001/plugview", {
  waitUntil: "networkidle",
  timeout: 60000,
});
await p.waitForTimeout(6000);
await p.screenshot({ path: "pv-hero.png", timeout: 120000 });
await p.evaluate(() => window.scrollTo(0, 1400));
await p.waitForTimeout(2500);
await p.screenshot({ path: "pv-mid.png", timeout: 120000 });
const hasCanvas = await p.evaluate(() => !!document.querySelector("canvas"));
console.log("canvas present:", hasCanvas);
await b.close();
console.log("done");

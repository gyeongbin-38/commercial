import { chromium } from "playwright-core";

const b = await chromium.launch({
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("console", (m) => {
  if (m.type() !== "log") console.log(`[${m.type()}]`, m.text().slice(0, 500));
});
p.on("pageerror", (e) => console.log("PAGE_ERR:", String(e).slice(0, 600)));
await p.goto("http://localhost:3001/plugview", {
  waitUntil: "networkidle",
  timeout: 90000,
});
await p.waitForTimeout(8000);

const info = await p.evaluate(() => {
  const canvases = [...document.querySelectorAll("canvas")];
  return canvases.map((c) => ({
    w: c.width,
    h: c.height,
    rect: c.getBoundingClientRect().toJSON(),
  }));
});
console.log(JSON.stringify(info, null, 1));
await p.screenshot({ path: "pv-debug-hero.png", timeout: 90000 });
await b.close();
console.log("done");

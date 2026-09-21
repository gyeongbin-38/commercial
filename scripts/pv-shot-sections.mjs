import { chromium } from "playwright-core";

const b = await chromium.launch({
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3001/plugview", {
  waitUntil: "networkidle",
  timeout: 90000,
});
await p.waitForTimeout(4000);
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(2500);
await p.screenshot({ path: "pv-bottom.png", timeout: 90000 });

const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3001/plugview", {
  waitUntil: "networkidle",
  timeout: 90000,
});
await m.waitForTimeout(3000);
await m.screenshot({ path: "pv-mobile.png", timeout: 90000 });
await b.close();
console.log("done");

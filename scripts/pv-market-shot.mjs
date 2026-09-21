import { chromium } from "playwright-core";
const b = await chromium.launch({
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const url = process.argv[2] ?? "http://localhost:3001/plugview";
await p.goto(url, { waitUntil: "networkidle", timeout: 90000 });
await p.evaluate(() => document.querySelector("#market")?.scrollIntoView({ block: "center" }));
await p.waitForTimeout(20000);
await p.screenshot({ path: "pv-market.png", timeout: 120000 });
const canvases = await p.evaluate(() => document.querySelectorAll("canvas").length);
console.log("canvases:", canvases);
await b.close();
console.log("done");

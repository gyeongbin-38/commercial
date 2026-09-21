import { chromium } from "playwright-core";
const b = await chromium.launch({
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("pageerror", (e) => console.log("PAGE_ERR:", String(e).slice(0, 300)));
await p.goto("http://localhost:3001/plugview", { waitUntil: "networkidle", timeout: 90000 });
await p.evaluate(() => document.querySelector("#market")?.scrollIntoView({ block: "center" }));
await p.waitForTimeout(9000); // IO mount + first frames under swiftshader
await p.screenshot({ path: "pv-market.png", timeout: 120000 });
const canvases = await p.evaluate(() => document.querySelectorAll("canvas").length);
console.log("canvases:", canvases);
await b.close();
console.log("done");

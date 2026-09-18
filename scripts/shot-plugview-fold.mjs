import { chromium } from "playwright-core";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("https://gyeongbinbak.com/plugview", {
  waitUntil: "networkidle",
  timeout: 30000,
});
await p.waitForTimeout(1500);
await p.screenshot({ path: "catalog-images/5-plugview.png" });
await b.close();
console.log("done");

import { chromium } from "playwright-core";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("https://gyeongbinbak.com", { waitUntil: "networkidle", timeout: 30000 });
await p.waitForTimeout(1200);
await p.screenshot({ path: "shots-root/nav-top.png" });
// hover states
await p.hover("header nav > a:first-child");
await p.waitForTimeout(400);
await p.screenshot({ path: "shots-root/nav-hover-logo.png", clip: { x: 0, y: 0, width: 1440, height: 48 } });
await b.close();
console.log("done");

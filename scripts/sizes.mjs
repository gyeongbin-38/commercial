import fs from "node:fs";
for (const f of fs.readdirSync("public/work")) {
  const s = fs.statSync(`public/work/${f}`).size;
  console.log(f, (s / 1024).toFixed(0) + "KB");
}

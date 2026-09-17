const base = process.argv[2];
const html = await (await fetch(base + "/")).text();
console.log("hero text:", html.includes("Keep every client"));
const chunk = html.match(/\/_next\/static\/chunks\/[^"']+\.js/)?.[0];
console.log("chunk path found:", chunk ?? "none");
if (chunk) {
  const r = await fetch(base + chunk);
  console.log("chunk status:", r.status, "bytes:", (await r.arrayBuffer()).byteLength);
}
for (const p of ["/moapoint", "/fieldstone", "/privacy", "/api/contact"]) {
  const r = await fetch(base + p, { method: p.includes("api") ? "POST" : "GET" });
  console.log(p, "->", r.status);
}

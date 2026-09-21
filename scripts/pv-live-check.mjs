const html = await (await fetch("https://gyeongbinbak.com/plugview")).text();
console.log("'141+' gone:", !html.includes("141+"));
console.log("asset count figure gone:", !/1\d\d[+]?[\s<]/ .test(html.replace(/1440/g, "")));
console.log("byline live:", html.includes("Self-directed product build by Gyeongbin Bak"));
console.log("Curated live:", html.includes("Curated"));
console.log("CTA links kept:", html.includes("Explore assets") && html.includes("Open Make Builder"));

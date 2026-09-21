const html = await (await fetch("https://gyeongbinbak.com/")).text();
const markers = {
  atlas: html.includes("wk-atlas"),
  browserFrame: /gyeongbinbak\.com<!-- -->\/plugview|gyeongbinbak\.com\/plugview/.test(html),
  webpAssets: html.includes("plugview-screen.webp"),
  collageGone: !html.includes("wk-collage"),
  cursorGone: !html.includes("mix-blend-difference"),
};
console.log(JSON.stringify(markers, null, 2));
console.log("all live:", Object.values(markers).every(Boolean));

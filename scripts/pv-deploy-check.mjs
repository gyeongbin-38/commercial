const html = await (await fetch("https://gyeongbinbak.com/plugview")).text();
const markers = {
  ticker: html.includes("pv-ticker"),
  coverFlowDeck: html.includes("preserve-3d") || html.includes("transform-style"),
  glassChrome: html.includes("pv-glass-bar") || html.includes("pv-glass"),
  blobMask: html.includes("pv-blob-mask"),
  liquidMark: html.includes("pv-liquid"),
  heroSceneChunk: html.includes("scene3d") || html.includes("effects"),
};
console.log(JSON.stringify(markers, null, 2));
console.log("all live:", Object.values(markers).every(Boolean));

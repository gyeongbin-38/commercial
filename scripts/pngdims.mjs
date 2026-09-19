import fs from "fs";
for (const f of ["orbit", "moapoint", "fieldstone", "marlowe", "plugview-screen"]) {
  const b = fs.readFileSync(`public/work/${f}.png`);
  console.log(f, `${b.readUInt32BE(16)}x${b.readUInt32BE(20)}`);
}

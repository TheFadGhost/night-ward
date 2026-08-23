import fs from 'node:fs';

let s = fs.readFileSync('src/game/objects.js', 'utf8');
s = s.replace(
  "this.list.push({ kind: 'locker', id: l.id, x: l.x, z: l.z });",
  "l.kind = 'locker';\n      l.taken = false;\n      this.list.push(l);"
);
s = s.replace(
  "this.list.push({ kind: 'bottle', id: b.id, x: b.x, z: b.z, taken: false });",
  "b.kind = 'bottle';\n      b.taken = false;\n      this.list.push(b);"
);
s = s.replace(
  "this.list.push({ kind: 'seal', id: s.id, n: s.n, x: s.x, z: s.z, taken: false });",
  "s.kind = 'seal';\n      s.taken = false;\n      this.list.push(s);"
);
s = s.replace(
  "this.list.push({ kind: 'vessel', id: d.vessel.id, x: d.vessel.x, z: d.vessel.z, taken: false });",
  "const v0 = d.vessel;\n      v0.kind = 'vessel';\n      v0.taken = false;\n      this.list.push(v0);"
);
fs.writeFileSync('src/game/objects.js', s);
console.log('refs unified:', !s.includes("id: l.id, x: l.x"));

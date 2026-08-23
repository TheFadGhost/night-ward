import fs from 'node:fs';

let c = fs.readFileSync('scripts/policies-core.mjs', 'utf8');
c = c
  .split("{ type: 'until', pred: (b) => b.g.state.seals.got >= 1, timeout: 4, label: 'seal1' }")
  .join("{ type: 'until', pred: (b) => sealTaken(b, 1), timeout: 4, label: 'seal1' }");
c = c
  .split("{ type: 'until', pred: (b) => b.g.state.seals.got >= 2, timeout: 4, label: 'seal2' }")
  .join("{ type: 'until', pred: (b) => sealTaken(b, 2), timeout: 4, label: 'seal2' }");
fs.writeFileSync('scripts/policies-core.mjs', c);

let f = fs.readFileSync('scripts/policies-full.mjs', 'utf8');
f = f.split('(b) => b.g.state.seals.got >= 3').join('(b) => sealTaken(b, 3)');
f = f.split('(b) => b.g.state.seals.got >= 2').join('(b) => sealTaken(b, 2)');
f = f.replace(
  "import { distListener, listenerState } from './policies-core.mjs';",
  "import { distListener, listenerState, sealTaken } from './policies-core.mjs';"
);
fs.writeFileSync('scripts/policies-full.mjs', f);
console.log('patched', c.includes('sealTaken(b, 1)'), f.includes('sealTaken(b, 3)'));

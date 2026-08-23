import fs from 'node:fs';

let c = fs.readFileSync('scripts/policies-core.mjs', 'utf8');
c = c.replace(
  "const lobbyToStorageSouth = [\n  ...LOBBY_TO_SERVICE,\n  { type: 'goto', cell: [10, 34], crouch: true },\n  { type: 'goto', cell: [11, 28], crouch: true, tol: 1.45 },\n  { type: 'interact' },\n  { type: 'wait', t: 0.5 },\n  { type: 'goto', cell: [13, 28], crouch: true },\n];",
  "function lobbyToStorageSouth(crossCrouch) {\n  return [\n    ...LOBBY_TO_SERVICE,\n    { type: 'goto', cell: [10, 34], crouch: crossCrouch, sprint: !crossCrouch },\n    { type: 'goto', cell: [11, 28], crouch: crossCrouch, tol: 1.45 },\n    { type: 'interact' },\n    { type: 'wait', t: 0.5 },\n    { type: 'goto', cell: [13, 28], crouch: true },\n  ];\n}"
);
c = c.replace(
  '...lobbyToStorageSouth,\n    ...storageNorthGrab',
  '...lobbyToStorageSouth(false),\n    ...storageNorthGrab'
);
c = c.replace(
  "() => [...LOBBY_TO_SERVICE, ...lobbyToStorageSouth.slice(1),",
  "() => [...LOBBY_TO_SERVICE.slice(0, 2), ...LOBBY_TO_SERVICE.slice(2), ...lobbyToStorageSouth(false).slice(3),"
);
fs.writeFileSync('scripts/policies-core.mjs', c);
console.log('core patched');

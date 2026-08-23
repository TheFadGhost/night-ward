import fs from 'node:fs';

let f = fs.readFileSync('scripts/policies-full.mjs', 'utf8');
f = f.split('seal1ViaBreach(true)').join('westGhostSteps()');
f = f.replace(
  "import { distListener, listenerState, sealTaken } from './policies-core.mjs';",
  "import { distListener, listenerState, sealTaken, westGhostSteps } from './policies-core.mjs';"
);
f = f.replace(
  'export function fullRuns(runPolicy, LOBBY_TO_SERVICE, seal1ViaBreach, ARCH_INTO_ATRIUM, NORTH_CORR_E)',
  'export function fullRuns(runPolicy, LOBBY_TO_SERVICE, ARCH_INTO_ATRIUM, NORTH_CORR_E)'
);
fs.writeFileSync('scripts/policies-full.mjs', f);

let i = fs.readFileSync('scripts/policies-index.mjs', 'utf8');
i = i.replace('seal1ViaBreach,', 'westGhostSteps,');
i = i.replace(
  '...fullRuns(runPolicy, LOBBY_TO_SERVICE, seal1ViaBreach, ARCH_INTO_ATRIUM, NORTH_CORR_E)',
  '...fullRuns(runPolicy, LOBBY_TO_SERVICE, ARCH_INTO_ATRIUM, NORTH_CORR_E)'
);
fs.writeFileSync('scripts/policies-index.mjs', i);
console.log('patched full+index');

import { distListener, listenerState, sealTaken, westGhostSteps, listenerAwayFrom, LOBBY_TO_SERVICE, SERVICE_E_TO_ARCH } from './policies-core.mjs';

const WARD_APPROACH = [
  { type: 'window', id: 'warden4', pred: (e) => e.x < 30 || e.x > 100, timeout: 60 },
  { type: 'goto', cell: [13, 41], tol: 1.2 },
  { type: 'goto', cell: [19, 41] },
  { type: 'goto', cell: [22, 41], tol: 0.9 },
  { type: 'window', id: 'listener1', pred: (e) => Math.hypot(e.x - 47, e.z - 83) > 13, timeout: 70 },
  { type: 'goto', cell: [23, 41], tol: 1.45 },
  { type: 'fn', fn: (b) => { b.g.player.crouched = true; } },
  { type: 'interact' },
  { type: 'fn', fn: (b) => { b.g.player.crouched = false; } },
  { type: 'wait', t: 0.6 },
  { type: 'until', pred: listenerAwayFrom(47, 83, 5), timeout: 45, label: 'arch-clear' },
  { type: 'goto', cell: [26, 41] },
];

const WARD_APPROACH_ARCH = [
  ...LOBBY_TO_SERVICE,
  ...SERVICE_E_TO_ARCH,
  
  { type: 'goto', cell: [31, 38], crouch: true },
  { type: 'goto', cell: [29, 42], crouch: true },
];

const ARCHIVE_AND_EXIT = [
  { type: 'goto', cell: [31, 11], crouch: true },
  { type: 'goto', cell: [32, 10], crouch: true, tol: 1.1 },
  { type: 'interact' },
  { type: 'until', pred: (b) => b.g.world.isDoorOpen('d_archive_a'), timeout: 4, label: 'archive-open' },
  { type: 'goto', cell: [32, 6], crouch: true },
  { type: 'goto', cell: [32, 5], crouch: true, tol: 1.05 },
  { type: 'interact' },
  { type: 'until', pred: (b) => b.g.state.vessel, timeout: 4, label: 'vessel' },
  { type: 'goto', cell: [32, 9], crouch: true },
  { type: 'goto', cell: [44, 10], crouch: true },
  { type: 'goto', cell: [53, 10], crouch: true },
  { type: 'goto', cell: [54, 9], crouch: true },
  { type: 'goto', cell: [54, 8], crouch: true, tol: 1.1 },
  { type: 'interact' },
  { type: 'wait', t: 0.6 },
  { type: 'goto', cell: [54, 5], crouch: true },
  { type: 'goto', cell: [54, 4], crouch: true, tol: 1.05 },
  { type: 'interact' },
];

function entDist(b, idA, idB) {
  const A = b.g.ai.entities.find((e) => e.id === idA);
  const B = idB === 'seal' ? { x: 75, z: 89 } : b.g.ai.entities.find((e) => e.id === idB);
  if (!A || !B) return 999;
  return Math.hypot(A.x - B.x, A.z - B.z);
}

function listenerOffSeal(b) {
  return entDist(b, 'listener1', 'seal') > 3.4 && listenerState(b) === 'patrol';
}

const agg = (o) => (r) =>
  r.cleanRate >= o.clean && r.surviveRate >= o.survive && r.objectiveRate >= 1;

export function southRuns(runPolicy) {
  const runs = [];

  const rA = runPolicy(
    'south/A creep-past-listener',
    { cautious: true, crouch: true, seal: '3', cleanBar: 0.4 },
    () => [
      ...WARD_APPROACH_ARCH,
      { type: 'until', pred: listenerOffSeal, timeout: 30, label: 'listener-clear' },
      { type: 'goto', cell: [37, 44], crouch: true, tol: 1.05 },
      { type: 'until', pred: listenerOffSeal, timeout: 20, label: 'grab-clear' },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 3), timeout: 4, label: 'seal3' },
    ]
  );
  rA.pass = agg({ clean: 0.4, survive: 0.85 })(rA);
  runs.push(rA);

  const rB = runPolicy(
    'south/B glass-lure',
    { cautious: true, crouch: true, seal: '3', cleanBar: 0.35 },
    () => [
      ...WARD_APPROACH_ARCH,
      { type: 'throw', cell: [36, 44] },
      { type: 'wait', t: 1.5 },
      { type: 'until', pred: (b) => listenerState(b) !== 'patrol' || distListener(b) > 8, timeout: 15, label: 'lured-far' },
      { type: 'goto', cell: [37, 44], crouch: true, tol: 1.05 },
      { type: 'until', pred: listenerOffSeal, timeout: 20, label: 'grab-window' },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 3), timeout: 4, label: 'seal3' },
    ]
  );
  rB.pass = agg({ clean: 0.35, survive: 0.85 })(rB);
  runs.push(rB);

  const rC = runPolicy(
    'south/C locker-hop',
    { cautious: true, crouch: true, seal: '3', cleanBar: 0.25, surviveBar: 0.8 },
    () => [
      ...WARD_APPROACH_ARCH,
      { type: 'until', pred: listenerOffSeal, timeout: 30, label: 'pre-lk-clear' },
      { type: 'goto', cell: [25, 44], crouch: true, tol: 1.05 },
      { type: 'until', pred: (b) => distListener(b) < 7, timeout: 18, label: 'listener-close' },
      { type: 'interact' },
      { type: 'until', pred: (b) => !!b.g.player.hiddenIn, timeout: 6, label: 'hidden' },
      { type: 'until', pred: (b) => !b.g.player.hiddenIn || distListener(b) > 6.5, timeout: 40, label: 'listener-passed' },
      { type: 'until', pred: (b) => !b.g.player.hiddenIn, timeout: 6, label: 'out' },
      { type: 'goto', cell: [37, 44], crouch: true, tol: 1.05 },
      { type: 'until', pred: listenerOffSeal, timeout: 20, label: 'clear' },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 3), timeout: 4, label: 'seal3' },
    ]
  );
  rC.pass = agg({ clean: 0.25, survive: 0.8 })(rC);
  runs.push(rC);

  return runs;
}

export function fullRuns(runPolicy, LOBBY_TO_SERVICE, ARCH_INTO_ATRIUM, NORTH_CORR_E) {
  const runs = [];
  const aggFull = (clean, capChases) => (r) =>
    r.objectiveRate >= 0.75 &&
    r.surviveRate >= 0.85 &&
    r.maxChases <= capChases &&
    (clean ? r.cleanRate >= clean : true);

  const rG = runPolicy(
    'full/GHOST zero-detection',
    { cautious: true, crouch: true, full: true, cleanBar: 0.5 },
    () => [
      ...LOBBY_TO_SERVICE,
      ...westGhostSteps(),
      { type: 'goto', cell: [14, 18], crouch: true },
      { type: 'goto', cell: [16, 18], crouch: true, tol: 0.7 },
      { type: 'goto', cell: [19, 17], crouch: true },
      { type: 'goto', cell: [22, 17], crouch: true },
      { type: 'window', id: 'warden3', pred: (e) => Math.hypot(e.x - 51, e.z - 59) > 8, timeout: 90 },
      { type: 'goto', cell: [26, 20], crouch: true },
      { type: 'goto', cell: [31, 14], crouch: true },
      { type: 'goto', cell: [31, 11], crouch: true },
      ...NORTH_CORR_E,
      { type: 'goto', cell: [58, 16], sprint: true },
      { type: 'goto', cell: [58, 21], sprint: true },
      { type: 'goto', cell: [60, 22], crouch: true },
      { type: 'goto', cell: [60, 23], crouch: true, tol: 1.15 },
      { type: 'window', id: 'sentinel1', pred: (e, bot) => !e || Math.hypot(e.x - bot.g.player.x, e.z - bot.g.player.z) > 3, timeout: 12, label: 'sentinel-clear' },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 2), timeout: 4, label: 'seal2' },
      { type: 'goto', cell: [58, 17], crouch: true },
      { type: 'goto', cell: [58, 12], crouch: true },
      { type: 'window', id: 'warden2', pred: (e, bot) => e.x > 74 && bot.dirX('warden2') > 0, timeout: 120 },
      { type: 'goto', cell: [44, 10], crouch: true, sprint: true },
      { type: 'goto', cell: [31, 11], crouch: true },
      { type: 'goto', cell: [31, 14], crouch: true },
      { type: 'goto', cell: [31, 24], crouch: true },
      { type: 'goto', cell: [31, 34], crouch: true },
      { type: 'goto', cell: [31, 37], crouch: true },
      
      { type: 'goto', cell: [31, 39], crouch: true },
      { type: 'goto', cell: [31, 41], crouch: true },
      { type: 'until', pred: listenerOffSeal, timeout: 30, label: 'listener-clear' },
      { type: 'goto', cell: [37, 44], crouch: true, tol: 1.02 },
      { type: 'until', pred: listenerOffSeal, timeout: 20, label: 'clear-again' },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 3), timeout: 4, label: 'seal3' },
      { type: 'goto', cell: [31, 38], crouch: true },
      { type: 'goto', cell: [31, 34], crouch: true },
      { type: 'goto', cell: [31, 24], crouch: true },
      ...ARCHIVE_AND_EXIT,
    ],
    600
  );
  rG.pass = aggFull(0.45, 0)(rG);
  runs.push(rG);

  const rT = runPolicy(
    'full/TRICKSTER tools-and-escapes',
    { cautious: false, full: true, cleanBar: 0 },
    () => [
      ...WARD_APPROACH_ARCH,
      { type: 'throw', cell: [37, 44] },
      { type: 'wait', t: 0.8 },
      { type: 'goto', cell: [37, 44], sprint: true, tol: 1.05 },
      { type: 'goto', cell: [37, 44], sprint: true, tol: 1.05 },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 3), timeout: 4, label: 'seal3' },
      { type: 'until', pred: listenerOffSeal, timeout: 25, label: 'exit-window' },
      { type: 'goto', cell: [31, 38], sprint: true },
      { type: 'goto', cell: [31, 30], sprint: true },
      { type: 'goto', cell: [40, 25], sprint: true },
      { type: 'goto', cell: [46, 20], sprint: true },
      { type: 'goto', cell: [45, 15], sprint: true, tol: 1.2 },
      { type: 'interact' },
      { type: 'until', pred: (b) => b.g.world.wingBlackedOut('east'), timeout: 4, label: 'blackout-east' },
      { type: 'goto', cell: [50, 22], sprint: true },
      { type: 'goto', cell: [54, 28], sprint: true },
      { type: 'goto', cell: [55, 32], sprint: true },
      { type: 'goto', cell: [56, 23], sprint: true, tol: 1.45 },
      { type: 'interact' },
      { type: 'goto', cell: [60, 23], sprint: true, tol: 1.15 },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 3), timeout: 4, label: 'seal2-check' },
      { type: 'goto', cell: [54, 20], sprint: true },
      { type: 'goto', cell: [54, 12], sprint: true },
      { type: 'goto', cell: [54, 10], sprint: true },
      { type: 'goto', cell: [44, 10], sprint: true },
      { type: 'goto', cell: [31, 11], sprint: true },
      { type: 'goto', cell: [32, 10], sprint: true },
      { type: 'goto', cell: [32, 9], tol: 1.4 },
      { type: 'interact' },
      { type: 'goto', cell: [32, 6] },
      { type: 'goto', cell: [32, 5], tol: 1.05 },
      { type: 'interact' },
      { type: 'until', pred: (b) => b.g.state.vessel, timeout: 4, label: 'vessel' },
      { type: 'goto', cell: [32, 9], sprint: true },
      { type: 'goto', cell: [44, 10], sprint: true },
      { type: 'goto', cell: [54, 10], sprint: true },
      { type: 'goto', cell: [54, 8], sprint: true },
      { type: 'goto', cell: [54, 7], tol: 1.4 },
      { type: 'interact' },
      { type: 'goto', cell: [54, 4], sprint: true, tol: 1.05 },
      { type: 'interact' },
    ],
    600
  );
  rT.pass = aggFull(null, 3)(rT);
  runs.push(rT);

  return runs;
}



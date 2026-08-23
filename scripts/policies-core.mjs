export const LOBBY_TO_SERVICE = [
  { type: 'goto', cell: [7, 40], tol: 1 },
  { type: 'window', id: 'warden4', pred: (e, bot) => e.x > 52 && bot.dirX('warden4') < 0, timeout: 100 },
  { type: 'goto', cell: [8, 37] },
];

export const SERVICE_W_TO_E = [
  { type: 'window', id: 'warden4', pred: (e, bot) => e.x > 64 && bot.dirX('warden4') > 0, timeout: 90 },
  { type: 'goto', cell: [20, 36], crouch: true,
    guard: (b) => {
      const e = b.g.ai.entities.find((q) => q.id === 'warden4');
      return !e || Math.hypot(e.x - 41, e.z - 73) > 9;
    } },
  { type: 'goto', cell: [28, 36], crouch: true,
    guard: (b) => {
      const e = b.g.ai.entities.find((q) => q.id === 'warden4');
      return !e || Math.hypot(e.x - 57, e.z - 73) > 8;
    } },
];

export const SERVICE_E_TO_ARCH = [
  { type: 'window', id: 'warden4', pred: (e, bot) => e.x < 40 && bot.dirX('warden4') < 0, timeout: 110 },
  { type: 'goto', cell: [31, 36], crouch: true,
    guard: (b) => {
      const e = b.g.ai.entities.find((q) => q.id === 'warden4');
      return !e || Math.hypot(e.x - 63, e.z - 73) > 7;
    } },
];

export const ARCH_INTO_ATRIUM = [
  { type: 'window', id: 'warden3', pred: (e) => Math.hypot(e.x - 63, e.z - 29) > 9, timeout: 80 },
  { type: 'goto', cell: [31, 34], crouch: true },
  { type: 'goto', cell: [31, 30], crouch: true },
];

export const ATRIUM_TO_NORTH = [
  { type: 'goto', cell: [31, 20], crouch: true },
  { type: 'goto', cell: [31, 14], crouch: true },
  { type: 'goto', cell: [31, 11], crouch: true },
];

export const NORTH_CORR_E = [
  { type: 'window', id: 'warden2', pred: (e, bot) => Math.hypot(e.x - 63, e.z - 21) > 26 && bot.dirX('warden2') > 0, timeout: 140 },
  { type: 'goto', cell: [44, 10], sprint: true },
  { type: 'goto', cell: [52, 10], sprint: true },
  { type: 'goto', cell: [58, 11], sprint: true },
];

function entPos(b, id) {
  const e = b.g.ai.entities.find((q) => q.id === id);
  return e || { x: 999, z: 999 };
}

export function sealTaken(b, n) {
  const s = b.g.level.objects.seals.find((q) => q.n === n);
  return !!(s && s.taken);
}

export function brainState(b, id) {
  const br = b.g.brainById.get(id);
  return br ? br.state : 'unknown';
}

export function distTo(b, id) {
  const e = b.g.ai.entities.find((q) => q.id === id);
  if (!e) return 999;
  return Math.hypot(e.x - b.g.player.x, e.z - b.g.player.z);
}

export function distListener(b) {
  return distTo(b, 'listener1');
}

export function listenerState(b) {
  return brainState(b, 'listener1');
}

function westLaneClear(b) {
  const e = b.g.ai.entities.find((q) => q.id === 'warden1');
  if (!e) return true;
  const dz = e.z - b.g.player.z;
  if (dz > 7) return true;
  return Math.sin(e.facing || 0) < -0.3;
}

function lobbyToStorageSouth(crossCrouch) {
  return [
    ...LOBBY_TO_SERVICE,
    { type: 'goto', cell: [10, 34], crouch: crossCrouch, sprint: !crossCrouch, guard: westLaneClear },
    { type: 'goto', cell: [11, 28], crouch: true, tol: 1.45, guard: westLaneClear },
    { type: 'interact' },
    { type: 'wait', t: 0.5 },
    { type: 'goto', cell: [13, 28], crouch: true },
  ];
}

const storageNorthGrab = [
  { type: 'goto', cell: [14, 26], crouch: true },
  { type: 'goto', cell: [16, 26], crouch: true, tol: 0.7 },
  { type: 'goto', cell: [14, 24], crouch: true },
  { type: 'goto', cell: [13, 18], crouch: true },
  { type: 'goto', cell: [13, 16], crouch: true, tol: 1.05 },
];

export function listenerAwayFrom(x, z, r) {
  return (b) => {
    const e = b.g.ai.entities.find((q) => q.id === 'listener1');
    return !e || Math.hypot(e.x - x, e.z - z) > r;
  };
}

export function westGhostSteps() {
  return [
    ...lobbyToStorageSouth(false),
    ...storageNorthGrab,
    { type: 'interact' },
    { type: 'until', pred: (b) => sealTaken(b, 1), timeout: 4, label: 'seal1' },
  ];
}

export { seal1ViaBreachLegacy };

function seal1ViaBreachLegacy() {
  return westGhostSteps();
}

const agg = (o) => (r) =>
  r.cleanRate >= o.clean && r.surviveRate >= o.survive && r.objectiveRate >= 1;

export function wingRuns(runPolicy) {
  const runs = [];

  const rA1 = runPolicy(
    'west/A ghost-storage',
    { cautious: true, crouch: true, seal: '1', cleanBar: 0.55 },
    () => [
      ...lobbyToStorageSouth(false),
      ...storageNorthGrab,
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 1), timeout: 4, label: 'seal1' },
    ]
  );
  rA1.pass = agg({ clean: 0.55, survive: 0.85 })(rA1);
  runs.push(rA1);

  const rB1 = runPolicy(
    'west/B breaker-walk',
    { cautious: true, seal: '1', cleanBar: 0.35 },
    () => [
      ...lobbyToStorageSouth(false),
      { type: 'goto', cell: [12, 15], tol: 1.15 },
      { type: 'interact' },
      { type: 'until', pred: (b) => b.g.world.wingBlackedOut('west'), timeout: 4, label: 'blackout-west' },
      { type: 'wait', t: 1.5 },
      ...storageNorthGrab.map((s) => ({ ...s, crouch: false })),
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 1), timeout: 4, label: 'seal1' },
    ]
  );
  rB1.pass = agg({ clean: 0.35, survive: 0.85 })(rB1);
  runs.push(rB1);

  const rC1 = runPolicy(
    'west/C atrium-infiltrate',
    { cautious: true, crouch: true, seal: '1', cleanBar: 0.3 },
    () => [
      ...ARCH_INTO_ATRIUM,
      { type: 'window', id: 'warden3', pred: (e) => Math.hypot(e.x - 51, e.z - 59) > 8, timeout: 80 },
      { type: 'goto', cell: [25, 22], crouch: true },
      { type: 'window', id: 'warden4', pred: (e) => Math.hypot(e.x - 63, e.z - 71) > 8, timeout: 70 },
      { type: 'goto', cell: [22, 17], crouch: true },
      { type: 'goto', cell: [19, 17], crouch: true },
      { type: 'goto', cell: [16, 18], crouch: true, tol: 0.7 },
      { type: 'goto', cell: [14, 18], crouch: true },
      { type: 'goto', cell: [13, 16], crouch: true, tol: 1.05 },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 1), timeout: 4, label: 'seal1' },
    ]
  );
  rC1.pass = agg({ clean: 0.3, survive: 0.85 })(rC1);
  runs.push(rC1);

  const rA2 = runPolicy(
    'east/A breakroom-sneak',
    { cautious: true, crouch: true, seal: '2', cleanBar: 0.45 },
    () => [
      ...LOBBY_TO_SERVICE,
      ...SERVICE_W_TO_E,
      ...ARCH_INTO_ATRIUM,
      ...ATRIUM_TO_NORTH,
      ...NORTH_CORR_E,
      { type: 'goto', cell: [58, 15], crouch: true },
      { type: 'goto', cell: [58, 20], crouch: true },
      { type: 'goto', cell: [60, 22], crouch: true },
      { type: 'goto', cell: [60, 23], crouch: true, tol: 1.15 },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 2), timeout: 4, label: 'seal2' },
    ]
  );
  rA2.pass = agg({ clean: 0.45, survive: 0.85 })(rA2);
  runs.push(rA2);

  const rB2 = runPolicy(
    'east/B blackout-hall',
    { cautious: true, seal: '2', cleanBar: 0.35 },
    () => [
      ...LOBBY_TO_SERVICE,
      ...SERVICE_W_TO_E,
      ...ARCH_INTO_ATRIUM,
      { type: 'goto', cell: [38, 26] },
      { type: 'goto', cell: [43, 25] },
      { type: 'goto', cell: [47, 24] },
      { type: 'goto', cell: [46, 18], crouch: true },
      { type: 'goto', cell: [45, 15], tol: 1.2 },
      { type: 'interact' },
      { type: 'until', pred: (b) => b.g.world.wingBlackedOut('east'), timeout: 4, label: 'blackout-east' },
      { type: 'wait', t: 2.2 },
      { type: 'goto', cell: [50, 22] },
      { type: 'goto', cell: [54, 27] },
      { type: 'goto', cell: [54, 32] },
      { type: 'goto', cell: [55, 23], tol: 1.45 },
      { type: 'interact' },
      { type: 'wait', t: 0.6 },
      { type: 'goto', cell: [59, 23] },
      { type: 'goto', cell: [60, 23], tol: 1.15 },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 2), timeout: 4, label: 'seal2' },
    ]
  );
  rB2.pass = agg({ clean: 0.35, survive: 0.85 })(rB2);
  runs.push(rB2);

  const rC2 = runPolicy(
    'east/C sweep-dodge-hall',
    { cautious: true, seal: '2', cleanBar: 0.3 },
    () => [
      ...LOBBY_TO_SERVICE,
      ...SERVICE_W_TO_E,
      ...ARCH_INTO_ATRIUM,
      { type: 'goto', cell: [38, 26] },
      { type: 'goto', cell: [43, 25] },
      { type: 'goto', cell: [48, 24], crouch: true },
      { type: 'goto', cell: [51, 25], crouch: true, tol: 1.35 },
      { type: 'interact' },
      { type: 'wait', t: 0.6 },
      { type: 'goto', cell: [54, 28], crouch: true, sentinelAware: true },
      { type: 'goto', cell: [54, 31], crouch: true, sentinelAware: true },
      { type: 'goto', cell: [54, 25], crouch: true, sentinelAware: true },
      { type: 'goto', cell: [55, 23], crouch: true, tol: 1.45 },
      { type: 'interact' },
      { type: 'wait', t: 0.6 },
      { type: 'goto', cell: [60, 23], crouch: true, tol: 1.15 },
      { type: 'interact' },
      { type: 'until', pred: (b) => sealTaken(b, 2), timeout: 4, label: 'seal2' },
    ]
  );
  rC2.pass = agg({ clean: 0.3, survive: 0.85 })(rC2);
  runs.push(rC2);

  return runs;
}

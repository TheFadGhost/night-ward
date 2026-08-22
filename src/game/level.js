import { CELL, TILE } from '../core/constants.js';

const W = 64;
const H = 48;

export function buildLevel() {
  const t = new Uint8Array(W * H).fill(TILE.WALL);
  const set = (x, z, v) => {
    t[z * W + x] = v;
  };
  const rect = (x0, z0, x1, z1, v) => {
    for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) set(x, z, v);
  };
  const wc = (x, z) => ({ x: (x + 0.5) * CELL, z: (z + 0.5) * CELL });

  rect(2, 10, 61, 11, TILE.FLOOR);
  rect(23, 2, 40, 8, TILE.CARPET);
  set(31, 9, TILE.DOOR);
  set(32, 9, TILE.DOOR);
  rect(52, 8, 56, 9, TILE.FLOOR);
  rect(51, 3, 57, 6, TILE.FLOOR);
  set(54, 7, TILE.DOOR);

  rect(9, 12, 10, 34, TILE.FLOOR);
  rect(2, 14, 7, 18, TILE.FLOOR);
  set(8, 16, TILE.DOOR);
  set(4, 19, TILE.FLOOR);
  rect(2, 20, 7, 24, TILE.FLOOR);
  set(8, 22, TILE.FLOOR);
  rect(2, 26, 7, 30, TILE.FLOOR);
  set(8, 28, TILE.DOOR);

  rect(12, 14, 20, 32, TILE.FLOOR);
  for (let z = 14; z <= 32; z++) set(16, z, TILE.WALL);
  set(16, 18, TILE.FLOOR);
  set(16, 26, TILE.FLOOR);
  set(11, 16, TILE.DOOR);
  set(11, 28, TILE.DOOR);
  set(21, 17, TILE.FLOOR);
  set(21, 29, TILE.DOOR);

  rect(22, 13, 41, 33, TILE.FLOOR);
  rect(27, 19, 36, 28, TILE.CARPET);
  for (const [px, pz] of [[26, 16], [26, 30], [37, 16], [37, 30], [31, 23]]) {
    set(px, pz, TILE.WALL);
  }
  for (const x of [30, 31, 32, 33]) set(x, 12, TILE.FLOOR);
  for (const x of [9, 10]) set(x, 34, TILE.FLOOR);
  for (const x of [30, 31, 32, 33]) set(x, 34, TILE.FLOOR);
  for (const x of [53, 54]) set(x, 34, TILE.GRATE);

  rect(43, 13, 51, 31, TILE.FLOOR);
  set(46, 22, TILE.WALL);
  set(49, 26, TILE.WALL);
  rect(44, 14, 48, 17, TILE.FLOOR);
  set(46, 18, TILE.DOOR);
  set(42, 20, TILE.FLOOR);
  set(42, 24, TILE.FLOOR);
  set(42, 30, TILE.DOOR);

  rect(53, 12, 55, 34, TILE.GRATE);
  set(52, 25, TILE.DOOR);

  rect(57, 19, 61, 27, TILE.FLOOR);
  set(56, 23, TILE.DOOR);
  rect(56, 12, 61, 17, TILE.FLOOR);
  set(58, 12, TILE.FLOOR);
  for (const [gx, gz] of [[58, 17], [58, 18], [59, 17], [59, 18]]) {
    set(gx, gz, TILE.FLOOR);
  }

  rect(2, 35, 61, 37, TILE.GRATE);

  rect(2, 39, 16, 45, TILE.CARPET);
  for (const x of [8, 9]) set(x, 38, TILE.FLOOR);
  rect(17, 41, 22, 41, TILE.FLOOR);
  rect(24, 39, 39, 45, TILE.FLOOR);
  for (const x of [30, 31, 32, 33]) set(x, 38, TILE.FLOOR);
  set(23, 41, TILE.DOOR);
  set(27, 41, TILE.WALL);
  set(35, 41, TILE.WALL);
  rect(44, 39, 60, 45, TILE.FLOOR);
  for (const x of [50, 51]) set(x, 38, TILE.FLOOR);

  const fixtures = [];
  const fx = (id, x, z, r, i, wingId) => fixtures.push({ id, ...wc(x, z), r, i, wingId });
  fx('fw1', 5, 16, 6, 0.95, 'west');
  fx('fw2', 4, 21, 5, 0.9, 'west');
  fx('fw3', 5, 28, 6, 0.9, 'west');
  fx('fw4', 9, 20, 7, 1, 'west');
  fx('fa1', 27, 20, 8, 1, 'atrium');
  fx('fa2', 36, 20, 8, 1, 'atrium');
  fx('fa3', 31, 27, 8, 1, 'atrium');
  fx('fa4', 24, 31, 5, 0.6, 'atrium');
  fx('fe1', 59, 23, 6, 0.95, 'east');
  fx('fe2', 58, 14, 6, 0.85, 'east');
  fx('fe3', 46, 15, 5, 0.9, 'east');
  fx('fe4', 47, 25, 7, 0.95, 'east');
  fx('fe5', 54, 20, 6, 0.8, 'east');
  fx('fn1', 6, 10, 6, 0.8, 'maintenance');
  fx('fn2', 20, 10, 6, 0.8, 'maintenance');
  fx('fn3', 31, 10, 6, 0.8, 'maintenance');
  fx('fn4', 44, 10, 6, 0.8, 'maintenance');
  fx('fn5', 58, 10, 6, 0.8, 'maintenance');
  fx('fm1', 5, 36, 6, 0.85, 'maintenance');
  fx('fm2', 20, 36, 6, 0.85, 'maintenance');
  fx('fm3', 36, 36, 6, 0.85, 'maintenance');
  fx('fm4', 52, 36, 6, 0.85, 'maintenance');
  fx('fm5', 60, 36, 5, 0.7, 'maintenance');
  fx('fm6', 31, 42, 7, 0.95, 'maintenance');
  fx('fm7', 7, 42, 6, 0.9, 'maintenance');
  fx('fm8', 52, 42, 6, 0.85, 'maintenance');
  fx('fm9', 20, 41, 4, 0.7, 'maintenance');

  const doors = [
    { id: 'd_archive_a', cx: 31, cz: 9, locked: 'archive' },
    { id: 'd_archive_b', cx: 32, cz: 9, locked: 'archive' },
    { id: 'd_elev', cx: 54, cz: 7, locked: 'elevator' },
    { id: 'd_offA', cx: 8, cz: 16 },
    { id: 'd_offC', cx: 8, cz: 28 },
    { id: 'd_storeN', cx: 11, cz: 16 },
    { id: 'd_storeS', cx: 11, cz: 28 },
    { id: 'd_atrW2', cx: 21, cz: 29 },
    { id: 'd_atrE2', cx: 42, cz: 30 },
    { id: 'd_coldE', cx: 52, cz: 25 },
    { id: 'd_lab', cx: 56, cz: 23 },
    { id: 'd_ward', cx: 23, cz: 41 },
  ];

  const lockers = [
    { id: 'lk1', ...wc(13, 15) },
    { id: 'lk2', ...wc(13, 29) },
    { id: 'lk3', ...wc(24, 13) },
    { id: 'lk4', ...wc(39, 13) },
    { id: 'lk5', ...wc(44, 30) },
    { id: 'lk6', ...wc(51, 20) },
    { id: 'lk7', ...wc(25, 44) },
    { id: 'lk8', ...wc(38, 39) },
    { id: 'lk9', ...wc(45, 44) },
  ];

  const bottles = [
    { id: 'bt1', ...wc(14, 27) },
    { id: 'bt2', ...wc(13, 41) },
    { id: 'bt3', ...wc(14, 41) },
    { id: 'bt4', ...wc(13, 42) },
    { id: 'bt5', ...wc(57, 13) },
    { id: 'bt6', ...wc(49, 28) },
    { id: 'bt7', ...wc(57, 42) },
    { id: 'bt8', ...wc(58, 42) },
  ];

  const seals = [
    { id: 'seal1', n: 1, ...wc(3, 21) },
    { id: 'seal2', n: 2, ...wc(60, 23) },
    { id: 'seal3', n: 3, ...wc(31, 42) },
  ];

  const breakers = [
    { id: 'brk_west', wing: 'west', ...wc(2, 24) },
    { id: 'brk_east', wing: 'east', ...wc(45, 15) },
  ];

  const valves = [
    { id: 'vlv1', ...wc(12, 36), zone: { x: 31, z: 73, r: 6 } },
    { id: 'vlv2', ...wc(49, 35), zone: { x: 95, z: 73, r: 6 } },
  ];

  const objects = {
    doors,
    lockers,
    bottles,
    seals,
    vessel: { id: 'vessel', ...wc(32, 5) },
    elevator: { id: 'elevator', ...wc(54, 4) },
    breakers,
    valves,
  };

  const ais = [
    {
      id: 'warden1',
      kind: 'warden',
      wing: 'west',
      ...wc(10, 14),
      patrolRoute: [wc(10, 14), wc(10, 33), wc(9, 36), wc(4, 36), wc(9, 36), wc(10, 33)],
    },
    { id: 'warden2', kind: 'warden', wing: 'west', ...wc(6, 10), pingPong: true, patrolRoute: [wc(6, 10), wc(58, 10)] },
    {
      id: 'warden3',
      kind: 'warden',
      wing: 'atrium',
      ...wc(24, 14),
      patrolRoute: [wc(24, 14), wc(24, 32), wc(39, 32), wc(39, 14)],
    },
    { id: 'warden4', kind: 'warden', wing: 'maintenance', ...wc(58, 36), pingPong: true, patrolRoute: [wc(58, 36), wc(4, 36)] },
    {
      id: 'listener1',
      kind: 'listener',
      wing: 'maintenance',
      ...wc(27, 44),
      patrolRoute: [wc(31, 42), wc(27, 44), wc(26, 41), wc(31, 39)],
    },
    { id: 'sentinel1', kind: 'sentinel', wing: 'east', ...wc(54, 12), railA: wc(54, 12), railB: wc(54, 33) },
  ];

  return {
    w: W,
    h: H,
    tiles: t,
    start: wc(5, 43),
    fixtures,
    masks: [
      { id: 'steam1', x: 31, z: 73, r: 6, strength: 1 },
      { id: 'steam2', x: 95, z: 73, r: 6, strength: 1 },
    ],
    objects,
    ais,
    archiveDoors: ['d_archive_a', 'd_archive_b'],
    archiveApproach: wc(31, 10),
  };
}

export function staticDefFromLevel(level) {
  return {
    w: level.w,
    h: level.h,
    tiles: level.tiles,
    fixtures: level.fixtures.map((f) => ({ id: f.id, x: f.x, z: f.z, r: f.r, wingId: f.wingId })),
    objects: [
      ...level.objects.doors.map((d) => ({ kind: 'door', id: d.id, x: (d.cx + 0.5) * CELL, z: (d.cz + 0.5) * CELL })),
      ...level.objects.lockers.map((o) => ({ kind: 'locker', id: o.id, x: o.x, z: o.z })),
      ...level.objects.bottles.map((o) => ({ kind: 'bottle', id: o.id, x: o.x, z: o.z })),
      ...level.objects.seals.map((o) => ({ kind: 'seal', id: o.id, x: o.x, z: o.z, n: o.n })),
      { kind: 'vessel', id: level.objects.vessel.id, x: level.objects.vessel.x, z: level.objects.vessel.z },
      { kind: 'elevator', id: level.objects.elevator.id, x: level.objects.elevator.x, z: level.objects.elevator.z },
      ...level.objects.breakers.map((o) => ({ kind: 'breaker', id: o.id, x: o.x, z: o.z, wing: o.wing })),
      ...level.objects.valves.map((o) => ({ kind: 'valve', id: o.id, x: o.x, z: o.z })),
    ],
  };
}

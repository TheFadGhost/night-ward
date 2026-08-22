import { describe, it, expect } from 'vitest';
import { buildLevel } from '../src/game/level.js';
import { World } from '../src/sim/world.js';
import { TILE, CELL } from '../src/core/constants.js';

function makeWorld(level) {
  const w = new World(level);
  for (const f of level.fixtures) w.registerFixture(f);
  for (const m of level.masks) w.registerMask(m);
  for (const d of level.objects.doors) {
    w.registerDoor(d.id, (d.cx + 0.5) * CELL, (d.cz + 0.5) * CELL);
  }
  return w;
}

function bfs(world, sx, sz, doorsAllow) {
  const startCx = Math.floor(sx / CELL);
  const startCz = Math.floor(sz / CELL);
  const seen = new Set([startCz * world.w + startCx]);
  const queue = [[startCx, startCz]];
  while (queue.length) {
    const [x, z] = queue.shift();
    for (const [dx, dz] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx;
      const nz = z + dz;
      const k = nz * world.w + nx;
      if (seen.has(k)) continue;
      if (!world.inBounds(nx, nz)) continue;
      const t = world.tiles[k];
      if (t === TILE.WALL || t === TILE.VOID) continue;
      if (t === TILE.DOOR && !doorsAllow) continue;
      seen.add(k);
      queue.push([nx, nz]);
    }
  }
  return seen;
}

describe('facility layout', () => {
  const level = buildLevel();
  const world = makeWorld(level);

  const cellOf = (p) => Math.floor(p.z / CELL) * world.w + Math.floor(p.x / CELL);

  it('is rectangular and wall-bounded', () => {
    expect(level.tiles.length).toBe(level.w * level.h);
    for (let x = 0; x < level.w; x++) {
      expect(level.tiles[x]).toBe(TILE.WALL);
      expect(level.tiles[(level.h - 1) * level.w + x]).toBe(TILE.WALL);
    }
  });

  it('start and objectives sit on walkable tiles', () => {
    const pts = [level.start, ...level.objects.lockers, ...level.objects.bottles];
    for (const p of pts) expect(level.tiles[cellOf(p)]).not.toBe(TILE.WALL);
    for (const s of level.objects.seals) expect(level.tiles[cellOf(s)]).not.toBe(TILE.WALL);
  });

  it('reaches every objective with doors open', () => {
    const reach = bfs(world, level.start.x, level.start.z, true);
    const must = [
      ...level.objects.seals,
      level.objects.vessel,
      level.objects.elevator,
      ...level.objects.breakers,
      ...level.objects.valves,
      ...level.objects.lockers.slice(0, 4),
      ...level.objects.bottles.slice(0, 4),
    ];
    for (const p of must) {
      expect(reach.has(cellOf(p))).toBe(true);
    }
  });

  it('reaches every objective with every regular door sealed (no door-softlock)', () => {
    const reach = bfs(world, level.start.x, level.start.z, false);
    const must = [
      ...level.objects.seals,
      ...level.objects.breakers,
      ...level.objects.lockers.slice(0, 4),
    ];
    for (const p of must) {
      expect(reach.has(cellOf(p))).toBe(true);
    }
  });

  it('blocks line of sight across walls', () => {
    const a = { x: 5.5 * CELL, z: 43.5 * CELL };
    const b = { x: 5.5 * CELL, z: 4.5 * CELL };
    expect(world.lineOfSight(a.x, a.z, b.x, b.z)).toBe(false);
  });

  it('steam masks cover their valves', () => {
    for (const v of level.objects.valves) {
      expect(world.maskAt(v.zone.x, v.zone.z)).toBeGreaterThan(0.9);
    }
  });
});

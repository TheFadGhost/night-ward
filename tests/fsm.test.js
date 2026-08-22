import { describe, it, expect, beforeEach } from 'vitest';
import { TILE, PROFILES } from '../src/core/constants.js';
import { World } from '../src/sim/world.js';
import { Brain } from '../src/ai/brain.js';
import { AIManager } from '../src/ai/manager.js';
import { Rng } from '../src/core/rng.js';
import { bus } from '../src/core/events.js';

function openWorld(w = 26, h = 18) {
  return new World({ w, h, tiles: new Uint8Array(w * h).fill(TILE.FLOOR) });
}

function mk(kind, x, z, extra = {}) {
  return {
    id: extra.id || `${kind}1`,
    kind,
    x,
    z,
    facing: extra.facing !== undefined ? extra.facing : 0,
    profile: PROFILES[kind],
    patrolRoute: extra.patrolRoute
      ? extra.patrolRoute.map((p) => ({ x: p.x, z: p.z }))
      : null,
    pingPong: !!extra.pingPong,
    railA: extra.railA || null,
    railB: extra.railB || null,
    wing: extra.wing || null,
    disabled: !!extra.disabled,
  };
}

function ctxFor(ent, player, t, rng, noises) {
  return { player, noises: noises || [], ais: [ent], time: t, rng };
}

function collect(type) {
  const arr = [];
  const off = bus.on(type, (p) => arr.push(p));
  return { arr, off };
}

const LAMP = { id: 'lamp', r: 8, i: 1.2, on: true };
function litPlayer(x, z) {
  return { x, z, crouched: false, moving: true, flashlight: false, hiddenIn: null };
}

function driveToState(brain, ent, player, rng, target, dt = 0.05, maxSteps = 60) {
  let t = 0;
  for (let i = 0; i < maxSteps; i++) {
    brain.update(dt, ctxFor(ent, player, t, rng));
    t += dt;
    if (brain.state === target) return t;
  }
  return -1;
}

beforeEach(() => {
  bus.clear();
});

describe('suspicion thresholds', () => {
  it('rises through suspicious -> investigate -> chase at constant exposure', () => {
    const world = openWorld();
    world.registerFixture({ ...LAMP, x: 9, z: 3 });
    const ent = mk('warden', 3, 3);
    const brain = new Brain(ent, world);
    const player = litPlayer(9, 3);
    const rng = new Rng(7);
    const states = collect('aiState');
    const incidents = collect('incident');
    const alerts = collect('alert');
    const dt = 0.05;
    let t = 0;
    const marks = {};
    for (let i = 0; i < 40; i++) {
      brain.update(dt, ctxFor(ent, player, t, rng));
      t += dt;
      if (!marks.suspicious && brain.state === 'suspicious') {
        marks.suspicious = i + 1;
        expect(brain.suspicion).toBeGreaterThanOrEqual(30);
      }
      if (!marks.investigate && brain.state === 'investigate') {
        marks.investigate = i + 1;
        expect(brain.suspicion).toBeGreaterThanOrEqual(65);
      }
      if (!marks.chase && brain.state === 'chase') {
        marks.chase = i + 1;
        break;
      }
    }
    expect(marks.chase).toBeGreaterThan(0);
    expect(marks.suspicious).toBeLessThan(marks.investigate);
    expect(marks.investigate).toBeLessThan(marks.chase);
    expect(brain.lastKnown).toEqual({ x: 9, z: 3 });
    expect(states.arr.some((s) => s.to === 'chase')).toBe(true);
    expect(incidents.arr.some((i2) => i2.kind === 'suspicion')).toBe(true);
    expect(incidents.arr.some((i2) => i2.kind === 'spotted' && i2.detail === 'spotted you')).toBe(true);
    expect(alerts.arr).toContainEqual({ aiId: ent.id, kind: 'chase' });
  });

  it('decays when the player is unseen', () => {
    const world = openWorld();
    const ent = mk('warden', 3, 3);
    const brain = new Brain(ent, world);
    brain.suspicion = 40;
    brain.setState('suspicious');
    const player = litPlayer(-1, 3);
    const rng = new Rng(7);
    let t = 0;
    for (let i = 0; i < 10; i++) {
      brain.update(0.05, ctxFor(ent, player, t, rng));
      t += 0.05;
    }
    expect(brain.suspicion).toBeLessThan(40);
    expect(brain.suspicion).toBeGreaterThan(36);
  });

  it('investigate walks toward lastKnown', () => {
    const world = openWorld();
    const ent = mk('warden', 3, 3);
    const brain = new Brain(ent, world);
    const rng = new Rng(7);
    const noise = { x: 7, z: 3, loud: 1.7, type: 'bottle' };
    let t = 0;
    brain.update(0.05, ctxFor(ent, null, t, rng, [noise]));
    t += 0.05;
    expect(brain.state).toBe('suspicious');
    brain.update(0.05, ctxFor(ent, null, t, rng, [noise]));
    t += 0.05;
    expect(brain.state).toBe('investigate');
    expect(brain.lastKnown).toEqual({ x: 7, z: 3 });
    const d0 = Math.hypot(ent.x - 7, ent.z - 3);
    for (let i = 0; i < 30; i++) {
      brain.update(0.05, ctxFor(ent, litPlayer(-1, 3), t, rng));
      t += 0.05;
    }
    const d1 = Math.hypot(ent.x - 7, ent.z - 3);
    expect(d1).toBeLessThan(d0 - 1);
  });

  it('chase falls back to search after memorySec without LOS', () => {
    const world = openWorld();
    world.registerFixture({ ...LAMP, x: 9, z: 3 });
    const ent = mk('warden', 3, 3);
    const brain = new Brain(ent, world);
    const player = litPlayer(9, 3);
    const rng = new Rng(7);
    const alerts = collect('alert');
    const reached = driveToState(brain, ent, player, rng, 'chase');
    expect(reached).toBeGreaterThan(0);
    player.hiddenIn = 'locker1';
    let t = reached;
    for (let i = 0; i < 110; i++) {
      brain.update(0.1, ctxFor(ent, player, t, rng));
      t += 0.1;
    }
    expect(brain.state).toBe('search');
    expect(alerts.arr).toContainEqual({ aiId: ent.id, kind: 'lost' });
    expect(brain.wanderPts.length).toBeGreaterThanOrEqual(1);
    expect(brain.wanderPts.length).toBeLessThanOrEqual(3);
    for (const p of brain.wanderPts) {
      expect(Math.hypot(p.x - 9, p.z - 3)).toBeLessThanOrEqual(6.01);
    }
  });
});

describe('hearing', () => {
  it('warden hearing a loud noise twice investigates the noise position', () => {
    const world = openWorld();
    const ent = mk('warden', 3, 3);
    const brain = new Brain(ent, world);
    const rng = new Rng(7);
    const incidents = collect('incident');
    const noise = { x: 7, z: 3, loud: 1.7, type: 'bottle' };
    let t = 0;
    brain.update(0.05, ctxFor(ent, null, t, rng, [noise]));
    t += 0.05;
    brain.update(0.05, ctxFor(ent, null, t, rng, [noise]));
    expect(brain.state).toBe('investigate');
    expect(brain.lastKnown).toEqual({ x: 7, z: 3 });
    expect(
      incidents.arr.some((i2) => i2.kind === 'suspicion' && i2.detail === 'heard bottle')
    ).toBe(true);
  });

  it('listener investigates any heard noise >= 0.25 directly', () => {
    const world = openWorld();
    const ent = mk('listener', 5, 3);
    const brain = new Brain(ent, world);
    const rng = new Rng(7);
    brain.update(0.05, ctxFor(ent, null, 0, rng, [{ x: 8, z: 3, loud: 0.5, type: 'footstep' }]));
    expect(brain.state).toBe('investigate');
    expect(brain.lastKnown).toEqual({ x: 8, z: 3 });
    expect(brain.suspicion).toBeLessThan(65);
  });

  it('listener chase ends in LISTEN and catches only moving players', () => {
    const world = openWorld();
    const ent = mk('listener', 5, 3);
    const brain = new Brain(ent, world);
    const rng = new Rng(7);
    const caught = collect('playerCaught');
    const noise = { x: 8, z: 3, loud: 0.5, type: 'footstep' };
    let t = 0;
    for (let i = 0; i < 4; i++) {
      brain.update(0.05, ctxFor(ent, null, t, rng, [noise]));
      t += 0.05;
    }
    expect(brain.state).toBe('chase');
    for (let i = 0; i < 60; i++) {
      brain.update(0.05, ctxFor(ent, null, t, rng));
      t += 0.05;
      if (brain.state === 'listen') break;
    }
    expect(brain.state).toBe('listen');
    const still = { x: 6.5, z: 3, moving: false, crouched: false, flashlight: false, hiddenIn: null };
    for (let i = 0; i < 20; i++) {
      brain.update(0.05, ctxFor(ent, still, t, rng));
      t += 0.05;
    }
    expect(caught.arr.length).toBe(0);
    const moving = { ...still, moving: true };
    for (let i = 0; i < 40; i++) {
      brain.update(0.05, ctxFor(ent, moving, t, rng));
      t += 0.05;
    }
    expect(caught.arr).toContainEqual({ byId: ent.id });
  });
});

describe('sentinel', () => {
  function sentinel() {
    const world = openWorld();
    const ent = mk('sentinel', 3, 3, { railA: { x: 3, z: 3 }, railB: { x: 15, z: 3 } });
    const brain = new Brain(ent, world);
    return { world, ent, brain };
  }

  it('disabled sentinel accumulates nothing and does not move', () => {
    const { world, ent, brain } = sentinel();
    ent.disabled = true;
    const player = litPlayer(9, 3);
    const rng = new Rng(7);
    let t = 0;
    for (let i = 0; i < 20; i++) {
      brain.update(0.05, ctxFor(ent, player, t, rng));
      t += 0.05;
    }
    expect(brain.state).toBe('disabled');
    expect(brain.suspicion).toBe(0);
    expect(ent.x).toBe(3);
    ent.disabled = false;
    brain.update(0.05, ctxFor(ent, player, t, rng));
    expect(brain.state).not.toBe('disabled');
  });

  it('ignores noise entirely (vision only)', () => {
    const { ent, brain } = sentinel();
    const rng = new Rng(7);
    brain.update(0.05, ctxFor(ent, null, 0, rng, [{ x: 5, z: 3, loud: 1.7, type: 'bottle' }]));
    expect(brain.suspicion).toBe(0);
    expect(brain.state).toBe('patrol');
  });

  it('patrols its rail back and forth', () => {
    const { ent, brain } = sentinel();
    const rng = new Rng(7);
    let t = 0;
    for (let i = 0; i < 40; i++) {
      brain.update(0.05, ctxFor(ent, null, t, rng));
      t += 0.05;
    }
    expect(ent.x).toBeGreaterThan(3.5);
  });
});

describe('serialize/load round-trip mid-chase', () => {
  it('restores exact chase state and continues identically', () => {
    const world = openWorld();
    world.registerFixture({ ...LAMP, x: 9, z: 3 });
    const ent = mk('warden', 3, 3);
    const brain = new Brain(ent, world);
    const player = litPlayer(9, 3);
    const rng = new Rng(7);
    const tChase = driveToState(brain, ent, player, rng, 'chase');
    expect(tChase).toBeGreaterThan(0);
    let t = tChase;
    for (let i = 0; i < 20; i++) {
      brain.update(0.05, ctxFor(ent, player, t, rng));
      t += 0.05;
    }
    const json = JSON.parse(JSON.stringify(brain.serialize()));
    const ent2 = Object.assign(mk('warden', 3, 3), { x: ent.x, z: ent.z, facing: ent.facing });
    const brain2 = new Brain(ent2, world);
    brain2.load(JSON.parse(JSON.stringify(json)));
    expect(brain2.state).toBe('chase');
    expect(brain2.lastKnown).toEqual(brain.lastKnown);
    expect(brain2.suspicion).toBeCloseTo(brain.suspicion, 9);
    for (let i = 0; i < 100; i++) {
      brain.update(0.02, ctxFor(ent, player, t, rng));
      brain2.update(0.02, ctxFor(ent2, player, t, new Rng(7)));
      t += 0.02;
    }
    expect(brain2.state).toBe(brain.state);
    expect(brain2.suspicion).toBeCloseTo(brain.suspicion, 9);
    expect(ent2.x).toBeCloseTo(ent.x, 6);
    expect(ent2.z).toBeCloseTo(ent.z, 6);
    expect(ent2.facing).toBeCloseTo(ent.facing, 6);
    expect(brain2.lastKnown).toEqual(brain.lastKnown);
  });
});

describe('AIManager', () => {
  function spawn() {
    const world = openWorld();
    const mgr = new AIManager(
      [
        { id: 'w1', kind: 'warden', x: 3, z: 3 },
        { id: 'w2', kind: 'warden', x: 10, z: 3 },
        { id: 'l1', kind: 'listener', x: 22, z: 14 },
        { id: 's1', kind: 'sentinel', x: 3, z: 10, railA: { x: 3, z: 10 }, railB: { x: 9, z: 10 }, wing: 'west' },
      ],
      world
    );
    return { world, mgr };
  }

  it('builds entities with profiles, ids and wings', () => {
    const { mgr } = spawn();
    expect(mgr.entities.length).toBe(4);
    const s = mgr.entities.find((e) => e.id === 's1');
    expect(s.profile).toBe(PROFILES.sentinel);
    expect(s.wing).toBe('west');
    expect(mgr.brains.length).toBe(4);
  });

  it('propagates radio on chase entry: nearby wardens search lastKnown', () => {
    const { world, mgr } = spawn();
    world.registerFixture({ ...LAMP, x: 9, z: 3 });
    const w1 = mgr.brains.find((b) => b.entity.id === 'w1');
    const w2 = mgr.brains.find((b) => b.entity.id === 'w2');
    w1.suspicion = 99.5;
    const player = litPlayer(9, 3);
    const rng = new Rng(7);
    mgr.update(0.05, { player, noises: [], time: 0.05, rng });
    expect(w1.justChased).toBe(false);
    expect(w1.state).toBe('chase');
    expect(w2.state).toBe('search');
    expect(w2.lastKnown).toEqual({ x: 9, z: 3 });
  });

  it('wing blackout disables the sentinel and recovers after expiry', () => {
    const { world, mgr } = spawn();
    const s = mgr.entities.find((e) => e.id === 's1');
    const sb = mgr.brains.find((b) => b.entity.id === 's1');
    world.applyBlackout('west', 30);
    world.setTime(1);
    const rng = new Rng(7);
    mgr.update(0.05, { player: litPlayer(6, 10), noises: [], time: 1, rng });
    expect(s.disabled).toBe(true);
    expect(sb.state).toBe('disabled');
    world.setTime(100);
    mgr.update(0.05, { player: litPlayer(6, 10), noises: [], time: 100, rng });
    expect(s.disabled).toBe(false);
  });

  it('manager serialize/load restores positions and brains', () => {
    const { world, mgr } = spawn();
    const w1 = mgr.brains.find((b) => b.entity.id === 'w1');
    w1.suspicion = 42;
    w1.lastKnown = { x: 8, z: 4 };
    const json = JSON.parse(JSON.stringify(mgr.serialize()));
    const { mgr: mgr2 } = spawn();
    mgr2.load(json);
    const w1b = mgr2.brains.find((b) => b.entity.id === 'w1');
    expect(w1b.suspicion).toBeCloseTo(42, 9);
    expect(w1b.lastKnown).toEqual({ x: 8, z: 4 });
  });
});

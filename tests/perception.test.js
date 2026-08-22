import { describe, it, expect } from 'vitest';
import { TILE, PROFILES } from '../src/core/constants.js';
import { World } from '../src/sim/world.js';
import { visibility, hearNoise, catchCheck } from '../src/ai/perception.js';

function makeWorld(w, h, walls = []) {
  const tiles = new Uint8Array(w * h).fill(TILE.FLOOR);
  for (const [cx, cz] of walls) tiles[cz * w + cx] = TILE.WALL;
  return new World({ w, h, tiles });
}

const LIT = { targetLight: 1, targetMoving: true, targetCrouch: false, targetFlashlight: false };

describe('visibility', () => {
  it('blind listener never sees', () => {
    const world = makeWorld(12, 12);
    const obs = { x: 5, z: 5, facing: 0, profile: PROFILES.listener };
    const r = visibility(obs, { x: 7, z: 5 }, world, LIT);
    expect(r.seen).toBe(false);
    expect(r.exposure).toBe(0);
    expect(r.reason).toBe('blind');
  });

  it('sentinel narrow cone rejects off-angle target at same range', () => {
    const world = makeWorld(20, 20);
    const obs = { x: 5, z: 5, facing: 0, profile: PROFILES.sentinel };
    const off = visibility(obs, { x: 13, z: 7.25 }, world, LIT);
    expect(off.seen).toBe(false);
    expect(off.reason).toBe('outside view');
    const on = visibility(obs, { x: 13, z: 5 }, world, LIT);
    expect(on.seen).toBe(true);
    expect(on.exposure).toBeGreaterThan(0.045);
  });

  it('distance cutoff at visionRange', () => {
    const world = makeWorld(24, 8);
    const obs = { x: 3, z: 3, facing: 0, profile: PROFILES.warden };
    const far = visibility(obs, { x: 17, z: 3 }, world, LIT);
    expect(far.seen).toBe(false);
    expect(far.reason).toBe('too far');
    const near = visibility(obs, { x: 15, z: 3 }, world, LIT);
    expect(near.seen).toBe(true);
  });

  it('wall blocks line of sight', () => {
    const walled = makeWorld(12, 5, [[4, 2]]);
    const obs = { x: 5, z: 5, facing: 0, profile: PROFILES.warden };
    const blocked = visibility(obs, { x: 11, z: 5 }, walled, LIT);
    expect(blocked.seen).toBe(false);
    expect(blocked.reason).toBe('no line of sight');
    const open = makeWorld(12, 5);
    const clear = visibility(obs, { x: 11, z: 5 }, open, LIT);
    expect(clear.seen).toBe(true);
  });

  it('darkness drops exposure below threshold while lit stays above', () => {
    const world = makeWorld(16, 8);
    const obs = { x: 3, z: 3, facing: 0, profile: PROFILES.warden };
    const dark = visibility(obs, { x: 9, z: 3 }, world, {
      targetLight: 0,
      targetCrouch: true,
      targetMoving: false,
      targetFlashlight: false,
    });
    expect(dark.exposure).toBeLessThan(0.045);
    expect(dark.seen).toBe(false);
    const lit = visibility(obs, { x: 9, z: 3 }, world, {
      targetLight: 0.8,
      targetCrouch: true,
      targetMoving: false,
      targetFlashlight: false,
    });
    expect(lit.exposure).toBeGreaterThan(0.045);
    expect(lit.seen).toBe(true);
    expect(lit.reason).toBe('seen: lit corridor');
  });

  it('crouched still target has lower exposure than moving', () => {
    const world = makeWorld(16, 8);
    const obs = { x: 3, z: 3, facing: 0, profile: PROFILES.warden };
    const ctx = { targetLight: 0.4, targetCrouch: false, targetFlashlight: false };
    const moving = visibility(obs, { x: 9, z: 3 }, world, { ...ctx, targetMoving: true });
    const still = visibility(obs, { x: 9, z: 3 }, world, {
      ...ctx,
      targetMoving: false,
      targetCrouch: true,
    });
    expect(moving.seen).toBe(true);
    expect(moving.exposure).toBeGreaterThan(still.exposure);
    expect(still.exposure).toBeCloseTo(moving.exposure * 0.385, 5);
  });

  it('flashlight raises detection in darkness and reports glow reason', () => {
    const world = makeWorld(16, 8);
    const obs = { x: 3, z: 3, facing: 0, profile: PROFILES.warden };
    const ctx = { targetLight: 0, targetCrouch: false, targetMoving: true };
    const dark = visibility(obs, { x: 9, z: 3 }, world, ctx);
    const glow = visibility(obs, { x: 9, z: 3 }, world, { ...ctx, targetFlashlight: true });
    expect(glow.seen).toBe(true);
    expect(glow.reason).toBe('seen: flashlight glow');
    expect(glow.exposure).toBeGreaterThan(dark.exposure);
  });

  it('registered fixture lights the corridor; smashing it darkens', () => {
    const world = makeWorld(18, 8);
    world.registerFixture({ id: 'f1', x: 13, z: 3, r: 4, i: 0.95, on: true });
    const obs = { x: 3, z: 3, facing: 0, profile: PROFILES.warden };
    const ctx = () => ({
      targetLight: world.lightAt(13, 3),
      targetCrouch: true,
      targetMoving: false,
      targetFlashlight: false,
    });
    const lit = visibility(obs, { x: 13, z: 3 }, world, ctx());
    expect(lit.seen).toBe(true);
    world.fixtures[0].on = false;
    const dark = visibility(obs, { x: 13, z: 3 }, world, ctx());
    expect(dark.seen).toBe(false);
    expect(dark.exposure).toBeLessThan(0.045);
  });
});

describe('hearNoise', () => {
  it('radius scales with loud and hearingMult', () => {
    const world = makeWorld(24, 12);
    const evt = { x: 9, z: 3, loud: 0.5, type: 'footstep' };
    const l = hearNoise({ x: 7, z: 3 }, PROFILES.listener, evt, world);
    expect(l.heard).toBe(true);
    expect(l.strength).toBeCloseTo(1 - 2 / (0.5 * 10 * 3.2), 5);
    expect(l.reason).toBe('footstep heard');
    const w = hearNoise({ x: 7, z: 3 }, PROFILES.warden, evt, world);
    expect(w.heard).toBe(true);
    expect(w.strength).toBeCloseTo(1 - 2 / (0.5 * 10 * 1.15), 5);
    expect(l.strength).toBeGreaterThan(w.strength);
    const glass = hearNoise({ x: 7, z: 3 }, PROFILES.listener, { x: 9, z: 3, loud: 1.7, type: 'glass' }, world);
    expect(glass.strength).toBeGreaterThan(l.strength);
    expect(glass.reason).toBe('glass heard');
  });

  it('out of radius is not heard', () => {
    const world = makeWorld(30, 12);
    const r = hearNoise({ x: 3, z: 3 }, PROFILES.warden, { x: 12, z: 3, loud: 0.5, type: 'footstep' }, world);
    expect(r.heard).toBe(false);
    expect(r.strength).toBe(0);
  });

  it('steam mask suppresses fully and reports reason', () => {
    const world = makeWorld(16, 12);
    world.registerMask({ id: 's1', x: 9, z: 3, r: 3, strength: 1, on: true });
    const r = hearNoise({ x: 9, z: 3 }, PROFILES.listener, { x: 9, z: 3, loud: 1.7, type: 'bottle' }, world);
    expect(r.heard).toBe(false);
    expect(r.strength).toBe(0);
    expect(r.reason).toBe('masked by steam');
  });

  it('partial mask shrinks audible radius', () => {
    const world = makeWorld(16, 12);
    world.registerMask({ id: 's2', x: 9, z: 3, r: 4, strength: 0.5, on: true });
    const r = hearNoise({ x: 9, z: 6 }, PROFILES.listener, { x: 9, z: 3, loud: 0.5, type: 'footstep' }, world);
    expect(r.strength).toBeCloseTo(1 - 3 / (0.5 * 10 * 3.2 * 0.5), 5);
  });
});

describe('catchCheck', () => {
  const listenerEnt = { x: 0, z: 0, kind: 'listener', profile: PROFILES.listener };
  const wardenEnt = { x: 0, z: 0, kind: 'warden', profile: PROFILES.warden };

  it('listener ignores a still player inside catchRadius', () => {
    expect(catchCheck(listenerEnt, { x: 1, z: 0, moving: false, hiddenIn: null })).toBe(false);
  });

  it('listener catches a moving player inside catchRadius', () => {
    expect(catchCheck(listenerEnt, { x: 1, z: 0, moving: true, hiddenIn: null })).toBe(true);
  });

  it('hidden player can never be caught', () => {
    expect(catchCheck(listenerEnt, { x: 1, z: 0, moving: true, hiddenIn: 'locker1' })).toBe(false);
    expect(catchCheck(wardenEnt, { x: 0.5, z: 0, moving: false, hiddenIn: 'locker1' })).toBe(false);
  });

  it('outside radius or warden-vs-still behaves per rules', () => {
    expect(catchCheck(listenerEnt, { x: 3, z: 0, moving: true, hiddenIn: null })).toBe(false);
    expect(catchCheck(wardenEnt, { x: 0.5, z: 0, moving: false, hiddenIn: null })).toBe(true);
  });
});

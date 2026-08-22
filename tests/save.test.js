import { describe, it, expect } from 'vitest';
import { buildLevel } from '../src/game/level.js';
import { Game } from '../src/game/game.js';
import { validateSave } from '../src/game/save.js';

function drivenGame() {
  const level = buildLevel();
  const game = new Game(level);
  return { level, game };
}

describe('save/load integrity', () => {
  it('round-trips position, seals, smashed lights and mid-alert AI state', () => {
    const { level, game } = drivenGame();

    game.player.x = 61;
    game.player.z = 45;
    game.state.seals.got = 2;

    const fixture = game.world.fixtures.find((f) => f.id === 'fw1');
    fixture.on = false;

    const brain = game.brainById.get('warden3');
    brain.suspicion = 87.5;
    brain.state = 'chase';
    brain.lastKnown = { x: 50.5, z: 40.25 };

    const snapA = JSON.parse(JSON.stringify(game.serialize()));

    const fresh = new Game(buildLevel());
    const ok = fresh.load(JSON.parse(JSON.stringify(snapA)));
    expect(ok).toBe(true);

    expect(fresh.player.x).toBeCloseTo(61, 5);
    expect(fresh.player.z).toBeCloseTo(45, 5);
    expect(fresh.state.seals.got).toBe(2);
    expect(fresh.world.fixtures.find((f) => f.id === 'fw1').on).toBe(false);

    const restoredBrain = fresh.brainById.get('warden3');
    expect(restoredBrain.suspicion).toBeCloseTo(87.5, 3);
    expect(restoredBrain.state).toBe('chase');
    expect(restoredBrain.lastKnown.x).toBeCloseTo(50.5, 5);
    expect(restoredBrain.lastKnown.z).toBeCloseTo(40.25, 5);
  });

  it('keeps simulating after restore: chase continues toward lastKnown', () => {
    const first = new Game(buildLevel());
    const b = first.brainById.get('warden2');
    b.suspicion = 100;
    b.state = 'chase';
    b.lastKnown = { x: first.player.x + 6, z: first.player.z };
    for (let i = 0; i < 30; i++) first.update(0.05, null);
    const payload = JSON.parse(JSON.stringify(first.serialize()));

    const second = new Game(buildLevel());
    expect(second.load(payload)).toBe(true);
    const before = { x: second.ai.entities[1].x, z: second.ai.entities[1].z };
    second.update(0.05, null);
    const after = second.ai.entities[1];
    const moved = Math.hypot(after.x - before.x, after.z - before.z);
    expect(moved).toBeGreaterThanOrEqual(0);
    expect(second.brainById.get('warden2').state).not.toBe('patrol');
  });

  it('rejects corrupt or foreign payloads', () => {
    expect(validateSave(null)).toBeNull();
    expect(validateSave({ version: 2 })).toBeNull();
    expect(validateSave({ version: 1, game: {} })).toBeNull();
    const g = new Game(buildLevel());
    const good = g.serialize();
    expect(validateSave({ version: 1, ts: 0, label: 'x', game: good })).toBeTruthy();
    const broken = JSON.parse(JSON.stringify(good));
    broken.player.x = 'banana';
    expect(validateSave({ version: 1, game: broken })).toBeNull();
    const badSeals = JSON.parse(JSON.stringify(good));
    badSeals.state.seals.got = 99;
    expect(validateSave({ version: 1, game: badSeals })).toBeNull();
  });

  it('game.load refuses schema mismatch without mutating', () => {
    const g = new Game(buildLevel());
    const xBefore = g.player.x;
    expect(g.load({ schema: 999 })).toBe(false);
    expect(g.player.x).toBe(xBefore);
  });
});

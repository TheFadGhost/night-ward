import { describe, it, expect, beforeEach } from 'vitest';
import { TILE, NOISE, BLACKOUT, LIGHT_AMBIENT } from '../src/core/constants.js';
import { World } from '../src/sim/world.js';
import { Player } from '../src/sim/player.js';
import { Interactables } from '../src/game/objects.js';
import { bus } from '../src/core/events.js';

function collect(type) {
  const arr = [];
  bus.on(type, (p) => arr.push(p));
  return arr;
}

function makeEnv(defs, walls = []) {
  const w = 12;
  const h = 12;
  const tiles = new Uint8Array(w * h).fill(TILE.FLOOR);
  for (const [cx, cz] of walls) tiles[cz * w + cx] = TILE.WALL;
  const world = new World({ w, h, tiles });
  return { world, objects: new Interactables(world, defs) };
}

function makeGame() {
  return {
    player: new Player(12, 12),
    state: { seals: { got: 0 }, vessel: false },
    stats: () => ({ time: 42 }),
    time: 0,
  };
}

function step(objects, game, dt, n) {
  for (let i = 0; i < n; i++) {
    game.time += dt;
    objects.update(dt, game);
  }
}

beforeEach(() => {
  bus.clear();
});

describe('bottle throw and smash', () => {
  it('breaks on wall, smashes nearby fixture, emits bottle+glass noise', () => {
    const { world, objects } = makeEnv({}, [[9, 6]]);
    world.registerFixture({ id: 'lamp1', x: 17.5, z: 13, r: 5, i: 1.2, wingId: 'west' });
    const game = makeGame();
    game.player.x = 5;
    game.player.z = 13;
    game.player.bottles = 1;
    const noises = collect('noise');
    const smashes = collect('lightSmashed');

    expect(objects.throwBottle({ x: 5, z: 13 }, { x: 1, z: 0 }, game)).toBe(true);
    expect(game.player.bottles).toBe(0);
    step(objects, game, 0.05, 40);

    const types = noises.map((n) => n.type);
    expect(types[0]).toBe('throw');
    expect(types).toContain('throw');
    expect(types).toContain('bottle');
    expect(types).toContain('glass');
    const bottleN = noises.find((n) => n.type === 'bottle');
    expect(bottleN.loud).toBe(NOISE.bottle);
    const glassN = noises.find((n) => n.type === 'glass');
    expect(glassN.loud).toBe(NOISE.glass);
    const fixture = world.fixtures[0];
    expect(fixture.on).toBe(false);
    expect(smashes).toEqual([{ id: 'lamp1', x: 17.5, z: 13, wingId: 'west' }]);
    expect(world.lightAt(17.5, 13)).toBeCloseTo(LIGHT_AMBIENT, 5);
    expect(world.wingBlackedOut('west')).toBe(false);
  });

  it('refuses to throw with no bottles', () => {
    const { objects } = makeEnv({});
    const game = makeGame();
    game.player.bottles = 0;
    expect(objects.throwBottle({ x: 5, z: 5 }, { x: 1, z: 0 }, game)).toBe(false);
    expect(game.player.bottles).toBe(0);
    expect(objects.projectiles.length).toBe(0);
  });

  it('projectile ends at life limit without smashing distant fixtures', () => {
    const { world, objects } = makeEnv({});
    world.registerFixture({ id: 'far', x: 2, z: 2, r: 4, i: 1, wingId: 'east' });
    const game = makeGame();
    const noises = collect('noise');
    objects.throwBottle({ x: 10, z: 10 }, { x: 1, z: 0 }, game);
    step(objects, game, 0.05, 40);
    expect(noises.some((n) => n.type === 'bottle')).toBe(true);
    expect(noises.some((n) => n.type === 'glass')).toBe(false);
    expect(world.fixtures[0].on).toBe(true);
    expect(objects.projectiles.length).toBe(0);
  });
});

describe('breaker blackout cycle', () => {
  it('applies blackout, rejects cooldown reuse, emits restore at expiry', () => {
    const defs = { breakers: [{ id: 'bk1', wing: 'west', x: 6, z: 6 }] };
    const { world, objects } = makeEnv(defs);
    world.registerFixture({ id: 'w1', x: 6, z: 6, r: 6, i: 1, wingId: 'west' });
    const game = makeGame();
    game.player.x = 6;
    game.player.z = 7.5;
    const breakerEvents = collect('breaker');

    const bk = objects.list.find((o) => o.kind === 'breaker');
    let near = objects.nearestInteractable(game.player, game);
    expect(near.label).toBe('Throw breaker — WEST WING');

    expect(objects.interact(bk, game)).toBe(true);
    expect(world.wingBlackedOut('west')).toBe(true);
    expect(world.fixtureActive(world.fixtures[0])).toBe(false);
    expect(breakerEvents).toEqual([{ wingId: 'west', on: false, dur: BLACKOUT.duration }]);
    near = objects.nearestInteractable(game.player, game);
    expect(near.label).toBe('Breaker cycling');
    expect(objects.interact(bk, game)).toBe(false);
    expect(breakerEvents.length).toBe(1);

    game.time += BLACKOUT.duration + 1;
    objects.update(0.05, game);
    expect(game.time).toBeGreaterThan(BLACKOUT.duration);
    expect(world.wingBlackedOut('west')).toBe(false);
    expect(world.fixtureActive(world.fixtures[0])).toBe(true);
    expect(objects.interact(bk, game)).toBe(false);
    expect(breakerEvents.length).toBe(1);

    game.time = BLACKOUT.cooldown - 0.01;
    objects.update(0.01, game);
    expect(breakerEvents.length).toBe(1);

    game.time = BLACKOUT.cooldown;
    objects.update(0.01, game);
    expect(breakerEvents).toEqual([
      { wingId: 'west', on: false, dur: BLACKOUT.duration },
      { wingId: 'west', on: true },
    ]);
    near = objects.nearestInteractable(game.player, game);
    expect(near.label).toBe('Throw breaker — WEST WING');

    expect(objects.interact(bk, game)).toBe(true);
    expect(world.wingBlackedOut('west')).toBe(true);
    expect(breakerEvents.length).toBe(3);
  });
});

describe('steam valve', () => {
  it('toggles mask on/off and emits steam events', () => {
    const defs = { valves: [{ id: 'tv1', x: 8, z: 8, zone: { x: 10, z: 10, r: 4 } }] };
    const { world, objects } = makeEnv(defs);
    const game = makeGame();
    const steamEvents = collect('steam');
    const valve = objects.list.find((o) => o.kind === 'valve');

    expect(world.maskAt(10, 10)).toBeGreaterThan(0);
    let near = objects.nearestInteractable(game.player, game);
    game.player.x = 8;
    game.player.z = 9;
    near = objects.nearestInteractable(game.player, game);
    expect(near.label).toBe('Close steam valve');

    expect(objects.interact(valve, game)).toBe(true);
    expect(world.maskAt(10, 10)).toBe(0);
    expect(steamEvents).toEqual([{ id: 'tv1', on: false }]);
    expect(objects.nearestInteractable(game.player, game).label).toBe('Open steam valve');

    expect(objects.interact(valve, game)).toBe(true);
    expect(world.maskAt(10, 10)).toBeGreaterThan(0);
    expect(steamEvents).toEqual([
      { id: 'tv1', on: false },
      { id: 'tv1', on: true },
    ]);
  });
});

describe('doors', () => {
  it('toggles unlocked door with door noise events', () => {
    const defs = { doors: [{ id: 'd2', cx: 3, cz: 3, locked: null }] };
    const { world, objects } = makeEnv(defs);
    const game = makeGame();
    game.player.x = 7;
    game.player.z = 8;
    const doorEvents = collect('door');
    const noises = collect('noise');
    const door = objects.list.find((o) => o.kind === 'door');

    expect(objects.nearestInteractable(game.player, game).label).toBe('Open door');
    expect(objects.interact(door, game)).toBe(true);
    expect(world.isDoorOpen('d2')).toBe(true);
    expect(doorEvents).toEqual([{ id: 'd2', open: true }]);
    expect(noises[0]).toMatchObject({ loud: NOISE.doorOpen, type: 'door' });

    expect(objects.nearestInteractable(game.player, game).label).toBe('Close door');
    expect(objects.interact(door, game)).toBe(true);
    expect(world.isDoorOpen('d2')).toBe(false);
    expect(doorEvents).toEqual([
      { id: 'd2', open: true },
      { id: 'd2', open: false },
    ]);
    expect(noises[1]).toMatchObject({ loud: NOISE.doorClose, type: 'door' });
  });

  it('archive door refuses until 3 seals then opens', () => {
    const defs = { doors: [{ id: 'arch', cx: 5, cz: 5, locked: 'archive' }] };
    const { world, objects } = makeEnv(defs);
    const game = makeGame();
    game.player.x = 11;
    game.player.z = 12;
    const doorEvents = collect('door');
    const arch = objects.list.find((o) => o.kind === 'door');

    expect(objects.nearestInteractable(game.player, game).label).toBe('Locked — needs 3 seals');
    expect(objects.interact(arch, game)).toBe(false);
    expect(doorEvents).toEqual([]);
    expect(world.isDoorOpen('arch')).toBe(false);

    game.state.seals.got = 2;
    expect(objects.interact(arch, game)).toBe(false);

    game.state.seals.got = 3;
    expect(objects.nearestInteractable(game.player, game).label).toBe('Open door');
    expect(objects.interact(arch, game)).toBe(true);
    expect(doorEvents).toEqual([{ id: 'arch', open: true }]);
    expect(world.blockedCell(5, 5)).toBe(false);
  });

  it('elevator-locked door refuses until vessel taken', () => {
    const defs = { doors: [{ id: 'lift', cx: 7, cz: 7, locked: 'elevator' }] };
    const { world, objects } = makeEnv(defs);
    const game = makeGame();
    game.player.x = 15;
    game.player.z = 15;
    const lift = objects.list.find((o) => o.kind === 'door');

    expect(objects.nearestInteractable(game.player, game).label).toBe('Locked — power the elevator');
    expect(objects.interact(lift, game)).toBe(false);
    expect(world.isDoorOpen('lift')).toBe(false);

    game.state.vessel = true;
    expect(objects.interact(lift, game)).toBe(true);
    expect(world.isDoorOpen('lift')).toBe(true);
  });
});

describe('lockers', () => {
  it('hides and unhides player with locker noises', () => {
    const defs = { lockers: [{ id: 'lk1', x: 10, z: 10 }] };
    const { objects } = makeEnv(defs);
    const game = makeGame();
    game.player.x = 10;
    game.player.z = 11;
    const noises = collect('noise');
    const hiddenEvents = collect('playerHidden');
    const unhiddenEvents = collect('playerUnhidden');
    const locker = objects.list.find((o) => o.kind === 'locker');

    expect(objects.nearestInteractable(game.player, game).label).toBe('Hide in locker');
    expect(objects.interact(locker, game)).toBe(true);
    expect(game.player.hiddenIn).toBe('lk1');
    expect(hiddenEvents).toEqual([{ id: 'lk1' }]);
    expect(noises[0]).toMatchObject({ loud: NOISE.lockerEnter, type: 'locker' });

    expect(objects.nearestInteractable(game.player, game).label).toBe('Exit locker');
    expect(objects.interact(locker, game)).toBe(true);
    expect(game.player.hiddenIn).toBe(null);
    expect(unhiddenEvents).toEqual([{}]);
    expect(noises[1]).toMatchObject({ loud: NOISE.lockerExit, type: 'locker' });
  });
});

describe('pickups: bottles, seals, vessel, elevator win', () => {
  it('picks up bottle and hides it afterwards', () => {
    const defs = { bottles: [{ id: 'b1', x: 4, z: 4 }] };
    const { objects } = makeEnv(defs);
    const game = makeGame();
    game.player.x = 4;
    game.player.z = 4.5;
    const pickups = collect('pickup');
    const bottle = objects.list.find((o) => o.kind === 'bottle');

    expect(objects.nearestInteractable(game.player, game).label).toBe('Take bottle');
    expect(objects.interact(bottle, game)).toBe(true);
    expect(game.player.bottles).toBe(3);
    expect(pickups).toEqual([{ kind: 'bottle', id: 'b1' }]);
    expect(bottle.taken).toBe(true);
    expect(objects.nearestInteractable(game.player, game)).toBe(null);
    expect(objects.interact(bottle, game)).toBe(false);
  });

  it('counts seals, fires objective at third', () => {
    const defs = {
      seals: [
        { id: 's1', n: 1, x: 2, z: 2 },
        { id: 's2', n: 2, x: 3, z: 3 },
        { id: 's3', n: 3, x: 4, z: 4 },
      ],
    };
    const { objects } = makeEnv(defs);
    const game = makeGame();
    const pickups = collect('pickup');
    const sealTaken = collect('sealTaken');
    const objectives = collect('objective');

    game.player.x = 2;
    game.player.z = 2;
    expect(objects.nearestInteractable(game.player, game).label).toBe('Take Seal (1/3)');
    objects.interact(objects.list[0], game);
    expect(game.state.seals.got).toBe(1);
    expect(sealTaken).toEqual([{ n: 1, total: 3 }]);
    expect(objectives).toEqual([]);

    game.player.x = 3;
    game.player.z = 3.5;
    expect(objects.nearestInteractable(game.player, game).label).toBe('Take Seal (2/3)');
    objects.interact(objects.list[1], game);
    expect(sealTaken).toEqual([
      { n: 1, total: 3 },
      { n: 2, total: 3 },
    ]);
    expect(objectives).toEqual([]);

    objects.interact(objects.list[2], game);
    expect(game.state.seals.got).toBe(3);
    expect(pickups.map((p) => p.kind)).toEqual(['seal', 'seal', 'seal']);
    expect(objectives).toEqual([
      { text: 'The archive seal releases — north door unlocked' },
    ]);
  });

  it('vessel triggers objective and restlessness; elevator wins only with vessel', () => {
    const defs = {
      vessel: { id: 'vs1', x: 6, z: 6 },
      elevator: { id: 'el1', x: 20, z: 20 },
    };
    const { objects } = makeEnv(defs);
    const game = makeGame();
    const vesselTaken = collect('vesselTaken');
    const objectives = collect('objective');
    const alerts = collect('alert');
    const won = collect('gameWon');
    const vessel = objects.list.find((o) => o.kind === 'vessel');
    const elevator = objects.list.find((o) => o.kind === 'elevator');

    game.player.x = 6;
    game.player.z = 6.5;
    expect(objects.nearestInteractable(game.player, game).label).toBe('Take Vessel');
    expect(objects.interact(elevator, game)).toBe(false);
    expect(won).toEqual([]);

    expect(objects.interact(vessel, game)).toBe(true);
    expect(game.state.vessel).toBe(true);
    expect(vesselTaken).toEqual([{}]);
    expect(objectives).toEqual([{ text: 'Reach the elevator' }]);
    expect(alerts).toEqual([{ aiId: '*', kind: 'restless' }]);
    expect(objects.nearestInteractable(game.player, game)).toBe(null);

    expect(objects.interact(elevator, game)).toBe(true);
    expect(won).toEqual([{ stats: { time: 42 } }]);
    expect(elevator.taken).toBeUndefined();
  });
});

describe('serialize / load', () => {
  function fullDefs() {
    return {
      doors: [{ id: 'd1', cx: 5, cz: 5, locked: null }],
      lockers: [{ id: 'lk1', x: 10, z: 10 }],
      bottles: [{ id: 'b1', x: 4, z: 4 }],
      seals: [{ id: 's1', n: 1, x: 14, z: 14 }],
      breakers: [{ id: 'bk1', wing: 'east', x: 16, z: 16 }],
      valves: [{ id: 'tv1', x: 18, z: 18, zone: { x: 20, z: 20, r: 4 } }],
    };
  }

  function wallEnv(defs) {
    return makeEnv(defs, [[11, 11]]);
  }

  it('restores taken flags, breaker timers, clears projectiles', () => {
    const envA = wallEnv(fullDefs());
    const game = makeGame();
    const seal = envA.objects.list.find((o) => o.kind === 'seal');
    const bk = envA.objects.list.find((o) => o.kind === 'breaker');
    const valve = envA.objects.list.find((o) => o.kind === 'valve');

    envA.objects.interact(seal, game);
    envA.objects.interact(valve, game);
    envA.objects.interact(bk, game);
    envA.objects.throwBottle({ x: 21, z: 23 }, { x: 0, z: 1 }, game);
    game.time = 25;

    const json = JSON.parse(JSON.stringify(envA.objects.serialize()));

    const envB = wallEnv(fullDefs());
    const noisesB = collect('noise');
    const breakerEventsB = collect('breaker');
    const pickupsB = collect('pickup');
    envB.objects.load(json);

    expect(envB.objects.projectiles.length).toBe(0);
    const sealB = envB.objects.list.find((o) => o.kind === 'seal');
    const bkB = envB.objects.list.find((o) => o.kind === 'breaker');
    const valveB = envB.objects.list.find((o) => o.kind === 'valve');
    expect(sealB.taken).toBe(true);
    expect(valveB.mask.on).toBe(false);

    envB.objects.update(0.05, game);
    envB.objects.interact(sealB, game);
    expect(pickupsB).toEqual([]);
    expect(envB.world.maskAt(20, 20)).toBe(0);

    envB.objects.interact(bkB, game);
    expect(breakerEventsB).toEqual([]);
    expect(envB.objects.interact(bkB, game)).toBe(false);

    game.time = 90;
    envB.objects.update(0.01, game);
    expect(breakerEventsB).toEqual([{ wingId: 'east', on: true }]);

    step(envB.objects, game, 0.05, 40);
    expect(noisesB.some((n) => n.type === 'bottle')).toBe(false);
    expect(envB.objects.projectiles.length).toBe(0);
  });
});

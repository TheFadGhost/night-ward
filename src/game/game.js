import { bus } from '../core/events.js';
import { SURFACE, CELL } from '../core/constants.js';
import { World } from '../sim/world.js';
import { Player } from '../sim/player.js';
import { AIManager } from '../ai/manager.js';
import { Interactables } from './objects.js';

const SAVE_SCHEMA = 1;

export class Game {
  constructor(level) {
    this.level = level;
    this.world = new World(level);
    for (const f of level.fixtures) this.world.registerFixture(f);
    for (const m of level.masks) this.world.registerMask(m);
    for (const d of level.objects.doors) {
      this.world.registerDoor(d.id, (d.cx + 0.5) * CELL, (d.cz + 0.5) * CELL);
      if (d.locked) this.world.lockDoor(d.id);
    }
    this.player = new Player(level.start.x, level.start.z);
    this.ai = new AIManager(level.ais, this.world);
    this.brainById = new Map();
    for (const b of this.ai.brains) this.brainById.set(b.entity.id, b);
    this.objects = new Interactables(this.world, level.objects);
    this.state = { seals: { got: 0, total: 3 }, vessel: false };
    this.time = 0;
    this.won = false;
    this.lost = false;
    this.stats = { time: 0, spotted: 0, bottlesUsed: 0 };
    this.log = [];
    this.pendingNoiseBuffer = [];
    this.recentNoises = [];
    this.pendingCaughtBy = null;
    this.spotCooldown = new Map();
    this.objectiveText = 'Slip the ward. Find the three seals.';
    this.unsubscribers = [
      bus.on('noise', (e) => this.onNoise(e)),
      bus.on('incident', (e) => this.pushLog(e)),
      bus.on('playerCaught', (e) => {
        if (!this.won && !this.lost) this.pendingCaughtBy = e.byId;
      }),
      bus.on('alert', (e) => this.onAlert(e)),
      bus.on('sealTaken', () => this.onSeal()),
      bus.on('vesselTaken', () => this.onVessel()),
    ];
  }

  get archiveUnlocked() {
    return this.state.seals.got >= 3;
  }

  onNoise(e) {
    const tile = this.world.tileAt(e.x, e.z);
    const surf = SURFACE[tile];
    this.pendingNoiseBuffer.push({
      x: e.x,
      z: e.z,
      loud: e.loud,
      type: e.type,
      t0: this.time,
      surface: surf ? surf.name : 'concrete',
    });
  }

  pushLog(e) {
    this.log.push({ t: Math.round(this.time * 10) / 10, who: e.who, kind: e.kind, detail: e.detail, x: e.x, z: e.z });
    if (this.log.length > 240) this.log.shift();
  }

  onAlert(e) {
    if (e.kind !== 'chase') return;
    const last = this.spotCooldown.get(e.aiId) ?? -99;
    if (this.time - last > 3) {
      this.spotCooldown.set(e.aiId, this.time);
      this.stats.spotted++;
    }
  }

  onSeal() {
    const n = this.state.seals.got;
    this.objectiveText =
      n >= 3 ? 'The archive stands open. Take the Vessel.' : `Seal ${n}/3 recovered. ${3 - n} remain.`;
    this.checkpoint(`seal${n}`);
  }

  onVessel() {
    this.objectiveText = 'Reach the elevator. Everything is restless now.';
    const ap = this.level.archiveApproach;
    for (const b of this.ai.brains) {
      b.entity.patrolBoost = 1.15;
      if (b.entity.profile.kind !== 'warden') continue;
      if (Math.hypot(b.entity.x - ap.x, b.entity.z - ap.z) < 60) {
        b.lastKnown = { x: ap.x, z: ap.z };
        if (b.state === 'patrol' || b.state === 'return') b.state = 'search';
      }
    }
    this.checkpoint('vessel');
  }

  update(rawDt, input) {
    if (this.won) return;
    const dt = Math.min(rawDt, 0.05);
    this.time += dt;
    this.stats.time = this.time;
    this.world.setTime(this.time);

    const frameNoises = this.pendingNoiseBuffer;
    this.pendingNoiseBuffer = [];

    this.player.update(dt, input, this.world);

    if (input && input.interact && !this.lost) {
      const near = this.objects.nearestInteractable(this.player, this);
      if (near) this.objects.interact(near.obj, this);
    }
    if (input && input.throwPressed && !this.lost && !this.player.hiddenIn) {
      let dx;
      let dz;
      if (input.aimWorld) {
        dx = input.aimWorld.x - this.player.x;
        dz = input.aimWorld.z - this.player.z;
      } else {
        dx = Math.cos(this.player.facing);
        dz = Math.sin(this.player.facing);
      }
      const l = Math.hypot(dx, dz) || 1;
      if (this.objects.throwBottle({ x: this.player.x, z: this.player.z }, { x: dx / l, z: dz / l }, this)) {
        this.stats.bottlesUsed++;
      }
    }

    const ctx = { player: this.player, noises: frameNoises, ais: this.ai.entities, time: this.time };
    this.ai.update(dt, ctx);
    this.objects.update(dt, this);

    this.checkHideUnderChase();

    if (this.pendingCaughtBy && !this.won) {
      this.lost = true;
      this.player.alive = false;
      bus.emit('incident', {
        who: this.nameOf(this.pendingCaughtBy),
        kind: 'caught',
        detail: 'you were taken',
      });
      bus.emit('gameLost', {});
    }
    this.pendingCaughtBy = null;

    for (const n of frameNoises) {
      n.t0 = n.t0 ?? this.time;
      this.recentNoises.push(n);
    }
    const cutoff = this.time - 0.85;
    this.recentNoises = this.recentNoises.filter((n) => n.t0 >= cutoff);
  }

  checkHideUnderChase() {
    if (!this.player.hiddenIn) return;
    for (const b of this.ai.brains) {
      if (b.state !== 'chase') continue;
      const ent = b.entity;
      if (ent.profile.kind === 'listener') continue;
      if ((b.lastSeenT ?? 99) < 1.5 && Math.hypot(ent.x - this.player.x, ent.z - this.player.z) < 11) {
        this.pendingCaughtBy = ent.id;
        bus.emit('incident', {
          who: this.nameOf(ent.id),
          kind: 'caught',
          detail: 'saw you climb in',
        });
        return;
      }
    }
  }

  nameOf(aiId) {
    return aiId ? aiId.charAt(0).toUpperCase() + aiId.slice(1) : aiId;
  }

  threatLevel() {
    let threat = 0;
    let chaseActive = false;
    for (const b of this.ai.brains) {
      const ent = b.entity;
      if (ent.disabled) continue;
      const st = b.state || 'patrol';
      const d = Math.hypot(ent.x - this.player.x, ent.z - this.player.z);
      const prox = Math.max(0, 1 - d / 18);
      let w = 0.25;
      if (['suspicious', 'investigate', 'search', 'listen'].includes(st)) w = 0.55;
      if (st === 'chase') {
        w = 1;
        chaseActive = true;
      }
      threat = Math.max(threat, prox * w);
      threat = Math.max(threat, ((b.suspicion || 0) / 100) * 0.5);
    }
    return { threat: Math.min(1, threat), chaseActive };
  }

  snapshot() {
    const { threat, chaseActive } = this.threatLevel();
    const near = this.objects.nearestInteractable(this.player, this);
    const doors = this.level.objects.doors.map((d) => ({
      id: d.id,
      open: this.world.isDoorOpen(d.id),
      locked: d.locked || null,
    }));
    const takenIds = [];
    for (const o of [...this.level.objects.bottles, ...this.level.objects.seals]) {
      if (o.taken) takenIds.push(o.id);
    }
    if (this.state.vessel) takenIds.push('vessel');
    const aisSnap = this.ai.entities.map((ent) => {
      const p = ent.profile;
      const brain = this.brainById.get(ent.id);
      return {
        id: ent.id,
        kind: p.kind,
        x: ent.x,
        z: ent.z,
        facing: ent.facing,
        state: brain ? brain.state : 'patrol',
        suspicion: brain ? Math.min(1, (brain.suspicion || 0) / 100) : 0,
        disabled: !!ent.disabled,
        coneRange: p.visionRange,
        coneHalfDeg: p.visionHalfAngleDeg,
      };
    });
    return {
      time: this.time,
      player: {
        x: this.player.x,
        z: this.player.z,
        facing: this.player.facing,
        crouched: this.player.crouched,
        moving: this.player.moving,
        flashlight: this.player.flashlight,
        hiddenIn: this.player.hiddenIn,
        bottles: this.player.bottles,
        alive: this.player.alive,
      },
      ais: aisSnap,
      lights: this.world.fixtures.map((f) => ({ id: f.id, on: this.world.fixtureActive(f) })),
      doors,
      takenIds,
      unlockedArchive: this.archiveUnlocked,
      unlockedElevator: this.state.vessel,
      sealsGot: this.state.seals.got,
      vessel: this.state.vessel,
      noises: this.recentNoises,
      threatLevel: threat,
      chaseActive,
      pulse: (Math.sin(this.time * (2 + threat * 6)) + 1) / 2,
      prompt: near ? { label: near.label } : null,
      objective: this.objectiveText,
      won: this.won,
      lost: this.lost,
    };
  }

  checkpoint(label) {
    bus.emit('checkpoint', { label });
  }

  serialize() {
    return {
      schema: SAVE_SCHEMA,
      time: this.time,
      state: JSON.parse(JSON.stringify(this.state)),
      stats: JSON.parse(JSON.stringify(this.stats)),
      objectiveText: this.objectiveText,
      player: this.player.serialize(),
      world: this.world.serialize(),
      ai: this.ai.serialize(),
      objects: this.objects.serialize(),
    };
  }

  load(json) {
    if (!json || json.schema !== SAVE_SCHEMA) return false;
    try {
      this.time = Number(json.time) || 0;
      this.state = json.state;
      if (!this.state.seals) return false;
      this.stats = json.stats || this.stats;
      this.objectiveText = json.objectiveText || this.objectiveText;
      this.player.load(json.player);
      this.world.setTime(this.time);
      this.world.load(json.world);
      this.ai.load(json.ai);
      this.objects.load(json.objects);
      return true;
    } catch {
      return false;
    }
  }
}

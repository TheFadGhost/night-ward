import { CELL, NOISE, BLACKOUT } from '../core/constants.js';
import { bus } from '../core/events.js';

const INTERACT_RADIUS = 2.05;
const DOOR_INTERACT_RADIUS = 2.9;
const SMASH_RADIUS = 1.2;
const BOTTLE_SPEED = 10;
const BOTTLE_LIFE = 1.2;

export class Interactables {
  constructor(world, defs) {
    this.world = world;
    this.defs = defs || {};
    this.list = [];
    this.projectiles = [];
    this.game = null;
    this._build();
  }

  _build() {
    const d = this.defs;
    for (const door of d.doors || []) {
      const x = door.cx * CELL + CELL / 2;
      const z = door.cz * CELL + CELL / 2;
      if (typeof this.world.registerDoor === 'function') {
        this.world.registerDoor(door.id, x, z);
      }
      this.list.push({ kind: 'door', id: door.id, x, z, locked: door.locked || null });
    }
    for (const l of d.lockers || []) {
      l.kind = 'locker';
      l.taken = false;
      this.list.push(l);
    }
    for (const b of d.bottles || []) {
      b.kind = 'bottle';
      b.taken = false;
      this.list.push(b);
    }
    for (const s of d.seals || []) {
      s.kind = 'seal';
      s.taken = false;
      this.list.push(s);
    }
    if (d.vessel) {
      const v0 = d.vessel;
      v0.kind = 'vessel';
      v0.taken = false;
      this.list.push(v0);
    }
    if (d.elevator) {
      this.list.push({ kind: 'elevator', id: d.elevator.id, x: d.elevator.x, z: d.elevator.z });
    }
    for (const br of d.breakers || []) {
      this.list.push({
        kind: 'breaker',
        id: br.id,
        wingId: br.wing,
        x: br.x,
        z: br.z,
        armed: false,
        coolEnd: 0,
      });
    }
    for (const v of d.valves || []) {
      if (!v.zone || typeof this.world.registerMask !== 'function') continue;
      const maskId = v.id + ':steam';
      this.world.registerMask({ id: maskId, x: v.zone.x, z: v.zone.z, r: v.zone.r, strength: 1 });
      const mask = this.world.masks.find((m) => m.id === maskId);
      this.list.push({ kind: 'valve', id: v.id, x: v.x, z: v.z, mask });
    }
  }

  update(dt, game) {
    if (game) this.game = game;
    const g = game || this.game;
    if (g && typeof g.time === 'number' && typeof this.world.setTime === 'function') {
      this.world.setTime(g.time);
    }
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      const nx = p.x + p.vx * dt;
      const nz = p.z + p.vz * dt;
      const c = this.world.cellAt(nx, nz);
      p.life -= dt;
      if (this.world.blockedCell(c.cx, c.cz)) {
        this._breakBottle(p.x, p.z);
        this.projectiles.splice(i, 1);
        continue;
      }
      p.x = nx;
      p.z = nz;
      if (p.life <= 0) {
        this._breakBottle(p.x, p.z);
        this.projectiles.splice(i, 1);
      }
    }
    for (const o of this.list) {
      if (o.kind === 'breaker' && o.armed && g && typeof g.time === 'number' && g.time >= o.coolEnd) {
        o.armed = false;
        bus.emit('breaker', { wingId: o.wingId, on: true });
      }
    }
  }

  nearestInteractable(player, game) {
    const g = game || this.game;
    let best = null;
    let bd = Infinity;
    for (const o of this.list) {
      if (o.taken) continue;
      if (player.hiddenIn && o.kind !== 'locker') continue;
      const rad = o.kind === 'door' ? DOOR_INTERACT_RADIUS : INTERACT_RADIUS;
      const d = Math.hypot(o.x - player.x, o.z - player.z);
      if (d > rad || d >= bd) continue;
      const pull = Math.min(1.5, d / 2);
      const sx = o.x + ((player.x - o.x) / (d || 1)) * pull;
      const sz = o.z + ((player.z - o.z) / (d || 1)) * pull;
      if (!this.world.lineOfSight(player.x, player.z, sx, sz)) continue;
      bd = d;
      best = o;
    }
    if (!best) return null;
    return { obj: best, label: this._label(best, player, g) };
  }

  _label(o, player, g) {
    switch (o.kind) {
      case 'door': {
        if (this.world.isDoorOpen(o.id)) return 'Close door';
        const sealsOk =
          o.locked !== 'archive' || (g && g.state && g.state.seals && g.state.seals.got >= 3);
        const vesselOk = o.locked !== 'elevator' || (g && g.state && g.state.vessel);
        if (!sealsOk) return 'Locked — needs 3 seals';
        if (!vesselOk) return 'Locked — power the elevator';
        return 'Open door';
      }
      case 'locker':
        return player.hiddenIn === o.id ? 'Exit locker' : 'Hide in locker';
      case 'bottle':
        return 'Take bottle';
      case 'seal': {
        const got = g && g.state && g.state.seals ? g.state.seals.got : 0;
        return `Take Seal (${Math.min(3, got + 1)}/3)`;
      }
      case 'vessel':
        return 'Take Vessel';
      case 'elevator':
        return 'Call elevator';
      case 'breaker': {
        const ready = !o.armed && !this.world.wingBlackedOut(o.wingId);
        return ready ? `Throw breaker \u2014 ${String(o.wingId).toUpperCase()} WING` : 'Breaker cycling';
      }
      case 'valve':
        return o.mask && o.mask.on ? 'Close steam valve' : 'Open steam valve';
      default:
        return '';
    }
  }

  interact(obj, game) {
    if (!obj) return false;
    if (game) this.game = game;
    const g = game || this.game;
    switch (obj.kind) {
      case 'door': {
        const opening = !this.world.isDoorOpen(obj.id);
        const SEARCH_R = 2.05;
        void SEARCH_R;
        if (opening) {
          if (obj.locked === 'archive' && !(g && g.state && g.state.seals && g.state.seals.got >= 3)) {
            return false;
          }
          if (obj.locked === 'elevator' && !(g && g.state && g.state.vessel)) return false;
        }
        this.world.setDoorOpen(obj.id, opening);
        if (opening && String(obj.id).startsWith('d_archive')) {
          for (const d of this.world.doors ? this.world.doors.values() : []) {
            if (String(d).startsWith('d_archive')) this.world.setDoorOpen(d, true);
          }
        }
        bus.emit('door', { id: obj.id, open: opening });
        bus.emit('noise', {
          x: obj.x,
          z: obj.z,
          loud: (opening ? NOISE.doorOpen : NOISE.doorClose) * (g && g.player && g.player.crouched ? 0.4 : 1),
          type: 'door',
        });
        return true;
      }
      case 'locker': {
        if (!g) return false;
        if (g.player.hiddenIn === obj.id) {
          g.player.hiddenIn = null;
          bus.emit('noise', { x: obj.x, z: obj.z, loud: NOISE.lockerExit, type: 'locker' });
          bus.emit('playerUnhidden', {});
        } else {
          g.player.hiddenIn = obj.id;
          bus.emit('noise', { x: obj.x, z: obj.z, loud: NOISE.lockerEnter, type: 'locker' });
          bus.emit('playerHidden', { id: obj.id });
        }
        return true;
      }
      case 'bottle': {
        if (obj.taken || !g) return false;
        obj.taken = true;
        g.player.bottles += 1;
        bus.emit('pickup', { kind: 'bottle', id: obj.id });
        return true;
      }
      case 'seal': {
        if (obj.taken || !g) return false;
        obj.taken = true;
        g.state.seals.got += 1;
        bus.emit('pickup', { kind: 'seal', id: obj.id });
        bus.emit('sealTaken', { n: obj.n, total: 3 });
        if (g.state.seals.got >= 3) {
          bus.emit('objective', { text: 'The archive seal releases \u2014 north door unlocked' });
          for (const d of this.world.doors ? this.world.doors : []) {
            if (String(d[1]).startsWith('d_archive')) this.world.unlockDoor(d[1]);
          }
        }
        return true;
      }
      case 'vessel': {
        if (obj.taken || !g) return false;
        obj.taken = true;
        g.state.vessel = true;
        bus.emit('vesselTaken', {});
        bus.emit('objective', { text: 'Reach the elevator' });
        bus.emit('alert', { aiId: '*', kind: 'restless' });
        if (this.world.isLocked) this.world.unlockDoor('d_elev');
        return true;
      }
      case 'elevator': {
        if (!g) return false;
        if (!g.state.vessel) return false;
        const stats = typeof g.stats === 'function' ? g.stats() : g.stats;
        bus.emit('gameWon', { stats });
        return true;
      }
      case 'breaker': {
        if (!g || typeof g.time !== 'number') return false;
        if (obj.armed && g.time < obj.coolEnd) return false;
        obj.armed = true;
        obj.coolEnd = g.time + BLACKOUT.cooldown;
        if (typeof this.world.setTime === 'function') this.world.setTime(g.time);
        this.world.applyBlackout(obj.wingId, BLACKOUT.duration);
        bus.emit('breaker', { wingId: obj.wingId, on: false, dur: BLACKOUT.duration });
        return true;
      }
      case 'valve': {
        if (!obj.mask) return false;
        obj.mask.on = !obj.mask.on;
        bus.emit('steam', { id: obj.id, on: obj.mask.on });
        return true;
      }
      default:
        return false;
    }
  }

  throwBottle(origin, dir, game) {
    if (!game || !game.player || game.player.bottles <= 0) return false;
    game.player.bottles -= 1;
    const len = Math.hypot(dir.x, dir.z) || 1;
    this.projectiles.push({
      x: origin.x,
      z: origin.z,
      vx: (dir.x / len) * BOTTLE_SPEED,
      vz: (dir.z / len) * BOTTLE_SPEED,
      life: BOTTLE_LIFE,
    });
    bus.emit('noise', { x: origin.x, z: origin.z, loud: NOISE.throwWhistle, type: 'throw' });
    this.game = game;
    return true;
  }

  _breakBottle(x, z) {
    bus.emit('noise', { x, z, loud: NOISE.bottle, type: 'bottle' });
    let best = null;
    let bd = Infinity;
    for (const f of this.world.fixtures) {
      if (!f.on) continue;
      const d = Math.hypot(f.x - x, f.z - z);
      if (d < bd) {
        bd = d;
        best = f;
      }
    }
    if (best && bd <= SMASH_RADIUS) {
      const from = this.game ? { x: this.game.player.x, z: this.game.player.z } : null;
      const clearSight = !from || this.world.lineOfSight(from.x, from.z, best.x, best.z);
      if (!clearSight) {
        best = null;
      }
    }
    if (best && bd <= SMASH_RADIUS) {
      best.on = false;
      bus.emit('noise', { x: best.x, z: best.z, loud: NOISE.glass, type: 'glass' });
      bus.emit('lightSmashed', { id: best.id, x: best.x, z: best.z, wingId: best.wingId });
    }
  }

  serialize() {
    return {
      taken: this.list.filter((o) => o.taken).map((o) => ({ kind: o.kind, id: o.id })),
      breakers: this.list
        .filter((o) => o.kind === 'breaker')
        .map((o) => ({ id: o.id, armed: o.armed, coolEnd: o.coolEnd })),
      valves: this.list
        .filter((o) => o.kind === 'valve' && o.mask)
        .map((o) => ({ id: o.id, on: !!o.mask.on })),
      projectiles: [],
    };
  }

  load(json) {
    this.projectiles.length = 0;
    if (!json) return;
    if (Array.isArray(json.taken)) {
      for (const t of json.taken) {
        const o = this.list.find((q) => q.kind === t.kind && q.id === t.id);
        if (o) o.taken = true;
      }
    }
    if (Array.isArray(json.breakers)) {
      for (const b of json.breakers) {
        const o = this.list.find((q) => q.kind === 'breaker' && q.id === b.id);
        if (o) {
          o.armed = !!b.armed;
          o.coolEnd = Number(b.coolEnd) || 0;
        }
      }
    }
    if (Array.isArray(json.valves)) {
      for (const v of json.valves) {
        const o = this.list.find((q) => q.kind === 'valve' && q.id === v.id);
        if (o && o.mask) o.mask.on = !!v.on;
      }
    }
  }
}

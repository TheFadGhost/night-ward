import { PROFILES, BLACKOUT } from '../core/constants.js';
import { bus } from '../core/events.js';
import { Brain } from './brain.js';

export class AIManager {
  constructor(spawnDefs, world) {
    this.world = world;
    this.entities = [];
    this.brains = [];
    this._time = 0;
    this._breaker = new Map();
    const counts = {};
    for (const def of spawnDefs || []) {
      const kind = def.kind;
      if (!PROFILES[kind]) continue;
      counts[kind] = (counts[kind] || 0) + 1;
      const id = def.id || `${kind}${counts[kind]}`;
      const entity = {
        id,
        kind,
        x: def.x,
        z: def.z,
        facing: def.facing !== undefined ? def.facing : 0,
        profile: PROFILES[kind],
        patrolRoute: Array.isArray(def.patrolRoute)
          ? def.patrolRoute.map((p) => ({ x: p.x, z: p.z }))
          : null,
        pingPong: !!def.pingPong,
        railA: def.railA ? { x: def.railA.x, z: def.railA.z } : null,
        railB: def.railB ? { x: def.railB.x, z: def.railB.z } : null,
        wing: def.wing || null,
        disabled: false,
      };
      this.entities.push(entity);
      this.brains.push(new Brain(entity, world));
    }
    this._offBreaker = bus.on('breaker', (evt) => {
      if (!evt || !evt.wingId) return;
      if (evt.on) {
        this._breaker.set(evt.wingId, this._time + (evt.dur || BLACKOUT.duration));
      } else {
        this._breaker.delete(evt.wingId);
      }
    });
  }

  update(dt, ctx) {
    const time = ctx && Number.isFinite(ctx.time) ? ctx.time : this._time;
    this._time = time;
    for (const e of this.entities) {
      if (e.profile.railOnly && e.wing) {
        const breakerUntil = this._breaker.get(e.wing) || 0;
        e.disabled =
          this.world.wingBlackedOut(e.wing) || breakerUntil > time;
      }
    }
    const fullCtx = {
      player: ctx ? ctx.player : null,
      noises: ctx && Array.isArray(ctx.noises) ? ctx.noises : [],
      ais: this.entities,
      time,
      rng: ctx ? ctx.rng : null,
    };
    for (const b of this.brains) b.update(dt, fullCtx);
    for (let i = 0; i < this.brains.length; i++) {
      const b = this.brains[i];
      if (b.justChased) this.propagateRadio(b.entity, this.entities);
      b.justChased = false;
    }
  }

  propagateRadio(fromEntity, ctxAis) {
    const ais = ctxAis || this.entities;
    let src = null;
    for (const b of this.brains) {
      if (b.entity === fromEntity || b.entity.id === fromEntity.id) {
        src = b;
        break;
      }
    }
    if (!src || !src.lastKnown) return;
    for (const b of this.brains) {
      const e = b.entity;
      if (e.id === src.entity.id) continue;
      if (e.kind !== 'warden' || e.disabled) continue;
      const r = e.profile.radioRadius || 0;
      if (r <= 0) continue;
      const d = Math.hypot(e.x - fromEntity.x, e.z - fromEntity.z);
      if (d <= r) b.receiveRadio(src.lastKnown);
    }
  }

  serialize() {
    return {
      v: 1,
      entities: this.entities.map((e) => ({
        id: e.id,
        x: e.x,
        z: e.z,
        facing: e.facing,
        disabled: !!e.disabled,
        pingPong: !!e.pingPong,
        wing: e.wing || null,
      })),
      brains: this.brains.map((b) => b.serialize()),
    };
  }

  load(json) {
    if (!json || !Array.isArray(json.entities)) return;
    const byId = new Map(json.entities.map((e) => [e.id, e]));
    for (let i = 0; i < this.entities.length; i++) {
      const e = this.entities[i];
      const s = byId.get(e.id);
      if (!s) continue;
      if (Number.isFinite(s.x)) e.x = s.x;
      if (Number.isFinite(s.z)) e.z = s.z;
      if (Number.isFinite(s.facing)) e.facing = s.facing;
      e.disabled = !!s.disabled;
      if (s.pingPong !== undefined) e.pingPong = !!s.pingPong;
      if (json.brains && json.brains[i]) this.brains[i].load(json.brains[i]);
    }
  }

  destroy() {
    if (this._offBreaker) this._offBreaker();
  }
}

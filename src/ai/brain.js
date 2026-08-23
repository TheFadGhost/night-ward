import { AI_STATE, SUSPICION } from '../core/constants.js';
import { bus } from '../core/events.js';
import { findPath } from '../sim/pathfinding.js';
import { visibility, hearNoise, catchCheck } from './perception.js';

const TURN_RATE = 6;
const REPATH_SEC = 0.4;
const ARRIVE_EPS = 0.15;
const GLANCE_HOLD = 1.2;
const HEAR_GAIN = 45;

function normAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function rankOf(state) {
  switch (state) {
    case AI_STATE.CHASE:
      return 4;
    case AI_STATE.LISTEN:
      return 3;
    case AI_STATE.INVESTIGATE:
    case AI_STATE.SEARCH:
      return 2;
    case AI_STATE.SUSPICIOUS:
      return 1;
    default:
      return 0;
  }
}

function num(v, fallback) {
  return Number.isFinite(v) ? v : fallback;
}

export class Brain {
  constructor(entity, world) {
    this.entity = entity;
    this.world = world;
    this.state = AI_STATE.PATROL;
    this.suspicion = 0;
    this.lastKnown = null;
    this.path = null;
    this.pathIdx = 0;
    this.repathT = 0;
    this.stateT = 0;
    this.lostT = 0;
    this.listenT = 0;
    this.stimulus = null;
    this.vis = null;
    this.wanderPts = [];
    this.wanderIdx = 0;
    this.wpIdx = 0;
    this.wpDir = 1;
    this.radioAt = -1;
    this.time = 0;
    this.rng = null;
    this.caughtFired = false;
    this.justChased = false;
  }

  setState(next) {
    if (this.state === next) return;
    const from = this.state;
    this.state = next;
    this.stateT = 0;
    this.path = null;
    this.pathIdx = 0;
    bus.emit('aiState', { aiId: this.entity.id, from, to: next });
  }

  logIncident(kind, detail, x, z) {
    bus.emit('incident', { t: this.time, who: this.entity.id, kind, detail, x, z });
  }

  route() {
    const e = this.entity;
    if (e.profile.railOnly && e.railA && e.railB) return [e.railA, e.railB];
    if (Array.isArray(e.patrolRoute) && e.patrolRoute.length > 0) return e.patrolRoute;
    return null;
  }

  faceToward(a, dt) {
    const diff = normAngle(a - (this.entity.facing || 0));
    const m = TURN_RATE * dt;
    this.entity.facing = normAngle((this.entity.facing || 0) + Math.max(-m, Math.min(m, diff)));
  }

  gotoPoint(pt, speed, dt) {
    const e = this.entity;
    const dist = Math.hypot(pt.x - e.x, pt.z - e.z);
    if (dist <= ARRIVE_EPS) {
      this.path = null;
      return true;
    }
    this.repathT -= dt;
    if (!this.path || this.repathT <= 0) {
      this.path = findPath(this.world, e.x, e.z, pt.x, pt.z, { doorsPassable: true });
      this.pathIdx = 0;
      this.repathT = REPATH_SEC;
      if (!this.path) return true;
    }
    while (
      this.pathIdx < this.path.length &&
      Math.hypot(this.path[this.pathIdx].x - e.x, this.path[this.pathIdx].z - e.z) <= ARRIVE_EPS
    ) {
      this.pathIdx++;
    }
    if (this.pathIdx >= this.path.length) {
      this.path = null;
      return dist <= ARRIVE_EPS * 2;
    }
    let gi = this.pathIdx;
    const cap = Math.min(this.path.length - 1, this.pathIdx + 4);
    for (let i = cap; i > this.pathIdx; i--) {
      const p = this.path[i];
      if (this.world.lineOfSight(e.x, e.z, p.x, p.z)) {
        gi = i;
        break;
      }
    }
    this.pathIdx = gi;
    const node = this.path[gi];
    const { cx: ncx, cz: ncz } = this.world.cellAt(node.x, node.z);
    const nodeTile = this.world.tiles[this.world.idx(ncx, ncz)];
    if (nodeTile === 3 && this.world.doors) {
      const doorId = this.world.doors.get(this.world.idx(ncx, ncz));
      if (doorId !== undefined && !this.world.doorOpen.has(doorId)) {
        if (this.world.isLocked && this.world.isLocked(doorId)) {
          this.path = null;
          this.repathT = 0;
          return false;
        }
        this._doorWaitT = (this._doorWaitT || 0) + dt;
        if (this._doorWaitT >= 0.45) {
          this._doorWaitT = 0;
          this.world.setDoorOpen(doorId, true);
          bus.emit('door', { id: doorId, open: true });
          bus.emit('noise', { x: node.x, z: node.z, loud: 0.6, type: 'door' });
        }
        return false;
      }
    }
    if (!this.world.lineOfSight(e.x, e.z, node.x, node.z)) {
      this.path = null;
      this.repathT = 0;
      return false;
    }
    const ndx = node.x - e.x;
    const ndz = node.z - e.z;
    const nl = Math.hypot(ndx, ndz) || 1;
    const step = Math.min(speed * dt, nl);
    e.x += (ndx / nl) * step;
    e.z += (ndz / nl) * step;
    this.faceToward(Math.atan2(ndz, ndx), dt);
    return false;
  }

  setupSearch(ctx) {
    this.wanderPts = [];
    this.wanderIdx = 0;
    if (!this.lastKnown) return;
    const rng = (ctx && ctx.rng) || this.rng;
    for (let i = 0; i < 3; i++) {
      if (!rng) break;
      const rad = rng.range(1.5, 4);
      const ang = rng.range(0, Math.PI * 2);
      const px = this.lastKnown.x + Math.cos(ang) * rad;
      const pz = this.lastKnown.z + Math.sin(ang) * rad;
      if (findPath(this.world, this.entity.x, this.entity.z, px, pz, { doorsPassable: true })) {
        this.wanderPts.push({ x: px, z: pz });
      }
    }
    this.repathT = 0;
  }

  enterChase(detail, x, z) {
    this.setState(AI_STATE.CHASE);
    this.lostT = 0;
    this.repathT = 0;
    this.caughtFired = false;
    this.radioAt = this.time;
    this.justChased = true;
    this.logIncident('spotted', detail, x, z);
    bus.emit('alert', { aiId: this.entity.id, kind: 'chase' });
  }

  leaveChase(ctx) {
    this.setupSearch(ctx);
    this.setState(AI_STATE.SEARCH);
    bus.emit('alert', { aiId: this.entity.id, kind: 'lost' });
  }

  receiveRadio(pos) {
    if (this.entity.disabled) return;
    this.lastKnown = { x: pos.x, z: pos.z };
    this.stimulus = null;
    if (rankOf(this.state) < 2) {
      this.setupSearch();
      this.setState(AI_STATE.SEARCH);
    }
  }

  update(dt, ctx) {
    const e = this.entity;
    const prof = e.profile;
    this.time = ctx && Number.isFinite(ctx.time) ? ctx.time : this.time;
    this.rng = (ctx && ctx.rng) || this.rng;
    this.stateT += dt;
    this.justChased = false;

    if (e.disabled) {
      if (this.state !== AI_STATE.DISABLED) this.setState(AI_STATE.DISABLED);
      this.suspicion = Math.max(0, this.suspicion - SUSPICION.fallRate * dt);
      this.vis = null;
      return;
    }
    if (this.state === AI_STATE.DISABLED) this.setState(AI_STATE.PATROL);

    const player = ctx ? ctx.player : null;
    const prev = this.suspicion;
    let vis = null;
    let seenPos = null;
    if (player && !player.hiddenIn && prof.visionRange > 0) {
      vis = visibility(e, player, this.world, {
        targetLight: this.world.lightAt(player.x, player.z),
        targetCrouch: !!player.crouched,
        targetMoving: !!player.moving,
        targetFlashlight: !!player.flashlight,
      });
    }
    this.vis = vis;

    if (vis && vis.seen) {
      this.suspicion += SUSPICION.riseRate * vis.exposure * dt;
      this.lostT = 0;
      seenPos = { x: player.x, z: player.z };
      if (this.state === AI_STATE.CHASE) this.lastKnown = { x: player.x, z: player.z };
    } else {
      const halved =
        this.state === AI_STATE.SUSPICIOUS || this.state === AI_STATE.INVESTIGATE;
      this.suspicion -= SUSPICION.fallRate * (halved ? 0.5 : 1) * dt;
      if (this.state === AI_STATE.CHASE) this.lostT += dt;
    }

    let heardInfo = null;
    let listenerDirect = false;
    if (prof.hearingMult > 0 && ctx && Array.isArray(ctx.noises)) {
      for (const n of ctx.noises) {
        if (!n) continue;
        const h = hearNoise({ x: e.x, z: e.z }, prof, n, this.world);
        if (!h.heard) continue;
        if (Number.isFinite(prof.hearThreshold) && h.strength < prof.hearThreshold) continue;
        const distToNoise = Math.hypot(n.x - e.x, n.z - e.z);
        const hc = this.entity.homeCentroid;
        const distNoiseToHome = hc ? Math.hypot(n.x - hc.x, n.z - hc.z) : 0;
        if (prof.kind === 'listener' && this.entity.homeCentroid && distNoiseToHome > 18) continue;
        const loudKind = n.type === 'glass' || n.type === 'bottle' || (n.loud ?? 0) >= 1.2;
        const closeBy = Math.hypot(n.x - e.x, n.z - e.z) < 5;
        if (!loudKind && !closeBy) {
          const cap = SUSPICION.investigateAt + 5;
          if (this.suspicion < cap) {
            this.suspicion = Math.min(cap, this.suspicion + h.strength * HEAR_GAIN);
            if (!heardInfo) heardInfo = { x: n.x, z: n.z, detail: `heard ${n.type || 'noise'}` };
            continue;
          }
          continue;
        }
        this.suspicion += h.strength * HEAR_GAIN;
        const info = { x: n.x, z: n.z, detail: `heard ${n.type || 'noise'}` };
        if (!heardInfo) heardInfo = info;
        if (prof.kind === 'listener' && h.strength >= 0.25) {
          heardInfo = info;
          listenerDirect = true;
        }
      }
    }
    if (this.suspicion > SUSPICION.chaseAt) this.suspicion = SUSPICION.chaseAt;
    if (this.suspicion < 0) this.suspicion = 0;

    const rk = rankOf(this.state);
    if (prev < SUSPICION.chaseAt && this.suspicion >= SUSPICION.chaseAt && rk < 4) {
      if (!seenPos && heardInfo) this.lastKnown = { x: heardInfo.x, z: heardInfo.z };
      const detail = seenPos ? 'spotted you' : heardInfo ? heardInfo.detail : 'alerted';
      const px = seenPos
        ? seenPos.x
        : this.lastKnown
        ? this.lastKnown.x
        : e.x;
      const pz = seenPos
        ? seenPos.z
        : this.lastKnown
        ? this.lastKnown.z
        : e.z;
      this.enterChase(detail, px, pz);
    } else if (
      prev < SUSPICION.investigateAt &&
      this.suspicion >= SUSPICION.investigateAt &&
      rk < 4
    ) {
      const src = seenPos || (heardInfo ? { x: heardInfo.x, z: heardInfo.z } : null);
      if (src) {
        this.lastKnown = { x: src.x, z: src.z };
        this.logIncident(
          'suspicion',
          seenPos ? vis.reason : heardInfo.detail,
          src.x,
          src.z
        );
        if (rk < 2) this.setState(AI_STATE.INVESTIGATE);
        else if (this.state === AI_STATE.INVESTIGATE) {
          this.path = null;
          this.repathT = 0;
        }
      }
    } else if (listenerDirect && rankOf(this.state) < 2) {
      this.lastKnown = { x: heardInfo.x, z: heardInfo.z };
      this.logIncident('suspicion', heardInfo.detail, heardInfo.x, heardInfo.z);
      this.setState(AI_STATE.INVESTIGATE);
    } else if (
      prev < SUSPICION.glanceAt &&
      this.suspicion >= SUSPICION.glanceAt &&
      rankOf(this.state) < 1
    ) {
      this.stimulus = seenPos || (heardInfo ? { x: heardInfo.x, z: heardInfo.z } : null);
      this.setState(AI_STATE.SUSPICIOUS);
    }

    switch (this.state) {
      case AI_STATE.PATROL:
        this.doPatrol(dt);
        break;
      case AI_STATE.SUSPICIOUS:
        this.doSuspicious(dt);
        break;
      case AI_STATE.INVESTIGATE:
        this.doInvestigate(dt, ctx);
        break;
      case AI_STATE.SEARCH:
        this.doSearch(dt, ctx);
        break;
      case AI_STATE.CHASE:
        this.doChase(dt, ctx, vis, player);
        break;
      case AI_STATE.RETURN:
        this.doReturn(dt);
        break;
      case AI_STATE.LISTEN:
        this.doListen(dt);
        break;
      default:
        break;
    }

    const touching = player && !player.hiddenIn && catchCheck(e, player, dt);
    if (touching) {
      const lethal =
        this.state === AI_STATE.CHASE ||
        (prof.kind === 'listener' && this.state === AI_STATE.LISTEN);
      if (lethal) {
        if (!this.caughtFired) {
          this.caughtFired = true;
          bus.emit('playerCaught', { byId: e.id });
        }
      } else if (
        this.state === AI_STATE.SEARCH ||
        this.state === AI_STATE.INVESTIGATE ||
        this.state === AI_STATE.SUSPICIOUS ||
        this.state === AI_STATE.PATROL
      ) {
        this.suspicion = SUSPICION.chaseAt;
        this.lastKnown = { x: player.x, z: player.z };
        if (this.state !== AI_STATE.CHASE) {
          this.enterChase('found you at close range', player.x, player.z);
        }
      }
    }
  }

  doPatrol(dt) {
    const e = this.entity;
    const route = this.route();
    if (!route) {
      e.facing += dt * 0.4;
      return;
    }
    const wp = route[Math.min(this.wpIdx, route.length - 1)];
    if (this.gotoPoint(wp, e.profile.speedPatrol, dt)) {
      if (route.length > 1) {
        if (e.pingPong || e.profile.railOnly) {
          this.wpIdx += this.wpDir;
          if (this.wpIdx >= route.length) {
            this.wpIdx = Math.max(0, route.length - 2);
            this.wpDir = -1;
          } else if (this.wpIdx < 0) {
            this.wpIdx = Math.min(1, route.length - 1);
            this.wpDir = 1;
          }
        } else {
          this.wpIdx = (this.wpIdx + 1) % route.length;
        }
      }
      this.path = null;
    }
  }

  doSuspicious(dt) {
    if (this.stimulus) {
      const e = this.entity;
      this.faceToward(Math.atan2(this.stimulus.z - e.z, this.stimulus.x - e.x), dt);
    }
    if (this.stateT >= GLANCE_HOLD) this.setState(AI_STATE.PATROL);
  }

  doInvestigate(dt, ctx) {
    if (!this.lastKnown) {
      this.setState(AI_STATE.PATROL);
      return;
    }
    const sp = this.entity.profile.speedInvestigate || this.entity.profile.speedPatrol;
    if (this.gotoPoint(this.lastKnown, sp, dt)) {
      this.setupSearch(ctx);
      this.setState(AI_STATE.SEARCH);
    }
  }

  doSearch(dt, ctx) {
    if (this.wanderIdx >= this.wanderPts.length) {
      this.setState(AI_STATE.RETURN);
      return;
    }
    const sp = this.entity.profile.speedInvestigate || this.entity.profile.speedPatrol;
    if (this.gotoPoint(this.wanderPts[this.wanderIdx], sp, dt)) {
      this.wanderIdx++;
      this.path = null;
    }
  }

  doChase(dt, ctx, vis, player) {
    const prof = this.entity.profile;
    const seen = !!(vis && vis.seen && player);
    if (seen) this.lastKnown = { x: player.x, z: player.z };
    if (!this.lastKnown) {
      this.leaveChase(ctx);
      return;
    }
    if (prof.kind === 'listener') {
      if (this.gotoPoint(this.lastKnown, prof.speedChase, dt)) {
        this.setState(AI_STATE.LISTEN);
        this.listenT = prof.listenSec || 4;
      }
      return;
    }
    this.gotoPoint(this.lastKnown, prof.speedChase, dt);
    const far =
      Math.hypot(this.entity.x - this.lastKnown.x, this.entity.z - this.lastKnown.z) > 18;
    if (!seen && this.lostT > 1.5 && (this.lostT >= (prof.memorySec || 8) || far)) this.leaveChase(ctx);
  }

  doReturn(dt) {
    const route = this.route();
    if (!route) {
      this.setState(AI_STATE.PATROL);
      return;
    }
    let best = 0;
    let bd = Infinity;
    for (let i = 0; i < route.length; i++) {
      const d = Math.hypot(route[i].x - this.entity.x, route[i].z - this.entity.z);
      if (d < bd) {
        bd = d;
        best = i;
      }
    }
    if (this.gotoPoint(route[best], this.entity.profile.speedPatrol, dt)) {
      this.wpIdx = best;
      this.wpDir = 1;
      this.setState(AI_STATE.PATROL);
    }
  }

  doListen(dt) {
    this.entity.facing += dt * 1.5;
    this.listenT -= dt;
    if (this.listenT <= 0) this.setState(AI_STATE.RETURN);
  }

  serialize() {
    return {
      v: 1,
      id: this.entity.id,
      state: this.state,
      suspicion: this.suspicion,
      lastKnown: this.lastKnown ? { x: this.lastKnown.x, z: this.lastKnown.z } : null,
      path: this.path
        ? this.path.map((p) => ({ x: p.x, z: p.z, doorCost: p.doorCost || 0 }))
        : null,
      pathIdx: this.pathIdx,
      repathT: this.repathT,
      stateT: this.stateT,
      lostT: this.lostT,
      listenT: this.listenT,
      stimulus: this.stimulus ? { x: this.stimulus.x, z: this.stimulus.z } : null,
      wanderPts: this.wanderPts.map((p) => ({ x: p.x, z: p.z })),
      wanderIdx: this.wanderIdx,
      wpIdx: this.wpIdx,
      wpDir: this.wpDir,
      radioAt: this.radioAt,
      caughtFired: this.caughtFired,
    };
  }

  load(j) {
    if (!j) return;
    if (typeof j.state === 'string') this.state = j.state;
    this.suspicion = num(j.suspicion, this.suspicion);
    this.lastKnown = j.lastKnown ? { x: j.lastKnown.x, z: j.lastKnown.z } : null;
    this.path = Array.isArray(j.path)
      ? j.path.map((p) => ({ x: p.x, z: p.z, doorCost: p.doorCost || 0 }))
      : null;
    this.pathIdx = num(j.pathIdx, 0);
    this.repathT = num(j.repathT, 0);
    this.stateT = num(j.stateT, 0);
    this.lostT = num(j.lostT, 0);
    this.listenT = num(j.listenT, 0);
    this.stimulus = j.stimulus ? { x: j.stimulus.x, z: j.stimulus.z } : null;
    this.wanderPts = Array.isArray(j.wanderPts)
      ? j.wanderPts.map((p) => ({ x: p.x, z: p.z }))
      : [];
    this.wanderIdx = num(j.wanderIdx, 0);
    this.wpIdx = num(j.wpIdx, 0);
    this.wpDir = j.wpDir < 0 ? -1 : 1;
    this.radioAt = num(j.radioAt, -1);
    this.caughtFired = !!j.caughtFired;
  }
}

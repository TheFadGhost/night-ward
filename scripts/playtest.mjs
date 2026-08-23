import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { buildLevel } from '../src/game/level.js';
import { Game } from '../src/game/game.js';
import { bus } from '../src/core/events.js';
import { CELL } from '../src/core/constants.js';
import { visibility } from '../src/ai/perception.js';
import { findPath } from '../src/sim/pathfinding.js';
import { buildAllRuns, evaluate } from './policies-index.mjs';

const DT = 1 / 30;
export const wc = (x, z) => ({ x: (x + 0.5) * CELL, z: (z + 0.5) * CELL });

function freshGame() {
  const level = buildLevel();
  const game = new Game(level);
  return game;
}

class Recorder {
  constructor(game) {
    this.chases = 0;
    this.lostEvents = 0;
    this.caught = false;
    this.caughtBy = null;
    this.caughtAt = null;
    this.won = false;
    this.sealsAt = {};
    this.vesselAt = null;
    this.incidents = [];
    this.noiseCounts = {};
    this.offs = [
      bus.on('alert', (e) => {
        if (e.kind === 'chase') {
          this.chases++;
          if (!this.firstChase) {
            this.firstChase = {
              t: Math.round(game.time * 10) / 10,
              who: e.aiId,
              playerPos: `${game.player.x.toFixed(0)},${game.player.z.toFixed(0)}`,
            };
          }
        }
        if (e.kind === 'lost') this.lostEvents++;
      }),
      bus.on('incident', (e) =>
        this.incidents.push({ t: e.t ?? game.time, who: e.who, kind: e.kind, detail: e.detail })
      ),
      bus.on('noise', (e) => {
        this.noiseCounts[e.type] = (this.noiseCounts[e.type] || 0) + 1;
      }),
      bus.on('playerCaught', () => {
        this.caught = true;
        this.caughtAt = Math.round(game.time * 10) / 10;
        this.caughtBy = `player@${game.player.x.toFixed(0)},${game.player.z.toFixed(0)} ` +
          game.ai.entities.map((e) => `${e.id}@${e.x.toFixed(0)},${e.z.toFixed(0)}`).join(' ');
      }),
      bus.on('gameLost', () => {
        this.caught = true;
      }),
      bus.on('gameWon', () => {
        this.won = true;
      }),
      bus.on('sealTaken', (e) => {
        if (!(e.n in this.sealsAt)) this.sealsAt[e.n] = true;
      }),
      bus.on('vesselTaken', () => {
        this.vesselAt = true;
      }),
    ];
  }
}

export class Bot {
  constructor(game, opts = {}) {
    this.g = game;
    this.cautious = !!opts.cautious;
    this.crouchDefault = !!opts.crouch;
    this.steps = [];
    this.i = 0;
    this.path = null;
    this.pi = 0;
    this.waitT = 0;
    this.holdT = 0;
    this.holdAccum = 0;
    this.evadeT = 0;
    this.stuckT = 0;
    this.lastPos = { x: game.player.x, z: game.player.z };
    this.hideTarget = null;
    this.hidePhase = null;
    this.nooks = this.findNooks();
  }

  findNooks() {
    const nooks = [];
    const w = this.g.world;
    for (let cz = 1; cz < w.h - 1; cz++) {
      for (let cx = 1; cx < w.w - 1; cx++) {
        if (w.blockedCell(cx, cz)) continue;
        let walls = 0;
        for (const [dx, dz] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          if (w.blockedCell(cx + dx, cz + dz) || w.tiles[w.idx(cx + dx, cz + dz)] === 3) walls++;
        }
        if (walls >= 3) nooks.push({ x: (cx + 0.5) * CELL, z: (cz + 0.5) * CELL });
      }
    }
    return nooks;
  }

  nearestNook() {
    const p = this.g.player;
    let best = null;
    let bd = Infinity;
    for (const n of this.nooks) {
      const d = Math.hypot(n.x - p.x, n.z - p.z);
      if (d < 2.4 && d < bd) {
        bd = d;
        best = n;
      }
    }
    return best;
  }

  seq(steps) {
    this.steps = steps;
    this.i = 0;
    return this;
  }

  brainOf(id) {
    return this.g.brainById.get(id);
  }

  anyChaser() {
    for (const ent of this.g.ai.entities) {
      if (ent.disabled) continue;
      const br = this.brainOf(ent.id);
      if (!br) continue;
      if (br.state === 'chase') return ent;
      if (ent.kind === 'listener' && (br.state === 'chase' || br.state === 'listen')) return ent;
    }
    return null;
  }

  nearestLocker() {
    let best = null;
    let bd = Infinity;
    for (const o of this.g.level.objects.lockers) {
      if (o.taken) continue;
      const d = Math.hypot(o.x - this.g.player.x, o.z - this.g.player.z);
      if (d < bd) {
        bd = d;
        best = o;
      }
    }
    return bd <= 20 ? best : null;
  }

  pathTo(x, z, doorsPassable = false) {
    const p = this.g.player;
    return findPath(this.g.world, p.x, p.z, x, z, { doorsPassable });
  }

  nearestReachableLocker() {
    let best = null;
    let bestPath = null;
    let bd = Infinity;
    for (const o of this.g.level.objects.lockers) {
      if (o.taken) continue;
      const d = Math.hypot(o.x - this.g.player.x, o.z - this.g.player.z);
      if (d >= bd || d > 24) continue;
      const path = this.pathTo(o.x, o.z, true);
      if (!path) continue;
      bd = d;
      best = o;
      bestPath = path;
    }
    if (best) {
      this.hideTarget = best;
      this.path = bestPath;
      this.pi = Math.min(1, bestPath.length - 1);
    }
    return best;
  }

  fleeDoorStep(input) {
    if (!this.path || this.pi >= this.path.length) return false;
    const node = this.path[this.pi];
    const p = this.g.player;
    if (Math.hypot(node.x - p.x, node.z - p.z) > 1.6) return false;
    const { cx, cz } = this.g.world.cellAt(node.x, node.z);
    const t = this.g.world.tiles[this.g.world.idx(cx, cz)];
    if (t !== 3) return false;
    const id = this.g.world.doors.get(this.g.world.idx(cx, cz));
    if (id === undefined || this.g.world.doorOpen.has(id)) return false;
    input.interact = 1;
    return true;
  }

  followPath(speedFlags, dt, input) {
    if (!this.path || this.pi >= this.path.length) return true;
    const node = this.path[this.pi];
    const p = this.g.player;
    const dx = node.x - p.x;
    const dz = node.z - p.z;
    const d = Math.hypot(dx, dz);
    if (d <= 0.5) {
      this.pi++;
      return this.pi >= this.path.length;
    }
    input.mx = dx / d;
    input.mz = dz / d;
    input.crouch = speedFlags.crouch;
    input.sprint = !!speedFlags.sprint;
    if (Math.hypot(p.x - this.lastPos.x, p.z - this.lastPos.z) < dt * 0.2) {
      this.stuckT += dt;
      if (this.stuckT > 3) {
        this.path = null;
        this.stuckT = 0;
      }
    } else this.stuckT = 0;
    return false;
  }

  dangerSeen() {
    const p = this.g.player;
    for (const ent of this.g.ai.entities) {
      if (ent.disabled || ent.profile.visionRange <= 0) continue;
      const r = visibility(ent, { x: p.x, z: p.z }, this.g.world, {
        targetLight: this.g.world.lightAt(p.x, p.z),
        targetCrouch: p.crouched,
        targetMoving: true,
        targetFlashlight: p.flashlight,
      });
      if (r.seen) return true;
    }
    return false;
  }

  proximityThreat() {
    let best = null;
    let bd = Infinity;
    for (const ent of this.g.ai.entities) {
      if (ent.disabled) continue;
      const d = Math.hypot(ent.x - this.g.player.x, ent.z - this.g.player.z);
      if (d < bd) {
        bd = d;
        best = ent;
      }
    }
    return { ent: best, dist: bd };
  }

  closingThreat() {
    if (!this.lastDists) this.lastDists = new Map();
    let closing = false;
    for (const ent of this.g.ai.entities) {
      if (ent.disabled) continue;
      const d = dist2(ent, this.g.player);
      const prev = this.lastDists.get(ent.id);
      if (prev !== undefined && d < 36 && d < prev - 0.001) closing = true;
    }
    return closing;
  }

  updateDistMemory() {
    if (!this.lastDists) this.lastDists = new Map();
    for (const ent of this.g.ai.entities) {
      const key = ent.id;
      const d2v = dist2(ent, this.g.player);
      const prevPos = this.prevEntPos?.get(key);
      this.entDirZ = this.entDirZ || new Map();
      this.entDirX = this.entDirX || new Map();
      if (prevPos) {
        this.entDirZ.set(key, Math.sign(ent.z - prevPos.z));
        this.entDirX.set(key, Math.sign(ent.x - prevPos.x));
      }
      if (!this.prevEntPos) this.prevEntPos = new Map();
      this.prevEntPos.set(key, { x: ent.x, z: ent.z });
      this.lastDists.set(key, d2v);
    }
  }

  dirZ(id) {
    return (this.entDirZ && this.entDirZ.get(id)) || 0;
  }

  dirX(id) {
    return (this.entDirX && this.entDirX.get(id)) || 0;
  }

  tick(dt) {
    const p = this.g.player;
    const input = { mx: 0, mz: 0, crouch: this.crouchDefault, sprint: false };
    this.updateDistMemory();
    if (this.dropCd > 0) this.dropCd -= dt;
    if (this.sentRetreat > 0) this.sentRetreat -= dt;

    const chaser = this.anyChaser();
    const wardenChaser =
      chaser && chaser.kind !== 'listener'
        ? chaser
        : this.g.ai.entities.find((e) => {
            if (e.disabled || e.kind === 'listener') return false;
            const br = this.brainOf(e.id);
            return br && br.state === 'chase';
          }) || null;
    const listenerChaser =
      chaser && chaser.kind === 'listener'
        ? chaser
        : this.g.ai.entities.find((e) => {
            if (e.disabled || e.kind !== 'listener') return false;
            const br = this.brainOf(e.id);
            if (!br || (br.state !== 'chase' && br.state !== 'listen')) return false;
            return dist2(e, p) < 64;
          }) || null;

    if (p.hiddenIn) {
      let closest = Infinity;
      for (const e of this.g.ai.entities) {
        if (e.disabled) continue;
        closest = Math.min(closest, Math.hypot(e.x - p.x, e.z - p.z));
      }
      this.hiddenT += dt;
      if ((!chaser && closest > 5) || this.hiddenT > 45) {
        if (this.hiddenT > 45) this.untilTimedOut = 'hidden-too-long';
        input.interact = 1;
        this.hidePhase = null;
        this.hiddenT = 0;
      }
      return input;
    }
    this.hiddenT = 0;

    if (wardenChaser) {
      if (!this.hidePhase) {
        const lk = this.nearestReachableLocker();
        this.hidePhase = lk ? 'to-locker' : 'run';
      }
      if (this.hidePhase === 'to-locker') {
        if (!this.path || this.pi >= (this.path?.length ?? 0)) {
          const lk = this.hideTarget;
          if (!lk) {
            this.hidePhase = 'run';
          } else {
            this.path = this.pathTo(lk.x, lk.z, true);
            this.pi = 1;
          }
        }
        if (this.hidePhase === 'to-locker') {
          if (this.fleeDoorStep(input)) return input;
          const done = this.followPath({ crouch: false, sprint: true }, dt, input);
          const near =
            this.hideTarget &&
            Math.hypot(this.hideTarget.x - p.x, this.hideTarget.z - p.z) < 1.35;
          if (done || near) {
            input.mx = 0;
            input.mz = 0;
            input.interact = 1;
            this.hidePhase = 'in-locker';
          }
          return input;
        }
      }
      if (this.hidePhase === 'run') {
        const chDist = Math.hypot(wardenChaser.x - p.x, wardenChaser.z - p.z);
        if (
          p.bottles > 0 &&
          !this.dropCd &&
          chDist > 5 &&
          chDist < 13
        ) {
          this.dropCd = 9;
          const dx = (p.x - wardenChaser.x) / chDist;
          const dz = (p.z - wardenChaser.z) / chDist;
          input.aimWorld = { x: p.x + dx * 7, z: p.z + dz * 7 };
          input.throwPressed = 1;
          return input;
        }
        if (chDist > 14 && !this.dangerSeen()) {
          this.hidePhase = null;
          return input;
        }
        if (!this.path || this.pi >= this.path.length) {
          const tx = p.x + (p.x - wardenChaser.x) * 3;
          const tz = p.z + (p.z - wardenChaser.z) * 3;
          this.path = this.pathTo(tx, tz, true);
          this.pi = 1;
        }
        if (this.fleeDoorStep(input)) return input;
        this.followPath({ crouch: false, sprint: true }, dt, input);
        return input;
      }
    }

    if (listenerChaser) {
      let otherClose = null;
      let od = Infinity;
      for (const e of this.g.ai.entities) {
        if (e.disabled || e.kind === 'listener') continue;
        const d = dist2(e, p);
        if (d < od) {
          od = d;
          otherClose = e;
        }
      }
      const lk = this.nearestLocker();
      if (lk && (!otherClose || od > 36)) {
        if (!this.hidePhase || this.hidePhase === 'run') {
          this.hidePhase = 'to-locker';
          this.hideTarget = lk;
          this.path = this.pathTo(lk.x, lk.z, true);
          this.pi = 1;
        }
        if (this.hidePhase === 'to-locker') {
          if (!this.path) {
            this.path = this.pathTo(this.hideTarget.x, this.hideTarget.z, true);
            this.pi = 1;
          }
          if (this.fleeDoorStep(input)) return input;
          const done = this.followPath({ crouch: true }, dt, input);
          const near = Math.hypot(this.hideTarget.x - p.x, this.hideTarget.z - p.z) < 1.35;
          if (done || near) {
            input.interact = 1;
            this.hidePhase = 'in-locker';
          }
          return input;
        }
      }
      const lkNear = this.nearestLocker();
      const lkDist = lkNear ? Math.hypot(lkNear.x - p.x, lkNear.z - p.z) : Infinity;
      const listenerTargetsUs =
        listenerChaser && Math.hypot(listenerChaser.x - p.x, listenerChaser.z - p.z) < 9;
      if (lkNear && lkDist < 7 && listenerTargetsUs) {
        if (!this.hidePhase || this.hidePhase === 'run') {
          this.hidePhase = 'to-locker';
          this.hideTarget = lkNear;
          this.path = this.pathTo(lkNear.x, lkNear.z, true);
          this.pi = 1;
        }
        if (this.hidePhase === 'to-locker') {
          if (!this.path) {
            this.path = this.pathTo(this.hideTarget.x, this.hideTarget.z, true);
            this.pi = 1;
          }
          if (this.fleeDoorStep(input)) return input;
          const done = this.followPath({ crouch: true }, dt, input);
          const near = Math.hypot(this.hideTarget.x - p.x, this.hideTarget.z - p.z) < 1.35;
          if (done || near) {
            input.interact = 1;
            this.hidePhase = 'in-locker';
          }
          return input;
        }
      }
      if (otherClose && od < 3.4 * 3.4) {
        const dx = p.x - otherClose.x;
        const dz = p.z - otherClose.z;
        const d = Math.hypot(dx, dz) || 1;
        input.mx = dx / d;
        input.mz = dz / d;
        input.crouch = true;
      }
      return input;
    }
    if (this.hidePhase) this.hidePhase = null;

    const prox = this.proximityThreat();
    const threatened =
      prox.dist < 2.3 || this.closingThreat() || (this.cautious && (prox.dist < 4.2 || this.dangerSeen()));
    if (threatened) {
      if (prox.dist < 2.05 && prox.ent) {
        const dx = p.x - prox.ent.x;
        const dz = p.z - prox.ent.z;
        const d = Math.hypot(dx, dz) || 1;
        input.mx = dx / d;
        input.mz = dz / d;
        input.sprint = !this.crouchDefault && prox.dist < 1.5;
        return input;
      }
      const nook = this.nearestNook();
      if (nook) {
        const dx = nook.x - p.x;
        const dz = nook.z - p.z;
        const d = Math.hypot(dx, dz);
        if (d > 0.35) {
          input.mx = dx / d;
          input.mz = dz / d;
          input.crouch = true;
          return input;
        }
      }
      return input;
    }

    if (this.holdT > 0) {
      this.holdT -= dt;
      this.holdAccum += dt;
      if (this.holdAccum > 4) {
        this.holdAccum = 0;
        const w = this.steps[this.i];
        if (w && w.type === 'goto' && !w.sentinelAware) {
          this.i++;
        }
      }
      return input;
    }
    if (this.evadeT > 0) {
      this.evadeT -= dt;
      return input;
    }
    this.holdAccum = 0;
    if (this.cautious && this.dangerSeen()) {
      this.holdT = 0.35;
      return input;
    }
    if (this.waitT > 0) {
      this.waitT -= dt;
      return input;
    }

    const cur = this.steps[this.i];
    if (!cur) return input;

    switch (cur.type) {
      case 'goto': {
        if (cur.guard && !cur.guard(this)) return input;
        if (this.cautious && cur.sentinelAware) {
          let blocked = false;
          for (const ent of this.g.ai.entities) {
            if (ent.disabled || ent.kind !== 'sentinel') continue;
            const hereR = visibility(ent, { x: p.x, z: p.z }, this.g.world, {
              targetLight: 1,
              targetCrouch: true,
              targetMoving: true,
              targetFlashlight: false,
            });
            const tgt = wc(cur.cell[0], cur.cell[1]);
            const thereR = visibility(ent, tgt, this.g.world, {
              targetLight: 1,
              targetCrouch: true,
              targetMoving: true,
              targetFlashlight: false,
            });
            if (hereR.seen || thereR.seen) blocked = true;
          }
          if (blocked) {
            if (!this.sentRetreat) {
              this.sentRetreat = 0.8;
              input.mx = -Math.sin(p.facing);
              input.mz = -Math.cos(p.facing);
              return input;
            }
            return input;
          }
          this.sentRetreat = 0;
        }
        if (!this.path) {
          let tgt = wc(cur.cell[0], cur.cell[1]);
          const { cx, cz } = this.g.world.cellAt(tgt.x, tgt.z);
          if (this.g.world.tiles[this.g.world.idx(cx, cz)] === 3) {
            let alt = null;
            let ad = Infinity;
            for (const [ox, oz] of [
              [0, 1],
              [0, -1],
              [1, 0],
              [-1, 0],
            ]) {
              const nx = cx + ox;
              const nz = cz + oz;
              if (!this.g.world.inBounds(nx, nz)) continue;
              if (this.g.world.blockedCell(nx, nz)) continue;
              const cand = { x: (nx + 0.5) * CELL, z: (nz + 0.5) * CELL };
              const dd = Math.hypot(cand.x - p.x, cand.z - p.z);
              if (dd < ad) {
                ad = dd;
                alt = cand;
              }
            }
            if (alt) tgt = alt;
          }
          this.path = this.pathTo(tgt.x, tgt.z);
          this.pi = 1;
          if (!this.path) {
            this.stuckFail = { cell: cur.cell, reason: 'no-path' };
            this.i = this.steps.length;
            break;
          }
        }
        const done = this.followPath(
          { crouch: cur.crouch ?? this.crouchDefault, sprint: !!cur.sprint },
          dt,
          input
        );
        if (done) {
          this.path = null;
          this.i++;
        }
        break;
      }
      case 'wait':
        this.waitT = cur.t;
        this.i++;
        break;
      case 'interact':
        input.interact = 1;
        this.i++;
        break;
      case 'throw': {
        if (p.bottles <= 0 || p.hiddenIn) {
          this.i++;
          break;
        }
        input.aimWorld = wc(cur.cell[0], cur.cell[1]);
        input.throwPressed = 1;
        this.i++;
        break;
      }
      case 'until':
        if (cur.pred(this)) {
          this.i++;
          cur._t = 0;
        } else {
          cur._t = (cur._t || 0) + dt;
          if (cur.timeout && cur._t > cur.timeout) {
            this.untilTimedOut = cur.label || 'until';
            this.i++;
          }
        }
        break;
      case 'clearOf': {
        const ent = this.g.ai.entities.find((e) => e.id === cur.id);
        const d = ent ? Math.hypot(ent.x - p.x, ent.z - p.z) : 999;
        if (d >= (cur.dist ?? 5)) {
          this.i++;
          cur._t = 0;
        } else {
          cur._t = (cur._t || 0) + dt;
          if ((cur.timeout ?? 30) < cur._t) {
            this.untilTimedOut = 'clearOf:' + cur.id;
            this.i++;
          }
        }
        break;
      }
      case 'window': {
        const ent = this.g.ai.entities.find((e) => e.id === cur.id);
        if (!ent || cur.pred(ent, this)) {
          this.i++;
          cur._t = 0;
        } else {
          cur._t = (cur._t || 0) + dt;
          if ((cur.timeout ?? 60) < cur._t) {
            this.untilTimedOut = 'window:' + cur.id;
            this.i++;
          }
        }
        break;
      }
      case 'fn':
        cur.fn(this);
        this.i++;
        break;
      default:
        this.i++;
    }
    this.lastPos = { x: p.x, z: p.z };
    return input;
  }
}

function dist2(a, b) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return dx * dx + dz * dz;
}

export function runOnce(name, opts, buildSteps, maxSimSec, seed) {
  const game = freshGame();
  const rec = new Recorder(game);
  const bot = new Bot(game, opts);
  bot.speedMul = 0.94 + ((seed * 2654435761) % 1000) / 1000 * 0.12;
  bot.seq(buildSteps(bot, game));
  let t = 0;
  while (!game.won && !rec.caught && t < maxSimSec) {
    const scaled = DT * (bot.speedMul || 1);
    const input = bot.tick(scaled);
    game.update(scaled, input);
    t += scaled;
    if (bot.stuckFail) break;
    if (bot.i >= bot.steps.length) break;
  }
  return {
    won: game.won,
    caught: rec.caught,
    chased: rec.chases > 0,
    chases: rec.chases,
    seals: Object.keys(rec.sealsAt).sort(),
    vessel: !!rec.vesselAt,
    time: Math.round(t * 10) / 10,
    end: bot.stuckFail
      ? 'stuck:' + (bot.stuckFail.cell ? bot.stuckFail.cell.join(',') : bot.stuckFail.reason || bot.stuckFail.type)
      : game.won
        ? 'won'
        : rec.caught
          ? 'caught'
          : bot.untilTimedOut
            ? 'timeout:' + bot.untilTimedOut
            : 'done',
    firstChase: rec.firstChase || null,
  };
}

export function runPolicy(name, opts, buildSteps, maxSimSec = 420) {
  const trials = opts.trials ?? 16;
  const results = [];
  for (let i = 0; i < trials; i++) {
    const r = runOnce(name, opts, buildSteps, maxSimSec, 7919 + i * 104729);
    results.push(r);
  }
  const clean = results.filter((r) => !r.chased && !r.caught);
  const survived = results.filter((r) => !r.caught);
  const objective = (r) => (opts.full ? r.won : opts.seal ? r.seals.includes(opts.seal) : true);
  const objectiveRate = results.filter(objective).length / trials;
  const cleanRate = clean.length / trials;
  const surviveRate = survived.length / trials;
  const times = results.map((r) => r.time).sort((a, b) => a - b);
  const endCounts = {};
  let firstFail = null;
  for (const r of results) {
    endCounts[r.end] = (endCounts[r.end] || 0) + 1;
    if (!firstFail && (r.caught || r.end.startsWith('timeout') || r.end === 'stuck')) {
      firstFail = { end: r.end, firstChase: r.firstChase };
    }
  }
  return {
    name,
    trials,
    cleanRate,
    surviveRate,
    objectiveRate,
    medianTime: times[Math.floor(trials / 2)],
    maxChases: Math.max(...results.map((r) => r.chases)),
    endCounts,
    firstFail,
    sample: results[0],
    passBar: { cleanRate: opts.cleanBar ?? 0.5, surviveRate: opts.surviveBar ?? 0.85, objectiveRate: 1 },
  };
}

const runs = buildAllRuns(runPolicy);
for (const r of runs) {
  r.pass =
    r.cleanRate >= r.passBar.cleanRate &&
    r.surviveRate >= r.passBar.surviveRate &&
    r.objectiveRate >= 1;
}
const report = { generated: new Date().toISOString(), results: runs, evaluation: evaluate(runs) };

export async function main() {
  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync('reports/playtest.json', JSON.stringify(report, null, 2));
  console.log('PLAYTEST REPORT (ensemble viability)');
  for (const r of runs) {
    console.log(
      `${r.pass ? 'PASS' : 'FAIL'}  ${r.name.padEnd(26)} clean=${r.cleanRate.toFixed(2)} survive=${r.surviveRate.toFixed(2)} objective=${r.objectiveRate.toFixed(2)} medT=${r.medianTime} maxCh=${r.maxChases} ends=${JSON.stringify(r.endCounts)}${r.firstFail ? ` fail1=${JSON.stringify(r.firstFail)}` : ''}`
    );
  }
  console.log(report.evaluation.passed ? 'ALL VIABILITY CHECKS PASSED' : 'VIABILITY CHECKS FAILED');
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  await main();
  process.exit(report.evaluation.passed ? 0 : 1);
}

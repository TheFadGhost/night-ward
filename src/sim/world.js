import { CELL, TILE, LIGHT_AMBIENT } from '../core/constants.js';

export class World {
  constructor(def) {
    this.w = def.w;
    this.h = def.h;
    this.tiles = def.tiles;
    this.doorOpen = new Set();
    this.fixtures = [];
    this.masks = [];
    this.blackouts = new Map();
    this.lockedDoors = new Set();
  }

  lockDoor(id) {
    this.lockedDoors.add(id);
  }

  unlockDoor(id) {
    this.lockedDoors.delete(id);
  }

  isLocked(id) {
    return this.lockedDoors.has(id);
  }

  idx(cx, cz) {
    return cz * this.w + cx;
  }

  inBounds(cx, cz) {
    return cx >= 0 && cz >= 0 && cx < this.w && cz < this.h;
  }

  cellAt(wx, wz) {
    return { cx: Math.floor(wx / CELL), cz: Math.floor(wz / CELL) };
  }

  tileAt(wx, wz) {
    const { cx, cz } = this.cellAt(wx, wz);
    if (!this.inBounds(cx, cz)) return TILE.VOID;
    return this.tiles[this.idx(cx, cz)];
  }

  registerDoor(id, wx, wz) {
    const { cx, cz } = this.cellAt(wx, wz);
    if (this.doors === undefined) this.doors = new Map();
    this.doors.set(this.idx(cx, cz), id);
  }

  setDoorOpen(id, open) {
    if (open) this.doorOpen.add(id);
    else this.doorOpen.delete(id);
  }

  isDoorOpen(id) {
    return this.doorOpen.has(id);
  }

  blockedCell(cx, cz) {
    if (!this.inBounds(cx, cz)) return true;
    const t = this.tiles[this.idx(cx, cz)];
    if (t === TILE.WALL || t === TILE.VOID) return true;
    if (t === TILE.DOOR) {
      const id = this.doors ? this.doors.get(this.idx(cx, cz)) : undefined;
      return !(id !== undefined && this.doorOpen.has(id));
    }
    return false;
  }

  lineOfSight(x1, z1, x2, z2) {
    let c1 = this.cellAt(x1, z1);
    let c2 = this.cellAt(x2, z2);
    if (c1.cx === c2.cx && c1.cz === c2.cz) return true;
    let x = c1.cx;
    let z = c1.cz;
    const dx = c2.cx - c1.cx;
    const dz = c2.cz - c1.cz;
    const sx = dx > 0 ? 1 : -1;
    const sz = dz > 0 ? 1 : -1;
    const tDeltaX = dx !== 0 ? Math.abs(1 / dx) : Infinity;
    const tDeltaZ = dz !== 0 ? Math.abs(1 / dz) : Infinity;
    let tMaxX = dx !== 0 ? ((dx > 0 ? c1.cx + 1 - x1 / CELL : x1 / CELL - c1.cx)) * tDeltaX : Infinity;
    let tMaxZ = dz !== 0 ? ((dz > 0 ? c1.cz + 1 - z1 / CELL : z1 / CELL - c1.cz)) * tDeltaZ : Infinity;
    for (let i = 0; i < 4096; i++) {
      if (this.blockedCell(x, z)) return false;
      if (x === c2.cx && z === c2.cz) return true;
      if (tMaxX < tMaxZ) {
        tMaxX += tDeltaX;
        x += sx;
      } else {
        tMaxZ += tDeltaZ;
        z += sz;
      }
    }
    return false;
  }

  registerFixture(f) {
    this.fixtures.push({ on: true, ...f });
  }

  registerMask(m) {
    this.masks.push({ ...m, on: m.on !== false });
  }

  applyBlackout(wingId, duration) {
    this.blackouts.set(wingId, { until: (this.time || 0) + duration });
  }

  setTime(t) {
    this.time = t;
    for (const [wing, b] of this.blackouts) {
      if (b.until <= t && !b.held) this.blackouts.delete(wing);
    }
  }

  wingBlackedOut(wingId) {
    const b = this.blackouts.get(wingId);
    return !!b && b.until > (this.time || 0);
  }

  fixtureActive(f) {
    return f.on && !this.wingBlackedOut(f.wingId);
  }

  lightAt(wx, wz) {
    let lum = LIGHT_AMBIENT;
    for (const f of this.fixtures) {
      if (!this.fixtureActive(f)) continue;
      const d = Math.hypot(wx - f.x, wz - f.z);
      if (d < f.r) {
        lum += f.i * Math.pow(1 - d / f.r, 1.25);
      }
    }
    return Math.min(1, lum);
  }

  maskAt(wx, wz) {
    let m = 0;
    for (const mk of this.masks) {
      if (!mk.on) continue;
      const d = Math.hypot(wx - mk.x, wz - mk.z);
      if (d < mk.r) m = Math.max(m, mk.strength * (1 - d / mk.r));
    }
    return Math.min(1, m);
  }

  serialize() {
    return {
      doorOpen: [...this.doorOpen],
      blackouts: [...this.blackouts.entries()].map(([k, v]) => [k, { ...v }]),
      lockedDoors: [...this.lockedDoors],
      fixtures: this.fixtures.map((f) => ({ id: f.id, on: f.on })),
      masks: this.masks.map((m) => ({ id: m.id, on: m.on })),
    };
  }

  load(json) {
    if (!json) return;
    if (Array.isArray(json.doorOpen)) this.doorOpen = new Set(json.doorOpen);
    if (Array.isArray(json.lockedDoors)) this.lockedDoors = new Set(json.lockedDoors);
    if (Array.isArray(json.blackouts)) {
      this.blackouts = new Map(
        json.blackouts.map(([k, v]) => [
          k,
          { until: Number(v.until) || 0, held: !!v.held },
        ])
      );
    }
    if (Array.isArray(json.fixtures)) {
      for (const sf of json.fixtures) {
        const f = this.fixtures.find((q) => q.id === sf.id);
        if (f) f.on = !!sf.on;
      }
    }
    if (Array.isArray(json.masks)) {
      for (const sm of json.masks) {
        const m = this.masks.find((q) => q.id === sm.id);
        if (m) m.on = !!sm.on;
      }
    }
  }
}

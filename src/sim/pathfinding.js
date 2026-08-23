import { CELL } from '../core/constants.js';

const DOOR_COST = 2.5;

export function findPath(world, sxW, szW, txW, tzW, opts = {}) {
  const doorsPassable = opts.doorsPassable !== false;
  const scx = Math.floor(sxW / CELL);
  const scz = Math.floor(szW / CELL);
  const tcx = Math.floor(txW / CELL);
  const tcz = Math.floor(tzW / CELL);
  if (!world.inBounds(tcx, tcz)) return null;

  const doorOpen = (cx, cz) => {
    if (!world.doors) return false;
    const id = world.doors.get(world.idx(cx, cz));
    return id !== undefined && world.doorOpen.has(id);
  };

  const doorLocked = (cx, cz) => {
    if (!world.doors || !world.isLocked) return false;
    const id = world.doors.get(world.idx(cx, cz));
    return id !== undefined && world.isLocked(id);
  };

  const passable = (cx, cz, isStart = false) => {
    if (!world.inBounds(cx, cz)) return false;
    const t = world.tiles[world.idx(cx, cz)];
    if (t === 2 || t === 0) return false;
    if (t === 3) {
      if (!isStart && doorLocked(cx, cz)) return false;
      if (doorsPassable) return true;
      return isStart ? true : doorOpen(cx, cz);
    }
    return true;
  };

  if (!passable(scx, scz, true)) return null;
  if (!passable(tcx, tcz)) {
    let found = false;
    for (const [ox, oz] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      if (passable(tcx + ox, tcz + oz)) {
        found = true;
        break;
      }
    }
    if (!found) return null;
  }

  const key = (x, z) => z * world.w + x;
  const open = new Map();
  const cameFrom = new Map();
  const gScore = new Map();
  const h = (x, z) => Math.hypot(x - tcx, z - tcz);
  const sk = key(scx, scz);
  gScore.set(sk, 0);
  open.set(sk, { cx: scx, cz: scz, f: h(scx, scz) });
  const closed = new Set();

  const neighbors = [
    [1, 0, 1],
    [-1, 0, 1],
    [0, 1, 1],
    [0, -1, 1],
    [1, 1, Math.SQRT2],
    [1, -1, Math.SQRT2],
    [-1, 1, Math.SQRT2],
    [-1, -1, Math.SQRT2],
  ];

  let guard = 20000;
  while (open.size > 0 && guard-- > 0) {
    let bestKey = null;
    let bestF = Infinity;
    for (const [k, node] of open) {
      if (node.f < bestF) {
        bestF = node.f;
        bestKey = k;
      }
    }
    const cur = open.get(bestKey);
    open.delete(bestKey);
    closed.add(bestKey);
    if (cur.cx === tcx && cur.cz === tcz) {
      const pts = [];
      let k = bestKey;
      while (k !== undefined) {
        const cx = k % world.w;
        const cz = Math.floor(k / world.w);
        const t = world.tiles[k];
        pts.push({
          x: (cx + 0.5) * CELL,
          z: (cz + 0.5) * CELL,
          doorCost: t === 3 ? DOOR_COST : 0,
        });
        k = cameFrom.get(k);
      }
      pts.reverse();
      return pts;
    }
    const ck = key(cur.cx, cur.cz);
    const gCur = gScore.get(ck);
    for (const [dx, dz, base] of neighbors) {
      const nx = cur.cx + dx;
      const nz = cur.cz + dz;
      if (!passable(nx, nz)) continue;
      if (dx !== 0 && dz !== 0) {
        if (!passable(cur.cx + dx, cur.cz) || !passable(cur.cx, cur.cz + dz)) continue;
      }
      const nk = key(nx, nz);
      if (closed.has(nk)) continue;
      const t = world.tiles[nk];
      const step = base + (t === 3 ? DOOR_COST : 0);
      const gNew = gCur + step;
      if (gNew < (gScore.get(nk) ?? Infinity)) {
        gScore.set(nk, gNew);
        cameFrom.set(nk, ck);
        open.set(nk, { cx: nx, cz: nz, f: gNew + h(nx, nz) });
      }
    }
  }
  return null;
}

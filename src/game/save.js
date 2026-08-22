const KEY = 'nightward.save.v1';

function hasStorage() {
  return typeof localStorage !== 'undefined';
}

export function saveGame(game, label = 'manual') {
  if (!hasStorage()) return false;
  try {
    const payload = {
      version: 1,
      ts: Date.now(),
      label,
      game: game.serialize(),
    };
    localStorage.setItem(KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function validateSave(payload) {
  if (!payload || typeof payload !== 'object') return null;
  if (payload.version !== 1) return null;
  const g = payload.game;
  if (!g || g.schema !== 1) return null;
  if (!g.player || !Number.isFinite(g.player.x) || !Number.isFinite(g.player.z)) return null;
  if (!g.state || !g.state.seals || !Number.isFinite(g.state.seals.got)) return null;
  if (!Array.isArray(g.ai && g.ai.brains)) return null;
  if (typeof g.world !== 'object' || !g.world) return null;
  if (g.state.seals.got < 0 || g.state.seals.got > 3) return null;
  return payload;
}

export function loadSave() {
  if (!hasStorage()) return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return validateSave(parsed);
  } catch {
    return null;
  }
}

export function clearSave() {
  if (hasStorage()) {
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }
}

import { bus } from './core/events.js';
import { buildLevel, staticDefFromLevel } from './game/level.js';
import { Game } from './game/game.js';
import { saveGame, loadSave, clearSave } from './game/save.js';
import { Renderer } from './render/renderer.js';
import { AudioEngine } from './audio/engine.js';
import { Hud } from './ui/hud.js';
import { Menus } from './ui/menus.js';
import { InputSource } from './ui/input.js';

const app = document.getElementById('app');
const canvas = document.createElement('canvas');
app.appendChild(canvas);

let level = buildLevel();
let game = new Game(level);

const renderer = new Renderer(canvas, staticDefFromLevel(level));
const audio = new AudioEngine(bus);
const hud = new Hud(app, bus);
const input = new InputSource({
  canvasToWorld: (px, py) => renderer.canvasToWorld(px, py),
});
input.attach(window);

let lastCatcher = null;
bus.on('playerCaught', (e) => {
  lastCatcher = e && e.byId ? e.byId : null;
});

function restartFromCheckpoint() {
  const payload = loadSave();
  clearSave();
  const next = new Game(level);
  if (payload && !next.load(payload.game)) {
    clearSave();
  }
  game = next;
  lastCatcher = null;
}

const menus = new Menus(app, {
  audioEngine: audio,
  getLog: () => game.log,
  getStats: () => game.stats,
  onRestart: () => restartFromCheckpoint(),
  onResume: () => {},
});

bus.on('gameLost', () => {
  menus.showDeath(lastCatcher);
});
bus.on('gameWon', (e) => {
  menus.showWin((e && e.stats) || game.stats);
});
bus.on('checkpoint', ({ label }) => {
  saveGame(game, label);
});
bus.on('ui:firstInput', () => {
  saveGame(game, 'intake');
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyM') audio.toggleMute();
});

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  const simRunning =
    menus.started && !menus.paused && !menus.overlayMode && !game.won && !game.lost;
  if (simRunning) {
    game.update(dt, input.poll());
  } else {
    input.poll();
  }
  const snap = game.snapshot();
  renderer.update(snap, dt);
  renderer.render();
  hud.update(snap);
  audio.update(snap, dt);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

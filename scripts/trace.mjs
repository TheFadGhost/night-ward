import { buildLevel } from '../src/game/level.js';
import { Game } from '../src/game/game.js';
import { bus } from '../src/core/events.js';
import { Bot } from './playtest.mjs';
import { buildAllRuns } from './policies-index.mjs';

const name = process.argv[2] || 'east/A breakroom-sneak';
const seed = Number(process.argv[3] ?? 7919);

const game = new Game(buildLevel());
const events = [];
bus.on('incident', (e) => events.push(`INC t=${game.time.toFixed(1)} ${e.who}: ${e.kind} ${e.detail || ''}`));
bus.on('alert', (e) => events.push(`ALERT t=${game.time.toFixed(1)} ${e.aiId} ${e.kind}`));

let captured = null;
const optsProxy = {
  get(target, prop) {
    if (prop === '__name') return null;
    return target[prop];
  },
};

const bot = new Bot(game, {});
bot.speedMul = 0.94 + ((seed * 2654435761) % 1000) / 1000 * 0.12;

let steps = null;
const fakeRunPolicy = (n, o, buildSteps) => {
  if (n === name) {
    Object.assign(bot, {
      cautious: !!o.cautious,
      crouchDefault: !!o.crouch,
    });
    captured = buildSteps;
  }
  return { name: n };
};
buildAllRuns(fakeRunPolicy);
if (!captured) {
  console.error('policy not found:', name);
  process.exit(1);
}
bot.seq(captured(bot, game));

const DT = 1 / 30;
let t = 0;
let lastLog = -2;
while (!game.won && !game.lost && t < 240) {
  const scaled = DT * bot.speedMul;
  const input = bot.tick(scaled);
  game.update(scaled, input);
  t += scaled;
  if (t - lastLog >= 3) {
    lastLog = t;
    const st = bot.steps[bot.i];
    const near = game.ai.entities
      .map((e) => `${e.id}:${Math.hypot(e.x - game.player.x, e.z - game.player.z).toFixed(0)}`)
      .sort((a, b) => a.localeCompare(b))
      .join(' ');
    events.push(
      `t=${t.toFixed(1)} P@${game.player.x.toFixed(0)},${game.player.z.toFixed(0)} step=${st ? st.type + ':' + (st.cell || st.label || '') : 'END'} | ${near}`
    );
  }
  if (bot.stuckFail) {
    events.push('STUCK ' + JSON.stringify(bot.stuckFail));
    break;
  }
  if (bot.untilTimedOut) {
    events.push('TIMEOUT ' + bot.untilTimedOut);
    bot.untilTimedOut = null;
  }
  if (bot.i >= bot.steps.length) {
    events.push('STEPS-DONE');
    break;
  }
}
for (const e of events) console.log(e);
console.log('seals', JSON.stringify(game.state.seals), 'lost', game.lost, 'won', game.won);

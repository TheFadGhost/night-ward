import { bus } from '../core/events.js';

const STYLE_ID = 'nw-style';

const SHEET = `
.nw-hud{position:absolute;inset:0;pointer-events:none;z-index:5;font-family:ui-monospace,'Cascadia Mono',Consolas,Menlo,monospace;color:#b6bcc8;user-select:none}
.nw-frame{position:absolute;inset:0;box-shadow:inset 0 0 0 2px rgba(214,69,69,.85),inset 0 0 46px rgba(214,69,69,.35);opacity:0}
.nw-flashfx{position:absolute;inset:0;background:#6d1111;opacity:0}
.nw-flashfx.go{animation:nw-flash-a .55s ease-out both}
@keyframes nw-flash-a{0%{opacity:.5}100%{opacity:0}}
.nw-corner{position:absolute;top:14px;left:16px;display:flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.2em;color:#6d7482}
.nw-pip{width:9px;height:9px;transform:rotate(45deg);border:1px solid #2a2f3a;background:transparent}
.nw-pip.fill{background:#b6bcc8;border-color:#b6bcc8}
.nw-vessel{color:#e6e9f0;display:none}
.nw-vessel.on{display:inline}
.nw-prompt{position:absolute;left:50%;bottom:58px;transform:translateX(-50%);background:#0b0d12ee;border:1px solid #2a2f3a;padding:7px 15px;font-size:12px;letter-spacing:.08em;display:none;white-space:nowrap}
.nw-prompt.on{display:block}
.nw-toast{position:absolute;left:50%;top:62px;transform:translateX(-50%);background:#0b0d12ee;border:1px solid #2a2f3a;border-left:2px solid #d9a441;padding:8px 18px;font-size:12px;letter-spacing:.14em;color:#d9a441;opacity:0;white-space:nowrap}
.nw-toast.go{animation:nw-toast-a 4s ease both}
@keyframes nw-toast-a{0%{opacity:0;transform:translateX(-50%) translateY(-8px)}8%{opacity:1;transform:translateX(-50%) translateY(0)}78%{opacity:1}100%{opacity:0}}
.nw-bottles{position:absolute;left:16px;bottom:16px;display:flex;gap:6px}
.nw-bdot{width:7px;height:7px;border-radius:50%;border:1px solid #2a2f3a;background:#8b93a3}
.nw-menus{position:absolute;inset:0;z-index:10;pointer-events:none;font-family:ui-monospace,'Cascadia Mono',Consolas,Menlo,monospace;color:#b6bcc8;user-select:none}
.nw-view{position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:rgba(4,5,9,.84);pointer-events:auto}
.nw-view.on{display:flex}
.nw-panel{width:min(560px,92vw);max-height:88vh;overflow:auto;background:#0b0d12ee;border:1px solid #2a2f3a;padding:26px 30px}
.nw-off{display:none!important}
.nw-kicker{font-size:11px;letter-spacing:.3em;color:#6d7482;margin-bottom:10px}
.nw-title{margin:0;font-size:28px;font-weight:600;letter-spacing:.34em;color:#e6e9f0}
.nw-sub{margin:8px 0 0;font-size:12px;letter-spacing:.1em;color:#6d7482}
.nw-rule{height:1px;background:#2a2f3a;margin:18px 0}
.nw-table{border-collapse:collapse;font-size:12px}
.nw-table td{padding:3px 16px 3px 0}
.nw-key{color:#e6e9f0;letter-spacing:.08em;white-space:nowrap}
.nw-desc{color:#6d7482}
.nw-btn{display:block;width:100%;box-sizing:border-box;margin-top:10px;padding:9px 14px;background:transparent;border:1px solid #2a2f3a;color:#b6bcc8;font:inherit;font-size:12px;letter-spacing:.14em;text-align:left;cursor:pointer}
.nw-btn:hover{border-color:#59627a;color:#e6e9f0}
.nw-btn.primary{border-color:#3a4152;color:#e6e9f0;text-align:center}
.nw-btn.primary:hover{border-color:#59627a;background:#10131b}
.nw-log{height:320px;overflow-y:auto;border:1px solid #2a2f3a;background:#07090e;padding:10px 12px;font-size:12px;line-height:1.6}
.nw-logrow .t{color:#565d6b}
.nw-logrow .w{color:#b6bcc8}
.nw-logrow .d{color:#6d7482}
.nw-logrow.warn .w,.nw-logrow.warn .d{color:#d9a441}
.nw-logrow.bad .w,.nw-logrow.bad .d{color:#e05252}
.nw-empty{color:#565d6b}
.nw-stats{font-size:13px;line-height:2.1}
.nw-stats .k{display:inline-block;width:190px;color:#6d7482;letter-spacing:.1em}
.nw-stats .v{color:#e6e9f0}
.nw-deathtitle{margin:0;font-size:38px;font-weight:600;letter-spacing:.4em;color:#e05252}
.nw-wintitle{margin:0;font-size:32px;font-weight:600;letter-spacing:.4em;color:#e6e9f0}
`;

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = SHEET;
  document.head.appendChild(s);
}

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

const CONTROLS = [
  ['WASD / ARROWS', 'move'],
  ['C / CTRL', 'crouch (hold)'],
  ['SHIFT', 'sprint (hold)'],
  ['E', 'interact'],
  ['Q / LMB', 'throw bottle at cursor'],
  ['F', 'flashlight'],
  ['ESC', 'pause'],
];

const KIND_PHRASE = {
  seen: 'spotted you',
  spotted: 'spotted you',
  heard: 'heard something',
  noise: 'responded to a noise',
  chase: 'gave chase',
  caught: 'took you',
};

function controlsTable() {
  const t = el('table', 'nw-table');
  const body = el('tbody');
  for (const [key, desc] of CONTROLS) {
    const tr = el('tr');
    tr.appendChild(el('td', 'nw-key', key));
    tr.appendChild(el('td', 'nw-desc', desc));
    body.appendChild(tr);
  }
  t.appendChild(body);
  return t;
}

function fmtTime(sec) {
  const s = Math.max(0, Math.floor(Number(sec) || 0));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

function logClass(kind) {
  if (kind === 'caught') return ' nw-logrow bad';
  if (kind === 'seen' || kind === 'spotted' || kind === 'chase') return ' nw-logrow warn';
  return ' nw-logrow';
}

export class Menus {
  constructor(container, opts = {}) {
    ensureStyles();
    this.opts = opts;
    this.started = false;
    this.paused = false;
    this.muted = false;
    this.overlayMode = null;

    this.root = el('div', 'nw-menus');

    this.startView = el('div', 'nw-view on');
    const sp = el('div', 'nw-panel');
    sp.appendChild(el('div', 'nw-kicker', 'SECTOR 7 \u00B7 AFTER HOURS'));
    sp.appendChild(el('h1', 'nw-title', 'NIGHT WARD'));
    sp.appendChild(el('p', 'nw-sub', 'The ward remembers light.'));
    sp.appendChild(el('div', 'nw-rule'));
    sp.appendChild(controlsTable());
    sp.appendChild(el('div', 'nw-rule'));
    const beginBtn = el('button', 'nw-btn primary', 'CLICK TO BEGIN');
    beginBtn.addEventListener('click', () => this.begin());
    sp.appendChild(beginBtn);
    this.startView.appendChild(sp);

    this.pauseView = el('div', 'nw-view');
    const pp = el('div', 'nw-panel');
    pp.appendChild(el('div', 'nw-kicker', 'PAUSED'));
    this.pauseMain = el('div');
    this.resumeBtn = el('button', 'nw-btn primary', 'RESUME');
    this.restartBtn = el('button', 'nw-btn', 'RESTART CHECKPOINT');
    this.logBtn = el('button', 'nw-btn', 'INCIDENT LOG');
    this.controlsBtn = el('button', 'nw-btn', 'CONTROLS');
    this.muteBtn = el('button', 'nw-btn', 'SOUND: ON');
    this.resumeBtn.addEventListener('click', () => this.togglePause(false));
    this.restartBtn.addEventListener('click', () => this.restart());
    this.logBtn.addEventListener('click', () => this.showSub('log'));
    this.controlsBtn.addEventListener('click', () => this.showSub('controls'));
    this.muteBtn.addEventListener('click', () => this.toggleMute());
    this.pauseMain.appendChild(this.resumeBtn);
    this.pauseMain.appendChild(this.restartBtn);
    this.pauseMain.appendChild(this.logBtn);
    this.pauseMain.appendChild(this.controlsBtn);
    this.pauseMain.appendChild(this.muteBtn);
    this.pauseLog = el('div', 'nw-off');
    this.pauseControls = el('div', 'nw-off');
    this.pauseControls.appendChild(controlsTable());
    const backBtn1 = el('button', 'nw-btn', 'BACK');
    backBtn1.addEventListener('click', () => this.showSub('main'));
    this.pauseControls.appendChild(backBtn1);
    const backBtn2 = el('button', 'nw-btn', 'BACK');
    backBtn2.addEventListener('click', () => this.showSub('main'));
    pp.appendChild(this.pauseMain);
    pp.appendChild(this.pauseControls);
    pp.appendChild(this.pauseLog);
    this.pauseView.appendChild(pp);

    this.deathView = el('div', 'nw-view');
    const dp = el('div', 'nw-panel');
    dp.appendChild(el('div', 'nw-kicker', 'WARD INCIDENT REPORT'));
    dp.appendChild(el('h1', 'nw-deathtitle', 'TAKEN'));
    this.deathBy = el('p', 'nw-sub', '');
    dp.appendChild(this.deathBy);
    dp.appendChild(el('div', 'nw-rule'));
    const deathRestart = el('button', 'nw-btn primary', 'RESTART FROM CHECKPOINT');
    deathRestart.addEventListener('click', () => this.restart());
    dp.appendChild(deathRestart);
    this.deathView.appendChild(dp);

    this.winView = el('div', 'nw-view');
    const wp = el('div', 'nw-panel');
    wp.appendChild(el('div', 'nw-kicker', 'EXIT LOG'));
    wp.appendChild(el('h1', 'nw-wintitle', 'EXTRACTED'));
    this.winStats = el('div', 'nw-stats');
    wp.appendChild(el('div', 'nw-rule'));
    wp.appendChild(this.winStats);
    wp.appendChild(el('div', 'nw-rule'));
    const leaveBtn = el('button', 'nw-btn primary', 'LEAVE WARD');
    leaveBtn.addEventListener('click', () => this.restart());
    wp.appendChild(leaveBtn);
    this.winView.appendChild(wp);

    this.root.appendChild(this.startView);
    this.root.appendChild(this.pauseView);
    this.root.appendChild(this.deathView);
    this.root.appendChild(this.winView);
    container.appendChild(this.root);

    this._esc = (e) => {
      if (e.code !== 'Escape') return;
      if (!this.started || this.overlayMode) return;
      this.togglePause();
    };
    document.addEventListener('keydown', this._esc);
  }

  begin() {
    if (this.started) return;
    this.started = true;
    this.startView.classList.remove('on');
    const a = this.opts.audioEngine;
    if (a && typeof a.arm === 'function') a.arm();
    bus.emit('ui:firstInput');
  }

  togglePause(force) {
    const want = typeof force === 'boolean' ? force : !this.paused;
    if (want === this.paused) return;
    if (want && (!this.started || this.overlayMode)) return;
    this.paused = want;
    this.pauseView.classList.toggle('on', want);
    if (want) this.showSub('main');
    else if (typeof this.opts.onResume === 'function') this.opts.onResume();
  }

  showSub(which) {
    this.pauseMain.classList.toggle('nw-off', which !== 'main');
    this.pauseControls.classList.toggle('nw-off', which !== 'controls');
    this.pauseLog.classList.toggle('nw-off', which !== 'log');
    if (which === 'log') this.renderLog();
  }

  renderLog() {
    this.pauseLog.textContent = '';
    this.pauseLog.appendChild(el('div', 'nw-kicker', 'INCIDENT LOG'));
    const box = el('div', 'nw-log');
    let log = [];
    try {
      log = this.opts.getLog() || [];
    } catch (_) {
      log = [];
    }
    const recent = log.slice(-100).reverse();
    if (!recent.length) box.appendChild(el('div', 'nw-empty', 'no incidents recorded'));
    for (const entry of recent) {
      if (typeof entry === 'string') {
        box.appendChild(el('div', 'nw-logrow', entry));
        continue;
      }
      const e = entry || {};
      const t = Number.isFinite(e.t) ? e.t.toFixed(1) + 's' : '';
      const who = e.who || '';
      const detail = e.detail != null && e.detail !== '' ? String(e.detail) : KIND_PHRASE[e.kind] || e.kind || '';
      const row = el('div', logClass(e.kind));
      row.appendChild(el('span', 't', t + (t ? ' ' : '')));
      row.appendChild(el('span', 'w', who));
      row.appendChild(el('span', 'd', detail ? ' \u2014 ' + detail : ''));
      box.appendChild(row);
    }
    this.pauseLog.appendChild(box);
  }

  toggleMute() {
    const a = this.opts.audioEngine;
    let muted;
    if (a && typeof a.toggleMute === 'function') muted = !!a.toggleMute();
    else if (a && typeof a.setMuted === 'function') {
      muted = !this.muted;
      a.setMuted(muted);
    } else muted = !this.muted;
    this.muted = muted;
    this.muteBtn.textContent = 'SOUND: ' + (muted ? 'OFF' : 'ON');
  }

  restart() {
    this.paused = false;
    this.overlayMode = null;
    this.pauseView.classList.remove('on');
    this.deathView.classList.remove('on');
    this.winView.classList.remove('on');
    if (typeof this.opts.onRestart === 'function') this.opts.onRestart();
  }

  showDeath(byWho) {
    this.deathBy.textContent = byWho ? 'taken by ' + byWho : '';
    this.overlayMode = 'death';
    this.paused = false;
    this.pauseView.classList.remove('on');
    this.deathView.classList.add('on');
  }

  showWin(stats) {
    const st = stats || {};
    const time = st.time != null ? st.time : st.timeSurvived != null ? st.timeSurvived : 0;
    const spotted = st.spotted != null ? st.spotted : st.timesSpotted != null ? st.timesSpotted : 0;
    const bottles = st.bottlesUsed != null ? st.bottlesUsed : st.bottles != null ? st.bottles : 0;
    this.winStats.textContent = '';
    const row = (k, v) => {
      const d = el('div');
      d.appendChild(el('span', 'k', k));
      d.appendChild(el('span', 'v', v));
      this.winStats.appendChild(d);
    };
    row('TIME SURVIVED', fmtTime(time));
    row('TIMES SPOTTED', String(spotted));
    row('BOTTLES USED', String(bottles));
    this.overlayMode = 'win';
    this.paused = false;
    this.pauseView.classList.remove('on');
    this.winView.classList.add('on');
  }

  dispose() {
    document.removeEventListener('keydown', this._esc);
    this.root.remove();
  }
}

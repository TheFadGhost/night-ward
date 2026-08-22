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

export class Hud {
  constructor(container, bus) {
    ensureStyles();
    this.bus = bus;
    this.root = el('div', 'nw-hud');
    this.frame = el('div', 'nw-frame');
    this.flashFx = el('div', 'nw-flashfx');
    this.corner = el('div', 'nw-corner');
    this.pips = [];
    for (let i = 0; i < 3; i++) {
      const p = el('span', 'nw-pip');
      this.pips.push(p);
      this.corner.appendChild(p);
    }
    this.vessel = el('span', 'nw-vessel', '\u2756');
    this.corner.appendChild(this.vessel);
    this.toast = el('div', 'nw-toast');
    this.prompt = el('div', 'nw-prompt');
    this.bottlesRow = el('div', 'nw-bottles');
    this.root.appendChild(this.frame);
    this.root.appendChild(this.flashFx);
    this.root.appendChild(this.corner);
    this.root.appendChild(this.toast);
    this.root.appendChild(this.prompt);
    this.root.appendChild(this.bottlesRow);
    this._bottles = -1;
    this._flashActive = false;
    this._unsub = bus.on('objective', (p) => this.showObjective(p && p.text));
    container.appendChild(this.root);
  }

  showObjective(text) {
    if (!text) return;
    this.toast.textContent = text;
    this.toast.classList.remove('go');
    void this.toast.offsetWidth;
    this.toast.classList.add('go');
  }

  update(snap) {
    const s = snap || {};
    const pr = s.prompt;
    if (pr && pr.label) {
      this.prompt.textContent = '[E] ' + pr.label;
      this.prompt.classList.add('on');
    } else {
      this.prompt.classList.remove('on');
    }
    const got = Math.max(0, Math.min(3, s.sealsGot | 0));
    for (let i = 0; i < 3; i++) this.pips[i].classList.toggle('fill', i < got);
    this.vessel.classList.toggle('on', !!s.vessel);
    const b = Math.max(0, s.bottles | 0);
    if (b !== this._bottles) {
      this._bottles = b;
      this.bottlesRow.textContent = '';
      for (let i = 0; i < b; i++) this.bottlesRow.appendChild(el('span', 'nw-bdot'));
    }
    const t = Math.max(0, Math.min(1, Number(s.threatLevel) || 0));
    this.frame.style.opacity = String(t * t);
    const cf = !!s.caughtFlash;
    if (cf && !this._flashActive) {
      this.flashFx.classList.remove('go');
      void this.flashFx.offsetWidth;
      this.flashFx.classList.add('go');
    }
    this._flashActive = cf;
  }

  dispose() {
    if (this._unsub) this._unsub();
    this.root.remove();
  }
}

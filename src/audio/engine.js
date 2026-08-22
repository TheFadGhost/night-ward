const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const rand = (a, b) => a + Math.random() * (b - a);

export class AudioEngine {
  constructor(bus) {
    this._offs = [];
    this._ctx = null;
    this._master = null;
    this._white = null;
    this._brown = null;
    this._bed = null;
    this._shimmer = null;
    this._hum = null;
    this._steams = new Map();
    this._volume = 0.85;
    this._muted = false;
    this._px = 0;
    this._pz = 0;
    this._threat = 0;
    this._chase = false;
    this._blackout = false;
    this._listenerNear = 0;
    this._sentinelNear = 0;
    this._caught = false;
    this._beatAt = 0;
    this._tickAt = 0;
    this._lastLog = -1;

    const on = (type, fn) =>
      this._offs.push(
        bus.on(type, (p) => {
          try {
            fn(p || {});
          } catch {}
        })
      );
    on('noise', (e) => this._onNoise(e));
    on('alert', (e) => this._onAlert(e));
    on('incident', (e) => this._logTick(e));
    on('breaker', (e) => this._onBreaker(e));
    on('steam', (e) => this._onSteam(e));
    on('lightSmashed', (e) => this._glass(e.x, e.z, 1));
    on('pickup', (e) => this._pickup(e.kind));
    on('sealTaken', () => this._sealToll());
    on('playerCaught', () => this._caughtSting());
    on('gameWon', () => this._winChord());
    on('gameLost', () => {
      if (!this._caught) this._loseFall();
    });
    on('checkpoint', () => this._blip());
  }

  arm() {
    if (typeof window === 'undefined') return false;
    try {
      if (!this._ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        this._ctx = new AC();
        this._build();
      }
      if (this._ctx.state === 'suspended') this._ctx.resume().catch(() => {});
      return true;
    } catch {
      return false;
    }
  }

  update(snap, dt) {
    if (!snap) return;
    this._threat = clamp(+snap.threatLevel || 0, 0, 1);
    this._chase = !!(snap.chaseActive || snap.chase);
    this._blackout = !!snap.blackout;
    this._listenerNear = clamp(+snap.listenerNear || 0, 0, 1);
    this._sentinelNear = clamp(+snap.sentinelNear || 0, 0, 1);
    const p = snap.player;
    if (p) {
      this._px = +p.x || 0;
      this._pz = +p.z || 0;
    }
    const ctx = this._ctx;
    if (!ctx || ctx.state !== 'running') return;
    const t = ctx.currentTime;
    this._updateBed(t);
    this._updateShimmer(t);
    this._updateHeart(t);
    this._updateTicks(t);
    this._updateHum(t);
  }

  toggleMute() {
    this._muted = !this._muted;
    if (this._master && this._ctx) {
      this._master.gain.cancelScheduledValues(this._ctx.currentTime);
      this._master.gain.setTargetAtTime(this._muted ? 0.0001 : this._volume, this._ctx.currentTime, 0.03);
    }
    return this._muted;
  }

  setMaster(v) {
    this._volume = clamp(+v || 0, 0, 1.5);
    if (this._master && this._ctx && !this._muted && !this._caught) {
      this._master.gain.setTargetAtTime(this._volume, this._ctx.currentTime, 0.05);
    }
  }

  dispose() {
    for (const off of this._offs) {
      try {
        off();
      } catch {}
    }
    this._offs.length = 0;
    if (this._ctx) {
      for (const [, st] of this._steams) {
        try {
          st.s.stop();
        } catch {}
      }
      this._steams.clear();
      try {
        this._ctx.close();
      } catch {}
    }
    this._ctx = null;
    this._master = null;
    this._bed = null;
    this._shimmer = null;
    this._hum = null;
    this._white = null;
    this._brown = null;
  }

  _build() {
    const ctx = this._ctx;
    const n = Math.floor(ctx.sampleRate * 2);
    this._white = ctx.createBuffer(1, n, ctx.sampleRate);
    const wd = this._white.getChannelData(0);
    for (let i = 0; i < n; i++) wd[i] = Math.random() * 2 - 1;
    this._brown = ctx.createBuffer(1, n, ctx.sampleRate);
    const bd = this._brown.getChannelData(0);
    let acc = 0;
    for (let i = 0; i < n; i++) {
      acc = (acc + 0.02 * wd[i]) / 1.02;
      bd[i] = acc * 3.2;
    }
    this._master = ctx.createGain();
    this._master.gain.value = this._muted ? 0.0001 : this._volume;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -12;
    limiter.knee.value = 8;
    limiter.ratio.value = 14;
    limiter.attack.value = 0.002;
    limiter.release.value = 0.24;
    this._master.connect(limiter);
    limiter.connect(ctx.destination);
    const t = ctx.currentTime;

    const oA = ctx.createOscillator();
    oA.type = 'sine';
    oA.frequency.value = 55;
    const oB = ctx.createOscillator();
    oB.type = 'sine';
    oB.frequency.value = 57.2;
    const bedLP = ctx.createBiquadFilter();
    bedLP.type = 'lowpass';
    bedLP.frequency.value = 240;
    bedLP.Q.value = 0.7;
    const bedG = ctx.createGain();
    bedG.gain.value = 0.0001;
    bedG.gain.setTargetAtTime(0.05, t, 1.6);
    oA.connect(bedLP);
    oB.connect(bedLP);
    bedLP.connect(bedG);
    bedG.connect(this._master);
    const breath = ctx.createOscillator();
    breath.type = 'sine';
    breath.frequency.value = 0.06;
    const breathD = ctx.createGain();
    breathD.gain.value = 0.018;
    breath.connect(breathD);
    breathD.connect(bedG.gain);

    const hiss = ctx.createBufferSource();
    hiss.buffer = this._brown;
    hiss.loop = true;
    const hissBP = ctx.createBiquadFilter();
    hissBP.type = 'bandpass';
    hissBP.frequency.value = 520;
    hissBP.Q.value = 0.4;
    const hissG = ctx.createGain();
    hissG.gain.value = 0.0001;
    hissG.gain.setTargetAtTime(0.013, t, 2.2);
    hiss.connect(hissBP);
    hissBP.connect(hissG);
    hissG.connect(this._master);
    const swell = ctx.createOscillator();
    swell.type = 'sine';
    swell.frequency.value = 0.045;
    const swellD = ctx.createGain();
    swellD.gain.value = 0.005;
    swell.connect(swellD);
    swellD.connect(hissG.gain);

    oA.start();
    oB.start();
    breath.start();
    hiss.start();
    swell.start();
    this._bed = { bedLP, bedG, hissG };
  }

  _updateBed(t) {
    if (!this._bed) return;
    this._bed.bedLP.frequency.setTargetAtTime(this._blackout ? 105 : 240, t, 0.5);
    this._bed.hissG.gain.setTargetAtTime(this._blackout ? 0.006 : 0.013, t, 0.6);
  }

  _buildShimmer() {
    const ctx = this._ctx;
    const o1 = ctx.createOscillator();
    o1.type = 'sine';
    o1.frequency.value = 880;
    const o2 = ctx.createOscillator();
    o2.type = 'sine';
    o2.frequency.value = 932.3;
    const drift = ctx.createOscillator();
    drift.type = 'sine';
    drift.frequency.value = 0.09;
    const driftD = ctx.createGain();
    driftD.gain.value = 7;
    drift.connect(driftD);
    driftD.connect(o2.detune);
    const trem = ctx.createOscillator();
    trem.type = 'sine';
    trem.frequency.value = 0.13;
    const tremD = ctx.createGain();
    tremD.gain.value = 0.012;
    const g = ctx.createGain();
    g.gain.value = 0.0001;
    o1.connect(g);
    o2.connect(g);
    trem.connect(tremD);
    tremD.connect(g.gain);
    g.connect(this._master);
    o1.start();
    o2.start();
    drift.start();
    trem.start();
    return { o1, o2, g };
  }

  _updateShimmer(t) {
    if (this._threat <= 0.001 || this._caught) {
      if (this._shimmer) this._shimmer.g.gain.setTargetAtTime(0.0001, t, 0.4);
      return;
    }
    if (!this._shimmer) this._shimmer = this._buildShimmer();
    this._shimmer.g.gain.setTargetAtTime(0.055 * this._threat * this._threat, t, 0.3);
  }

  _thump(at, peak) {
    const ctx = this._ctx;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(120, at);
    o.frequency.exponentialRampToValueAtTime(40, at + 0.13);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(peak, at + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.17);
    o.connect(g);
    g.connect(this._master);
    o.start(at);
    o.stop(at + 0.2);
  }

  _updateHeart(t) {
    if (this._caught || this._threat < 0.15) {
      this._beatAt = t + 0.2;
      return;
    }
    const iv = 1 / (0.25 + 1.15 * this._threat);
    if (this._beatAt < t) this._beatAt = t + 0.05;
    const peak = 0.05 + 0.21 * this._threat;
    while (this._beatAt < t + 0.12) {
      this._thump(this._beatAt, peak);
      this._thump(this._beatAt + iv * 0.32, peak * 0.72);
      this._beatAt += iv;
    }
  }

  _buildHum() {
    const ctx = this._ctx;
    const o1 = ctx.createOscillator();
    o1.type = 'sawtooth';
    o1.frequency.value = 64.6;
    const o2 = ctx.createOscillator();
    o2.type = 'sawtooth';
    o2.frequency.value = 65.5;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 380;
    lp.Q.value = 1.1;
    const am = ctx.createGain();
    am.gain.value = 0.55;
    const wob = ctx.createOscillator();
    wob.type = 'sine';
    wob.frequency.value = 5.1;
    const wobD = ctx.createGain();
    wobD.gain.value = 0.32;
    wob.connect(wobD);
    wobD.connect(am.gain);
    const g = ctx.createGain();
    g.gain.value = 0.0001;
    o1.connect(lp);
    o2.connect(lp);
    lp.connect(am);
    am.connect(g);
    g.connect(this._master);
    o1.start();
    o2.start();
    wob.start();
    return { o1, o2, g };
  }

  _updateHum(t) {
    if (this._sentinelNear <= 0.001 || this._caught) {
      if (this._hum) this._hum.g.gain.setTargetAtTime(0.0001, t, 0.25);
      return;
    }
    if (!this._hum) this._hum = this._buildHum();
    this._hum.g.gain.setTargetAtTime(0.075 * this._sentinelNear, t, 0.15);
  }

  _updateTicks(t) {
    if (this._caught || this._listenerNear <= 0.02) {
      this._tickAt = Math.max(this._tickAt, t + 0.1);
      return;
    }
    if (t < this._tickAt) return;
    const near = this._listenerNear;
    this._noiseHit({
      at: t,
      f: 2600,
      q: 9,
      gain: 0.006 + 0.05 * near * near,
      dur: 0.03,
      pan: rand(-0.4, 0.4),
    });
    this._tickAt = t + rand(0.06, 0.42) * (1.25 - near);
  }

  _spatial(x, z) {
    if (typeof x !== 'number' || typeof z !== 'number') return { pan: 0, att: 1 };
    const dx = x - this._px;
    const dz = z - this._pz;
    const d = Math.sqrt(dx * dx + dz * dz);
    return { pan: clamp(dx * 0.13, -0.85, 0.85), att: 1 / (1 + d * 0.16) };
  }

  _tone({ at, type = 'sine', f0, f1 = 0, fDur = 0, gain, dur, pan = 0, lp = 0, attack = 0.008 }) {
    const ctx = this._ctx;
    if (!ctx) return;
    const t = at != null ? at : ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(Math.max(1, f0), t);
    if (f1 > 0) o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + (fDur || dur));
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(Math.max(0.0001, gain), t + Math.min(attack, dur * 0.5));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let head = o;
    if (lp > 0) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = lp;
      o.connect(f);
      head = f;
    }
    const pn = ctx.createStereoPanner();
    pn.pan.value = pan;
    head.connect(g);
    g.connect(pn);
    pn.connect(this._master);
    o.start(t);
    o.stop(t + dur + 0.06);
  }

  _noiseHit({ at, f = 1000, q = 1, type = 'bandpass', gain, dur, pan = 0, sweepTo = 0, attack = 0.004, brown = false }) {
    const ctx = this._ctx;
    if (!ctx) return;
    const t = at != null ? at : ctx.currentTime;
    const s = ctx.createBufferSource();
    s.buffer = brown ? this._brown : this._white;
    s.loop = true;
    const flt = ctx.createBiquadFilter();
    flt.type = type;
    flt.Q.value = q;
    flt.frequency.setValueAtTime(f, t);
    if (sweepTo > 0) flt.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(Math.max(0.0001, gain), t + Math.min(attack, dur * 0.5));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const pn = ctx.createStereoPanner();
    pn.pan.value = pan;
    s.connect(flt);
    flt.connect(g);
    g.connect(pn);
    pn.connect(this._master);
    s.start(t);
    s.stop(t + dur + 0.05);
  }

  _onNoise(e) {
    if (!this._ctx) return;
    switch (e.type) {
      case 'footstep':
        this._footstep(e);
        break;
      case 'door':
        this._door(e);
        break;
      case 'glass':
        this._glass(e.x, e.z, clamp(+e.loud || 1, 0, 2));
        break;
      case 'bottle':
        this._bottle(e);
        break;
      case 'locker':
        this._locker(e);
        break;
      case 'throw':
        this._whoosh(e);
        break;
      case 'steam':
        this._valveHiss(e);
        break;
    }
  }

  _footstep(e) {
    const { pan, att } = this._spatial(e.x, e.z);
    const loud = clamp(+e.loud || 0.5, 0, 2);
    const surf = typeof e.surface === 'string' ? e.surface : 'concrete';
    const t = this._ctx.currentTime;
    if (surf === 'grate') {
      this._noiseHit({ at: t, f: 1750, q: 7, gain: 0.09 * loud * att, dur: 0.16, pan });
      this._tone({ at: t + 0.005, f0: 1240, gain: 0.02 * loud * att, dur: 0.12, pan, lp: 4000 });
    } else if (surf === 'carpet') {
      this._noiseHit({ at: t, f: 240, q: 0.9, type: 'lowpass', gain: 0.1 * loud * att, dur: 0.08, pan });
    } else if (surf === 'doorway') {
      this._noiseHit({ at: t, f: 700, q: 2.2, gain: 0.07 * loud * att, dur: 0.09, pan });
      this._tone({ at: t, f0: 130, f1: 70, fDur: 0.07, gain: 0.05 * loud * att, dur: 0.09, pan });
    } else {
      this._noiseHit({ at: t, f: 480, q: 1.3, gain: 0.08 * loud * att, dur: 0.07, pan });
      this._tone({ at: t, f0: 96, f1: 52, fDur: 0.06, gain: 0.05 * loud * att, dur: 0.08, pan });
    }
  }

  _door(e) {
    const ctx = this._ctx;
    const { pan, att } = this._spatial(e.x, e.z);
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(84, t);
    o.frequency.linearRampToValueAtTime(138, t + 0.42);
    const vib = ctx.createOscillator();
    vib.type = 'sine';
    vib.frequency.value = 7.7;
    const vibD = ctx.createGain();
    vibD.gain.value = 9;
    vib.connect(vibD);
    vibD.connect(o.frequency);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 520;
    bp.Q.value = 4.5;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.055 * att, t + 0.08);
    g.gain.setValueAtTime(0.055 * att, t + 0.34);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.46);
    const pn = ctx.createStereoPanner();
    pn.pan.value = pan;
    o.connect(bp);
    bp.connect(g);
    g.connect(pn);
    pn.connect(this._master);
    o.start(t);
    vib.start(t);
    o.stop(t + 0.5);
    vib.stop(t + 0.5);
    this._noiseHit({ at: t + 0.44, f: 1900, q: 5, gain: 0.05 * att, dur: 0.035, pan });
  }

  _glass(x, z, k) {
    const { pan, att } = this._spatial(x, z);
    const t = this._ctx.currentTime;
    const amp = clamp(k, 0.2, 2) * att;
    this._noiseHit({ at: t, f: 3400, q: 0.8, type: 'highpass', gain: 0.16 * amp, dur: 0.28, pan });
    this._noiseHit({ at: t, f: 900, q: 1, gain: 0.09 * amp, dur: 0.12, pan });
    for (let i = 0; i < 6; i++) {
      this._tone({
        at: t + 0.01 + i * 0.028 + Math.random() * 0.02,
        type: 'triangle',
        f0: rand(1900, 5600),
        gain: 0.028 * amp * (1 - i * 0.13),
        dur: rand(0.1, 0.3),
        pan: clamp(pan + rand(-0.12, 0.12), -1, 1),
        lp: 7000,
      });
    }
  }

  _bottle(e) {
    const { pan, att } = this._spatial(e.x, e.z);
    const amp = clamp(+e.loud || 1.5, 0, 2) * att;
    const t = this._ctx.currentTime;
    this._tone({ at: t, f0: 2450, gain: 0.05 * amp, dur: 0.09, pan, lp: 6000 });
    this._noiseHit({ at: t + 0.02, f: 2100, q: 0.9, gain: 0.12 * amp, dur: 0.2, pan });
    for (let i = 0; i < 3; i++) {
      this._tone({
        at: t + 0.05 + i * 0.05,
        type: 'triangle',
        f0: rand(1200, 3100),
        gain: 0.03 * amp,
        dur: 0.12,
        pan,
        lp: 5500,
      });
    }
    this._noiseHit({ at: t + 0.03, f: 500, q: 1, gain: 0.06 * amp, dur: 0.1, pan });
  }

  _locker(e) {
    const { pan, att } = this._spatial(e.x, e.z);
    const t = this._ctx.currentTime;
    this._tone({ at: t, f0: 185, f1: 62, fDur: 0.1, gain: 0.11 * att, dur: 0.16, pan });
    this._noiseHit({ at: t, f: 430, q: 2.4, gain: 0.07 * att, dur: 0.11, pan });
    this._tone({ at: t + 0.06, f0: 1180, gain: 0.016 * att, dur: 0.14, pan, lp: 5000 });
  }

  _whoosh(e) {
    const { pan, att } = this._spatial(e.x, e.z);
    this._noiseHit({
      at: this._ctx.currentTime,
      f: 320,
      q: 1.6,
      gain: 0.085 * att,
      dur: 0.36,
      pan,
      sweepTo: 2300,
      attack: 0.12,
    });
  }

  _valveHiss(e) {
    const { pan, att } = this._spatial(e.x, e.z);
    this._noiseHit({ at: this._ctx.currentTime, f: 3700, q: 0.8, gain: 0.045 * att, dur: 0.3, pan, attack: 0.05 });
  }

  _onAlert(e) {
    if (!this._ctx) return;
    const t = this._ctx.currentTime;
    if (e.kind === 'chase') {
      this._tone({ at: t, type: 'sawtooth', f0: 175, f1: 740, fDur: 0.26, gain: 0.075, dur: 0.26, lp: 1500 });
      this._tone({ at: t + 0.26, f0: 150, f1: 46, fDur: 0.3, gain: 0.2, dur: 0.42 });
      this._noiseHit({ at: t + 0.26, f: 2400, q: 1, gain: 0.14, dur: 0.28 });
      this._tone({ at: t + 0.26, type: 'square', f0: 622.25, gain: 0.03, dur: 0.18, lp: 2400 });
    } else if (e.kind === 'lost') {
      this._tone({ at: t, f0: 98, gain: 0.05, dur: 1.6, lp: 480, attack: 0.35 });
      this._tone({ at: t + 0.05, f0: 146.83, gain: 0.032, dur: 1.4, lp: 520, attack: 0.4 });
    }
  }

  _onBreaker(e) {
    if (!this._ctx) return;
    const t = this._ctx.currentTime;
    if (e.on) {
      this._tone({ at: t, type: 'sawtooth', f0: 46, f1: 168, fDur: 0.68, gain: 0.07, dur: 0.72, lp: 1200 });
      this._tone({ at: t + 0.04, type: 'triangle', f0: 92, f1: 336, fDur: 0.64, gain: 0.028, dur: 0.68, lp: 1600 });
      this._noiseHit({ at: t + 0.66, f: 1400, q: 4, gain: 0.05, dur: 0.05 });
    } else {
      this._tone({ at: t, type: 'sawtooth', f0: 215, f1: 27, fDur: 0.85, gain: 0.09, dur: 0.9, lp: 850 });
      this._tone({ at: t + 0.82, f0: 128, f1: 41, fDur: 0.18, gain: 0.13, dur: 0.26 });
      this._noiseHit({ at: t + 0.02, f: 900, q: 3, gain: 0.05, dur: 0.06 });
    }
  }

  _onSteam(e) {
    const ctx = this._ctx;
    if (!ctx) return;
    const id = e.id != null ? e.id : 0;
    const cur = this._steams.get(id);
    if (e.on && !cur) {
      const s = ctx.createBufferSource();
      s.buffer = this._white;
      s.loop = true;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 2950;
      bp.Q.value = 0.65;
      const g = ctx.createGain();
      g.gain.value = 0.0001;
      const { pan, att } = this._spatial(e.x, e.z);
      g.gain.setTargetAtTime(0.05 * att, ctx.currentTime, 0.25);
      const pn = ctx.createStereoPanner();
      pn.pan.value = pan;
      s.connect(bp);
      bp.connect(g);
      g.connect(pn);
      pn.connect(this._master);
      s.start();
      this._steams.set(id, { s, g });
    } else if (!e.on && cur) {
      cur.g.gain.cancelScheduledValues(ctx.currentTime);
      cur.g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.15);
      try {
        cur.s.stop(ctx.currentTime + 0.6);
      } catch {}
      this._steams.delete(id);
    }
  }

  _pickup(kind) {
    const t = this._ctx.currentTime;
    const base = kind === 'vessel' ? 392 : kind === 'seal' ? 440 : 523.25;
    this._tone({ at: t, f0: base, gain: 0.042, dur: 0.6, lp: 3000 });
    this._tone({ at: t + 0.015, f0: base * 1.1892, gain: 0.034, dur: 0.55, lp: 3200 });
    if (kind !== 'bottle') this._tone({ at: t + 0.02, f0: 98, gain: 0.03, dur: 0.7, lp: 400 });
  }

  _sealToll() {
    const t = this._ctx.currentTime;
    this._tone({ at: t, f0: 77.8, gain: 0.12, dur: 2.3, lp: 650 });
    this._tone({ at: t, f0: 156.1, gain: 0.05, dur: 1.7, lp: 800 });
    this._tone({ at: t + 0.01, f0: 234.2, gain: 0.026, dur: 1.2, lp: 900 });
    this._noiseHit({ at: t, f: 300, q: 0.8, type: 'lowpass', gain: 0.07, dur: 0.08 });
  }

  _caughtSting() {
    const ctx = this._ctx;
    if (!ctx || this._caught) return;
    this._caught = true;
    const t = ctx.currentTime;
    const fs = [106, 112.6, 159.4];
    for (let i = 0; i < fs.length; i++) {
      this._tone({
        at: t,
        type: 'sawtooth',
        f0: fs[i],
        f1: fs[i] * 0.94,
        fDur: 1.1,
        gain: 0.105,
        dur: 1.25,
        lp: 1700,
      });
    }
    this._noiseHit({ at: t, f: 750, q: 0.7, type: 'highpass', gain: 0.17, dur: 0.5 });
    this._tone({ at: t, f0: 62, f1: 29, fDur: 0.8, gain: 0.2, dur: 1 });
    for (const [, st] of this._steams) {
      try {
        st.s.stop(t + 0.4);
      } catch {}
    }
    this._steams.clear();
    const mg = this._master.gain;
    mg.cancelScheduledValues(t + 0.8);
    mg.setValueAtTime(mg.value, t + 0.8);
    mg.linearRampToValueAtTime(0.0001, t + 2.4);
  }

  _winChord() {
    const ctx = this._ctx;
    if (!ctx) return;
    const t = ctx.currentTime;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1400;
    const pn = ctx.createStereoPanner();
    lp.connect(pn);
    pn.connect(this._master);
    const notes = [110, 220, 277.18, 329.63, 440];
    for (let i = 0; i < notes.length; i++) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = notes[i];
      const g = ctx.createGain();
      const peak = i === 0 ? 0.05 : 0.042;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(peak, t + 0.5);
      g.gain.setValueAtTime(peak, t + 1.8);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 4.2);
      o.connect(g);
      g.connect(lp);
      o.start(t);
      o.stop(t + 4.4);
    }
  }

  _loseFall() {
    const t = this._ctx.currentTime;
    this._tone({ at: t, type: 'triangle', f0: 196, f1: 49, fDur: 1.5, gain: 0.075, dur: 1.7, lp: 700 });
    this._tone({ at: t + 0.1, f0: 65.4, gain: 0.05, dur: 2.2, lp: 300, attack: 0.3 });
    this._noiseHit({ at: t, f: 220, q: 0.8, type: 'lowpass', gain: 0.06, dur: 0.5 });
  }

  _blip() {
    this._tone({
      at: this._ctx.currentTime,
      f0: 587.33,
      f1: 880,
      fDur: 0.07,
      gain: 0.024,
      dur: 0.12,
      lp: 4000,
    });
  }

  _logTick(e) {
    const ctx = this._ctx;
    if (!ctx || ctx.state !== 'running') return;
    const t = ctx.currentTime;
    if (t - this._lastLog < 0.18) return;
    this._lastLog = t;
    const { pan, att } = this._spatial(e.x, e.z);
    this._noiseHit({ at: t, f: 3300, q: 7, gain: 0.014 * att, dur: 0.024, pan });
  }
}

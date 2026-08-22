import { bus } from '../core/events.js';

export class InputSource {
  constructor({ canvasToWorld } = {}) {
    this.canvasToWorld = canvasToWorld || null;
    this.target = null;
    this.keys = new Set();
    this.mouse = null;
    this.aimWorld = null;
    this.armed = false;
    this.pending = { interact: false, throw: false, flash: false };
    this._onKeyDown = (e) => this.handleKeyDown(e);
    this._onKeyUp = (e) => this.handleKeyUp(e);
    this._onMouseMove = (e) => this.handleMouseMove(e);
    this._onMouseDown = (e) => this.handleMouseDown(e);
    this._onBlur = () => this.releaseAll();
    this._onVisibility = () => {
      if (document.hidden) this.releaseAll();
    };
  }

  attach(targetEl) {
    this.detach();
    this.target = targetEl || document.body;
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('blur', this._onBlur);
    document.addEventListener('visibilitychange', this._onVisibility);
    this.target.addEventListener('mousemove', this._onMouseMove);
    this.target.addEventListener('mousedown', this._onMouseDown);
  }

  detach() {
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('blur', this._onBlur);
    document.removeEventListener('visibilitychange', this._onVisibility);
    if (this.target) {
      this.target.removeEventListener('mousemove', this._onMouseMove);
      this.target.removeEventListener('mousedown', this._onMouseDown);
    }
    this.target = null;
    this.mouse = null;
    this.releaseAll();
  }

  handleKeyDown(e) {
    if (document.hidden) return;
    if (e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault();
    this.keys.add(e.code);
    if (!e.repeat) {
      if (e.code === 'KeyE') this.pending.interact = true;
      if (e.code === 'KeyQ') this.pending.throw = true;
      if (e.code === 'KeyF') this.pending.flash = true;
    }
    this.arm();
  }

  handleKeyUp(e) {
    this.keys.delete(e.code);
  }

  handleMouseMove(e) {
    const r = this.target && this.target.getBoundingClientRect ? this.target.getBoundingClientRect() : null;
    if (r) this.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  handleMouseDown(e) {
    if (document.hidden) return;
    if (e.button === 0) this.pending.throw = true;
    this.arm();
  }

  releaseAll() {
    this.keys.clear();
    this.pending.interact = false;
    this.pending.throw = false;
    this.pending.flash = false;
  }

  arm() {
    if (this.armed) return;
    this.armed = true;
    bus.emit('ui:firstInput');
  }

  getAim() {
    return this.aimWorld;
  }

  computeAim() {
    if (this.mouse && typeof this.canvasToWorld === 'function') {
      const w = this.canvasToWorld(this.mouse.x, this.mouse.y);
      if (w) this.aimWorld = { x: w.x, z: w.z };
    }
    return this.aimWorld;
  }

  poll() {
    if (document.hidden) {
      this.releaseAll();
      return {
        mx: 0,
        mz: 0,
        crouch: false,
        sprint: false,
        interact: false,
        throwPressed: false,
        flashToggled: false,
        aimX: this.aimWorld ? this.aimWorld.x : 0,
        aimZ: this.aimWorld ? this.aimWorld.z : 0,
        aimWorld: this.aimWorld,
      };
    }
    const k = this.keys;
    const mx = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
    const mz = (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0) - (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0);
    const aim = this.computeAim();
    const out = {
      mx,
      mz,
      crouch: k.has('KeyC') || k.has('ControlLeft') || k.has('ControlRight'),
      sprint: k.has('ShiftLeft') || k.has('ShiftRight'),
      interact: false,
      throwPressed: false,
      flashToggled: false,
      aimX: aim ? aim.x : 0,
      aimZ: aim ? aim.z : 0,
      aimWorld: aim,
    };
    if (this.pending.interact) {
      out.interact = true;
      this.pending.interact = false;
    }
    if (this.pending.throw) {
      out.throwPressed = true;
      this.pending.throw = false;
    }
    if (this.pending.flash) {
      out.flashToggled = true;
      this.pending.flash = false;
    }
    return out;
  }
}

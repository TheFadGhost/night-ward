import { CELL, TILE, SURFACE, SPEED, NOISE } from '../core/constants.js';
import { bus } from '../core/events.js';

const RADIUS = 0.38;

export class Player {
  constructor(x, z) {
    this.x = x;
    this.z = z;
    this.facing = -Math.PI / 2;
    this.crouched = false;
    this.sprinting = false;
    this.moving = false;
    this.flashlight = false;
    this.hiddenIn = null;
    this.bottles = 2;
    this.alive = true;
    this.strideAcc = 0;
  }

  get speed() {
    if (this.crouched) return SPEED.crouch;
    if (this.sprinting) return SPEED.sprint;
    return SPEED.walk;
  }

  update(dt, input, world) {
    if (!this.alive || this.hiddenIn) {
      this.moving = false;
      return;
    }
    let mx = input.mx || 0;
    let mz = input.mz || 0;
    const len = Math.hypot(mx, mz);
    this.moving = len > 0.01;
    this.crouched = !!input.crouch;
    this.sprinting = !!input.sprint && !this.crouched && this.moving;
    if (input.flashToggled) this.flashlight = !this.flashlight;

    if (input.aimX !== undefined && input.aimZ !== undefined) {
      const alen = Math.hypot(input.aimX, input.aimZ);
      if (alen > 0.001) this.facing = Math.atan2(input.aimZ, input.aimX);
    } else if (this.moving) {
      this.facing = Math.atan2(mz, mx);
    }

    if (this.moving) {
      mx /= len;
      mz /= len;
      const sp = this.speed * Math.min(1, len);
      this.tryMove(mx * sp * dt, 0, world);
      this.tryMove(0, mz * sp * dt, world);

      this.strideAcc += sp * dt;
      const stride = this.crouched ? 1.9 : this.sprinting ? 2.15 : 1.7;
      if (this.strideAcc >= stride) {
        this.strideAcc -= stride;
        const tile = world.tileAt(this.x, this.z);
        const surf = SURFACE[tile] || SURFACE[TILE.FLOOR];
        const mod = this.crouched ? 0.35 : this.sprinting ? 1.8 : 1;
        bus.emit('noise', {
          x: this.x,
          z: this.z,
          loud: NOISE.step * surf.mult * mod,
          type: 'footstep',
        });
      }
    }
  }

  tryMove(dx, dz, world) {
    const nx = this.x + dx;
    const nz = this.z + dz;
    if (!this.circleBlocked(nx, nz, world)) {
      this.x = nx;
      this.z = nz;
      return;
    }
    if (dx !== 0 && !this.circleBlocked(nx, this.z, world)) {
      this.x = nx;
    } else if (dz !== 0 && !this.circleBlocked(this.x, nz, world)) {
      this.z = nz;
    }
  }

  circleBlocked(wx, wz, world) {
    for (const [ox, oz] of [
      [-RADIUS, -RADIUS],
      [RADIUS, -RADIUS],
      [-RADIUS, RADIUS],
      [RADIUS, RADIUS],
      [0, 0],
    ]) {
      const { cx, cz } = world.cellAt(wx + ox, wz + oz);
      if (world.blockedCell(cx, cz)) return true;
    }
    return false;
  }

  serialize() {
    return {
      x: this.x,
      z: this.z,
      facing: this.facing,
      crouched: this.crouched,
      flashlight: this.flashlight,
      hiddenIn: this.hiddenIn,
      bottles: this.bottles,
      alive: this.alive,
    };
  }

  load(json) {
    if (!json) return;
    Object.assign(this, {
      x: Number(json.x) || this.x,
      z: Number(json.z) || this.z,
      facing: Number(json.facing) || this.facing,
      crouched: !!json.crouched,
      flashlight: !!json.flashlight,
      hiddenIn: json.hiddenIn ?? null,
      bottles: Number.isFinite(json.bottles) ? json.bottles : this.bottles,
      alive: json.alive !== false,
    });
  }
}

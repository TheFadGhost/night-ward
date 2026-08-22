export class Rng {
  constructor(seed = 1337) {
    this.s = seed >>> 0 || 1337;
  }
  next() {
    let t = (this.s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  range(a, b) {
    return a + this.next() * (b - a);
  }
  pick(arr) {
    return arr[Math.floor(this.next() * arr.length) % arr.length];
  }
}

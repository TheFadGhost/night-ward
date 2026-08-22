import * as THREE from 'three';
import { CELL, TILE } from '../core/constants.js';
import { PostFX } from './effects.js';

const CAM_OFFSET = new THREE.Vector3(0, 26, 11);
const LOOKAHEAD = 1.15;
const FOLLOW_DAMP = 4.2;
const POOL_SIZE = 8;
const FIXTURE_INTENSITY = 0.95;
const PHYSICAL_LIGHT_GAIN = 34;
const FLASH_INTENSITY = 130;
const WARDEN_BEAM_INTENSITY = 80;
const BG = 0x04050a;
const CONE_Y = 0.055;
const CONE_SEG = 26;
const RIPPLE_LIFE = 0.6;

const WHITE = new THREE.Color(1, 1, 1);

const STYLES = {
  patrol: { c: 0x93a3b8, a: 0.10 },
  return: { c: 0x93a3b8, a: 0.08 },
  suspicious: { c: 0xffb454, a: 0.16 },
  investigate: { c: 0xffb454, a: 0.16 },
  listen: { c: 0xffc46a, a: 0.15 },
  search: { c: 0xff8a3c, a: 0.13 },
  chase: { c: 0xff4038, a: 0.16 }
};

const WING_LIGHT = {
  west: 0xc9d4ff,
  east: 0xffd9a3,
  maintenance: 0xcfeedd
};

const SUSP_VERT = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const SUSP_FRAG = `
varying vec2 vUv;
uniform float uFill;
uniform float uSusp;
void main(){
  vec2 p = vUv - 0.5;
  float ang = atan(p.y, p.x);
  float f = fract((ang + 1.5707963) * 0.15915494);
  float on = step(f, uFill);
  vec3 col = mix(vec3(1.0), vec3(1.0, 0.72, 0.22), smoothstep(0.08, 0.5, uSusp));
  col = mix(col, vec3(1.0, 0.18, 0.10), smoothstep(0.55, 1.0, uSusp));
  float a = max(on * 0.85, 0.12);
  gl_FragColor = vec4(col, a);
}
`;

function hash01(n) {
  n = Math.imul(n ^ 61, 0x27d4eb2d);
  n ^= n >>> 15;
  n = Math.imul(n, 0x2c1b3c6d);
  n ^= n >>> 12;
  return (n >>> 0) / 4294967296;
}

function strSeed(s) {
  let h = 2166136261;
  const t = String(s);
  for (let i = 0; i < t.length; i++) {
    h ^= t.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}

function clamp(v, a, b) {
  return v < a ? a : v > b ? b : v;
}

function smooth01(x) {
  const t = clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

function dampK(k, dt) {
  return 1 - Math.exp(-k * dt);
}

function easeIO(t) {
  return t * t * (3 - 2 * t);
}

function wingColor(wingId) {
  return WING_LIGHT[wingId] || 0xffe2b0;
}

function isArchiveTag(o) {
  return /archive/i.test(`${(o && o.id) || ''} ${(o && o.wing) || ''} ${(o && o.n) || ''}`);
}

function buildGrateTexture() {
  const cv = document.createElement('canvas');
  cv.width = 64;
  cv.height = 64;
  const g = cv.getContext('2d');
  g.fillStyle = '#0b0d11';
  g.fillRect(0, 0, 64, 64);
  g.strokeStyle = '#181d26';
  g.lineWidth = 2;
  for (let i = 0; i <= 64; i += 8) {
    g.beginPath();
    g.moveTo(i + 0.5, 0);
    g.lineTo(i + 0.5, 64);
    g.stroke();
    g.beginPath();
    g.moveTo(0, i + 0.5);
    g.lineTo(64, i + 0.5);
    g.stroke();
  }
  g.strokeStyle = '#232a38';
  g.lineWidth = 1;
  for (let i = 0; i <= 64; i += 16) {
    g.beginPath();
    g.moveTo(i + 0.5, 0);
    g.lineTo(i + 0.5, 64);
    g.stroke();
    g.beginPath();
    g.moveTo(0, i + 0.5);
    g.lineTo(64, i + 0.5);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class Renderer {
  constructor(canvas, staticDef) {
    if (!canvas) throw new Error('Renderer requires a canvas element');
    this.canvas = canvas;
    this.disposed = false;
    this.time = 0;
    this.dim = 0;
    this._firstCam = true;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setClearColor(BG, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 2.0;
    this.renderer.autoClear = false;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(BG, 0.022);
    this.camera = new THREE.PerspectiveCamera(48, 1, 0.1, 240);

    this.scene.add(new THREE.HemisphereLight(0x39465e, 0x05060a, 0.12));

    this.staticDef = staticDef || { w: 0, h: 0, tiles: new Uint8Array(0), fixtures: [], objects: [] };
    const sd = this.staticDef;
    this.originX = -(sd.w * CELL) / 2;
    this.originZ = -(sd.h * CELL) / 2;
    this._textures = [];
    this._lightMap = new Map();
    this._doorTargets = new Map();
    this._taken = new Set();
    this._noiseSeen = new Set();
    this._noiseQ = [];

    this._buildFloors();
    this._buildWalls();
    this._buildFixtures();
    this._buildProps();
    this._buildPlayer();
    this._buildRipples();

    this.aiRigs = new Map();

    this.fx = new PostFX();

    this.camPos = new THREE.Vector3();
    this.lookPos = new THREE.Vector3();
    this.player = null;
    this._ndc = new THREE.Vector2();
    this._ray = new THREE.Raycaster();
    this._plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this._hit = new THREE.Vector3();
    this._c1 = new THREE.Color();
    this._c2 = new THREE.Color();
    this._tint = new THREE.Color();
    this._m4 = new THREE.Matrix4();
    this._q = new THREE.Quaternion();
    this._v1 = new THREE.Vector3();
    this._s1 = new THREE.Vector3();
    this._obj = new THREE.Object3D();

    this._onResize = () => this.resize();
    if (typeof window !== 'undefined') window.addEventListener('resize', this._onResize);
    this.resize();
  }

  _cellCenter(ix, iz) {
    return [this.originX + (ix + 0.5) * CELL, this.originZ + (iz + 0.5) * CELL];
  }

  _buildFloors() {
    const sd = this.staticDef;
    const groups = new Map();
    for (let z = 0; z < sd.h; z++) {
      for (let x = 0; x < sd.w; x++) {
        const t = sd.tiles[z * sd.w + x];
        let key = null;
        if (t === TILE.GRATE) key = 'grate';
        else if (t === TILE.CARPET) key = 'carpet';
        else if (t === TILE.FLOOR || t === TILE.DOOR) key = 'concrete';
        if (!key) continue;
        let g = groups.get(key);
        if (!g) {
          g = { pos: [], nor: [], uv: [], idx: [] };
          groups.set(key, g);
        }
        const [cx, cz] = this._cellCenter(x, z);
        const x0 = cx - CELL / 2;
        const x1 = cx + CELL / 2;
        const z0 = cz - CELL / 2;
        const z1 = cz + CELL / 2;
        const b = g.pos.length / 3;
        g.pos.push(x0, 0, z0, x1, 0, z0, x1, 0, z1, x0, 0, z1);
        g.nor.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
        g.uv.push(0, 0, 1, 0, 1, 1, 0, 1);
        g.idx.push(b, b + 2, b + 1, b, b + 3, b + 2);
      }
    }
    const mats = {
      concrete: new THREE.MeshStandardMaterial({ color: 0x14161c, roughness: 0.95, metalness: 0 }),
      carpet: new THREE.MeshStandardMaterial({ color: 0x17151a, roughness: 1, metalness: 0 })
    };
    const grateTex = buildGrateTexture();
    this._textures.push(grateTex);
    mats.grate = new THREE.MeshStandardMaterial({ color: 0x0d0f14, map: grateTex, roughness: 0.9, metalness: 0.1 });
    for (const [key, g] of groups) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(g.pos, 3));
      geo.setAttribute('normal', new THREE.Float32BufferAttribute(g.nor, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(g.uv, 2));
      geo.setIndex(g.idx);
      geo.computeBoundingSphere();
      const mesh = new THREE.Mesh(geo, mats[key]);
      mesh.matrixAutoUpdate = false;
      this.scene.add(mesh);
    }
  }

  _buildWalls() {
    const sd = this.staticDef;
    const cells = [];
    for (let z = 0; z < sd.h; z++) {
      for (let x = 0; x < sd.w; x++) {
        if (sd.tiles[z * sd.w + x] === TILE.WALL) cells.push([x, z]);
      }
    }
    if (!cells.length) return;
    const geo = new THREE.BoxGeometry(CELL, 3, CELL);
    const mat = new THREE.MeshStandardMaterial({ color: 0x161922, roughness: 0.96, metalness: 0.04 });
    const im = new THREE.InstancedMesh(geo, mat, cells.length);
    for (let i = 0; i < cells.length; i++) {
      const [cx, cz] = this._cellCenter(cells[i][0], cells[i][1]);
      this._m4.makeTranslation(cx, 1.5, cz);
      im.setMatrixAt(i, this._m4);
    }
    im.instanceMatrix.needsUpdate = true;
    if (typeof im.computeBoundingSphere === 'function') im.computeBoundingSphere();
    else im.frustumCulled = false;
    im.matrixAutoUpdate = false;
    this.scene.add(im);
  }

  _buildFixtures() {
    const list = Array.isArray(this.staticDef.fixtures) ? this.staticDef.fixtures : [];
    this.fixtures = list.map((f) => ({
      id: f.id,
      x: f.x,
      z: f.z,
      r: f.r || 8,
      color: wingColor(f.wingId),
      seed: strSeed(f.id) * 100,
      flicker: hash01(Math.floor(strSeed(f.id) * 1e9)) < 0.35,
      on: true,
      prev: undefined,
      spark: -1
    }));
    this.lightPool = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const L = new THREE.PointLight(0xffe2b0, 0, 10, 2);
      this.scene.add(L);
      this.lightPool.push(L);
    }
    if (!this.fixtures.length) return;
    const geo = new THREE.CircleGeometry(0.5, 20);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.discMesh = new THREE.InstancedMesh(geo, mat, this.fixtures.length);
    this.discMesh.frustumCulled = false;
    const c = this._c1.set(0xffffff);
    for (let i = 0; i < this.fixtures.length; i++) {
      const f = this.fixtures[i];
      this._m4.makeTranslation(f.x, 2.45, f.z);
      this.discMesh.setMatrixAt(i, this._m4);
      this.discMesh.setColorAt(i, c);
    }
    this.scene.add(this.discMesh);
  }

  _buildProps() {
    const objs = Array.isArray(this.staticDef.objects) ? this.staticDef.objects : [];
    const P = { doors: [], lockers: [], bottles: [], seals: [], vessels: [], elevators: [], valves: [], archiveStrips: [], elevatorStrips: [] };
    this.props = P;
    const slabGeo = new THREE.BoxGeometry(CELL * 0.92, 2.6, 0.18);
    const slabMat = new THREE.MeshStandardMaterial({ color: 0x2b2f38, roughness: 0.6, metalness: 0.35 });
    const stripGeo = new THREE.BoxGeometry(CELL * 0.86, 0.07, 0.03);
    const lockerBodyGeo = new THREE.BoxGeometry(0.95, 2.2, 0.68);
    const lockerDoorGeo = new THREE.BoxGeometry(0.9, 2.05, 0.06);
    const shardGeo = new THREE.CylinderGeometry(0.045, 0.06, 0.22, 6);
    const sealGeo = new THREE.TorusGeometry(0.34, 0.08, 10, 28);
    sealGeo.rotateX(-Math.PI / 2);
    const vesselGeo = new THREE.CylinderGeometry(0.3, 0.36, 1.15, 14);
    const capGeo = new THREE.SphereGeometry(0.3, 12, 10);
    const pipeGeo = new THREE.CylinderGeometry(0.11, 0.11, 1.5, 10);
    pipeGeo.rotateZ(Math.PI / 2);
    const wheelGeo = new THREE.TorusGeometry(0.26, 0.045, 8, 20);

    for (const o of objs) {
      const kind = o.kind;
      const seed = strSeed(o.id);
      if (kind === 'door') {
        const grp = new THREE.Group();
        const slab = new THREE.Mesh(slabGeo, slabMat.clone());
        grp.add(slab);
        const strip = new THREE.Mesh(stripGeo, new THREE.MeshBasicMaterial({ color: 0xf5c542 }));
        strip.position.set(0, -1.18, 0.11);
        slab.add(strip);
        const ix = Math.round((o.x - this.originX) / CELL - 0.5);
        const iz = Math.round((o.z - this.originZ) / CELL - 0.5);
        const t = (arr) => arr.map(([dx, dz]) => {
          const nx = ix + dx;
          const nz = iz + dz;
          return nx >= 0 && nz >= 0 && nx < this.staticDef.w && nz < this.staticDef.h ? this.staticDef.tiles[nz * this.staticDef.w + nx] : TILE.VOID;
        });
        const nb = t([[0, -1], [0, 1], [-1, 0], [1, 0]]);
        let ax = 0;
        let az = 0;
        if (nb[0] === TILE.WALL && nb[1] === TILE.WALL) az = 1;
        else ax = 1;
        slab.rotation.y = ax === 1 ? 0 : Math.PI / 2;
        grp.position.set(o.x, 1.3, o.z);
        this.scene.add(grp);
        const rec = {
          id: o.id,
          slab,
          bx: o.x,
          by: 1.3,
          bz: o.z,
          ax,
          az,
          slide: CELL * 0.82,
          v: 0
        };
        P.doors.push(rec);
        if (isArchiveTag(o)) P.archiveStrips.push(strip);
      } else if (kind === 'locker') {
        const grp = new THREE.Group();
        const body = new THREE.Mesh(lockerBodyGeo, new THREE.MeshStandardMaterial({ color: 0x232833, roughness: 0.7, metalness: 0.3 }));
        body.position.y = 1.1;
        grp.add(body);
        const pivot = new THREE.Group();
        pivot.position.set(-0.475, 1.1, 0.36);
        const panel = new THREE.Mesh(lockerDoorGeo, new THREE.MeshStandardMaterial({ color: 0x2a3040, roughness: 0.55, metalness: 0.4 }));
        panel.position.set(0.45, 0, 0);
        pivot.add(panel);
        pivot.rotation.y = (seed < 0.5 ? 1 : -1) * (0.45 + seed * 0.3);
        grp.add(pivot);
        const ix = Math.round((o.x - this.originX) / CELL - 0.5);
        const iz = Math.round((o.z - this.originZ) / CELL - 0.5);
        const w = this.staticDef.w;
        const h = this.staticDef.h;
        let fx = 0;
        let fz = 1;
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        for (const [dx, dz] of dirs) {
          const nx = ix + dx;
          const nz = iz + dz;
          if (nx >= 0 && nz >= 0 && nx < w && nz < h && this.staticDef.tiles[nz * w + nx] === TILE.WALL) {
            fx = -dx;
            fz = -dz;
            break;
          }
        }
        if (fx === 0 && fz === 0) fz = 1;
        grp.rotation.y = Math.atan2(fx, fz);
        grp.position.set(o.x, 0, o.z);
        this.scene.add(grp);
        P.lockers.push({ id: o.id, grp });
      } else if (kind === 'bottle') {
        P.bottles.push({ id: o.id, x: o.x, z: o.z, seed });
      } else if (kind === 'seal') {
        const m = new THREE.Mesh(sealGeo, new THREE.MeshBasicMaterial({ color: 0xf0b93c }));
        m.position.set(o.x, 0.09, o.z);
        m.rotation.y = seed * 6.28;
        this.scene.add(m);
        P.seals.push({ m, phase: seed * 6.28 });
      } else if (kind === 'vessel') {
        const grp = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: 0x123a28, emissive: 0x2eff8d, emissiveIntensity: 0.6, roughness: 0.3, metalness: 0.1 });
        const body = new THREE.Mesh(vesselGeo, mat);
        body.position.y = 0.58;
        const cap = new THREE.Mesh(capGeo, mat);
        cap.position.y = 1.2;
        cap.scale.y = 0.55;
        grp.add(body, cap);
        grp.position.set(o.x, 0, o.z);
        this.scene.add(grp);
        P.vessels.push({ grp, mat, phase: seed * 6.28 });
      } else if (kind === 'elevator') {
        const grp = new THREE.Group();
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x1a1e26, roughness: 0.6, metalness: 0.5 });
        const slab = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 2.6), frameMat);
        slab.position.y = 0.06;
        const back = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.3, 0.12), frameMat);
        back.position.set(0, 1.15, -1.24);
        const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.3, 2.6), frameMat);
        sideL.position.set(-0.94, 1.15, 0);
        const sideR = sideL.clone();
        sideR.position.x = 0.94;
        const beam = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.14, 0.14), new THREE.MeshBasicMaterial({ color: 0x39d98a }));
        beam.position.set(0, 2.42, -1.24);
        grp.add(slab, back, sideL, sideR, beam);
        grp.position.set(o.x, 0, o.z);
        grp.rotation.y = seed < 0.5 ? 0 : Math.PI / 2;
        this.scene.add(grp);
        P.elevators.push({ grp });
        P.elevatorStrips.push(beam);
      } else if (kind === 'breaker') {
        const grp = new THREE.Group();
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.15, 0.34), new THREE.MeshStandardMaterial({ color: 0x1d222c, roughness: 0.7, metalness: 0.3 }));
        box.position.y = 0.58;
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.02), new THREE.MeshBasicMaterial({ color: 0x4d7dff }));
        stripe.position.set(0, 0.72, 0.18);
        grp.add(box, stripe);
        grp.position.set(o.x, 0, o.z);
        grp.rotation.y = seed * 6.28;
        this.scene.add(grp);
      } else if (kind === 'valve') {
        const grp = new THREE.Group();
        const pipe = new THREE.Mesh(pipeGeo, new THREE.MeshStandardMaterial({ color: 0x2a2f3a, roughness: 0.5, metalness: 0.6 }));
        pipe.position.y = 0.7;
        const wheel = new THREE.Mesh(wheelGeo, new THREE.MeshBasicMaterial({ color: 0x35e0e0 }));
        wheel.position.set(0.8, 0.7, 0);
        grp.add(pipe, wheel);
        grp.position.set(o.x, 0, o.z);
        grp.rotation.y = seed * 6.28;
        this.scene.add(grp);
        P.valves.push({ wheel });
      }
    }
    if (P.bottles.length) {
      const shardMat = new THREE.MeshStandardMaterial({ color: 0x3f7a5f, roughness: 0.25, metalness: 0.1, emissive: 0x0d241b, emissiveIntensity: 0.4 });
      this.bottleMesh = new THREE.InstancedMesh(shardGeo, shardMat, P.bottles.length * 3);
      this.bottleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.bottleMesh.frustumCulled = false;
      this.scene.add(this.bottleMesh);
      this._syncBottles(true);
    }
  }

  _buildPlayer() {
    const grp = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0x9aa4b5, roughness: 0.6, metalness: 0.12, transparent: true, opacity: 1 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.62, 6, 14), mat);
    body.position.y = 0.63;
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.2), new THREE.MeshBasicMaterial({ color: 0x5c6577 }));
    nose.position.set(0, 0.75, 0.36);
    const haloGeo = new THREE.RingGeometry(2.2, 2.62, 40);
    haloGeo.rotateX(-Math.PI / 2);
    const halo = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({ color: 0xbfd4ff, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    halo.position.y = 0.06;
    halo.visible = false;
    const spot = new THREE.SpotLight(0xfff1cc, 0, 16, 0.42, 0.5, 1.6);
    spot.position.set(0, 1.5, 0);
    grp.add(body, nose, halo, spot);
    this.scene.add(grp, spot.target);
    this.playerRig = { grp, body, mat, halo, spot, squashY: 1, deathT: 0 };
  }

  _buildRipples() {
    const geo = new THREE.RingGeometry(0.9, 1, 48);
    geo.rotateX(-Math.PI / 2);
    this.ripples = [];
    for (let i = 0; i < 14; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = 0.07;
      mesh.visible = false;
      mesh.frustumCulled = false;
      this.scene.add(mesh);
      this.ripples.push({ mesh, mat, active: false, t0: 0, loud: 1 });
    }
    this._rippleCursor = 0;
  }

  _makeAIRig(kind) {
    const group = new THREE.Group();
    const mats = [];
    const reg = (m) => {
      mats.push({ m, base: m.color.clone() });
      return m;
    };
    const rig = { kind, group, mats, phase: Math.random() * 6.28, droop: 0 };

    if (kind === 'warden') {
      const bm = reg(new THREE.MeshStandardMaterial({ color: 0x3d4656, roughness: 0.7, metalness: 0.25 }));
      const hm = reg(new THREE.MeshStandardMaterial({ color: 0x2a3140, roughness: 0.6, metalness: 0.3 }));
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.7, 0.42), bm);
      body.position.y = 0.85;
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.28, 0.3), hm);
      head.position.y = 1.86;
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.02), new THREE.MeshBasicMaterial({ color: 0xffd27a }));
      visor.position.set(0, 1.88, 0.16);
      const coneGeo = new THREE.ConeGeometry(1, 1, 20, 1, true);
      coneGeo.translate(0, -0.5, 0);
      coneGeo.rotateX(-Math.PI / 2);
      const beam = new THREE.Mesh(coneGeo, new THREE.MeshBasicMaterial({ color: 0xffe9b0, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
      beam.scale.set(2.6, 7, 2.6);
      beam.position.set(0, 1.55, 0.2);
      const spot = new THREE.SpotLight(0xffedc2, WARDEN_BEAM_INTENSITY, 13, 0.38, 0.55, 1.7);
      spot.position.set(0, 1.55, 0.1);
      group.add(body, head, visor, beam, spot, spot.target);
      spot.target.position.set(0, 0, 9);
      rig.body = body;
      rig.beam = beam;
      rig.ringY = 2.3;
    } else if (kind === 'listener') {
      const bm = reg(new THREE.MeshStandardMaterial({ color: 0xcdd3c8, roughness: 0.92, metalness: 0 }));
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 1.15, 6, 12), bm);
      body.position.y = 0.92;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), bm);
      head.position.y = 1.78;
      const ringGeo = new THREE.RingGeometry(0.5, 0.62, 40);
      ringGeo.rotateX(-Math.PI / 2);
      const listenRing = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xdfe6da, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
      listenRing.position.y = 0.08;
      listenRing.visible = false;
      group.add(body, head, listenRing);
      rig.listenRing = listenRing;
      rig.ringY = 1.95;
    } else {
      const hm = reg(new THREE.MeshStandardMaterial({ color: 0x33383f, roughness: 0.5, metalness: 0.6 }));
      const hull = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.72, 0.22, 18), hm);
      hull.position.y = 1.05;
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff3020 });
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), eyeMat);
      eye.position.set(0, 1.05, 0.5);
      eye.scale.set(1, 0.7, 0.6);
      const eyeLight = new THREE.PointLight(0xff2818, 20, 7, 2);
      eyeLight.position.set(0, 1.05, 0.6);
      const skirtGeo = new THREE.RingGeometry(0.5, 0.78, 32);
      skirtGeo.rotateX(-Math.PI / 2);
      const skirt = new THREE.Mesh(skirtGeo, new THREE.MeshBasicMaterial({ color: 0x5a2723, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
      skirt.position.y = 0.06;
      group.add(hull, eye, eyeLight, skirt);
      rig.hull = hull;
      rig.eyeMat = eyeMat;
      rig.eyeLight = eyeLight;
      rig.eyeBase = new THREE.Color(0xff3020);
      rig.ringY = 1.75;
    }

    const coneGeo = new THREE.BufferGeometry();
    const posArr = new Float32Array((CONE_SEG + 2) * 3);
    const posAttr = new THREE.BufferAttribute(posArr, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    coneGeo.setAttribute('position', posAttr);
    const idx = [];
    for (let i = 0; i < CONE_SEG; i++) idx.push(0, i + 1, i + 2);
    coneGeo.setIndex(idx);
    const coneMat = new THREE.MeshBasicMaterial({ color: 0x93a3b8, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.frustumCulled = false;
    cone.renderOrder = 2;
    group.add(cone);

    const suspGeo = new THREE.RingGeometry(0.36, 0.5, 36);
    const suspU = { uFill: { value: 0 }, uSusp: { value: 0 } };
    const suspMat = new THREE.ShaderMaterial({
      uniforms: suspU,
      vertexShader: SUSP_VERT,
      fragmentShader: SUSP_FRAG,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(suspGeo, suspMat);
    ring.rotation.x = -Math.PI / 2;
    ring.frustumCulled = false;
    ring.renderOrder = 3;
    ring.visible = false;
    group.add(ring);

    rig.cone = cone;
    rig.conePos = posAttr;
    rig.coneMat = coneMat;
    rig.ring = ring;
    rig.suspU = suspU;
    rig.seen = true;
    return rig;
  }

  resize() {
    if (this.disposed) return;
    const w = this.canvas.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1280) || 1280;
    const h = this.canvas.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 720) || 720;
    this.renderer.setPixelRatio(Math.min((typeof window !== 'undefined' && window.devicePixelRatio) || 1, 2));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / Math.max(h, 1);
    this.camera.updateProjectionMatrix();
    this.fx.setSize(w, h);
  }

  canvasToWorld(px, py) {
    if (this.disposed) return null;
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return null;
    this._ndc.set(((px - rect.left) / rect.width) * 2 - 1, -(((py - rect.top) / rect.height) * 2 - 1));
    this._ray.setFromCamera(this._ndc, this.camera);
    const hit = this._ray.ray.intersectPlane(this._plane, this._hit);
    return hit ? { x: hit.x, z: hit.z } : null;
  }

  update(snapshot, dt) {
    if (this.disposed) return;
    const snap = snapshot || {};
    const step = Number.isFinite(dt) ? Math.max(dt, 0) : 0.016;
    this.time = Number.isFinite(snap.time) ? snap.time : this.time + step;
    this._updatePlayer(snap, step);
    this._updateAIs(snap, step);
    this._updateProps(snap, step);
    this._updateFixtures(snap);
    this._updateNoises(snap);
    this._updateCamera(step);
    this._updateFX(snap, step);
  }

  render() {
    if (this.disposed) return;
    const r = this.renderer;
    r.clear();
    r.render(this.scene, this.camera);
    r.clearDepth();
    this.fx.render(r);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    if (typeof window !== 'undefined') window.removeEventListener('resize', this._onResize);
    this._disposeTree(this.scene);
    this.fx.dispose();
    for (const t of this._textures) t.dispose();
    this._textures.length = 0;
    this.renderer.dispose();
  }

  _disposeTree(root) {
    root.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const arr = Array.isArray(o.material) ? o.material : [o.material];
        for (const m of arr) m.dispose();
      }
    });
    root.clear();
  }

  _flickerValue(f) {
    if (!f.flicker) return 1;
    const t = this.time;
    let v = 0.78 + 0.14 * Math.sin(t * 7.3 + f.seed * 17) + 0.1 * Math.sin(t * 13.7 + f.seed * 31) + 0.06 * Math.sin(t * 29.3 + f.seed * 53);
    const dp = Math.sin(t * 1.9 + f.seed * 97) + Math.sin(t * 0.83 + f.seed * 41);
    if (dp > 1.82) v *= 0.1;
    return clamp(v, 0, 1.3);
  }

  _updateFixtures(snap) {
    const lm = this._lightMap;
    lm.clear();
    if (Array.isArray(snap.lights)) {
      for (const L of snap.lights) lm.set(L.id, L.on !== false);
    }
    const px = this.player ? this.player.x : 0;
    const pz = this.player ? this.player.z : 0;
    const act = [];
    for (const f of this.fixtures) {
      const on = lm.has(f.id) ? lm.get(f.id) : true;
      if (f.prev === undefined) f.prev = on;
      if (f.prev && !on) f.spark = this.time + 0.22;
      f.prev = on;
      f.on = on;
      if (on) {
        const dx = f.x - px;
        const dz = f.z - pz;
        act.push({ f, d: dx * dx + dz * dz });
      }
    }
    act.sort((a, b) => a.d - b.d);
    for (let i = 0; i < this.lightPool.length; i++) {
      const L = this.lightPool[i];
      if (i < act.length) {
        const f = act[i].f;
        L.position.set(f.x, 2.35, f.z);
        L.color.setHex(f.color);
        L.distance = f.r;
        L.intensity = FIXTURE_INTENSITY * PHYSICAL_LIGHT_GAIN * this._flickerValue(f);
      } else {
        L.intensity = 0;
      }
    }
    if (this.discMesh) {
      const col = this._c1;
      for (let i = 0; i < this.fixtures.length; i++) {
        const f = this.fixtures[i];
        if (f.on) col.setHex(f.color).multiplyScalar(0.55 + 0.85 * this._flickerValue(f));
        else col.setHex(0x23262e);
        if (this.time < f.spark) col.lerp(WHITE, 0.85);
        this.discMesh.setColorAt(i, col);
      }
      this.discMesh.instanceColor.needsUpdate = true;
    }
  }

  _updatePlayer(snap, step) {
    const p = snap.player || this.player;
    if (!p) return;
    this.player = p;
    const R = this.playerRig;
    let x = p.x;
    let z = p.z;
    const hidden = !!p.hiddenIn;
    if (hidden) {
      const lk = this.props.lockers.find((l) => l.id === p.hiddenIn);
      if (lk) {
        x = lk.grp.position.x;
        z = lk.grp.position.z;
      }
    }
    R.grp.position.set(x, 0, z);
    const targetSquash = p.crouched ? 0.58 : 1;
    R.squashY += (targetSquash - R.squashY) * dampK(10, step);
    const wide = 1 + (1 - R.squashY) * 0.28;
    let ghost = hidden ? 0.25 : 1;
    if (p.alive === false) ghost *= 0.7;
    R.mat.opacity += (ghost - R.mat.opacity) * dampK(8, step);
    const bob = p.moving && !hidden ? 0.03 * Math.sin(this.time * 10) : hidden ? 0.04 * Math.sin(this.time * 2) : 0;
    R.body.scale.set(wide, R.squashY, wide);
    R.body.position.y = 0.63 * R.squashY + 0.02 + (hidden ? 0.25 + bob : bob);
    const deathTarget = p.alive === false ? 1 : 0;
    R.deathT += (deathTarget - R.deathT) * dampK(5, step);
    R.body.rotation.z = 1.45 * easeIO(R.deathT);
    if (p.alive === false) R.mat.color.lerp(this._c2.setHex(0x6a3a40), dampK(3, step));
    else R.mat.color.lerp(this._c2.setHex(0x9aa4b5), dampK(3, step));
    const fx = Math.cos(p.facing || 0);
    const fz = Math.sin(p.facing || 0);
    R.grp.rotation.y = Math.atan2(fx, fz);
    const flOn = !!p.flashlight && !hidden && p.alive !== false;
    R.spot.intensity += ((flOn ? FLASH_INTENSITY : 0) - R.spot.intensity) * dampK(14, step);
    R.spot.position.set(x, p.crouched ? 1.1 : 1.5, z);
    R.spot.target.position.set(x + fx * 7, 0, z + fz * 7);
    R.halo.visible = flOn;
    if (flOn) {
      R.halo.position.set(x, 0.06, z);
      R.halo.material.opacity = 0.05 + 0.03 * Math.sin(this.time * 3);
    }
  }

  _updateAIs(snap, step) {
    const ais = Array.isArray(snap.ais) ? snap.ais : [];
    for (const rig of this.aiRigs.values()) rig.seen = false;
    for (const ai of ais) {
      const kind = String(ai.kind || 'warden').toLowerCase();
      let rig = this.aiRigs.get(ai.id);
      if (!rig || rig.kind !== kind) {
        if (rig) {
          this._disposeTree(rig.group);
          this.scene.remove(rig.group);
        }
        rig = this._makeAIRig(kind);
        this.aiRigs.set(ai.id, rig);
        this.scene.add(rig.group);
      }
      rig.seen = true;
      const st = String(ai.state || 'patrol').toLowerCase();
      const disabled = st === 'disabled' || !!ai.disabled;
      const facing = ai.facing || 0;
      const fx = Math.cos(facing);
      const fz = Math.sin(facing);
      rig.group.position.set(ai.x, 0, ai.z);
      rig.group.rotation.y = Math.atan2(fx, fz);
      const t = this.time;

      if (rig.kind === 'warden') {
        rig.body.position.y = 0.85 + 0.03 * Math.sin(t * 6 + rig.phase);
        rig.beam.material.opacity = disabled ? 0 : 0.06 + 0.02 * Math.sin(t * 13 + rig.phase);
      } else if (rig.kind === 'sentinel') {
        const droopT = disabled ? 1 : 0;
        rig.droop += (droopT - rig.droop) * dampK(6, step);
        const hoverY = 1.05 + 0.08 * Math.sin(t * 2.2 + rig.phase);
        rig.hull.position.y = hoverY + (0.5 - hoverY) * rig.droop;
        rig.hull.rotation.x = 0.5 * rig.droop;
        rig.eyeMat.color.copy(rig.eyeBase).multiplyScalar(1 - rig.droop * 0.92);
        rig.eyeLight.intensity = 22 * (1 - rig.droop);
      }

      for (const rec of rig.mats) rec.m.color.copy(rec.base).multiplyScalar(disabled ? 0.45 : 1);

      const style = STYLES[st] || STYLES.patrol;
      const range = Number(ai.coneRange) || 0;
      if (!style || disabled || range <= 0) {
        rig.cone.visible = false;
      } else {
        rig.cone.visible = true;
        const half = ((Number(ai.coneHalfDeg) || 0) * Math.PI) / 180;
        const arr = rig.conePos.array;
        arr[0] = ai.x;
        arr[1] = CONE_Y;
        arr[2] = ai.z;
        const a0 = facing - half;
        for (let i = 0; i <= CONE_SEG; i++) {
          const a = a0 + (i / CONE_SEG) * 2 * half;
          const k = (i + 1) * 3;
          arr[k] = ai.x + Math.cos(a) * range;
          arr[k + 1] = CONE_Y;
          arr[k + 2] = ai.z + Math.sin(a) * range;
        }
        rig.conePos.needsUpdate = true;
        rig.coneMat.color.setHex(style.c);
        let a = style.a;
        const ph = 0.5 + 0.5 * Math.sin(t * (st === 'chase' ? 9 : 5) + rig.phase);
        if (st === 'search') a += 0.09 * ph;
        else if (st === 'chase') a += 0.12 * ph;
        rig.coneMat.opacity = a;
      }

      const susp = clamp(Number(ai.suspicion) || 0, 0, 1);
      rig.ring.visible = !disabled && susp > 0.02;
      if (rig.ring.visible) {
        rig.suspU.uFill.value = susp;
        rig.suspU.uSusp.value = susp;
        rig.ring.position.y = rig.ringY;
        const s = 1 + 0.05 * Math.sin(t * 4 + rig.phase);
        rig.ring.scale.set(s, 1, s);
      }

      if (rig.listenRing) {
        const listening = st === 'listen' && !disabled;
        rig.listenRing.visible = listening;
        if (listening) {
          const phz = (t * 1.4 + rig.phase) % 1;
          const s = 0.8 + phz * 1.4;
          rig.listenRing.scale.set(s, 1, s);
          rig.listenRing.material.opacity = (1 - phz) * 0.5;
        }
      }
    }
    for (const [id, rig] of this.aiRigs) {
      if (!rig.seen) {
        this._disposeTree(rig.group);
        this.scene.remove(rig.group);
        this.aiRigs.delete(id);
      }
    }
  }

  _updateProps(snap, step) {
    const P = this.props;
    if (Array.isArray(snap.doors)) {
      this._doorTargets.clear();
      for (const d of snap.doors) this._doorTargets.set(d.id, !!d.open);
    }
    for (const rec of P.doors) {
      const tgt = this._doorTargets.has(rec.id) ? (this._doorTargets.get(rec.id) ? 1 : 0) : 0;
      rec.v += (tgt - rec.v) * Math.min(1, step * 5.5);
      const off = easeIO(clamp(rec.v, 0, 1)) * rec.slide;
      rec.slab.position.set(rec.bx + rec.ax * off, rec.by, rec.bz + rec.az * off);
    }
    const archLocked = snap.unlockedArchive !== true;
    for (const s of P.archiveStrips) s.visible = archLocked;
    const elevLocked = snap.unlockedElevator !== true;
    for (const s of P.elevatorStrips) s.visible = elevLocked;

    if (this.bottleMesh) this._syncBottles(false, snap);

    for (const s of P.seals) {
      const k = 0.8 + 0.35 * Math.sin(this.time * 3.1 + s.phase);
      s.m.material.color.setHex(0xf0b93c).multiplyScalar(k);
      const sc = 1 + 0.07 * Math.sin(this.time * 3.1 + s.phase);
      s.m.scale.set(sc, 1, sc);
    }
    for (const v of P.vessels) {
      v.mat.emissiveIntensity = 0.45 + 0.35 * Math.sin(this.time * 2.2 + v.phase);
    }
    for (const v of P.valves) {
      v.wheel.rotation.x += step * 0.8;
    }
  }

  _syncBottles(force, snap) {
    if (snap && Array.isArray(snap.takenIds)) {
      this._taken.clear();
      for (const id of snap.takenIds) this._taken.add(String(id));
    } else if (force) {
      this._taken.clear();
    }
    const B = this.props.bottles;
    const o = this._obj;
    for (let i = 0; i < B.length; i++) {
      const b = B[i];
      const gone = this._taken.has(String(b.id));
      for (let s = 0; s < 3; s++) {
        const idx = i * 3 + s;
        if (gone) {
          o.position.set(0, -10, 0);
          o.scale.setScalar(0.0001);
        } else {
          const a = b.seed * 6.28 + s * 2.1;
          o.position.set(b.x + Math.cos(a) * 0.1, 0.11, b.z + Math.sin(a) * 0.1);
          o.rotation.set(b.seed * 3 + s, a, s * 0.7);
          o.scale.setScalar(1);
        }
        o.updateMatrix();
        this.bottleMesh.setMatrixAt(idx, o.matrix);
      }
    }
    this.bottleMesh.instanceMatrix.needsUpdate = true;
  }

  _updateNoises(snap) {
    const ns = Array.isArray(snap.noises) ? snap.noises : [];
    for (const n of ns) {
      if (n == null || !Number.isFinite(n.x) || !Number.isFinite(n.z)) continue;
      if (this._noiseSeen.has(n.id)) continue;
      this._noiseSeen.add(n.id);
      this._noiseQ.push(n.id);
      while (this._noiseQ.length > 64) {
        const old = this._noiseQ.shift();
        this._noiseSeen.delete(old);
      }
      const it = this.ripples[this._rippleCursor];
      this._rippleCursor = (this._rippleCursor + 1) % this.ripples.length;
      it.active = true;
      it.id = n.id;
      it.t0 = Number.isFinite(n.t0) ? n.t0 : this.time;
      it.loud = Math.max(Number(n.loud) || 0.2, 0.05);
      const type = String(n.type || '');
      it.mat.color.setHex(type === 'glass' || type === 'bottle' ? 0xcfe6ff : type === 'throwWhistle' ? 0xaebcff : 0xffd27a);
      it.mesh.position.set(n.x, 0.07, n.z);
    }
    for (const it of this.ripples) {
      if (!it.active) continue;
      const age = (this.time - it.t0) / RIPPLE_LIFE;
      if (age < 0 || age > 1) {
        if (age > 1) {
          it.active = false;
          it.mesh.visible = false;
        }
        continue;
      }
      it.mesh.visible = true;
      const s = 0.4 + it.loud * 10 * age;
      it.mesh.scale.set(s, 1, s);
      it.mat.opacity = (1 - age) * clamp(0.22 + 0.3 * it.loud, 0.2, 0.55);
    }
  }

  _updateCamera(step) {
    const p = this.player;
    if (!p) return;
    const fx = Math.cos(p.facing || 0);
    const fz = Math.sin(p.facing || 0);
    const lookX = p.x + fx * LOOKAHEAD;
    const lookZ = p.z + fz * LOOKAHEAD;
    const desX = lookX + CAM_OFFSET.x;
    const desY = CAM_OFFSET.y;
    const desZ = lookZ + CAM_OFFSET.z;
    if (this._firstCam) {
      this.camPos.set(desX, desY, desZ);
      this.lookPos.set(lookX, 0, lookZ);
      this._firstCam = false;
    } else {
      const k = dampK(FOLLOW_DAMP, step);
      this.camPos.x += (desX - this.camPos.x) * k;
      this.camPos.y += (desY - this.camPos.y) * k;
      this.camPos.z += (desZ - this.camPos.z) * k;
      this.lookPos.x += (lookX - this.lookPos.x) * k;
      this.lookPos.z += (lookZ - this.lookPos.z) * k;
    }
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.lookPos.x, 0, this.lookPos.z);
  }

  _updateFX(snap, step) {
    const threat = clamp(Number(snap.threatLevel) || 0, 0, 1);
    const pulse = Number.isFinite(snap.pulse) ? clamp(snap.pulse, 0, 1) : 0.5 + 0.5 * Math.sin(this.time * Math.PI * 2 * 1.2);
    const gate = smooth01((threat - 0.6) / 0.28);
    const beat = pulse * gate * 0.3;
    const vig = Math.pow(threat, 1.5);
    const dimT = snap.won || snap.lost ? 0.62 : 0;
    this.dim += (dimT - this.dim) * Math.min(1, step * 2.2);
    if (snap.lost) this._tint.setRGB(0.3, 0.03, 0.06);
    else if (snap.won) this._tint.setRGB(0.04, 0.09, 0.16);
    else this._tint.setRGB(0, 0, 0);
    const cs = snap.chaseActive ? 0.06 + 0.06 * pulse : 0;
    this.fx.update({
      t: this.time,
      vigS: 0.42 + 0.55 * vig + cs,
      vigR: 0.8 - 0.38 * vig,
      grain: 0.05 + 0.2 * threat,
      scan: 0.035,
      beat,
      dim: this.dim,
      tint: this._tint
    });
  }
}

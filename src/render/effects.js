import * as THREE from 'three';

const QUAD_VERT = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const DARK_FRAG = `
varying vec2 vUv;
uniform float uVigS;
uniform float uVigR;
uniform float uScan;
uniform float uBeat;
uniform float uDim;
uniform vec3 uTint;
uniform vec2 uRes;
void main(){
  vec2 p = vUv - 0.5;
  p.x *= uRes.x / max(uRes.y, 1.0);
  float d = length(p);
  float v = smoothstep(uVigR, uVigR + 0.42, d) * uVigS;
  float scan = (0.5 + 0.5 * sin(vUv.y * uRes.y * 3.14159265)) * uScan;
  float a = v + scan + uBeat * smoothstep(0.10, 0.72, d) + uDim;
  vec3 col = mix(vec3(0.0), uTint, clamp(uDim * 1.7, 0.0, 1.0));
  gl_FragColor = vec4(col, clamp(a, 0.0, 0.97));
}
`;

const GRAIN_FRAG = `
varying vec2 vUv;
uniform float uTime;
uniform float uGrain;
uniform vec2 uRes;
float hash(vec2 p){
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
void main(){
  vec2 cell = floor(vUv * uRes * 0.5);
  float n = hash(cell + floor(uTime * 24.0) * 7.31);
  float g = (n - 0.5) * uGrain;
  gl_FragColor = vec4(vec3(1.0), clamp(max(g, 0.0) * 2.6, 0.0, 1.0));
}
`;

export class PostFX {
  constructor() {
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();
    this.geo = new THREE.PlaneGeometry(2, 2);
    this.u = {
      uTime: { value: 0 },
      uVigS: { value: 0.4 },
      uVigR: { value: 0.8 },
      uScan: { value: 0.035 },
      uBeat: { value: 0 },
      uDim: { value: 0 },
      uGrain: { value: 0.06 },
      uTint: { value: new THREE.Color(0, 0, 0) },
      uRes: { value: new THREE.Vector2(1280, 720) }
    };
    this.darkMat = new THREE.ShaderMaterial({
      uniforms: this.u,
      vertexShader: QUAD_VERT,
      fragmentShader: DARK_FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
    this.grainMat = new THREE.ShaderMaterial({
      uniforms: this.u,
      vertexShader: QUAD_VERT,
      fragmentShader: GRAIN_FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.dark = new THREE.Mesh(this.geo, this.darkMat);
    this.dark.frustumCulled = false;
    this.dark.renderOrder = 10;
    this.grain = new THREE.Mesh(this.geo, this.grainMat);
    this.grain.frustumCulled = false;
    this.grain.renderOrder = 11;
    this.scene.add(this.dark, this.grain);
  }

  setSize(w, h) {
    this.u.uRes.value.set(Math.max(w, 1), Math.max(h, 1));
  }

  update(o) {
    this.u.uTime.value = o.t;
    this.u.uVigS.value = o.vigS;
    this.u.uVigR.value = o.vigR;
    this.u.uGrain.value = o.grain;
    this.u.uScan.value = o.scan;
    this.u.uBeat.value = o.beat;
    this.u.uDim.value = o.dim;
    this.u.uTint.value.copy(o.tint);
  }

  render(renderer) {
    renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.geo.dispose();
    this.darkMat.dispose();
    this.grainMat.dispose();
    this.scene.remove(this.dark, this.grain);
  }
}

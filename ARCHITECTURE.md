# NIGHT WARD — Architecture Contracts

Single source of truth for module boundaries. Every subsystem imports from these
signatures only. Orchestrator owns integration; agents own their directories.

## Stack
Vite + vanilla ES modules + three (rendering only). Vitest for pure-logic tests.
All simulation/AI/logic code is framework-free (no `three` import outside `src/render/`).
Positions are plain `{x,z}` objects. Y axis unused in sim (top-down plane).

## Directory ownership
- `src/core/` — orchestrator. constants, event bus, seeded rng.
- `src/sim/` — orchestrator. grid world, LOS, light/noise fields, pathfinding, player movement.
- `src/game/` — orchestrator owns `game.js`, `save.js`, `level.js`. Agent owns `objects.js`.
- `src/ai/` — agent. perception math + behavior FSM + manager.
- `src/render/` — agent. three scene, camera, materials, dynamic sync, effects.
- `src/audio/` — agent. WebAudio procedural synth engine.
- `src/ui/` — agent. input mapping, HUD, menus, incident log viewer.
- `tests/` — unit tests (agents write theirs; orchestrator writes sim/save tests).
- `scripts/playtest.mjs` — headless bot playthrough harness (orchestrator).

## Event bus (`src/core/events.js`)
```js
export const bus = { on(type, fn), off(type, fn), emit(type, payload) }
```
Pinned events:
```
noise        {x,z,loud,type}            type: footstep|door|glass|bottle|locker|throw|steam
alert        {aiId,kind:'chase'|'lost'}
aiState      {aiId,from,to}
incident     {t,who,kind,detail,x,z}    detection log entry
lightSmashed {id,x,z,wingId}
breaker      {wingId,on,dur}
steam        {id,on}
pickup       {kind,id}                  kind: bottle|seal|vessel
sealTaken    {n,total}
vesselTaken  {}
door         {id,open}
playerHidden {id} / playerUnhidden {}
playerCaught {byId}
checkpoint   {label}
gameWon      {stats} / gameLost {}
objective    {text}
```

## Constants (`src/core/constants.js`)
`CELL`, `TILE` (VOID/FLOOR/WALL/DOOR/GRATE/CARPET), `SURFACE` (noise multiplier per tile),
movement speeds, `NOISE` loudness table, `LIGHT_AMBIENT`, suspicion thresholds,
`AI_STATE` (PATROL/SUSPICIOUS/INVESTIGATE/SEARCH/CHASE/RETURN/LISTEN/DISABLED),
`PROFILES` = warden/listener/sentinel perception params (vision range+half-angle,
hearing multiplier, speeds, memory seconds). Tests import these — do not rename.

## Sim (`src/sim/`)
```js
// world.js
class World {
  constructor(gridStrings, legend)      // parses once; also accepts pre-parsed def
  w,h; tiles: Uint8Array                 // TILE codes
  tileAt(wx,wz); isBlocked(cx,cz)        // walls + closed doors block
  lineOfSight(x1,z1,x2,z2) -> bool
  lightAt(wx,wz) -> 0..1                 // active fixtures + ambient; respects blackouts
  maskAt(wx,wz) -> 0..1                  // steam zones: 1 masks source noise fully
  registerFixture(f); registerMask(m)    // called by game/objects
  serialize(); load(json)
}
// pathfinding.js
findPath(world, sx,sz, tx,tz, opts) -> [{x,z},...] | null   // A*, treats closed doors as blocked unless opts.doorsPassable
// player.js
class Player {
  x,z,facing,crouched,speed,flashlight,hiddenIn,bottles,alive,moving
  update(dt, input, world, objects)      // collision vs grid, emits noise events
  serialize(); load(json)
}
```
Noise emission: player footsteps compute `loud = NOISE.step * SURFACE[tile].mult *
(crouch ? 0.35 : sprint ? 1.8 : 1)` and `bus.emit('noise', ...)` at step intervals.
Thrown bottles break on wall/stop → `noise` type `bottle` loud 1.4.

## AI (`src/ai/`) — pure, deterministic given inputs
```js
// perception.js
visibility(observer{pos,facing,profile}, targetPos, world, ctx) ->
  {seen:boolean, exposure:0..1, reason:string}
  // ctx: {targetLight, targetCrouch, targetMoving, targetFlashlight}
hearNoise(listenerPos, profile, noiseEvt, world) ->
  {heard:boolean, strength:0..1, reason:string}   // steam mask applied at source
// brain.js
class Brain {
  constructor(entity, world)              // entity.profile chosen from PROFILES
  state; suspicion(0..100); lastKnown{x,z}|null; path[]
  update(dt, ctx)                        // ctx {player, noises[], ais, world, time}
  serialize(); load(json)                // full state incl. suspicion + lastKnown
}
// manager.js
class AIManager { brains[]; update(dt,ctx); propagateRadio(fromBrain); serialize(); load() }
```
Behavior contract:
- Suspicion rises when `visibility().seen` at rate ∝ exposure; falls when unseen.
- Thresholds: 30 → turn toward stimulus (SUSPICIOUS), 65 → INVESTIGATE lastKnown,
  100 → CHASE. Lost LOS for `profile.memory` sec in CHASE → SEARCH around lastKnown
  (3 wander points) → RETURN to patrol route. All transitions emit `aiState` +
  `incident` entries explaining the trigger (fairness requirement).
- Warden: full vision+hearing; on CHASE entry emits radio; manager propagates
  lastKnown to wardens within 14u (they SEARCH, not instant chase).
- Listener: no vision (profile.visionRange 0); hearing×3.2; CHASE = run to noise
  origin then LISTEN 4s (rotates); catches moving player within 2.2u, ignores still player.
- Sentinel: rail patrol, narrow long cone, hearing×0; DISABLED during wing blackout
  (eye dims over 1.5s); cannot be lured by bottles.

## Game objects (`src/game/objects.js`) — agent-owned
```js
class Interactables {
  constructor(world, defs)               // defs parsed from level legend
  kinds: door, locker, light, breaker, steamZone(+valve), bottlePickup, seal, vessel, elevator
  update(dt, game)
  nearestInteractable(player) -> {obj,label} | null   // HUD prompt
  interact(obj, game)                    // E press resolution incl. hide/unhide
  throwBottle(origin, dir, game)         // slides, breaks → noise + optional shard hazard
  applyBlackout(wingId, dur)             // lights off + sentinels disabled
  serialize(); load(json)
}
```
Rules: lockers hide player (`player.hiddenIn=obj.id`) → invisible+muffled; an AI in
CHASE that had LOS to the player <1.5s before hide reaches locker → catch (fair,
telegraphed). Doors toggle via E (small noise). Lights smashable by bottle impact
(near miss within 1.2u) or direct hit; smashed = permanent dark patch. Breaker:
toggle wing power 30s, 90s cooldown. Seals: 3 total open the archive door; vessel
spawns restlessness (+15% patrol speed). Elevator with vessel = win.

## Game orchestrator (`src/game/game.js`)
```js
class Game {
  constructor(levelDef, opts)            // builds world/player/AIManager/Interactables
  time; world; player; ai; objects; log[] // log = ring buffer of incident entries
  update(dt, input)
  snapshot()                             // plain data for render/audio/ui each frame
  serialize()/load(json); checkpoint(label)
  static deserialize(json, levelDef) -> Game
}
```
Input struct: `{mx,mz,crouch,sprint,interact,throwPressed,flashToggled,aimX,aimZ}`.
Headless bots produce the same struct — same code path as humans.

## Render (`src/render/renderer.js`)
Consumes `snapshot()` only. Owns scene/camera/lights/materials. Must visualize:
AI vision cones (fan mesh, color by state: grey patrol / amber suspicious /
red chase — readability contract), flashlight spot, fixture flicker, blackout
dimming, noise ripples (expanding rings on `noise` events near player), vignette+
grain scaled by nearest-threat proximity. Ortho-ish perspective cam, fixed angle.

## Audio (`src/audio/engine.js`)
Procedural WebAudio only, no assets. Layers: ambient drone bed, surface-aware
footsteps, glass/smash/door/locker one-shots, threat-proximity heartbeat (tempo ∝
nearest hostile distance/state), alert stinger, Listener clicking, Sentinel hum,
blackout power-down whoosh. Resumes on first user gesture. `engine.update(snapshot,dt)`.
Mute toggle exposed.

## UI (`src/ui/`)
Input: WASD/arrows move, Ctrl/C hold crouch, Shift hold sprint, E interact,
Q or LMB throw bottle toward cursor, F flashlight, Esc/P pause, M mute.
HUD: interaction prompt, objective toast, suspicion arcs above AI (world-space,
render side), pause menu with Controls + Incident Log (reads `game.log`,
human-readable reasons: why detected, what heard, where from). Death overlay →
restart from checkpoint. Win overlay with stats.

## Level (`src/game/level.js`)
ASCII map + LEGEND (chars documented there): walls `#`, floors `. , =` (concrete/
carpet/grate), door `+`, locker `L`, bottles `B`, lights `w e a m` (wing-colored),
breakers `X`(west) `Y`(east), steam valve `T` + zone `~`, seals `1 2 3`, vessel `V`,
elevator `E`, player `P`, spawns `G`(warden) `C`(listener) `D F`(sentinel rail ends).
Connectivity invariant (tested): every objective reachable from P through
non-wall tiles; no door single-point-of-failure for required path.

## Save/checkpoint (`src/game/save.js`)
localStorage key `nightward.save.v1`. `{version, ts, game}`; validate + sanitize on
load; corrupt → null → fresh start (never crash). Checkpoints: intake start, after
each seal, after vessel. Restores AI states exactly (mid-alert saves supported).

## Playtest harness (`scripts/playtest.mjs`)
Runs Game headless with scripted bot policies per approach style (ghost / lure /
blackout / careful-brute), records telemetry JSON to `reports/`: timeline of noise/
incidents/chases, per-objective times, catches. Pass bar: every wing traversable by
≥3 distinct styles with 0 forced detections; ghost = 0 chases end-to-end.

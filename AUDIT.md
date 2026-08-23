# NIGHT WARD — Pre-Release Code Audit

Auditor scope: `src/**`, `scripts/playtest.mjs`, `scripts/policies-*.mjs`, `tests/**`, `index.html`, `vite.config.js`.
Intent docs read first: `ARCHITECTURE.md`, `BLOCKERS.md`. Read-only audit; nothing was fixed.

## Verification runs

- `npx.cmd vitest run` — **5 files, 54/54 passed** (matches BLOCKERS.md claim of 54/54).
- `npx.cmd vite build` — **green** (23 modules, dist/assets/index-F-rp6CJm.js 596.59 kB).

---

## Summary verdict: **DO NOT SHIP**

Core sim, save system, and unit tests are in decent shape, but there are four release-blocking defects:
a broken win flag that makes the flagship playtest metric unmeasurable, an AI softlock exploit,
an inverted breaker-restore signal that re-disables sentinels every cycle, and permanent
game-wide audio mute after the first death. Several advertised audio/HUD features are silently
disconnected from the snapshot they consume.

---

## Critical (blockers)

### C1. `game.won` is never set — full-run playtests can never record a win
- Evidence: `src/game/game.js:27` is the **only** assignment (`this.won = false`); grep over `src/**`
  finds no other write. The win path is `objects.interact('elevator')` → `bus.emit('gameWon')`
  (src/game/objects.js:235-240), which `main.js:53-55` handles for the overlay but never sets `game.won`.
- Repro reasoning: harness `runOnce` returns `won: game.won` (scripts/playtest.mjs:700) and gates the
  sim loop on it (:691). Full policies use `opts.full: true` (policies-full.mjs:130,179) so
  `objective = r.won` (playtest.mjs:729) → `objectiveRate` is structurally **0** forever
  (confirmed in reports/playtest.json:309,355), while `aggFull` demands ≥0.75 (policies-full.mjs:123).
  Even a flawless bot run fails.
- Impact: **BLOCKERS #1 ("full-run chain stitching") is partly a phantom** — the harness cannot measure
  success, so the claimed root cause ("compounding small risks", "return-leg windows") is unverified.
  The recorded `clean=0.00 survive=0.31` numbers may be entirely unrelated to route quality.
- Also dead: `Game.update` early-return `if (this.won)` (game.js:101) is unreachable;
  renderer win dim/tint (`snap.won`, renderer.js:1018-1022) can never engage.

### C2. Warden INVESTIGATE freezes permanently against locked doors (player-exploitable AI kill)
- Evidence chain: `findPath` treats **all** doors as passable when `doorsPassable:true`, ignoring locks
  (src/sim/pathfinding.js:19-28 — lock state never consulted). `Brain.gotoPoint` walks the route, hits the
  door tile, sees it locked, clears the path and forces `repathT = 0` (src/ai/brain.js:131-135), which makes
  the next frame repath the identical route — an infinite repath loop with zero progress.
  `doInvestigate` has **no timeout or give-up condition** (brain.js:419-429): it only exits on arrival or
  empty `lastKnown`.
- Repro: before 3 seals, throw a bottle inside the archive (or let a radio call land past `d_archive_*`);
  any warden whose `lastKnown` lands beyond the locked door enters INVESTIGATE and stands at the door for
  the rest of the run. Same works with `d_elev` pre-vessel. One bottle per warden neutralizes the entire
  warden roster — trivializes encounters (audit dimension 3c).
- Note: CHASE self-heals via memory (`lostT >= memorySec` or `far`, brain.js:461), and PATROL routes don't
  cross locked doors in this level — INVESTIGATE is the unguarded state. BLOCKERS' "no pathing deadlock"
  claim (verified across ensembles) holds only for openable doors.

### C3. Breaker cooldown "restore" event is interpreted as a new blackout by the AI manager
- Evidence: on cooldown expiry `Interactables.update` emits `{ wingId, on: true }` with **no `dur`**
  (src/game/objects.js:99-103). `AIManager`'s handler treats `on:true` as blackout start:
  `this._breaker.set(wingId, this._time + (evt.dur || BLACKOUT.duration))` (src/ai/manager.js:48-55),
  and sentinel disablement ORs that map in (manager.js:62-66).
- Timeline repro: throw breaker at t=0 → blackout t∈[0,30], cooldown ends t=90, restore fires →
  `_breaker = t+120` → **sentinels disabled t∈[90,120] while the wing lights are ON**. Every breaker use
  gifts a second free 30s sentinel shutdown; visuals/audio disagree with the sim (eye dims under lit lights).
- The unit test codifies the emitting side only (tests/interactions.test.js:132-137 asserts the restore
  payload); no test covers the manager's reaction, which is why this survived the "ensemble tuning".

### C4. First death permanently mutes all audio until page reload
- Evidence: `AudioEngine._caughtSting` latches `this._caught = true` and ramps master gain to 0.0001
  (src/audio/engine.js:645-675, latch at 648, ramp at 671-674). Nothing ever resets `_caught`
  (only `dispose()` rebuilds the engine). Heartbeat/shimmer/hum/ticks are additionally gated on
  `this._caught` (engine.js:254,279,328,337).
- Repro: die → "RESTART FROM CHECKPOINT" → `menus.restart()` (src/ui/menus.js:275-282) and
  `restartFromCheckpoint()` (src/main.js:31-40) recreate the Game but never call `arm()`/`setMaster()`/
  any reset on the singleton AudioEngine. Every subsequent session plays in effective silence.
  For a horror game this is ship-blocking on its own.

---

## Major

### M1. Snapshot/render-audio drift — consumers read fields `Game.snapshot()` never provides
Verified field-by-field against game.js:230-259:
| Consumer expects | Snapshot provides | Effect |
| --- | --- | --- |
| `noises[].id` (renderer.js:952-958) | `recentNoises` entries have no `id` (game.js:55-63,150-155) | After the very first ripple, `_noiseSeen.has(undefined)` is true → **noise ripples render ~once ever**, then only again after the 64-entry queue wraps. Advertised feedback feature effectively dead. |
| `snap.blackout` (engine.js:73) | absent | Blackout bed-filter/whoosh layer dead (`_onBreaker` one-shots still fire). |
| `snap.listenerNear` (engine.js:74) | absent | **Listener clicking never plays** (claimed layer, ARCHITECTURE.md:153-155). |
| `snap.sentinelNear` (engine.js:75) | absent | **Sentinel hum never plays** (claimed layer). |
| `s.bottles` top-level (hud.js:118) | only `player.bottles` nested (game.js:240) | HUD bottle pips never render — player has no inventory readout. |
| `snap.caughtFlash` (hud.js:126) | absent | Red screen-flash effect dead code. |

### M2. Listener/sentinel "restlessness" redirect on vessel pickup is a no-op beyond the speed boost
- `onVessel` sets `b.state = 'search'` directly (src/game/game.js:94) instead of going through
  `setState` + `setupSearch`. `doSearch` with empty `wanderPts` immediately falls through to RETURN
  (brain.js:431-435), so wardens near the archive approach never actually investigate `archiveApproach`;
  `lastKnown` set at game.js:93 is unused. Net behavior = +15% patrol speed only. Also bypasses the
  `aiState` event contract (renderer cone color won't transition).

### M3. Save robustness gaps (mid-alert / drift cases)
- `AIManager.load` matches entities by id but brains **by array index**: `json.brains[i]` (manager.js:132).
  If saved entity order/count diverges from live spawn order (level edits, filtered spawns — note the
  constructor `continue`s unknown kinds, manager.js:15), brain states apply to the wrong AI (a saved CHASE
  can resurrect onto a different warden). Entities themselves skip gracefully (`if (!s) continue`),
  masking the misalignment.
- `Brain.load` accepts any string as state (brain.js:518-519): a corrupted/garbage state lands in the FSM
  switch's `default` (no-op) — the AI stands frozen until suspicion thresholds happen to rescue it.
  No whitelist validation against `AI_STATE`.
- `Game.load` accepts `{seals:{got}}` without `vessel` (game.js:284-285): restored run has
  `state.vessel === undefined` → elevator refuses forever (objects.js:237) with no recovery path —
  a softlock loaded from a *valid* checkpoint. `validateSave` doesn't check it either (save.js:23-34).
- Silent `catch {}` in `Game.load` (game.js:294-296) returns false without any log/telemetry — corruption
  will be invisible in the field. (Positives: schema constant both sides; `world.load` fixture/mask matching
  by id degrades gracefully on level drift; blackouts restored with absolute times and pruned correctly.)

### M4. Systemic balance exploits (dimension 3c)
- **Sprint outruns everything**: player sprint 6.25 (constants.js:21) vs fastest chase 6.0 (listener) /
  5.75 (warden). Once spotted, hold Shift away; warden drops at `far > 18` or `memorySec`
  (brain.js:459-461). Kiting is risk-free; no stamina/catch-up exists.
- **Valves are free permanent silence**: toggling emits no noise, no cost, no cooldown
  (objects.js:252-257); an open steam zone multiplies noise radius by `1-mask` → full mask near center
  (perception.js:44-46). Standing in steam = indefinite footstep invisibility to all listeners; nothing
  penalizes camping a mask zone (vlv3 deliberately jackets the ward arch per BLOCKERS).
- Elevator prompt reads "Call elevator" even when vessel-less and refusing (objects.js:148-149,237) —
  misleading affordance; combined with C1 the interact also re-fires `gameWon` on every press.
- Hide-exit baiting and breaker+locker combos check out as fair (exit emits noise, locker rip rule active);
  bottle spam cadence is bounded by pickup count (8) — noted, not exploited.

### M5. Restart leaks every previous Game/AIManager into the global bus
- `restartFromCheckpoint` (main.js:31-40) replaces `game` without invoking the old instance's
  `unsubscribers` (game.js:36-45) or `ai.destroy()`. Each restart adds another live `noise`/`incident`/
  `alert`/… listener set mutating dead games forever (log buffers, pendingNoiseBuffer growth, wasted CPU).
  Long sessions degrade measurably; also the only cleanup hook that exists (`AIManager.destroy`,
  manager.js:136-138) is never called anywhere.

---

## Minor

1. **Dead code**: `SEARCH_R` + `void` (objects.js:168-169); `BLACKOUT.windDown` (constants.js:106, unused);
   `WINGS` (constants.js:101, unused); `Rng.pick` (unused); `Brain.radioAt` written/serialized but never
   read (brain.js:57,184,512,537); `catchCheck` params `dt`,`ctx` unused (perception.js:62);
   `world.blackouts.held` restored but nothing ever sets it (world.js:114,167); `Game.won` cluster (see C1).
2. **Duplication**: hud.js SHEET ≈ menus.js SHEET verbatim (~48 lines each, same STYLE_ID so second insert
   is dead weight — hud.js:3-50 vs menus.js:5-52); door registration done twice (game.js:16-19 and
   objects.js:22-29 register the same ids); `normAngle` duplicated (brain.js:12-16, perception.js:1-5);
   door-lock predicate repeated in `_label` and `interact` (objects.js:131-137 vs 170-175);
   `propagateRadio` re-scans brains to rediscover the brain it was handed (manager.js:85-91).
3. **Error handling**: audio bus wrapper swallows all listener exceptions silently
   (engine.js:29-36); `menus.renderLog` try/catch swallow (menus.js:238-242); `onNoise` has no payload
   guard — malformed `{x,z}` yields VOID-tile lookup silently (game.js:52-63). localStorage paths are
   properly guarded (save.js try/catch + `hasStorage`) — good.
4. **dt spikes/tab-away**: main clamps 0.1 (main.js:69), Game clamps 0.05 (game.js:102) — double clamp is
   consistent (effective 0.05; tab-away loses time rather than spiraling). `AudioEngine.update` ignores dt
   entirely (audio-context clocks) — no huge-dt risk. Renderer dampK receives raw ≤0.1 — fine. No action needed;
   documented because the double clamp looks accidental but is benign.
5. **Perf**: `snapshot()` runs `nearestInteractable` (per-object LOS DDA) every frame even when paused,
   and a second time inside `update` on interact (game.js:113,203). Fine at this object count; worth noting.
6. **Doc drift**: ARCHITECTURE.md:104 says radio radius 14u; code ships 15 (`PROFILES.warden.radioRadius`,
   constants.js:70). ARCHITECTURE.md:107 "eye dims over 1.5s" corresponds to `BLACKOUT.windDown`, which is
   unreferenced — the actual droop is a renderer damp constant (renderer.js:817).
7. `staticDefFromLevel` drops fixture intensity `i` (level.js:233); renderer substitutes a global constant —
   sim light fields and rendered brightness can disagree per fixture.
8. `_doorWaitT` persists across states/state changes (never reset except on success, brain.js:136-138).

---

## Test Suite notes

- 54/54 passing; count matches BLOCKERS.md exactly. Tests import real modules, no mocks of the units
  under test. Determinism via seeded Rng is respected.
- **One tautological assertion**: tests/save.test.js:61 `expect(moved).toBeGreaterThanOrEqual(0)` — a
  hypot distance can never be negative; the "restored chase keeps moving" test would still pass if the
  warden froze. The adjacent `state !== 'patrol'` check partially covers it, but the movement claim itself
  is untested. This weakens the exact guarantee BLOCKERS relies on ("Restores AI states exactly").
- The breaker test codifies the restore payload (interactions.test.js:134-137) but nothing exercises
  `AIManager` against it — the missing integration test is precisely where C3 hides.
- No test opens a locked door against `findPath(doorsPassable:true)` + brain behavior — C2's gap.
- Harness honesty: bots use the public input struct and perception calls (no oracle teleports), matching
  ARCHITECTURE.md's claim; jitter seeds vary per trial. However the harness's headline output is broken
  by C1, so "16-trial ensemble verified" statements about full runs should be treated as unmeasured.

---

## Feature Claim matrix (ARCHITECTURE.md / BLOCKERS.md → code)

| Claim | Verified | Evidence |
| --- | --- | --- |
| Incident log with human-readable reasons | Y | reason strings visibility()/hearNoise() (perception.js:31-33,50-53); incidents logged 'spotted'/'heard'/'found you at close range'/'saw you climb in' (brain.js:186,299,308-313,378; game.js:166-171); rendered in menus.js:245-258 |
| Radio propagation to wardens within radius | Partially | Works (manager.js:83-102) but radius is 15 not the doc'd 14, and listeners/sentinels excluded by design; restore-event confusion taints the breaker half of alert tooling (C3) |
| LISTEN catch rule (moving-only within 2.2u) | Y | catchCheck moving gate (perception.js:66) + lethal-in-LISTEN (brain.js:361-368); tested (fsm.test.js:197-228) |
| Breaker toggle 30s / 90s cooldown / restore event | Partially | Durations correct (constants.js:103-106, objects.js:242-250); restore event emitted but **misconsumed** by AIManager (C3); `windDown` promised by doc comment is dead |
| Checkpoints: intake / each seal / vessel | Y | intake via first input (main.js:59-61), seal (game.js:79-84), vessel (game.js:86-98); persisted via `saveGame` (main.js:56-58) |
| Save: validate+sanitize, corrupt→null→fresh start | Mostly | validateSave + guarded load (save.js) — good; but see M3 holes (vessel-less state accepted, brain state strings unvalidated, silent catch) |
| Noise types table incl. bottle loud 1.4 | N (minor) | `NOISE.bottle` ships as **1.5**, not the doc'd 1.4 (constants.js:30 vs ARCHITECTURE.md:77) |
| Renderer: cones colored by state, flicker, ripples, vignette+grain | Partially | Cones/flicker/vignette/grain verified (renderer.js:20-28,687-741,1012-1034); noise ripples effectively dead due to missing `id` (M1) |
| Audio layers: heartbeat, stinger, Listener clicking, Sentinel hum, blackout whoosh | Partially | Heartbeat/stinger Y; clicking/hum/blackout-bed read snapshot fields that don't exist (M1); all audio dies permanently after first death (C4) |
| Vessel restlessness (+15% patrol speed) | Partially | Speed boost applies to ALL AIs incl. listener/sentinel (game.js:90, before the warden filter); the archive-approach redirect is a no-op (M2) |
| "No pathing deadlock across ensembles" (BLOCKERS) | N | Holds only for openable doors; locked-door INVESTIGATE livelock is permanent (C2) |
| Playtest bar "ghost = 0 chases end-to-end", full-run viability measurable | N | Structurally impossible while `game.won` never sets (C1); south/B,C genuinely flaky per report (0.31) |
| Unit tests 54/54, build green | Y | Re-ran both during audit |

---

*Audit generated 2026-08-23. Commands executed: `npx.cmd vitest run`, `npx.cmd vite build`. No files modified other than this report.*

# BLOCKERS / KNOWN ISSUES

Updated after the fairness pass + ensemble tuning loop (~15 rounds).
Unit tests: 54/54. Build: green.

## RESOLVED this loop (was blocking, now fixed)
- Hearing escalation was per-frame & replay-amplified → one footstep insta-chase,
  FPS-dependent difficulty. Noises now feed once each; loud-only fast path.
- Hide-under-chase was free immunity → contracted rule implemented: a chasing
  warden that saw you <1.5s ago rips the locker (incident: "saw you climb in").
- Chase feedback circuit dead (`ent.state` never existed) → threatLevel now
  reads brains; renderer/audio chase layers actually engage.
- Harness door-pathing bug (`doorsPassable:false` blocked OPEN doors) — full-run
  "stuck at archive" was substantially this.
- Steam valves were decorative duplicates → level masks removed; valves own
  their zones; third valve jackets the ward arch.
- Through-wall interactions → LOS pull-point check; doors got their own radius.
- `lockedDoors` lost on load → restored in `world.load`.
- Sound-chase incidents logged as "spotted" → now "heard".
- Fixture smash-through-wall → LOS-gated.
- Seal 3 sat inside the Listener patrol bubble → relocated to ward corner;
  carpet rug at arch entry dampens approach footsteps.

## STILL OPEN (ranked)
1. **Full-run chain stitching** — per-wing legs pass clean 1.00 individually,
   but single-sitting GHOST/TRICKSTER runs compound small risks. Root causes:
   return-leg windows missing/mismatched, and bot exit routes re-enter lanes
   without guards. Fix direction: reuse exact passing wing sequences as
   composable segments with shared guard helpers.
2. **south/B lure reliability** — bottle aim jitter hits the arch jamb on some
   trials, luring the Listener toward (not away from) the grab. Fix: throw from
   inside the ward past the pillars.
3. **south/C locker-hop** — crossing to lk7 races the Listener's diagonal cut.
   Fix: gate on his heading (dirZ toward seal) not just position.
4. **Warden2 north-corridor** — shortened beat helps but GHOST's second
   (westbound) traverse lacks its own directional window yet.
5. Warden flashlight does not illuminate the player in `visibility()` light
   sampling (design choice for readability; revisit if wardens feel blind).

## Non-goals / accepted
- Breaker prompt shows "Breaker cycling" during active blackout (no dead button).
- AI opens unlocked doors after ~0.5s (with noise) — closing doors delays, never
  traps, AI; verified no pathing deadlock across 16-trial ensembles.
- No README screenshots/GIF yet: headless Chrome on this machine renders WebGL
  frames black even with swiftshader flags (`scripts/shots.mjs` kept as a
  utility — run against any GPU-capable machine to capture real footage).

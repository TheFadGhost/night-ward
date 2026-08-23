# PLAYTESTS

Headless ensemble harness: `npm run playtest` (16 jittered trials per policy,
deterministic seeds). Raw telemetry: `reports/playtest.json`.

Each policy is a scripted bot driving the SAME input struct a human produces.
"clean" = finished with zero chases triggered. "survive" = never caught.

## Latest results

| Policy | clean | survive | objective | notes |
| --- | --- | --- | --- | --- |
| west/A ghost-storage | 1.00 | 1.00 | 1.00 | crouch + patrol-timing, no tools |
| west/B breaker-walk | 1.00 | 1.00 | 1.00 | blackout the wing, walk through |
| west/C atrium-infiltrate | 0.06 | 0.38 | 0.06 | BLOCKED (see BLOCKERS.md #2) |
| east/A breakroom-sneak | 0.00 | 1.00 | 1.00 | doorless route; one late chase |
| east/B blackout-hall | 1.00 | 1.00 | 1.00 | breaker + dark hall traverse |
| east/C sweep-dodge-hall | 1.00 | 1.00 | 1.00 | sentinel beam-timing, no tools |
| south/A creep-past-listener | 0.31 | 1.00 | 0.94 | arch route, timing windows |
| south/B glass-lure | 0.00 | 0.94 | 0.00 | BLOCKED (#4) |
| south/C locker-hop | 0.31 | 1.00 | 0.31 | locker cover cycling |
| full/GHOST zero-detection | 0.25 | 0.31 | 0.00 | BLOCKED (#1) |
| full/TRICKSTER tools-and-escapes | 0.00 | 0.06 | 0.00 | BLOCKED (#5) |

## What the loop already fixed
- Catch-on-touch removed for unaware AI — contact now escalates to chase first
  (`found you at close range`), catch only in CHASE / Listener-LISTEN states.
- Hearing attenuates through walls (×0.3) and steam masks suppress sources.
- Chase give-up: memory timer + distance break-off; radio only alerts nearby
  wardens to SEARCH (never instant group chase).
- Doors: AI opens unlocked doors after a delay (with noise); crouch-opened
  doors are quieter for the player too.
- Level: cover niches/pockets carved on flank walls; Warden 1 re-tasked to the
  office block; West seal relocated into the storage block so three genuinely
  different approach geometries exist (lane-cross / atrium-internal / blackout).
- Save integrity: mid-chase serialize/load round-trips exactly (unit tested);
  corrupt saves rejected, never crash.

## Honest gaps
See BLOCKERS.md. v1.0.0 is gated on clearing items 1–3 and a full-run pass;
current build ships as pre-1.0.

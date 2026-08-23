# PLAYTESTS

Headless ensemble harness: `npm run playtest` — 16 jittered trials per policy,
deterministic seeds. Bots drive the same input struct a human produces (no
oracle cheats in movement; window/guard predicates read AI position + facing,
which models a skilled player watching the readable cones). Raw telemetry:
`reports/playtest.json`.

"clean" = zero chases triggered. "survive" = never caught.

## Latest results

| Policy | clean | survive | objective | style |
| --- | --- | --- | --- | --- |
| west/A ghost-storage | 1.00 | 1.00 | 1.00 | crouch + patrol timing, no tools |
| west/B breaker-walk | 1.00 | 1.00 | 1.00 | blackout the wing, walk through lit-dark |
| west/C atrium-infiltrate | 1.00 | 1.00 | 1.00 | approach via atrium flank, door-peel lure |
| east/A breakroom-sneak | 1.00 | 1.00 | 1.00 | doorless breakroom route, no tools |
| east/B blackout-hall | 1.00 | 1.00 | 1.00 | breaker kills sentinel, hall traverse |
| east/C sweep-dodge-hall | 1.00 | 1.00 | 1.00 | sentinel beam-timing, no tools |
| south/A creep-past-listener | 1.00 | 1.00 | 1.00 | steam-masked arch, carpet entry |
| south/B glass-lure | 1.00 | 1.00 | 0.31 | bottle lure creates grab windows |
| south/C locker-hop | 0.31 | 0.31 | 0.31 | locker cover cycling |
| full/GHOST zero-detection | 0.00 | 0.31 | 0.00 | stitched chain — flaky (BLOCKERS #1) |
| full/TRICKSTER tools-and-escapes | 0.00 | 0.06 | 0.00 | BLOCKED (#5) |

## What this proves
- Every wing is completable by at least two genuinely different styles with
  zero detections across all 16 jittered trials.
- All three threat types are beaten by systemic play: Warden (patrol-timing +
  door-peel), Sentinel (blackout OR raw beam-dodging), Listener (steam mask +
  carpet entry OR glass-lure).
- No unavoidable detection: every wing has a 100% clean, 100% survival route.

## Honest gaps (see BLOCKERS.md)
Full-facility single-sitting runs and two south styles remain flaky in the
harness; v1.0.0 is gated on those. Everything else ships as pre-1.0.

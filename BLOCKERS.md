# BLOCKERS / KNOWN ISSUES (post-tuning-loop status)

Status date: session round ~14 of playtest tuning. Unit tests 54/54 green.
Ensemble harness (`scripts/playtest.mjs`, 16 jittered trials per policy).

## PASSING (systemic viability proven)
- west/A ghost-storage — clean 1.00 (zero detections)
- west/B breaker-walk — clean 1.00 (blackout tool route)
- east/B blackout-hall — clean 1.00 (sentinel disabled via breaker)
- east/C sweep-dodge-hall — clean 1.00 (beam-timing dodge, no tools)

## FAILING (open items)
1. **full/GHOST composition** — per-wing legs pass individually but the stitched
   end-to-end chain compounds per-leg risk (clean .25, obj 0). Stuck reports at
   `32,5/32,6` = archive vessel approach; suspected interact/door-open race
   despite INTERACT_RADIUS 2.05. Next step: single-step trace of archive segment
   (`node scripts/trace.mjs "full/GHOST zero-detection"`), likely needs a
   dedicated `interactUntil` primitive instead of separate goto/interact/until.
2. **west/C atrium-infiltrate** — warden4 gaze through south arch catches the
   atrium crossing (firstChase t≈39 @ arch sightline). Needs an arch-sightline
   guard on atrium entry legs or a pillar-hug waypoint set.
3. **south/A·B·C clean bars** — survival/objective rates are high
   (A: survive 1.00, obj 0.94) but clean (zero-chase) rate ≈0.31: Listener
   investigate-to-door/arch noise pulls him onto approach paths. Crouch-door
   mitigation shipped (×0.4 loudness); remaining leaks are footstep bursts near
   the arch. Candidate fix: widen steam-mask zone 1 eastward or add a ward-side
   rug (carpet patch) to dampen the final approach.
4. **south/B locker-thrash** — auto-hide engages on Listener chase toward the
   BOTTLE (not the player); gating added (dist<9) reduced but did not eliminate
   hide/unhide cycles (hidden-too-long ×9).
5. **TRICKSTER full run** — early Listener chase at service-east sprint leg;
   bottle-drop flee exists but triggers too late. Needs earlier first-bottle
   placement near the arch.

## Non-blocking polish
- Warden flashlight beam is not itself a light source in `visibility()` light
  sampling (only fixtures/player torch are). Smashing lights does not darken
  warden perception — intentional readability choice, but worth revisiting.
- `findPath` treats locked doors as passable for planning (cost-only); brains
  refuse to walk them, so paths can look odd near the archive pre-unlock.

> **built with ox alpha**
>
> most of this was written in august 2026 during the free preview window of
> [ox alpha](https://openrouter.ai/stealth/ox-alpha), an anonymous stealth model
> that turned up on openrouter for about a week. i set the direction and reviewed
> what came back. the tests are real and they pass — clone it and run them.

NIGHT WARD is a top-down stealth horror game: slip through a derelict medical
ward where light, sound and attention are systems, grab three seals, and get out
before the things patrolling it decide you belong to them.

**Play:** https://thefadghost.github.io/night-ward/

## How it plays

You are a courier in the Hollowmere Institute's sealed night ward. Three seals
open the Deep Archive; the Vessel inside opens the elevator. Between you and the
exit: Wardens with flashlights and radios, a blind Listener that hunts by ear,
and ceiling Sentinels sweeping narrow beams over the labs.

Everything is systemic — no scripted stealth sections:

- **Light matters.** Fixtures flicker and can be smashed. Breakers kill power to
  an entire wing for 30 seconds (sentinels drop dead). Darkness shrinks what
  Wardens see; their flashlights don't care.
- **Sound matters.** Surfaces have loudness (grate > concrete > carpet).
  Crouching is quiet, sprinting is not. Steam vents mask your footsteps. Doors
  can be opened gently while crouched. Glass pulls every ear in the ward.
- **Attention matters.** Vision cones are drawn exactly as the AI sees them,
  color-coded by state (grey patrol → amber suspicion → red chase), with a
  visible suspicion arc. When you're spotted, the incident log tells you why:
  "glimpse: dark", "heard footstep through a wall", "found you at close range".

Three ways past every problem: time the patrols, break the systems, or make the
ward look somewhere else.

## Controls

| Key | Action |
| --- | --- |
| WASD / arrows | Move |
| C (hold) | Crouch — slow, quiet, lower profile |
| Shift (hold) | Sprint — fast, very loud |
| E | Interact: doors, lockers, seals, breakers, valves |
| Q / Left click | Throw bottle toward cursor |
| F | Flashlight — helps you see, helps them see you |
| Esc | Pause / incident log |
| M | Mute |

## Run from source

```
npm install
npm run dev        # dev server
npm test           # unit tests (perception math, FSM, saves, interactions)
npm run playtest   # headless bot ensemble: 11 approach policies × 16 trials
npm run build      # production build to dist/
```

## Design notes

- AI perception is graded, not binary: exposure scales with distance, cone-edge,
  ambient light, posture and motion; hearing attenuates through walls (×0.3) and
  steam masks sources entirely. Suspicion rises through glance → investigate →
  chase with per-state decay, and chasing AI give up on memory timers or distance.
- Catching is tiered: unaware contact escalates ("found you at close range");
  only alerted states can take you. A Warden that watched you climb into a locker
  will open it.
- The facility layout is verified by tests: every objective reachable with all
  regular doors sealed, so no door is ever a soft-lock.

See `PLAYTESTS.md` for measured viability of eleven scripted approach styles and
`BLOCKERS.md` for known gaps. Architecture contracts live in `ARCHITECTURE.md`.

## License

MIT — see `LICENSE`.
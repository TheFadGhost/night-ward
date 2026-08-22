export const CELL = 2;

export const TILE = {
  VOID: 0,
  FLOOR: 1,
  WALL: 2,
  DOOR: 3,
  GRATE: 4,
  CARPET: 5,
};

export const SURFACE = {
  [TILE.FLOOR]: { mult: 1.0, name: 'concrete' },
  [TILE.GRATE]: { mult: 1.7, name: 'grate' },
  [TILE.CARPET]: { mult: 0.4, name: 'carpet' },
  [TILE.DOOR]: { mult: 1.0, name: 'doorway' },
};

export const SPEED = {
  walk: 3.4,
  sprint: 5.6,
  crouch: 1.55,
};

export const NOISE = {
  step: 0.5,
  doorOpen: 0.45,
  doorClose: 0.45,
  glass: 1.7,
  bottle: 1.5,
  lockerEnter: 0.35,
  lockerExit: 0.55,
  throwWhistle: 0.12,
  steamHissAmbient: 0.0,
};

export const LIGHT_AMBIENT = 0.07;

export const AI_STATE = {
  PATROL: 'patrol',
  SUSPICIOUS: 'suspicious',
  INVESTIGATE: 'investigate',
  SEARCH: 'search',
  CHASE: 'chase',
  RETURN: 'return',
  LISTEN: 'listen',
  DISABLED: 'disabled',
};

export const SUSPICION = {
  glanceAt: 30,
  investigateAt: 65,
  chaseAt: 100,
  riseRate: 85,
  fallRate: 14,
};

export const PROFILES = {
  warden: {
    kind: 'warden',
    visionRange: 13.5,
    visionHalfAngleDeg: 52,
    hearingMult: 1.15,
    hearThreshold: 0.16,
    memorySec: 9,
    speedPatrol: 1.7,
    speedInvestigate: 2.4,
    speedChase: 5.9,
    catchRadius: 1.15,
    radioRadius: 15,
    flashlight: true,
  },
  listener: {
    kind: 'listener',
    visionRange: 0,
    visionHalfAngleDeg: 0,
    hearingMult: 3.2,
    hearThreshold: 0.13,
    memorySec: 12,
    speedPatrol: 1.1,
    speedInvestigate: 3.4,
    speedChase: 6.4,
    catchRadius: 2.2,
    listenSec: 4,
    radioRadius: 0,
  },
  sentinel: {
    kind: 'sentinel',
    visionRange: 17,
    visionHalfAngleDeg: 11,
    hearingMult: 0,
    hearThreshold: Infinity,
    memorySec: 7,
    speedPatrol: 1.5,
    speedChase: 4.2,
    catchRadius: 1.1,
    railOnly: true,
  },
};

export const WINGS = ['west', 'east', 'maintenance'];

export const BLACKOUT = {
  duration: 30,
  cooldown: 90,
  windDown: 1.5,
};

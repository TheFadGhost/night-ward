function normAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

export function visibility(observer, targetPos, world, ctx) {
  const c = ctx || {};
  const p = observer && observer.profile;
  if (!p || !(p.visionRange > 0)) return { seen: false, exposure: 0, reason: 'blind' };
  const dx = targetPos.x - observer.x;
  const dz = targetPos.z - observer.z;
  const dist = Math.hypot(dx, dz);
  if (dist > p.visionRange) return { seen: false, exposure: 0, reason: 'too far' };
  const half = ((p.visionHalfAngleDeg || 0) * Math.PI) / 180;
  const ang = dist > 1e-9 ? Math.abs(normAngle(Math.atan2(dz, dx) - (observer.facing || 0))) : 0;
  if (ang > half) return { seen: false, exposure: 0, reason: 'outside view' };
  if (world && !world.lineOfSight(observer.x, observer.z, targetPos.x, targetPos.z)) {
    return { seen: false, exposure: 0, reason: 'no line of sight' };
  }
  const base = 0.35 + 0.65 * (1 - dist / p.visionRange);
  const ratio = half > 0 ? Math.min(1, ang / half) : 0;
  const falloff = 1 - 0.55 * ratio;
  const lightFactor = Math.min(
    2.2,
    Math.max(0.15, (c.targetLight || 0) * 1.6 + (c.targetFlashlight ? 0.5 : 0) + 0.08)
  );
  const postureFactor = (c.targetCrouch ? 0.7 : 1) * (c.targetMoving ? 1 : 0.55);
  const exposure = base * falloff * lightFactor * postureFactor;
  let reason;
  if (c.targetFlashlight && (c.targetLight || 0) * 1.6 < 0.5) reason = 'seen: flashlight glow';
  else if (lightFactor > 1) reason = 'seen: lit corridor';
  else reason = 'glimpse: dark';
  return { seen: exposure > 0.045, exposure, reason };
}

export function hearNoise(listenerPos, profile, noiseEvt, world) {
  const mult = profile ? profile.hearingMult || 0 : 0;
  const loud = noiseEvt && noiseEvt.loud ? noiseEvt.loud : 0;
  let radius = loud * 10 * mult;
  if (radius <= 0) {
    return { heard: false, strength: 0, reason: mult <= 0 ? 'deaf' : 'inaudible' };
  }
  const mask = world ? world.maskAt(noiseEvt.x, noiseEvt.z) : 0;
  radius *= 1 - mask;
  if (radius <= 0) return { heard: false, strength: 0, reason: 'masked by steam' };
  const d = Math.hypot(listenerPos.x - noiseEvt.x, listenerPos.z - noiseEvt.z);
  if (d > radius) return { heard: false, strength: 0, reason: 'too quiet' };
  let strength = Math.max(0, Math.min(1, 1 - d / radius));
  let reason = `${(noiseEvt && noiseEvt.type) || 'noise'} heard`;
  if (world && !world.lineOfSight(listenerPos.x, listenerPos.z, noiseEvt.x, noiseEvt.z)) {
    strength *= 0.3;
    reason = `${(noiseEvt && noiseEvt.type) || 'noise'} heard through a wall`;
  }
  return {
    heard: strength > 0.02 && mult > 0,
    strength,
    reason,
  };
}

export function catchCheck(entity, player, dt, ctx) {
  const p = entity && entity.profile;
  if (!p || !player) return false;
  if (player.hiddenIn) return false;
  if (!(player.moving || p.kind !== 'listener')) return false;
  const d = Math.hypot(player.x - entity.x, player.z - entity.z);
  return d < p.catchRadius;
}

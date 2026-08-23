import {
  wingRuns,
  westGhostSteps,
  LOBBY_TO_SERVICE,
  ARCH_INTO_ATRIUM,
  NORTH_CORR_E,
} from './policies-core.mjs';
import { southRuns, fullRuns } from './policies-full.mjs';

export function buildAllRuns(runPolicy) {
  const runs = [];
  runs.push(...wingRuns(runPolicy));
  runs.push(...southRuns(runPolicy));
  runs.push(
    ...fullRuns(runPolicy, LOBBY_TO_SERVICE, ARCH_INTO_ATRIUM, NORTH_CORR_E)
  );
  return runs;
}

export function evaluate(runs) {
  const failed = runs.filter((r) => !r.pass);
  return {
    passed: failed.length === 0,
    failedNames: failed.map((f) => f.name),
  };
}

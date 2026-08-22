export function createBus() {
  const listeners = new Map();
  return {
    on(type, fn) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(fn);
      return () => this.off(type, fn);
    },
    off(type, fn) {
      const set = listeners.get(type);
      if (set) set.delete(fn);
    },
    emit(type, payload) {
      const set = listeners.get(type);
      if (set) for (const fn of [...set]) fn(payload);
    },
    clear() {
      listeners.clear();
    },
  };
}

export const bus = createBus();

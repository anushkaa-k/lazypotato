import { useSyncExternalStore } from 'react';
import { readJSON, writeJSON } from '../lib/storage';

/**
 * A tiny persisted store: one value, saved to localStorage, shared by every component
 * that uses it, and kept in sync across browser tabs. If storage is unavailable or the
 * saved value is corrupted, it quietly falls back to `initial` and keeps working in memory.
 */
export function createPersistentStore<T>(key: string, validate: (v: unknown) => T | undefined, initial: T) {
  let value: T | undefined;
  const listeners = new Set<() => void>();

  const get = (): T => {
    if (value === undefined) value = typeof window === 'undefined' ? initial : readJSON(key, validate, initial);
    return value;
  };

  const set = (next: T | ((prev: T) => T)) => {
    value = typeof next === 'function' ? (next as (prev: T) => T)(get()) : next;
    writeJSON(key, value);
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        value = readJSON(key, validate, initial);
        listener();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  };

  function useStore(): [T, typeof set] {
    const v = useSyncExternalStore(subscribe, get, () => initial);
    return [v, set];
  }

  return { get, set, useStore };
}

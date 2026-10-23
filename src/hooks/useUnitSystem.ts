import type { UnitSystem } from '../lib/units';
import { STORAGE_KEYS } from '../lib/storage';
import { createPersistentStore } from './createStore';

const valid = (v: unknown): UnitSystem | undefined =>
  v === 'original' || v === 'us' || v === 'metric' ? v : undefined;

const store = createPersistentStore<UnitSystem>(STORAGE_KEYS.units, valid, 'original');

export const useUnitSystem = store.useStore;

import { useEffect, useMemo } from 'react';
import { getRecipe } from '../data/recipes';
import type { Recipe } from '../data/types';
import { asStringArray, STORAGE_KEYS } from '../lib/storage';
import { createPersistentStore } from './createStore';

const MAX = 8;
const store = createPersistentStore<string[]>(STORAGE_KEYS.recent, asStringArray, []);

export function useRecentlyViewed(): Recipe[] {
  const [ids] = store.useStore();
  return useMemo(() => ids.map((id) => getRecipe(id)).filter((r): r is Recipe => !!r), [ids]);
}

export function useTrackRecentlyViewed(id: string | undefined) {
  useEffect(() => {
    if (!id) return;
    store.set((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, MAX));
  }, [id]);
}

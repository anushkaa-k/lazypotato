import { useCallback, useMemo } from 'react';
import { getRecipe } from '../data/recipes';
import type { Recipe } from '../data/types';
import { asStringArray, STORAGE_KEYS } from '../lib/storage';
import { createPersistentStore } from './createStore';

const store = createPersistentStore<string[]>(STORAGE_KEYS.favourites, asStringArray, []);

export function useFavourites() {
  const [ids, setIds] = store.useStore();

  // Ignore ids for recipes that no longer exist (e.g. after renaming the source data).
  const saved = useMemo(
    () => ids.map((id) => getRecipe(id)).filter((r): r is Recipe => !!r),
    [ids],
  );
  const savedIds = useMemo(() => new Set(saved.map((r) => r.id)), [saved]);

  const isSaved = useCallback((id: string) => savedIds.has(id), [savedIds]);

  const toggle = useCallback(
    (id: string) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev])),
    [setIds],
  );

  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), [setIds]);

  return { saved, isSaved, toggle, remove, count: saved.length };
}

import { useSearchParams } from 'react-router-dom';
import type { Recipe } from '../data/types';

export const MAX_SERVINGS = 12;

/**
 * Chosen servings live in the URL (?serves=2) so the recipe page and Cook With Me
 * agree, and switching between them keeps the scaled quantities.
 */
export function useServings(recipe: Recipe | undefined): [number, (n: number) => void] {
  const [params, setParams] = useSearchParams();
  const base = recipe?.serves ?? 1;
  const raw = Number(params.get('serves'));
  const servings = Number.isInteger(raw) && raw >= 1 && raw <= MAX_SERVINGS ? raw : base;

  const set = (n: number) => {
    const next = Math.min(Math.max(1, Math.round(n)), MAX_SERVINGS);
    setParams(
      (p) => {
        const copy = new URLSearchParams(p);
        if (next === base) copy.delete('serves');
        else copy.set('serves', String(next));
        return copy;
      },
      { replace: true },
    );
  };

  return [servings, set];
}

export function servesQuery(servings: number, recipe: Recipe): string {
  return servings === recipe.serves ? '' : `?serves=${servings}`;
}

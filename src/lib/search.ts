import { getCategory } from '../data/categories';
import { isNoCook, totalMinutes, usesMicrowave } from '../data/recipes';
import type { CategoryId, Difficulty, Recipe } from '../data/types';

export type SortKey = 'collection' | 'quickest' | 'fewest-ingredients' | 'az';

export const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: 'collection', label: 'Cookbook order' },
  { id: 'quickest', label: 'Quickest first' },
  { id: 'fewest-ingredients', label: 'Fewest ingredients' },
  { id: 'az', label: 'A to Z' },
];

export type TimeLimit = 10 | 15 | 20 | 30;
export const TIME_LIMITS: TimeLimit[] = [10, 15, 20, 30];

export interface RecipeFilters {
  query?: string;
  categories?: CategoryId[];
  maxMinutes?: TimeLimit;
  difficulty?: Difficulty;
  noCook?: boolean;
  microwave?: boolean;
  cuisine?: string;
  mealType?: string;
}

function searchableText(r: Recipe): string {
  return [r.name, getCategory(r.category)?.name ?? '', ...r.ingredients.map((i) => i.item)]
    .join(' ')
    .toLowerCase();
}

/** "potatoes" -> potatoes | potato, "berries" -> berries | berry. */
function stems(word: string): string[] {
  const out = [word];
  if (word.length > 3 && word.endsWith('ies')) out.push(`${word.slice(0, -3)}y`);
  if (word.length > 3 && word.endsWith('es')) out.push(word.slice(0, -2));
  if (word.length > 3 && word.endsWith('s')) out.push(word.slice(0, -1));
  return out;
}

/** Every word of the query must appear in the name, category or ingredients. */
export function matchesQuery(r: Recipe, query: string): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const text = searchableText(r);
  return words.every((w) => stems(w).some((stem) => text.includes(stem)));
}

export function filterRecipes(list: Recipe[], f: RecipeFilters): Recipe[] {
  return list.filter(
    (r) =>
      (!f.query || matchesQuery(r, f.query)) &&
      (!f.categories?.length || f.categories.includes(r.category)) &&
      (!f.maxMinutes || totalMinutes(r) <= f.maxMinutes) &&
      (!f.difficulty || r.difficulty === f.difficulty) &&
      (!f.noCook || isNoCook(r)) &&
      (!f.microwave || usesMicrowave(r)) &&
      (!f.cuisine || r.cuisine === f.cuisine) &&
      (!f.mealType || r.mealType === f.mealType),
  );
}

export function sortRecipes(list: Recipe[], key: SortKey): Recipe[] {
  const indexed = list.map((r, i) => ({ r, i }));
  const cmp: Record<SortKey, (a: { r: Recipe; i: number }, b: { r: Recipe; i: number }) => number> = {
    collection: (a, b) => a.i - b.i,
    quickest: (a, b) => totalMinutes(a.r) - totalMinutes(b.r) || a.i - b.i,
    'fewest-ingredients': (a, b) => a.r.ingredients.length - b.r.ingredients.length || a.i - b.i,
    az: (a, b) => a.r.name.localeCompare(b.r.name),
  };
  return indexed.sort(cmp[key]).map(({ r }) => r);
}

/** Difficulty levels that actually occur, so we never show an empty filter option. */
export function availableDifficulties(list: Recipe[]): Difficulty[] {
  const order: Difficulty[] = ['Easy', 'Medium', 'Hard'];
  const present = new Set(list.map((r) => r.difficulty));
  return order.filter((d) => present.has(d));
}

/** Optional fields (cuisine, meal type) only get filters once some recipe provides them. */
export function availableValues(list: Recipe[], field: 'cuisine' | 'mealType'): string[] {
  return [...new Set(list.map((r) => r[field]).filter((v): v is string => !!v))].sort();
}

/** A stable "recipe of the day" so the homepage changes daily but not on every refresh. */
export function recipeOfTheDay(list: Recipe[], date = new Date()): Recipe {
  const day = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  );
  return list[((day % list.length) + list.length) % list.length];
}

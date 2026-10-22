import source from './recipes.generated.json';
import { categoryFromSourceName } from './categories';
import type { CategoryId, Difficulty, Recipe, SourceRecipe } from './types';

/**
 * The central recipe database. Every page (home, finder, browse, detail, Cook With Me,
 * saved) reads from here.
 *
 * Source of truth: docs/source/30-easy-recipes.md -> scripts/extract-recipes.py ->
 * recipes.generated.json. To add a recipe, either add it to the source document and re-run
 * `npm run extract:recipes`, or append an entry to `extraRecipes` below.
 */
const extraRecipes: Recipe[] = [];

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

function fromSource(r: SourceRecipe): Recipe {
  const category = categoryFromSourceName(r.sourceCategory);
  if (!category) throw new Error(`Unknown category "${r.sourceCategory}" for ${r.name}`);
  if (!DIFFICULTIES.includes(r.difficulty as Difficulty)) {
    throw new Error(`Unknown difficulty "${r.difficulty}" for ${r.name}`);
  }
  return {
    id: r.id,
    name: r.name,
    category: category.id,
    serves: r.serves,
    prepMinutes: r.prepMinutes,
    cookMinutes: r.cookMinutes,
    difficulty: r.difficulty as Difficulty,
    ingredients: r.ingredients,
    method: r.method,
    cookWithMe: r.cookWithMe.length ? r.cookWithMe : r.method,
  };
}

export const recipes: Recipe[] = [...(source as SourceRecipe[]).map(fromSource), ...extraRecipes];

const byId = new Map(recipes.map((r) => [r.id, r]));

export function getRecipe(id: string | undefined): Recipe | undefined {
  return id ? byId.get(id) : undefined;
}

export function recipesInCategory(id: CategoryId): Recipe[] {
  return recipes.filter((r) => r.category === id);
}

export function totalMinutes(r: Recipe): number {
  return r.prepMinutes + r.cookMinutes;
}

export function isNoCook(r: Recipe): boolean {
  return r.cookMinutes === 0;
}

/** True when the steps themselves mention the microwave (derived from source text, not guessed). */
export function usesMicrowave(r: Recipe): boolean {
  return r.method.some((s) => /microwave/i.test(s));
}

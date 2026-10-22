import { describe, expect, it } from 'vitest';
import { recipes, totalMinutes } from '../data/recipes';
import { availableDifficulties, availableValues, filterRecipes, recipeOfTheDay, sortRecipes } from './search';

describe('filterRecipes', () => {
  it('searches names and ingredients, case-insensitively', () => {
    expect(filterRecipes(recipes, { query: 'PANEER' }).length).toBe(5);
    expect(filterRecipes(recipes, { query: 'mug' }).map((r) => r.id)).toEqual([
      'microwave-mug-brownie',
      'peanut-butter-chocolate-mug-cake',
    ]);
    expect(filterRecipes(recipes, { query: 'potatoes' }).length).toBeGreaterThan(0);
  });

  it('filters by category, time, no-cook and microwave', () => {
    expect(filterRecipes(recipes, { categories: ['pasta'] })).toHaveLength(4);
    expect(filterRecipes(recipes, { maxMinutes: 10 }).every((r) => totalMinutes(r) <= 10)).toBe(true);
    expect(filterRecipes(recipes, { noCook: true }).every((r) => r.cookMinutes === 0)).toBe(true);
    expect(filterRecipes(recipes, { microwave: true }).length).toBeGreaterThan(5);
  });

  it('leaving filters empty returns everything', () => {
    expect(filterRecipes(recipes, {})).toHaveLength(30);
  });
});

describe('sortRecipes', () => {
  it('sorts by time, ingredient count and name', () => {
    const quick = sortRecipes(recipes, 'quickest');
    for (let i = 1; i < quick.length; i++) expect(totalMinutes(quick[i])).toBeGreaterThanOrEqual(totalMinutes(quick[i - 1]));
    const few = sortRecipes(recipes, 'fewest-ingredients');
    expect(few[0].ingredients.length).toBeLessThanOrEqual(few[29].ingredients.length);
    expect(sortRecipes(recipes, 'az')[0].name).toBe('Cheese corn paratha');
    expect(sortRecipes(recipes, 'collection')).toEqual(recipes);
  });
});

describe('helpers', () => {
  it('only exposes filter values present in the data', () => {
    expect(availableDifficulties(recipes)).toEqual(['Easy']);
    expect(availableValues(recipes, 'cuisine')).toEqual([]);
  });

  it('picks a stable recipe of the day', () => {
    const d = new Date(2026, 9, 22);
    expect(recipeOfTheDay(recipes, d)).toBe(recipeOfTheDay(recipes, new Date(2026, 9, 22, 23)));
  });
});

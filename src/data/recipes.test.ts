import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { categories } from './categories';
import { getRecipe, recipes } from './recipes';
import { EXPECTED_RECIPE_COUNT, sourceIndex } from './source-index';

const sourceMarkdown = readFileSync(new URL('../../docs/source/30-easy-recipes.md', import.meta.url), 'utf8');

describe('recipe database', () => {
  it(`contains exactly ${EXPECTED_RECIPE_COUNT} recipes`, () => {
    expect(recipes).toHaveLength(EXPECTED_RECIPE_COUNT);
  });

  it('accounts for every recipe in the source index, in the right category', () => {
    const indexed = Object.entries(sourceIndex).flatMap(([cat, names]) => names.map((n) => ({ cat, n })));
    expect(indexed).toHaveLength(EXPECTED_RECIPE_COUNT);
    for (const { cat, n } of indexed) {
      const r = recipes.find((x) => x.name === n);
      expect(r, `missing source recipe "${n}"`).toBeDefined();
      expect(categories.find((c) => c.id === r!.category)?.sourceName).toBe(cat);
    }
  });

  it('matches every "## " recipe heading in the source document', () => {
    const headings = [...sourceMarkdown.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
    expect(headings).toHaveLength(EXPECTED_RECIPE_COUNT);
    expect(recipes.map((r) => r.name)).toEqual(headings);
  });

  it('has unique ids and URL-safe slugs', () => {
    const ids = recipes.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(new Set(recipes.map((r) => r.name.toLowerCase())).size).toBe(ids.length);
  });

  it('every recipe is complete: ingredients, method, cook steps, times', () => {
    for (const r of recipes) {
      expect(r.ingredients.length, r.name).toBeGreaterThan(0);
      expect(r.method.length, r.name).toBeGreaterThan(0);
      expect(r.cookWithMe.length, r.name).toBeGreaterThan(0);
      expect(r.serves, r.name).toBeGreaterThan(0);
      expect(r.prepMinutes, r.name).toBeGreaterThanOrEqual(0);
      expect(r.cookMinutes, r.name).toBeGreaterThanOrEqual(0);
    }
  });

  it('keeps ingredient lines and steps verbatim from the source', () => {
    const flat = sourceMarkdown.replace(/\s+/g, ' ').replace(/--/g, '–');
    for (const r of recipes) {
      for (const ing of r.ingredients) expect(flat, `${r.name}: ${ing.text}`).toContain(ing.text);
      for (const step of r.method) expect(flat, `${r.name}: ${step}`).toContain(step);
    }
  });

  it('parsed quantity + unit + item reassemble to the original line', () => {
    for (const r of recipes) {
      for (const ing of r.ingredients) {
        const rebuilt = [ing.quantity == null ? null : String(ing.quantity), ing.unit, ing.item]
          .filter(Boolean)
          .join(' ');
        expect(rebuilt).toBe(ing.text);
      }
    }
  });

  it('looks recipes up by id', () => {
    expect(getRecipe('shortcut-aloo-paratha')?.name).toBe('Shortcut aloo paratha');
    expect(getRecipe('nope')).toBeUndefined();
    expect(getRecipe(undefined)).toBeUndefined();
  });
});

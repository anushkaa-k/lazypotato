import { describe, expect, it } from 'vitest';
import { getRecipe, recipes } from '../data/recipes';
import {
  ingredientKeys,
  ingredientVocabulary,
  matchRecipe,
  normaliseIngredient,
  rankRecipes,
  resolveUserIngredient,
  splitIngredientInput,
} from './ingredients';

describe('normaliseIngredient', () => {
  it('is tolerant of case, plurals, descriptors and common names', () => {
    expect(normaliseIngredient('  Tomatoes ')).toBe('tomato');
    expect(normaliseIngredient('POTATOES')).toBe('potato');
    expect(normaliseIngredient('shredded cheese')).toBe('cheese');
    expect(normaliseIngredient('Cilantro')).toBe('coriander');
    expect(normaliseIngredient('curd')).toBe('yogurt');
    expect(normaliseIngredient('capsicum')).toBe('bell pepper');
    expect(normaliseIngredient('chili flakes')).toBe('chilli flakes');
    expect(normaliseIngredient('frozen peas')).toBe('pea');
    expect(normaliseIngredient('garbanzo beans')).toBe('chickpea');
    expect(normaliseIngredient('berries')).toBe('berry');
  });
});

describe('ingredientKeys', () => {
  it('splits alternatives', () => {
    const r = getRecipe('shortcut-aloo-paratha')!;
    expect(ingredientKeys(r.ingredients[1])).toEqual(['tortilla', 'paratha']);
    expect(ingredientKeys(r.ingredients[5])).toEqual(['oil', 'ghee']);
    const bowl = getRecipe('paneer-burrito-bowl')!;
    expect(ingredientKeys(bowl.ingredients[2])).toEqual(['black bean', 'kidney bean']);
  });
});

describe('matchRecipe', () => {
  it('explains what you have and what is missing', () => {
    const r = getRecipe('chutney-cheese-toastie')!;
    const m = matchRecipe(r, ['bread', 'cheese']);
    expect(m.have.map((x) => x.ingredient.text)).toEqual(['2 slices bread', '0.25 cup shredded cheese']);
    expect(m.missing.map((x) => x.ingredient.text)).toEqual(['1 tbsp green chutney', '2 slices tomato']);
  });

  it('does not let "butter" match "peanut butter"', () => {
    const r = getRecipe('peanut-butter-chocolate-mug-cake')!;
    expect(matchRecipe(r, ['butter']).have).toHaveLength(0);
  });

  it('lets a general word cover a specific ingredient', () => {
    const r = getRecipe('paneer-burrito-bowl')!;
    expect(matchRecipe(r, ['beans']).have.map((x) => x.ingredient.item)).toEqual(['black or kidney beans']);
    const salad = getRecipe('greek-inspired-salad')!;
    expect(matchRecipe(salad, ['olive oil']).have.map((x) => x.ingredient.item)).toEqual(['olive oil']);
  });

  it('can assume pantry basics without counting them as matches', () => {
    const r = getRecipe('one-pot-masala-macaroni')!;
    const m = matchRecipe(r, ['pasta'], { assumeBasics: true });
    expect(m.basics.map((x) => x.ingredient.item)).toEqual(['water']);
    expect(m.have.map((x) => x.ingredient.item)).toEqual(['macaroni']);
  });
});

describe('rankRecipes', () => {
  it('ranks recipes with nothing missing first', () => {
    const ranked = rankRecipes(recipes, ['bread', 'hummus', 'cucumber', 'tomato', 'black pepper']);
    expect(ranked[0].recipe.id).toBe('hummus-cucumber-sandwich');
    expect(ranked[0].missing).toHaveLength(0);
  });

  it('finds potato recipes from "Potatoes"', () => {
    const ids = rankRecipes(recipes, ['Potatoes']).map((m) => m.recipe.id);
    expect(ids).toEqual(
      expect.arrayContaining(['shortcut-aloo-paratha', 'shortcut-pav-bhaji', 'microwave-masala-potato-chaat']),
    );
    expect(ids).toHaveLength(3);
  });

  it('returns nothing for empty or unknown input', () => {
    expect(rankRecipes(recipes, [])).toEqual([]);
    expect(rankRecipes(recipes, ['   '])).toEqual([]);
    expect(rankRecipes(recipes, ['dragonfruit'])).toEqual([]);
  });

  it('does not count pantry basics alone as a match', () => {
    expect(rankRecipes(recipes, ['flour'], { assumeBasics: true }).length).toBe(2);
    expect(rankRecipes(recipes, ['xyz'], { assumeBasics: true })).toEqual([]);
  });
});

describe('user input helpers', () => {
  const vocab = ingredientVocabulary(recipes).map((v) => v.key);

  it('fixes small typos against the known vocabulary', () => {
    expect(resolveUserIngredient('panner', vocab)).toBe('paneer');
    expect(resolveUserIngredient('tomatoe', vocab)).toBe('tomato');
    expect(resolveUserIngredient('spinnach', vocab)).toBe('spinach');
    expect(resolveUserIngredient('kiwi', vocab)).toBe('kiwi');
  });

  it('splits comma and "and" separated input', () => {
    expect(splitIngredientInput('eggs, tomato and rice')).toEqual(['eggs', 'tomato', 'rice']);
  });

  it('builds a vocabulary with the most common ingredients first', () => {
    const top = ingredientVocabulary(recipes).slice(0, 5).map((v) => v.key);
    expect(top).toContain('cheese');
  });
});

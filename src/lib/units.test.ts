import { describe, expect, it } from 'vitest';
import type { Ingredient } from '../data/types';
import { formatQuantity } from './format';
import { displayIngredient } from './units';

const ing = (text: string, quantity: number | null, unit: Ingredient['unit'], item: string): Ingredient => ({
  text,
  quantity,
  unit,
  item,
});

const paneer = ing('100 g paneer', 100, 'g', 'paneer');
const milk = ing('0.5 cup milk', 0.5, 'cup', 'milk');
const water = ing('2 cups water', 2, 'cups', 'water');
const spinach = ing('1 cup spinach', 1, 'cup', 'spinach');
const potato = ing('1 medium potato', 1, null, 'medium potato');
const garlic = ing('1 clove garlic', 1, 'clove', 'garlic');
const peas = ing('0.33 cup frozen peas', 0.33, 'cup', 'frozen peas');

describe('formatQuantity', () => {
  it('uses kitchen fractions', () => {
    expect(formatQuantity(0.25)).toBe('¼');
    expect(formatQuantity(0.33)).toBe('⅓');
    expect(formatQuantity(0.5)).toBe('½');
    expect(formatQuantity(0.75)).toBe('¾');
    expect(formatQuantity(1.5)).toBe('1½');
    expect(formatQuantity(2)).toBe('2');
    expect(formatQuantity(0.66)).toBe('⅔');
  });
});

describe('displayIngredient', () => {
  it('keeps original units at 1x, writing decimals as kitchen fractions', () => {
    expect(displayIngredient(paneer, 1, 'original')).toMatchObject({ text: '100 g paneer', changed: false });
    expect(displayIngredient(peas, 1, 'original')).toMatchObject({ text: '⅓ cup frozen peas', changed: false, original: '0.33 cup frozen peas' });
    expect(displayIngredient(water, 1, 'original').text).toBe('2 cups water');
    expect(displayIngredient(garlic, 1, 'original').text).toBe('1 clove garlic');
  });

  it('converts grams to ounces for US', () => {
    expect(displayIngredient(paneer, 1, 'us').text).toBe('about 3½ oz paneer');
    expect(displayIngredient(ing('90 g pasta', 90, 'g', 'pasta'), 1, 'us').text).toBe('about 3 oz pasta');
  });

  it('converts liquid cups to mL for metric, but leaves solids in cups', () => {
    expect(displayIngredient(milk, 1, 'metric').text).toBe('120 mL milk');
    expect(displayIngredient(water, 1, 'metric').text).toBe('470 mL water');
    expect(displayIngredient(spinach, 1, 'metric')).toMatchObject({ text: '1 cup spinach', changed: false });
  });

  it('never converts counts, cloves or pinches', () => {
    expect(displayIngredient(potato, 1, 'metric').text).toBe('1 medium potato');
    expect(displayIngredient(garlic, 1, 'us').text).toBe('1 clove garlic');
  });

  it('scales quantities with sensible plurals', () => {
    expect(displayIngredient(potato, 2, 'original').text).toBe('2 medium potatoes');
    expect(displayIngredient(garlic, 3, 'original').text).toBe('3 cloves garlic');
    expect(displayIngredient(milk, 2, 'original').text).toBe('1 cup milk');
    expect(displayIngredient(spinach, 2, 'original').text).toBe('2 cups spinach');
    expect(displayIngredient(paneer, 2, 'original').text).toBe('200 g paneer');
    expect(displayIngredient(peas, 3, 'original').text).toBe('1 cup frozen peas');
  });

  it('scales then converts', () => {
    expect(displayIngredient(paneer, 2, 'us').text).toBe('about 7 oz paneer');
    expect(displayIngredient(milk, 2, 'metric').text).toBe('240 mL milk');
  });

  it('keeps the original text for reference and never mutates the source', () => {
    const before = JSON.stringify(paneer);
    const d = displayIngredient(paneer, 3, 'us');
    expect(d.original).toBe('100 g paneer');
    expect(JSON.stringify(paneer)).toBe(before);
  });

  it('leaves lines without a quantity alone', () => {
    const odd = ing('salt to taste', null, null, 'salt to taste');
    expect(displayIngredient(odd, 2, 'metric').text).toBe('salt to taste');
  });
});

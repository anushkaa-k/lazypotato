import type { Ingredient, SourceUnit } from '../data/types';
import { formatQuantity } from './format';

export type UnitSystem = 'original' | 'us' | 'metric';

export const UNIT_SYSTEMS: { id: UnitSystem; label: string; hint: string }[] = [
  { id: 'original', label: 'Original', hint: 'The units the recipe was written in' },
  { id: 'us', label: 'US', hint: 'Ounces for weights, cups and spoons for volume' },
  { id: 'metric', label: 'Metric', hint: 'Grams and millilitres where conversion is reliable' },
];

const GRAMS_PER_OUNCE = 28.3495;
const ML_PER_CUP = 236.588; // US customary cup
const ML_PER_TBSP = 14.787;

/**
 * Liquids can be converted between cups and millilitres without changing what you measure.
 * Solids measured in cups (spinach, cheese, rice…) are left alone: turning them into grams
 * would need a density guess, and "235 mL spinach" isn't something anyone measures.
 */
const LIQUID_PATTERN =
  /\b(milk|water|oil|yogurt|cream|juice|soy sauce|crushed tomatoes)\b/i;

export interface DisplayIngredient {
  /** What to show: quantity + unit + item, already scaled and converted. */
  text: string;
  /** Exactly what the source says (unscaled). */
  original: string;
  /** True if the amount was scaled or converted (not just written as a fraction). */
  changed: boolean;
  converted: boolean;
}

const UNIT_FORMS: Record<string, [string, string]> = {
  cup: ['cup', 'cups'],
  cups: ['cup', 'cups'],
  tbsp: ['tbsp', 'tbsp'],
  tsp: ['tsp', 'tsp'],
  g: ['g', 'g'],
  clove: ['clove', 'cloves'],
  cloves: ['clove', 'cloves'],
  pinch: ['pinch', 'pinches'],
  piece: ['piece', 'pieces'],
  pieces: ['piece', 'pieces'],
  slice: ['slice', 'slices'],
  slices: ['slice', 'slices'],
};

function unitLabel(unit: SourceUnit, qty: number): string {
  const forms = UNIT_FORMS[unit];
  return qty > 1 ? forms[1] : forms[0];
}

/** "medium potato" -> "medium potatoes" for count items when there's more than one. */
function pluraliseItem(item: string, qty: number): string {
  if (qty <= 1) return item;
  return item.replace(/\b(potato|tomato)$/i, '$1es').replace(/\b(onion)$/i, '$1s');
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function formatMl(ml: number): string {
  const rounded = ml < 100 ? roundTo(ml, 5) : roundTo(ml, 10);
  return `${Math.max(rounded, 5)} mL`;
}

function formatGrams(g: number): string {
  return `${g < 20 ? Math.round(g) : roundTo(g, 5)} g`;
}

function formatOunces(g: number): string {
  const oz = g / GRAMS_PER_OUNCE;
  const rounded = oz < 1 ? Math.round(oz * 4) / 4 : Math.round(oz * 2) / 2;
  return `${formatQuantity(rounded || 0.25)} oz`;
}

export function isLiquid(item: string): boolean {
  return LIQUID_PATTERN.test(item);
}

/**
 * Scales and converts one ingredient for display. The source ingredient is never mutated.
 */
export function displayIngredient(
  ing: Ingredient,
  factor: number,
  system: UnitSystem,
): DisplayIngredient {
  if (ing.quantity == null) return { text: ing.text, original: ing.text, changed: false, converted: false };

  const qty = ing.quantity * factor;
  const base = { original: ing.text, changed: factor !== 1 };

  if (ing.unit === 'g') {
    if (system === 'us') return { ...base, changed: true, text: `about ${formatOunces(qty)} ${ing.item}`, converted: true };
    return { ...base, text: `${formatGrams(qty)} ${ing.item}`, converted: false };
  }

  if (system === 'metric' && isLiquid(ing.item)) {
    if (ing.unit === 'cup' || ing.unit === 'cups') {
      return { ...base, changed: true, text: `${formatMl(qty * ML_PER_CUP)} ${ing.item}`, converted: true };
    }
    if (ing.unit === 'tbsp' && qty >= 2) {
      return { ...base, changed: true, text: `${formatMl(qty * ML_PER_TBSP)} ${ing.item}`, converted: true };
    }
  }

  // Same units: just tidy the number (0.5 -> ½). The quantity itself is unchanged.
  const q = formatQuantity(qty);
  if (!ing.unit) return { ...base, text: `${q} ${pluraliseItem(ing.item, qty)}`, converted: false };
  return { ...base, text: `${q} ${unitLabel(ing.unit, qty)} ${ing.item}`, converted: false };
}

/** Servings can be scaled when at least one ingredient has a numeric quantity. */
export function canScale(ingredients: Ingredient[]): boolean {
  return ingredients.some((i) => i.quantity != null);
}

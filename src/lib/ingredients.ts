import type { Ingredient, Recipe } from '../data/types';

/**
 * Ingredient matching for the recipe finder.
 *
 * Each recipe ingredient becomes one "need" with one or more acceptable keys
 * ("tortillas or paratha dough" -> tortilla | paratha dough). What the user types is
 * normalised the same way, so "Tomatoes", "tomato" and "  TOMATO " all match.
 *
 * To improve matching, edit ALIASES (other names for the same thing), ITEM_OVERRIDES
 * (source items that need hand-splitting) or DESCRIPTORS (words that don't change what
 * the ingredient is).
 */

/** Words that describe preparation or form, not the ingredient itself. */
const DESCRIPTORS = new Set([
  'shredded', 'grated', 'chopped', 'crumbled', 'canned', 'frozen', 'cooked', 'roasted',
  'plain', 'fresh', 'small', 'medium', 'large', 'melted', 'neutral', 'all-purpose',
  'crushed', 'sliced', 'minced', 'dried', 'ripe', 'boiled', 'raw', 'whole',
]);

/** Other names -> canonical key. Keys and values are already lower-case and singular. */
const ALIASES: Record<string, string> = {
  cilantro: 'coriander',
  'coriander leaf': 'coriander',
  dhania: 'coriander',
  chili: 'chilli',
  chilly: 'chilli',
  'green chili': 'green chilli',
  'chili powder': 'chilli powder',
  'red chilli powder': 'chilli powder',
  'chili flake': 'chilli flakes',
  'chilli flake': 'chilli flakes',
  'red pepper flake': 'chilli flakes',
  yoghurt: 'yogurt',
  curd: 'yogurt',
  dahi: 'yogurt',
  'greek yogurt': 'yogurt',
  'vanilla yogurt': 'yogurt',
  capsicum: 'bell pepper',
  garbanzo: 'chickpea',
  'garbanzo bean': 'chickpea',
  chana: 'chickpea',
  'kabuli chana': 'chickpea',
  palak: 'spinach',
  jeera: 'cumin',
  'cumin seed': 'cumin',
  'cumin powder': 'cumin',
  aloo: 'potato',
  pyaz: 'onion',
  lahsun: 'garlic',
  pudina: 'mint',
  chawal: 'rice',
  dal: 'lentil',
  daal: 'lentil',
  dhal: 'lentil',
  macaroni: 'pasta',
  spaghetti: 'pasta',
  penne: 'pasta',
  fusilli: 'pasta',
  noodle: 'pasta',
  lemon: 'lemon juice',
  lime: 'lime juice',
  'crushed tomato': 'tomato',
  'tomato puree': 'tomato',
  roti: 'paratha',
  'paratha dough': 'paratha',
  wrap: 'tortilla',
  'pav bread': 'pav',
  bun: 'pav',
  'bread roll': 'pav',
  'dinner roll': 'pav',
  'mixed veg': 'mixed vegetables',
  'mixed vegetable': 'mixed vegetables',
  'frozen vegetable': 'mixed vegetables',
  vegetable: 'mixed vegetables',
  cabbage: 'cabbage',
  'coleslaw mix': 'cabbage',
  coleslaw: 'cabbage',
  'chocolate chip': 'chocolate chips',
  cocoa: 'cocoa powder',
  maida: 'flour',
  'all purpose flour': 'flour',
  'plain flour': 'flour',
  biscuit: 'biscuit',
  cookie: 'biscuit',
  'cottage cheese': 'paneer',
  'feta cheese': 'feta',
  'black pepper powder': 'black pepper',
  'peanut butter': 'peanut butter',
  peanut: 'peanut',
  groundnut: 'peanut',
  sesame: 'sesame seeds',
  'sesame seed': 'sesame seeds',
  til: 'sesame seeds',
  honey: 'honey',
  'italian herb': 'italian seasoning',
  'mixed herb': 'italian seasoning',
  oregano: 'italian seasoning',
  'hari chutney': 'green chutney',
  'coriander chutney': 'green chutney',
  'mint chutney': 'green chutney',
  'imli chutney': 'tamarind chutney',
  'sweet chutney': 'tamarind chutney',
  'garlic clove': 'garlic',
  sugar: 'sugar',
  'olive oil': 'olive oil',
  'vegetable oil': 'oil',
  'sunflower oil': 'oil',
  'canola oil': 'oil',
};

/** Source items whose "or" can't be split mechanically. */
const ITEM_OVERRIDES: Record<string, string[]> = {
  'black or kidney beans': ['black bean', 'kidney bean'],
  'plain or vanilla yogurt': ['yogurt'],
  'cooked or canned lentils': ['lentil'],
  'neutral oil or melted butter': ['oil', 'butter'],
  'pav/bread rolls': ['pav'],
  'cilantro/coriander': ['coriander'],
  'granola or crushed biscuits': ['granola', 'biscuit'],
  'shredded cabbage or coleslaw mix': ['cabbage'],
};

/**
 * Keys that only match exactly. Without this, typing "butter" would match "peanut butter".
 * Every other key also matches by whole words ("beans" -> "black beans", "olive oil" covers "oil").
 */
const ATOMIC = new Set([
  'peanut butter', 'green chutney', 'tamarind chutney', 'pav bhaji masala', 'garam masala',
  'tikka masala', 'chaat masala', 'baking powder', 'cocoa powder', 'chocolate chips',
  'soy sauce', 'lemon juice', 'lime juice', 'sesame seeds', 'italian seasoning',
  'chilli powder', 'chilli flakes', 'green chilli', 'mixed vegetables', 'bell pepper',
  'black pepper',
]);

/** Ingredients most kitchens always have. The finder can assume these on request. */
export const PANTRY_BASICS = ['salt', 'water', 'oil'] as const;

function singular(word: string): string {
  if (word.length <= 3) return word;
  if (/(ss|us)$/.test(word)) return word;
  if (word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (/(toes|shes|ches|xes)$/.test(word)) return word.slice(0, -2);
  if (word.endsWith('s')) return word.slice(0, -1);
  return word;
}

/** Lower-case, singular, descriptors removed, aliases applied. */
export function normaliseIngredient(raw: string): string {
  const words = raw
    .toLowerCase()
    .replace(/[^a-z\s/-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(singular)
    .filter((w) => !DESCRIPTORS.has(w));
  const phrase = words.join(' ');
  if (ALIASES[phrase]) return ALIASES[phrase];
  // Try dropping words from the front ("red chilli powder" -> "chilli powder").
  for (let i = 1; i < words.length; i++) {
    const tail = words.slice(i).join(' ');
    if (ALIASES[tail] && ATOMIC.has(ALIASES[tail])) return ALIASES[tail];
  }
  return phrase;
}

/** The acceptable keys for one recipe ingredient. */
export function ingredientKeys(ing: Ingredient): string[] {
  const item = ing.item.toLowerCase().trim();
  const parts = ITEM_OVERRIDES[item] ?? item.split(/\s+or\s+|\//);
  return [...new Set(parts.map(normaliseIngredient).filter(Boolean))];
}

function keyMatches(have: string, need: string): boolean {
  if (have === need) return true;
  if (ATOMIC.has(have) || ATOMIC.has(need)) return false;
  const h = have.split(' ');
  const n = need.split(' ');
  // Same head noun required, so "olive oil" never matches "olive".
  if (h[h.length - 1] !== n[n.length - 1]) return false;
  // "bean" covers "black bean"; "olive oil" covers "oil".
  return h.every((w) => n.includes(w)) || n.every((w) => h.includes(w));
}

export interface IngredientMatch {
  ingredient: Ingredient;
  keys: string[];
  status: 'have' | 'basic' | 'missing';
}

export interface RecipeMatch {
  recipe: Recipe;
  matches: IngredientMatch[];
  have: IngredientMatch[];
  basics: IngredientMatch[];
  missing: IngredientMatch[];
  /** 0..1, share of ingredients covered (basics included). */
  coverage: number;
}

export interface MatchOptions {
  assumeBasics?: boolean;
}

export function matchRecipe(recipe: Recipe, haveRaw: string[], opts: MatchOptions = {}): RecipeMatch {
  const have = haveRaw.map(normaliseIngredient).filter(Boolean);
  const matches: IngredientMatch[] = recipe.ingredients.map((ingredient) => {
    const keys = ingredientKeys(ingredient);
    const owned = keys.some((k) => have.some((h) => keyMatches(h, k)));
    if (owned) return { ingredient, keys, status: 'have' };
    const basic =
      opts.assumeBasics && keys.some((k) => (PANTRY_BASICS as readonly string[]).includes(k));
    return { ingredient, keys, status: basic ? 'basic' : 'missing' };
  });
  const haveList = matches.filter((m) => m.status === 'have');
  const basics = matches.filter((m) => m.status === 'basic');
  const missing = matches.filter((m) => m.status === 'missing');
  return {
    recipe,
    matches,
    have: haveList,
    basics,
    missing,
    coverage: matches.length ? (haveList.length + basics.length) / matches.length : 0,
  };
}

/**
 * Ranks recipes by how well they fit what's in the kitchen. A recipe needs at least one
 * real ingredient match (pantry basics alone don't count). Fewest missing first, then the
 * most ingredients used, then the original order.
 */
export function rankRecipes(recipes: Recipe[], have: string[], opts: MatchOptions = {}): RecipeMatch[] {
  if (!have.some((h) => normaliseIngredient(h))) return [];
  return recipes
    .map((r, index) => ({ m: matchRecipe(r, have, opts), index }))
    .filter(({ m }) => m.have.length > 0)
    .sort(
      (a, b) =>
        a.m.missing.length - b.m.missing.length ||
        b.m.have.length - a.m.have.length ||
        b.m.coverage - a.m.coverage ||
        a.index - b.index,
    )
    .map(({ m }) => m);
}

/* ---------- vocabulary for suggestions and typo tolerance ---------- */

export function ingredientVocabulary(recipes: Recipe[]): { key: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of recipes) {
    const seen = new Set<string>();
    for (const ing of r.ingredients) for (const k of ingredientKeys(ing)) seen.add(k);
    for (const k of seen) counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

function editDistance(a: string, b: string): number {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

/**
 * Cleans up what the user typed: normalises it and fixes small typos against the known
 * vocabulary ("tomatoe" -> "tomato", "panner" -> "paneer"). Unknown words are kept as-is.
 */
export function resolveUserIngredient(raw: string, vocabulary: string[]): string {
  const n = normaliseIngredient(raw);
  if (!n || vocabulary.includes(n)) return n;
  if (vocabulary.some((v) => keyMatches(n, v))) return n;
  const maxDist = n.length >= 8 ? 2 : n.length >= 4 ? 1 : 0;
  let best: string | undefined;
  let bestDist = Infinity;
  for (const v of vocabulary) {
    const d = editDistance(n, v);
    if (d < bestDist) {
      best = v;
      bestDist = d;
    }
  }
  return best && bestDist <= maxDist ? best : n;
}

/** Splits "eggs, tomato and rice" into separate ingredients. */
export function splitIngredientInput(input: string): string[] {
  return input
    .split(/,|;|\n|\band\b|\+|&/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

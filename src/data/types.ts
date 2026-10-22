/** Units that appear in the source cookbook. `null` means a count ("1 medium potato"). */
export type SourceUnit =
  | 'cup'
  | 'cups'
  | 'tbsp'
  | 'tsp'
  | 'g'
  | 'clove'
  | 'cloves'
  | 'pinch'
  | 'piece'
  | 'pieces'
  | 'slice'
  | 'slices';

export interface Ingredient {
  /** The ingredient line exactly as written in the source. Never modified. */
  text: string;
  quantity: number | null;
  unit: SourceUnit | null;
  /** Everything after the quantity and unit, e.g. "shredded cheese". */
  item: string;
}

export type CategoryId =
  | 'sandwiches'
  | 'parathas-wraps'
  | 'pasta'
  | 'sauces-chutneys'
  | 'salads'
  | 'bowls'
  | 'desserts'
  | 'occasional-meals';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

/** Shape of each entry in recipes.generated.json (output of scripts/extract-recipes.py). */
export interface SourceRecipe {
  id: string;
  name: string;
  sourceCategory: string;
  serves: number;
  prepMinutes: number;
  cookMinutes: number;
  difficulty: string;
  ingredients: Ingredient[];
  method: string[];
  cookWithMe: string[];
}

export interface Recipe {
  /** Stable id, also used as the URL slug. Never change it once published: favourites depend on it. */
  id: string;
  name: string;
  category: CategoryId;
  /** Optional fields: the source doesn't provide these yet. Leave undefined rather than guessing. */
  description?: string;
  cuisine?: string;
  mealType?: string;
  serves: number;
  prepMinutes: number;
  cookMinutes: number;
  difficulty: Difficulty;
  ingredients: Ingredient[];
  method: string[];
  /** Steps for Cook With Me. Falls back to `method` when absent. */
  cookWithMe: string[];
  /** Optional per-step tips, keyed by step index. */
  tips?: Record<number, string>;
}

export interface Category {
  id: CategoryId;
  /** Heading exactly as used in the source document. */
  sourceName: string;
  name: string;
  /** Short UI blurb (site copy, not recipe data). */
  blurb: string;
  illustration: string;
  /** Background tint for the category's artwork. */
  tint: 'lavender' | 'sage' | 'peach' | 'pink';
}

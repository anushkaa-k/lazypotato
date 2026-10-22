import { getCategory } from '../../data/categories';
import type { Recipe } from '../../data/types';
import { getIllustration } from '../../assets/illustrations';

/**
 * Artwork for a recipe. Uses the category illustration for now; add per-recipe art by
 * registering a name in assets/illustrations/index.ts and looking it up here first.
 */
export function RecipeArt({ recipe, className, size = 'md' }: { recipe: Recipe; className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const category = getCategory(recipe.category);
  const Art = getIllustration(`recipe:${recipe.id}`) ?? getIllustration(category?.illustration);
  return (
    <div className={['recipe-art', `recipe-art--${category?.tint ?? 'lavender'}`, `recipe-art--${size}`, className].filter(Boolean).join(' ')}>
      {Art ? <Art /> : <span className="recipe-art__fallback" aria-hidden="true">{recipe.name.charAt(0)}</span>}
    </div>
  );
}

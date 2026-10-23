import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { getCategory } from '../../data/categories';
import type { Recipe } from '../../data/types';
import { FavouriteButton } from './FavouriteButton';
import { RecipeArt } from './RecipeArt';
import { RecipeMetaInline } from './RecipeMeta';

/**
 * The whole card is clickable through the title link (its ::after covers the card),
 * while the save button stays a separate control.
 */
export function RecipeCard({ recipe, children, compact }: { recipe: Recipe; children?: ReactNode; compact?: boolean }) {
  const category = getCategory(recipe.category);
  return (
    <article className={`recipe-card${compact ? ' recipe-card--compact' : ''}`}>
      <RecipeArt recipe={recipe} size={compact ? 'sm' : 'md'} />
      <div className="recipe-card__body">
        <p className="recipe-card__cat">{category?.name}</p>
        <h3 className="recipe-card__title">
          <Link to={`/recipe/${recipe.id}`} className="recipe-card__link">
            {recipe.name}
          </Link>
        </h3>
        <RecipeMetaInline recipe={recipe} />
        {children}
      </div>
      <div className="recipe-card__fav">
        <FavouriteButton recipe={recipe} />
      </div>
    </article>
  );
}

export function RecipeGrid({ recipes, children }: { recipes: Recipe[]; children?: (r: Recipe) => ReactNode }) {
  return (
    <ul className="recipe-grid">
      {recipes.map((r) => (
        <li key={r.id}>
          <RecipeCard recipe={r}>{children?.(r)}</RecipeCard>
        </li>
      ))}
    </ul>
  );
}

export function RecipeRow({ recipes }: { recipes: Recipe[] }) {
  return (
    <ul className="recipe-row">
      {recipes.map((r) => (
        <li key={r.id}>
          <RecipeCard recipe={r} compact />
        </li>
      ))}
    </ul>
  );
}

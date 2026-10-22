import { Link } from 'react-router-dom';
import { getIllustration } from '../../assets/illustrations';
import { recipesInCategory } from '../../data/recipes';
import type { Category } from '../../data/types';

export function CategoryCard({ category }: { category: Category }) {
  const Art = getIllustration(category.illustration);
  const count = recipesInCategory(category.id).length;
  return (
    <Link to={`/category/${category.id}`} className={`category-card category-card--${category.tint}`}>
      <span className="category-card__art">{Art ? <Art /> : null}</span>
      <span className="category-card__name">{category.name}</span>
      <span className="category-card__count">{count} {count === 1 ? 'recipe' : 'recipes'}</span>
    </Link>
  );
}

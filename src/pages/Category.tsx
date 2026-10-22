import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '../assets/icons';
import { getIllustration } from '../assets/illustrations';
import { RecipeGrid } from '../components/recipe/RecipeCard';
import { categories, getCategory } from '../data/categories';
import { recipesInCategory } from '../data/recipes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFound } from './NotFound';

export function Category() {
  const { id } = useParams();
  const category = getCategory(id ?? '');
  useDocumentTitle(category?.name ?? 'Not found');
  if (!category) return <NotFound />;
  const Art = getIllustration(category.illustration);
  const list = recipesInCategory(category.id);

  return (
    <div className="container page">
      <Link to="/recipes" className="back-link">
        <ArrowLeftIcon size={18} /> All recipes
      </Link>
      <header className={`category-hero category-hero--${category.tint}`}>
        <div>
          <p className="hand">{category.blurb}</p>
          <h1 className="page-title">{category.name}</h1>
          <p className="muted">
            {list.length} {list.length === 1 ? 'recipe' : 'recipes'}
          </p>
        </div>
        {Art ? <Art className="category-hero__art" /> : null}
      </header>
      <RecipeGrid recipes={list} />
      <nav className="category-others" aria-label="Other categories">
        <h2 className="category-others__title">More to explore</h2>
        <ul className="chip-row">
          {categories
            .filter((c) => c.id !== category.id)
            .map((c) => (
              <li key={c.id}>
                <Link to={`/category/${c.id}`} className="chip">
                  {c.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}

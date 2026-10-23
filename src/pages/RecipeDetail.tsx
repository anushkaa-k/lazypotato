import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, ListIcon } from '../assets/icons';
import { MascotCook } from '../assets/illustrations';
import { FavouriteButton } from '../components/recipe/FavouriteButton';
import { IngredientList } from '../components/recipe/IngredientList';
import { RecipeArt } from '../components/recipe/RecipeArt';
import { RecipeBadges, RecipeMetaGrid } from '../components/recipe/RecipeMeta';
import { RecipeRow } from '../components/recipe/RecipeCard';
import { UnitToggle } from '../components/recipe/UnitToggle';
import { ButtonLink } from '../components/ui/Button';
import { Section } from '../components/ui/Section';
import { Stepper } from '../components/ui/Stepper';
import { getCategory } from '../data/categories';
import { getRecipe, recipesInCategory } from '../data/recipes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useTrackRecentlyViewed } from '../hooks/useRecentlyViewed';
import { MAX_SERVINGS, servesQuery, useServings } from '../hooks/useServings';
import { loadProgress } from '../lib/cookSession';
import { canScale } from '../lib/units';
import { NotFound } from './NotFound';

export function RecipeDetail() {
  const { id } = useParams();
  const recipe = getRecipe(id);
  useDocumentTitle(recipe?.name ?? 'Not found');
  useTrackRecentlyViewed(recipe?.id);
  const [servings, setServings] = useServings(recipe);

  if (!recipe) return <NotFound />;

  const category = getCategory(recipe.category);
  const cookHref = `/recipe/${recipe.id}/cook${servesQuery(servings, recipe)}`;
  const inProgress = loadProgress(recipe.id);
  const more = recipesInCategory(recipe.category).filter((r) => r.id !== recipe.id);
  const scalable = canScale(recipe.ingredients);

  return (
    <article className="container page recipe">
      <Link to={category ? `/category/${category.id}` : '/recipes'} className="back-link">
        <ArrowLeftIcon size={18} /> {category?.name ?? 'All recipes'}
      </Link>

      {inProgress !== undefined ? (
        <div className="resume" role="status">
          <MascotCook className="resume__art" />
          <p>
            You’re cooking this! You were on <strong>step {inProgress + 1} of {recipe.cookWithMe.length}</strong>.
          </p>
          <ButtonLink to={cookHref} variant="primary" iconAfter={<ArrowRightIcon size={18} />}>
            Continue cooking
          </ButtonLink>
        </div>
      ) : null}

      <header className="recipe__head">
        <RecipeArt recipe={recipe} size="lg" className="recipe__art" />
        <div className="recipe__intro">
          <p className="recipe__cat">
            <Link to={`/category/${recipe.category}`}>{category?.name}</Link>
          </p>
          <h1 className="recipe__title">{recipe.name}</h1>
          {recipe.description ? <p className="recipe__desc">{recipe.description}</p> : null}
          <RecipeBadges recipe={recipe} />
          <RecipeMetaGrid recipe={recipe} />
          <div className="recipe__actions">
            <ButtonLink to={cookHref} variant="primary" size="lg" icon={<MascotCook className="btn-mascot" />}>
              Cook with me
            </ButtonLink>
            <FavouriteButton recipe={recipe} withLabel />
          </div>
          <p className="recipe__hint hand">“Cook with me” walks you through one step at a time ♡</p>
        </div>
      </header>

      <div className="recipe__cols">
        <section className="recipe__panel" aria-labelledby="ing-title">
          <div className="recipe__panel-head">
            <h2 id="ing-title">Ingredients</h2>
            <span className="muted recipe__count">{recipe.ingredients.length} items</span>
          </div>
          <div className="recipe__controls">
            {scalable ? (
              <div className="recipe__servings">
                <span className="recipe__control-label" id="servings-label">
                  Servings
                </span>
                <Stepper label="Servings" value={servings} max={MAX_SERVINGS} onChange={setServings} />
              </div>
            ) : null}
            <UnitToggle />
          </div>
          {servings !== recipe.serves ? (
            <p className="recipe__scale-note">
              Scaled from {recipe.serves} to {servings}. Times and amounts written inside the steps stay as the recipe says.
            </p>
          ) : null}
          <IngredientList recipe={recipe} servings={servings} />
        </section>

        <section className="recipe__panel recipe__panel--method" aria-labelledby="method-title">
          <div className="recipe__panel-head">
            <h2 id="method-title">Method</h2>
            <ListIcon />
          </div>
          <ol className="method">
            {recipe.method.map((step, i) => (
              <li key={i} className="method__step">
                <span className="method__num" aria-hidden="true">
                  {i + 1}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <div className="recipe__cta">
            <p className="hand">ready when you are</p>
            <ButtonLink to={cookHref} variant="primary" iconAfter={<ArrowRightIcon size={18} />}>
              Start cooking, step by step
            </ButtonLink>
          </div>
        </section>
      </div>

      {more.length ? (
        <Section title={`More ${category?.name.toLowerCase() ?? 'recipes'}`} note="you might also like" id="more">
          <RecipeRow recipes={more} />
        </Section>
      ) : null}
    </article>
  );
}

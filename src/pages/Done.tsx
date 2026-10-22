import { useParams } from 'react-router-dom';
import { HeartIcon } from '../assets/icons';
import { MascotCelebrate } from '../assets/illustrations';
import { Button, ButtonLink } from '../components/ui/Button';
import { FRIEND_NAME } from '../config';
import { getRecipe } from '../data/recipes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFavourites } from '../hooks/useFavourites';
import { servesQuery, useServings } from '../hooks/useServings';
import { NotFound } from './NotFound';

export function Done() {
  const { id } = useParams();
  const recipe = getRecipe(id);
  useDocumentTitle(recipe ? `You made ${recipe.name}!` : 'Not found');
  const { isSaved, toggle } = useFavourites();
  const [servings] = useServings(recipe);
  if (!recipe) return <NotFound />;
  const saved = isSaved(recipe.id);

  return (
    <div className="done">
      <MascotCelebrate className="done__art" title="The potato mascot celebrating with hearts and sparkles" />
      <p className="hand">yay!!</p>
      <h1 className="done__title">You did it, {FRIEND_NAME}!</h1>
      <p className="page-lede">
        <strong>{recipe.name}</strong> is ready. You fed yourself today, and that’s a big deal. Sit down, eat it warm and enjoy every bite.
      </p>
      <div className="done__actions">
        <Button variant={saved ? 'secondary' : 'primary'} onClick={() => toggle(recipe.id)} aria-pressed={saved} icon={<HeartIcon filled={saved} size={20} />}>
          {saved ? 'Saved to favourites' : 'Save this one'}
        </Button>
        <ButtonLink to="/recipes">Cook something else</ButtonLink>
        <ButtonLink to={`/recipe/${recipe.id}${servesQuery(servings, recipe)}`} variant="ghost">
          Back to the recipe
        </ButtonLink>
      </div>
    </div>
  );
}

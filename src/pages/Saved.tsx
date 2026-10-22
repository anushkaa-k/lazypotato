import { MascotSleep } from '../assets/illustrations';
import { RecipeGrid } from '../components/recipe/RecipeCard';
import { ButtonLink } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFavourites } from '../hooks/useFavourites';

export function Saved() {
  useDocumentTitle('Saved recipes');
  const { saved } = useFavourites();

  return (
    <div className="container page">
      <header className="page-head">
        <p className="hand">your little collection</p>
        <h1 className="page-title">Saved recipes</h1>
        {saved.length ? (
          <p className="page-lede">
            {saved.length} {saved.length === 1 ? 'favourite' : 'favourites'}, saved on this device.
          </p>
        ) : null}
      </header>

      {saved.length ? (
        <RecipeGrid recipes={saved} />
      ) : (
        <EmptyState
          art={MascotSleep}
          title="Nothing saved yet"
          actions={
            <>
              <ButtonLink to="/recipes" variant="primary">
                Browse recipes
              </ButtonLink>
              <ButtonLink to="/find">What can I make?</ButtonLink>
            </>
          }
        >
          <p>The potato is napping until you find a favourite. Tap the heart on any recipe and it’ll be waiting here for you.</p>
        </EmptyState>
      )}
    </div>
  );
}

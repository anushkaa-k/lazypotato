import { HeartIcon } from '../../assets/icons';
import { useFavourites } from '../../hooks/useFavourites';
import type { Recipe } from '../../data/types';

export function FavouriteButton({ recipe, withLabel }: { recipe: Recipe; withLabel?: boolean }) {
  const { isSaved, toggle } = useFavourites();
  const saved = isSaved(recipe.id);
  const label = saved ? `Remove ${recipe.name} from saved` : `Save ${recipe.name}`;
  if (withLabel) {
    return (
      <button type="button" className={`btn btn--secondary fav-btn${saved ? ' fav-btn--on' : ''}`} aria-pressed={saved} onClick={() => toggle(recipe.id)}>
        <HeartIcon filled={saved} size={20} />
        <span>{saved ? 'Saved' : 'Save'}</span>
        <span className="visually-hidden"> {recipe.name}</span>
      </button>
    );
  }
  return (
    <button type="button" className={`icon-btn fav-icon${saved ? ' fav-icon--on' : ''}`} aria-pressed={saved} aria-label={label} title={label} onClick={() => toggle(recipe.id)}>
      <HeartIcon filled={saved} size={20} />
    </button>
  );
}

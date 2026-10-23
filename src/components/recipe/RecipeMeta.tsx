import { ClockIcon, FlameIcon, PeopleIcon } from '../../assets/icons';
import { isNoCook, totalMinutes, usesMicrowave } from '../../data/recipes';
import type { Recipe } from '../../data/types';
import { formatMinutes, plural } from '../../lib/format';
import { Tag } from '../ui/Chip';

/** Compact meta for cards: total time · serves · difficulty. */
export function RecipeMetaInline({ recipe }: { recipe: Recipe }) {
  return (
    <ul className="meta-inline" aria-label="Recipe details">
      <li>
        <ClockIcon size={16} />
        <span>{formatMinutes(totalMinutes(recipe))}</span>
      </li>
      <li>
        <PeopleIcon size={16} />
        <span>Serves {recipe.serves}</span>
      </li>
      <li>
        <FlameIcon size={16} />
        <span>{recipe.difficulty}</span>
      </li>
    </ul>
  );
}

/** Full meta for the recipe page. Only shows what the source provides. */
export function RecipeMetaGrid({ recipe }: { recipe: Recipe }) {
  const items = [
    { label: 'Prep', value: formatMinutes(recipe.prepMinutes) },
    { label: 'Cook', value: recipe.cookMinutes === 0 ? 'No cooking' : formatMinutes(recipe.cookMinutes) },
    { label: 'Total', value: formatMinutes(totalMinutes(recipe)) },
    { label: 'Serves', value: plural(recipe.serves, 'person', 'people') },
    { label: 'Difficulty', value: recipe.difficulty },
    ...(recipe.cuisine ? [{ label: 'Cuisine', value: recipe.cuisine }] : []),
    ...(recipe.mealType ? [{ label: 'Meal', value: recipe.mealType }] : []),
  ];
  return (
    <dl className="meta-grid">
      {items.map((i) => (
        <div key={i.label} className="meta-grid__item">
          <dt>{i.label}</dt>
          <dd>{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Little derived badges. Both come straight from the source data (cook time, step text). */
export function RecipeBadges({ recipe }: { recipe: Recipe }) {
  const noCook = isNoCook(recipe);
  const microwave = usesMicrowave(recipe);
  if (!noCook && !microwave) return null;
  return (
    <div className="badges">
      {noCook ? <Tag tone="sage">No stove needed</Tag> : null}
      {microwave ? <Tag tone="peach">Microwave-friendly</Tag> : null}
    </div>
  );
}

import { categories } from '../../data/categories';
import { recipes } from '../../data/recipes';
import type { CategoryId, Difficulty } from '../../data/types';
import { availableDifficulties, availableValues, TIME_LIMITS, type RecipeFilters, type TimeLimit } from '../../lib/search';
import { Chip } from '../ui/Chip';

const difficulties = availableDifficulties(recipes);
const cuisines = availableValues(recipes, 'cuisine');
const mealTypes = availableValues(recipes, 'mealType');

/** Parse filter state from URL helpers. */
export function filtersFromUrl(get: (k: string) => string | undefined, getList: (k: string) => string[]): RecipeFilters {
  const time = Number(get('time'));
  return {
    query: get('q'),
    categories: getList('cat').filter((c): c is CategoryId => categories.some((x) => x.id === c)),
    maxMinutes: (TIME_LIMITS as number[]).includes(time) ? (time as TimeLimit) : undefined,
    difficulty: difficulties.includes(get('diff') as Difficulty) ? (get('diff') as Difficulty) : undefined,
    noCook: get('nocook') === '1',
    microwave: get('mw') === '1',
    cuisine: get('cuisine'),
    mealType: get('meal'),
  };
}

export function activeFilterCount(f: RecipeFilters): number {
  return (
    (f.categories?.length ? 1 : 0) +
    (f.maxMinutes ? 1 : 0) +
    (f.difficulty ? 1 : 0) +
    (f.noCook ? 1 : 0) +
    (f.microwave ? 1 : 0) +
    (f.cuisine ? 1 : 0) +
    (f.mealType ? 1 : 0)
  );
}

/**
 * Filter controls. Every group has an "Any" option so filters can always be left
 * unspecified. Cuisine and meal type only appear once recipes include that information.
 */
export function RecipeFilterControls({
  filters,
  update,
}: {
  filters: RecipeFilters;
  update: (changes: Record<string, string | string[] | undefined>) => void;
}) {
  const cats = filters.categories ?? [];
  const toggleCat = (id: CategoryId) => update({ cat: cats.includes(id) ? cats.filter((c) => c !== id) : [...cats, id] });

  return (
    <div className="filters">
      <fieldset className="filters__group">
        <legend>Category</legend>
        <div className="chip-row">
          <Chip selected={!cats.length} onClick={() => update({ cat: undefined })}>
            Any
          </Chip>
          {categories.map((c) => (
            <Chip key={c.id} selected={cats.includes(c.id)} onClick={() => toggleCat(c.id)}>
              {c.name}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend>Total time</legend>
        <div className="chip-row">
          <Chip selected={!filters.maxMinutes} onClick={() => update({ time: undefined })}>
            Any
          </Chip>
          {TIME_LIMITS.map((t) => (
            <Chip key={t} selected={filters.maxMinutes === t} onClick={() => update({ time: filters.maxMinutes === t ? undefined : String(t) })}>
              {t} min or less
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend>Difficulty</legend>
        <div className="chip-row">
          <Chip selected={!filters.difficulty} onClick={() => update({ diff: undefined })}>
            Any
          </Chip>
          {difficulties.map((d) => (
            <Chip key={d} selected={filters.difficulty === d} onClick={() => update({ diff: filters.difficulty === d ? undefined : d })}>
              {d}
            </Chip>
          ))}
        </div>
        {difficulties.length === 1 ? <p className="filters__note">Every recipe in the collection is marked {difficulties[0].toLowerCase()} right now.</p> : null}
      </fieldset>

      {cuisines.length ? (
        <fieldset className="filters__group">
          <legend>Cuisine</legend>
          <div className="chip-row">
            <Chip selected={!filters.cuisine} onClick={() => update({ cuisine: undefined })}>
              Any
            </Chip>
            {cuisines.map((c) => (
              <Chip key={c} selected={filters.cuisine === c} onClick={() => update({ cuisine: filters.cuisine === c ? undefined : c })}>
                {c}
              </Chip>
            ))}
          </div>
        </fieldset>
      ) : null}

      {mealTypes.length ? (
        <fieldset className="filters__group">
          <legend>Meal</legend>
          <div className="chip-row">
            <Chip selected={!filters.mealType} onClick={() => update({ meal: undefined })}>
              Any
            </Chip>
            {mealTypes.map((m) => (
              <Chip key={m} selected={filters.mealType === m} onClick={() => update({ meal: filters.mealType === m ? undefined : m })}>
                {m}
              </Chip>
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset className="filters__group">
        <legend>Kitchen</legend>
        <div className="chip-row">
          <Chip selected={!!filters.noCook} onClick={() => update({ nocook: filters.noCook ? undefined : '1' })}>
            No stove needed
          </Chip>
          <Chip selected={!!filters.microwave} onClick={() => update({ mw: filters.microwave ? undefined : '1' })}>
            Microwave-friendly
          </Chip>
        </div>
      </fieldset>
    </div>
  );
}

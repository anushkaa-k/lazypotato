import { useMemo } from 'react';
import { BasketIcon, FilterIcon } from '../assets/icons';
import { MascotPuzzled, MascotWave, SteamDoodle } from '../assets/illustrations';
import { IngredientInput } from '../components/recipe/IngredientInput';
import { MatchExplanation } from '../components/recipe/MatchExplanation';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { activeFilterCount, filtersFromUrl, RecipeFilterControls } from '../components/recipe/RecipeFilters';
import { Button } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { EmptyState } from '../components/ui/EmptyState';
import { recipes } from '../data/recipes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useUrlState } from '../hooks/useUrlState';
import { ingredientVocabulary, PANTRY_BASICS, rankRecipes, resolveUserIngredient } from '../lib/ingredients';
import { filterRecipes } from '../lib/search';

const vocabulary = ingredientVocabulary(recipes);
const vocabKeys = vocabulary.map((v) => v.key);
const popular = vocabulary.filter((v) => !(PANTRY_BASICS as readonly string[]).includes(v.key)).slice(0, 14).map((v) => v.key);

export function Finder() {
  useDocumentTitle('What’s in my kitchen?');
  const { get, getList, update } = useUrlState();
  const have = getList('have');
  const assumeBasics = get('basics') !== '0';
  const filters = filtersFromUrl(get, getList);
  const filterCount = activeFilterCount(filters);

  const setHave = (next: string[]) => update({ have: next });
  const add = (items: string[]) => {
    const resolved = items.map((i) => resolveUserIngredient(i, vocabKeys)).filter(Boolean);
    setHave([...new Set([...have, ...resolved])]);
  };
  const remove = (item: string) => setHave(have.filter((h) => h !== item));

  const results = useMemo(() => {
    const pool = filterRecipes(recipes, { ...filters, query: undefined });
    return rankRecipes(pool, have, { assumeBasics });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [have.join(','), assumeBasics, JSON.stringify(filters)]);

  const ready = results.filter((r) => r.missing.length === 0);
  const almost = results.filter((r) => r.missing.length > 0);

  return (
    <div className="container page">
      <header className="page-head page-head--art">
        <div>
          <p className="hand">let’s see what we’ve got…</p>
          <h1 className="page-title">What’s in my kitchen?</h1>
          <p className="page-lede">Add what you have, and I’ll find recipes from the cookbook that use it, best matches first.</p>
        </div>
        <MascotWave className="page-head__art" />
      </header>

      <section className="finder-panel" aria-label="Your ingredients">
        <IngredientInput values={have} onAdd={add} onRemove={remove} suggestions={vocabKeys} />

        <div className="finder-panel__popular">
          <p className="finder-panel__sub">Quick add</p>
          <div className="chip-row">
            {popular.map((p) => (
              <Chip key={p} selected={have.includes(p)} onClick={() => (have.includes(p) ? remove(p) : add([p]))}>
                {p}
              </Chip>
            ))}
          </div>
        </div>

        <div className="finder-panel__row">
          <label className="check">
            <input type="checkbox" checked={assumeBasics} onChange={(e) => update({ basics: e.target.checked ? undefined : '0' })} />
            I have the basics: salt, oil and water
          </label>
          {have.length ? (
            <Button variant="ghost" onClick={() => update({ have: undefined })}>
              Clear ingredients
            </Button>
          ) : null}
        </div>

        <details className="finder-panel__filters" open={filterCount > 0 || undefined}>
          <summary>
            <FilterIcon size={20} />
            Narrow it down <span className="muted">(optional)</span>
            {filterCount ? <span className="nav-badge">{filterCount}</span> : null}
          </summary>
          <RecipeFilterControls filters={filters} update={update} />
          {filterCount ? (
            <Button variant="ghost" onClick={() => update({ cat: undefined, time: undefined, diff: undefined, nocook: undefined, mw: undefined, cuisine: undefined, meal: undefined })}>
              Clear filters
            </Button>
          ) : null}
        </details>
      </section>

      <section className="finder-results" aria-labelledby="results-title" aria-live="polite">
        {!have.length ? (
          <EmptyState art={SteamDoodle} title="Your pot is empty (for now)" headingLevel={2}>
            <p>Add a few ingredients above (even just one), and I’ll show you what you can make.</p>
          </EmptyState>
        ) : !results.length ? (
          <EmptyState
            art={MascotPuzzled}
            title="Hmm, nothing in the cookbook uses that yet"
            actions={
              filterCount ? (
                <Button variant="primary" onClick={() => update({ cat: undefined, time: undefined, diff: undefined, nocook: undefined, mw: undefined })}>
                  Try without filters
                </Button>
              ) : (
                <Button variant="primary" onClick={() => update({ have: undefined })}>
                  Start over
                </Button>
              )
            }
          >
            <p>
              Try a more common ingredient (like <strong>rice</strong>, <strong>cheese</strong> or <strong>potato</strong>)
              {filterCount ? ', or loosen your filters' : ''}.
            </p>
          </EmptyState>
        ) : (
          <>
            <h2 id="results-title" className="finder-results__title">
              <BasketIcon />
              {results.length} {results.length === 1 ? 'recipe' : 'recipes'} you can make with that
            </h2>
            {ready.length ? (
              <>
                <h3 className="finder-results__group">Ready to cook</h3>
                <ul className="recipe-grid">
                  {ready.map((m) => (
                    <li key={m.recipe.id}>
                      <RecipeCard recipe={m.recipe}>
                        <MatchExplanation match={m} />
                      </RecipeCard>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {almost.length ? (
              <>
                <h3 className="finder-results__group">{ready.length ? 'Almost there' : 'Closest matches'}</h3>
                <ul className="recipe-grid">
                  {almost.map((m) => (
                    <li key={m.recipe.id}>
                      <RecipeCard recipe={m.recipe}>
                        <MatchExplanation match={m} />
                      </RecipeCard>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </>
        )}
      </section>

      <p className="finder-foot muted">
        Matching uses the 30 recipes in your cookbook. It understands plurals and common names (cilantro = coriander, curd = yogurt), and fixes small typos.
      </p>
    </div>
  );
}

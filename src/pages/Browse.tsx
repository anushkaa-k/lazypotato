import { useMemo } from 'react';
import { FilterIcon, SearchIcon } from '../assets/icons';
import { MascotPuzzled } from '../assets/illustrations';
import { RecipeGrid } from '../components/recipe/RecipeCard';
import { activeFilterCount, filtersFromUrl, RecipeFilterControls } from '../components/recipe/RecipeFilters';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { recipes } from '../data/recipes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useUrlState } from '../hooks/useUrlState';
import { filterRecipes, SORT_OPTIONS, sortRecipes, type SortKey } from '../lib/search';

const CLEAR_FILTERS = { cat: undefined, time: undefined, diff: undefined, nocook: undefined, mw: undefined, cuisine: undefined, meal: undefined };

export function Browse() {
  useDocumentTitle('All recipes');
  const { get, getList, update } = useUrlState();
  const filters = filtersFromUrl(get, getList);
  const sort = (SORT_OPTIONS.find((o) => o.id === get('sort'))?.id ?? 'collection') as SortKey;
  const filterCount = activeFilterCount(filters);

  const list = useMemo(
    () => sortRecipes(filterRecipes(recipes, filters), sort),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(filters), sort],
  );

  return (
    <div className="container page">
      <header className="page-head">
        <p className="hand">the whole little cookbook</p>
        <h1 className="page-title">All recipes</h1>
        <p className="page-lede">All {recipes.length} recipes. Search by name or ingredient, or filter to find the right one.</p>
      </header>

      <div className="browse-tools">
        <div className="field browse-tools__search" role="search">
          <SearchIcon />
          <label htmlFor="browse-q" className="visually-hidden">
            Search recipes by name or ingredient
          </label>
          <input id="browse-q" type="search" value={filters.query ?? ''} onChange={(e) => update({ q: e.target.value })} placeholder="Search “pasta”, “paneer”, “mug”…" autoComplete="off" />
        </div>
        <div className="browse-tools__sort">
          <label htmlFor="browse-sort" className="browse-tools__sort-label">
            Sort
          </label>
          <select id="browse-sort" className="select" value={sort} onChange={(e) => update({ sort: e.target.value === 'collection' ? undefined : e.target.value })}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <details className="browse-filters" open={filterCount > 0 || undefined}>
        <summary>
          <FilterIcon size={20} />
          Filters
          {filterCount ? <span className="nav-badge">{filterCount}</span> : null}
        </summary>
        <RecipeFilterControls filters={filters} update={update} />
      </details>

      <div className="browse-count" aria-live="polite">
        <p>
          Showing <strong>{list.length}</strong> of {recipes.length}
        </p>
        {filterCount || filters.query ? (
          <Button variant="ghost" onClick={() => update({ ...CLEAR_FILTERS, q: undefined })}>
            Clear all
          </Button>
        ) : null}
      </div>

      {list.length ? (
        <RecipeGrid recipes={list} />
      ) : (
        <EmptyState
          art={MascotPuzzled}
          title="No recipes match that"
          actions={
            <Button variant="primary" onClick={() => update({ ...CLEAR_FILTERS, q: undefined })}>
              Show all recipes
            </Button>
          }
        >
          <p>Try a different word, or remove a filter or two.</p>
        </EmptyState>
      )}
    </div>
  );
}

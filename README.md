# Lazy Potato 🥔💜

*did you have food today?*

A tiny, hand-illustrated recipe website made as a gift for Arya: 30 easy recipes, an
ingredient finder, and a step-by-step "Cook with me" companion. It runs entirely in the
browser. No backend, no accounts, no API keys.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # data validation + logic tests
npm run build      # production build in dist/
npm run preview    # serve the production build at http://localhost:4173
```

Requires Node 20+ (22 recommended).

## What's inside

| Page | Route | What it does |
|---|---|---|
| Home | `#/` | Greeting, ingredient search, today's pick, categories, quick/no-cook rows, recently viewed, a personal note |
| What's in my kitchen | `#/find?have=…` | Enter ingredients, get recipes ranked by how well they match, with have/need explanations |
| All recipes | `#/recipes` | Search by name or ingredient, filter (category, time, difficulty, no-cook, microwave), sort |
| Category | `#/category/:id` | One category's recipes |
| Recipe | `#/recipe/:id` | Everything from the source: ingredients, method, prep/cook time, servings, difficulty. Servings scaling, unit toggle, save |
| Cook with me | `#/recipe/:id/cook` | One step at a time, progress, back/repeat/next, ingredients sheet, timers taken from the step text, read-aloud |
| Done | `#/recipe/:id/done` | A celebration |
| Saved | `#/saved` | Favourites (stored in this browser) |

## Project structure

```
docs/
  source/30-easy-recipes.md   the recipe file (converted from the original .docx), the source of truth
  style-guide.md              illustration & UI style rules
  asset-checklist.md          what artwork exists, what's interim, how to replace it
  data-notes.md               discrepancies found in the source recipes
scripts/extract-recipes.py    source markdown → src/data/recipes.generated.json
src/
  config.ts                   friend's name + personal note (edit me!)
  data/                       types, categories, the recipe database, validation tests
  lib/                        pure logic: ingredient matching, search, units, timers, storage, cook session
  hooks/                      favourites, unit system, servings, cook session, wake lock, speech
  assets/brand/               the original logo + crops of it (not redrawn)
  assets/illustrations/       SVG mascot poses, food art, decorations + registry (index.ts)
  assets/icons.tsx            UI icons
  components/ui/              buttons, chips, layout, empty states, segmented control, stepper
  components/recipe/          recipe & category cards, ingredient list, filters, finder input
  components/cook/            step progress, timers, ingredient sheet
  pages/                      one file per page
  styles/                     tokens.css (design tokens), base.css, pages.css, fonts
```

## Editing content

- **Friend's name / note:** `src/config.ts`.
- **Recipes:** edit `docs/source/30-easy-recipes.md` (same format), then run
  `npm run extract:recipes` and `npm test`. The tests check every recipe has a unique id,
  matches the source index, and keeps its text verbatim. If you add or remove recipes, update
  `src/data/source-index.ts` and `EXPECTED_RECIPE_COUNT`. You can also add recipes directly
  in TypeScript via `extraRecipes` in `src/data/recipes.ts`.
- Optional fields (`description`, `cuisine`, `mealType`, `tips`) are supported. Cuisine and
  meal-type filters appear automatically once any recipe has those fields.
- **Recipe ids** are slugs of the names and are used in URLs and saved favourites. Avoid
  renaming a recipe once it's in use (or keep the old id).

## Measurements

The toggle offers **Original**, **US** and **Metric**. Source data is never changed;
conversion happens only for display:

- grams → ounces (US)
- cups and 2+ tbsp of **liquids** (milk, water, oil, yogurt, juices, soy sauce, crushed tomatoes) → mL (metric)
- solids measured in cups (spinach, cheese, rice…) stay in cups, because converting them to
  grams would need a density guess. Teaspoons and tablespoons stay as spoons in every mode.
- counts, cloves, pinches, slices and pieces are never converted.

Decimals are shown as kitchen fractions (0.33 → ⅓). When an amount is scaled or converted,
the original line is shown underneath.

## Deploying to Vercel

The site is a static build (`dist/`) with hash routing (`#/recipe/...`), so it needs no
server rewrites. `vercel.json` pins the settings: Vite framework, `npm ci`,
`npm run build`, output `dist`, and long-term caching for the hashed files in `assets/`.

**One-time setup (in the browser):**

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New… → Project**, then import `anushkaa-k/lazypotato` (grant the Vercel GitHub app
   access to the repo if asked).
3. Leave the detected settings as they are (they come from `vercel.json`) and click **Deploy**.
   No environment variables are needed.

After that, every push to `main` deploys to production (`https://<project>.vercel.app`)
and every pull request gets its own preview URL, posted on the PR.

**Or from a terminal:**

```bash
npm i -g vercel
vercel          # first run links the project, then makes a preview deployment
vercel --prod   # production deployment
```

`.github/workflows/ci.yml` runs the tests and a build on every pull request; deployment
itself is handled by Vercel.

## Adding real AI later

Ingredient matching is local (`src/lib/ingredients.ts`). To add AI-generated recipes later,
put the API call behind a small serverless function (so the key never ships to the browser)
and return recipes in the same `Recipe` shape. The rest of the UI will work unchanged.

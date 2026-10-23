# Recipe data notes

Source: `30_easy_recipes_review.docx` ("The Little Cookbook · 30 easy recipes · Review
draft"), converted with pandoc to `docs/source/30-easy-recipes.md` and extracted by
`scripts/extract-recipes.py`.

## Import result

- **30 of 30 recipes imported**, in 8 categories (4 + 3 + 4 + 4 + 4 + 4 + 3 + 4), matching
  the document's own index. No duplicates, no malformed entries.
- Every recipe has: name, serves, prep minutes, cook minutes, difficulty, ingredients
  (4–7 each, all with a quantity), 3 method steps, and a 3-step "Cook with me" script.
- The "Cook with me" script is **identical to the method** in all 30 recipes, so Cook With Me
  uses it as-is.
- Ingredient lines and steps are stored verbatim (the only normalisation: pandoc's `--` becomes
  an en dash `–` in ranges like "4–6 minutes"). `npm test` checks this against the source.

## Fields the source doesn't have (not invented)

- **Description:** none. The recipe page simply omits it.
- **Cuisine / meal type:** none, so those filters are hidden (they appear automatically if
  the fields are added later). Categories cover browsing in the meantime.
- **Difficulty:** all 30 are "Easy", so the difficulty filter has a single option.
- **Nutrition, tips, equipment lists, popularity/date added:** none. The homepage uses
  "today's pick", "ready in 10 minutes", "no stove needed" and "recently viewed" (from this
  browser) instead of "popular"/"recently added".
- The "Review notes" lines in the document are blank and were not imported.

## Derived (from source data, labelled in the UI)

- **No stove needed:** cook time is 0 min (7 recipes).
- **Microwave-friendly:** the method mentions the microwave.
- **Timers in Cook With Me:** only where a step's text contains a duration ("2 minutes",
  "4–6 minutes", "30-second bursts"). Ranges start at the lower number.

## Items mentioned in steps but missing from the ingredient list

These are worth reviewing in the source. The website shows the recipes exactly as written
and does **not** add them:

| Recipe | Mentioned in the method, not listed |
|---|---|
| One-pot masala macaroni | salt, oil ("a little oil") |
| Palak paneer rice bowl | salt, oil |
| Shortcut pav bhaji | salt (and "a splash of water") |
| Chickpea cucumber salad | salt |
| Paneer burrito bowl | salt |
| Microwave chickpea rice bowl | salt |
| Easy dal and rice bowl | salt |
| Microwave masala potato chaat | salt |
| Microwave mug brownie | a pinch of salt |
| Greek-inspired salad | black pepper |
| Corn cucumber cheese salad | pepper (and "a teaspoon of water" for frozen corn) |
| Cheese corn paratha | "a teaspoon of water" |
| Creamy spinach / Tomato garlic / Pesto pea pasta | pasta cooking water (expected) |

The finder's "I have the basics: salt, oil and water" option exists partly for this reason.

## Other observations

- The document calls itself a review draft whose recipes are "not yet kitchen-tested". The
  site footer says so too.
- Quantities like `0.33 cup` and `0.25 small onion` are kept exactly in the data and shown as
  ⅓ and ¼.
- "Tomato garlic pasta" lists "2 tbsp cheese" without a type; it's kept as written.

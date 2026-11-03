# Asset checklist

Status key: ✅ final · 🟡 interim (works and is on-style, but simplified; replace with
painted artwork when available) · ⬜ not made

## Brand (original artwork)

| Asset | File | Status |
|---|---|---|
| Full logo | `src/assets/brand/lazy-potato-logo.webp` | ✅ original, unmodified |
| Wordmark + tagline crop | `src/assets/brand/lazy-potato-wordmark.webp` | ✅ crop of original (currently unused, kept for future use) |
| Wordmark-only crop | `src/assets/brand/lazy-potato-wordmark-only.webp` | ✅ crop of original (currently unused; the header shows the mascot only) |
| Mascot crop (header, footer) | `src/assets/brand/lazy-potato-mascot.webp` | ✅ crop of original |
| Favicon / touch icon | `public/favicon.png`, `public/apple-touch-icon.png` | ✅ crops of original |

## Mascot poses (SVG, `src/assets/illustrations/mascot.tsx`)

The SVG mascot is a **simplified interpretation** of the logo character. It's flat-shaded,
not painted like the logo.

| Pose | Used on | Status |
|---|---|---|
| `MascotWave` (greeting) | home "today's pick", finder header | 🟡 interim |
| `MascotCook` (apron + spatula) | Cook with me, buttons, resume banner | 🟡 interim |
| `MascotCelebrate` | completion screen | 🟡 interim |
| `MascotSleep` (on gingham pillow) | empty saved recipes | 🟡 interim |
| `MascotPuzzled` (magnifying glass) | no results, not found | 🟡 interim |

## Category food art (SVG, `src/assets/illustrations/food.tsx`)

| Category | Component | Status |
|---|---|---|
| Sandwiches | `SandwichArt` | 🟡 interim |
| Parathas & wraps | `ParathaArt` (paratha on a tawa) | 🟡 interim |
| Pasta | `PastaArt` | 🟡 interim |
| Sauces & chutneys | `ChutneyArt` (jar + spoon) | 🟡 interim |
| Salads | `SaladArt` | 🟡 interim |
| Bowls | `BowlArt` | 🟡 interim |
| Quick desserts | `DessertArt` (mug cake) | 🟡 interim |
| Occasional meals | `OccasionalArt` (pav bhaji plate) | 🟡 interim |
| Eggs | n/a | ⬜ not needed: the recipe file has no egg category |

## Per-recipe art (SVG, `src/assets/illustrations/recipeArt.tsx`)

🟡 interim. All 30 recipes have their own illustration (different object, props and accent
colour), built from shared hand-drawn pieces in the same style as the category art, so no two
cards look alike. They're registered as `recipe:<recipe-id>`; `RecipeArt` falls back to the
category illustration if one is missing. To replace one with final artwork, point its entry in
`recipeIllustrations` at a new component.

## Decorations & icons

| Asset | File | Status |
|---|---|---|
| Heart, sparkle, lavender sprig, spatula, whisk, spoon, steam, squiggle underline | `decor.tsx` | ✅ (simple SVG is the intended final form; whisk/spoon/spatula/sprig are available but not currently placed) |
| UI icons (home, basket, book, heart, search, timer…) | `src/assets/icons.tsx` | ✅ |
| Paper texture | inline SVG noise in `src/styles/base.css` | ✅ |

## Fonts

| Font | Package | Status |
|---|---|---|
| Quicksand 500/600/700 | `@fontsource/quicksand` | ✅ bundled |
| Inter variable | `@fontsource-variable/inter` | ✅ bundled |
| Caveat 500/600 | `@fontsource/caveat` | ✅ bundled |

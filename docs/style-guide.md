# Lazy Potato style guide

The site should feel like an illustrated recipe journal with a little personality: warm,
hand-made and playful, but not childish.

## Brand

- **Logo:** `src/assets/brand/lazy-potato-logo.webp` is the original artwork, never redrawn.
  `lazy-potato-wordmark*.webp`, `lazy-potato-mascot.webp`, `public/favicon.png` and
  `public/apple-touch-icon.png` are straight crops of it (no retouching).
- The hand-drawn wordmark is always the image, never recreated with a font.
- The logo's cream background is blended into the page with `mix-blend-mode: darken` and a
  soft edge mask, which leaves the artwork itself untouched.

## Colour (`src/styles/tokens.css`)

| Token | Hex | Use |
|---|---|---|
| `--cream` | #FFFBF6 | page background |
| `--paper` | #FFFDFA | cards and panels |
| `--lavender` | #E9DDFB | primary buttons, selected states, highlights |
| `--lavender-surface` | #F0E8FC | subtle tinted surfaces |
| `--lilac` | #A98ACF | accents, progress fills, illustration details (not for text) |
| `--lilac-ink` | #6F539A | accent text (6.0:1 on cream) |
| `--plum` | #443653 | body text, outlines (10.7:1 on cream) |
| `--plum-soft` | #65577A | secondary text (6.4:1 on cream) |
| `--sage`, `--peach`, `--pink` | | occasional category tints and badges, each with a matching `-ink` text colour ≥ 4.5:1 |

Rule of thumb: cream everywhere, lavender for "this is the thing to tap / this is selected",
and other tints only to tell categories apart. Not every surface should be purple.

## Type

- **Quicksand** (500–700): headings, buttons, labels.
- **Inter** (variable): body text, ingredient lists, cooking steps. Body is 17px; cooking
  steps are 22–30px.
- **Caveat** (500–600): short handwritten notes only ("today's pick, just for you"). Never for
  instructions or anything long.
- All fonts are bundled locally via Fontsource, with system fallbacks.

## Shape, depth, motion

- Rounded everything: 10/16/24/32px radii, pill buttons and chips.
- Primary buttons get a 2px plum outline and a 3px "sticker" offset shadow; everything else
  uses soft 1.5px borders and restrained shadows.
- Motion is short (120–220ms) and subtle; `prefers-reduced-motion` turns it off.
- Tap targets ≥ 44–48px. Visible 3px focus ring.

## Illustration rules

All SVG artwork lives in `src/assets/illustrations/` and shares `Art.tsx` + `palette.ts`.

1. **Outline:** plum `#4A3558`, round caps and joins, 3px on a 160px canvas (2px for detail).
2. **Hand-drawn feel:** every illustration goes through the shared `Art` wrapper, which adds a
   gentle turbulence wobble so lines look inked by hand.
3. **Fill:** flat pastel base colours from `palette.ts`; one soft shade stroke or shape at
   most; cream/white highlights. No gradients.
4. **Ground:** food and mascot sit on a soft lavender ellipse shadow.
5. **Canvas:** food 160×160; mascot 200×200 (sleep pose 220×170); decor in small square or
   tall canvases.
6. **Mascot:** tan potato, lilac bucket hat with dashed stitching, pink blush, small dot eyes.
   Keep the hat on in every pose.
7. **Restraint:** one decorative cluster per screen at most. The mascot or the food is the focus.
8. **Accessibility:** decorative art renders with `aria-hidden`; pass `title` only when the
   art carries meaning (e.g. the celebration screen).

## Replacing artwork

See `asset-checklist.md`. Any illustration can be swapped by pointing its name in
`src/assets/illustrations/index.ts` at a new component (SVG, or an `<img>` of a WebP/PNG).
If you commission painted artwork to match the logo, export transparent WebP at 2× the
display size (e.g. 512px for category art, 800px for mascot poses).

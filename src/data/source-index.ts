/**
 * The recipe index exactly as listed at the top of the source document
 * (docs/source/30-easy-recipes.md). Used by the validation tests to prove every
 * source recipe made it into the database.
 */
export const sourceIndex: Record<string, string[]> = {
  Sandwiches: [
    'Paneer tikka sandwich',
    'Cheesy spinach corn sandwich',
    'Chutney cheese toastie',
    'Hummus cucumber sandwich',
  ],
  'Parathas & wraps': ['Shortcut aloo paratha', 'Paneer bhurji paratha wrap', 'Cheese corn paratha'],
  Pasta: ['Creamy spinach pasta', 'Tomato garlic pasta', 'One-pot masala macaroni', 'Pesto pea pasta'],
  'Sauces & dry chutneys': [
    'Green coriander chutney',
    'Peanut chutney powder',
    'Mint yogurt dip',
    'Quick garlic chilli oil',
  ],
  Salads: [
    'Greek-inspired salad',
    'Chickpea cucumber salad',
    'Corn cucumber cheese salad',
    'Peanut lime slaw',
  ],
  Bowls: [
    'Paneer burrito bowl',
    'Jeera rice and paneer bowl',
    'Palak paneer rice bowl',
    'Microwave chickpea rice bowl',
  ],
  'Quick desserts': [
    'Microwave mug brownie',
    'Peanut butter chocolate mug cake',
    'Yogurt berry crunch cup',
  ],
  'Occasional meals': [
    'Shortcut pav bhaji',
    'Quick veg fried rice',
    'Easy dal and rice bowl',
    'Microwave masala potato chaat',
  ],
};

export const EXPECTED_RECIPE_COUNT = 30;

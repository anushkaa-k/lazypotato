import type { Category, CategoryId } from './types';

export const categories: Category[] = [
  {
    id: 'sandwiches',
    sourceName: 'Sandwiches',
    name: 'Sandwiches',
    blurb: 'Two slices, one happy lunch.',
    illustration: 'sandwich',
    tint: 'peach',
  },
  {
    id: 'parathas-wraps',
    sourceName: 'Parathas & wraps',
    name: 'Parathas & wraps',
    blurb: 'Warm, folded, a little bit golden.',
    illustration: 'paratha',
    tint: 'pink',
  },
  {
    id: 'pasta',
    sourceName: 'Pasta',
    name: 'Pasta',
    blurb: 'One pot of comfort, coming up.',
    illustration: 'pasta',
    tint: 'lavender',
  },
  {
    id: 'sauces-chutneys',
    sourceName: 'Sauces & dry chutneys',
    name: 'Sauces & chutneys',
    blurb: 'Tiny jars that make everything better.',
    illustration: 'chutney',
    tint: 'sage',
  },
  {
    id: 'salads',
    sourceName: 'Salads',
    name: 'Salads',
    blurb: 'Crunchy, fresh, zero stove required.',
    illustration: 'salad',
    tint: 'sage',
  },
  {
    id: 'bowls',
    sourceName: 'Bowls',
    name: 'Bowls',
    blurb: 'Rice, toppings, done.',
    illustration: 'bowl',
    tint: 'lavender',
  },
  {
    id: 'desserts',
    sourceName: 'Quick desserts',
    name: 'Quick desserts',
    blurb: 'Because you deserve a treat.',
    illustration: 'dessert',
    tint: 'pink',
  },
  {
    id: 'occasional-meals',
    sourceName: 'Occasional meals',
    name: 'Occasional meals',
    blurb: 'For days with a bit more energy.',
    illustration: 'occasional',
    tint: 'peach',
  },
];

const byId = new Map(categories.map((c) => [c.id, c]));
const bySourceName = new Map(categories.map((c) => [c.sourceName, c]));

export function getCategory(id: string): Category | undefined {
  return byId.get(id as CategoryId);
}

export function categoryFromSourceName(name: string): Category | undefined {
  return bySourceName.get(name);
}

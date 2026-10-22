import type { ComponentType } from 'react';
import type { ArtProps } from './Art';
import {
  BowlArt,
  ChutneyArt,
  DessertArt,
  OccasionalArt,
  ParathaArt,
  PastaArt,
  SaladArt,
  SandwichArt,
} from './food';
import { MascotCelebrate, MascotCook, MascotPuzzled, MascotSleep, MascotWave } from './mascot';

export * from './mascot';
export * from './food';
export * from './decor';

/**
 * Illustration registry: names used in data (e.g. a category's `illustration`) map to
 * components here. To swap in final artwork, point a name at a new component, or at
 * an <img>-based component that loads a WebP/PNG from src/assets/.
 */
export const illustrations: Record<string, ComponentType<ArtProps>> = {
  sandwich: SandwichArt,
  paratha: ParathaArt,
  pasta: PastaArt,
  chutney: ChutneyArt,
  salad: SaladArt,
  bowl: BowlArt,
  dessert: DessertArt,
  occasional: OccasionalArt,
  'mascot-wave': MascotWave,
  'mascot-cook': MascotCook,
  'mascot-celebrate': MascotCelebrate,
  'mascot-sleep': MascotSleep,
  'mascot-puzzled': MascotPuzzled,
};

export function getIllustration(name: string | undefined): ComponentType<ArtProps> | undefined {
  return name ? illustrations[name] : undefined;
}

/**
 * Illustration palette, sampled to sit alongside the Lazy Potato logo.
 * Change a colour here and every SVG illustration follows.
 */
export const ink = '#4A3558';
export const P = {
  ink,
  cream: '#FFFBF6',
  potato: '#DDAE72',
  potatoShade: '#C9955A',
  potatoSpot: '#B07E4B',
  hat: '#D3C0F0',
  hatShade: '#B9A0E2',
  hatStitch: '#8D6EBE',
  blush: '#F2A7BE',
  lavender: '#E9DDFB',
  lilac: '#A98ACF',
  pillow: '#F1E9FC',
  sage: '#BFD1AE',
  sageDeep: '#8DA67A',
  peach: '#F7CDAE',
  tomato: '#EC9A86',
  cheese: '#F6D88E',
  bread: '#EDC690',
  crust: '#CF9E62',
  chocolate: '#8A5E4F',
  chocolateDark: '#6E4A3F',
  white: '#FFFFFF',
  shadow: '#E6DAF6',
} as const;

/** Standard outline props: rounded, plum, consistent weight. */
export const line = {
  stroke: ink,
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export const thin = { ...line, strokeWidth: 2 } as const;

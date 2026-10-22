const FRACTIONS: [number, string][] = [
  [1 / 8, '⅛'],
  [1 / 4, '¼'],
  [1 / 3, '⅓'],
  [1 / 2, '½'],
  [2 / 3, '⅔'],
  [3 / 4, '¾'],
];

/**
 * Formats a quantity for cooks: 0.25 -> "¼", 1.5 -> "1½", 0.33 -> "⅓".
 * Falls back to one decimal place when no kitchen fraction is close.
 */
export function formatQuantity(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return '0';
  const whole = Math.floor(value + 1e-9);
  const rest = value - whole;
  if (rest < 0.04) return String(whole);
  if (rest > 0.96) return String(whole + 1);
  for (const [frac, glyph] of FRACTIONS) {
    if (Math.abs(rest - frac) < 0.04) return whole ? `${whole}${glyph}` : glyph;
  }
  const rounded = Math.round(value * 10) / 10;
  return String(rounded);
}

export function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

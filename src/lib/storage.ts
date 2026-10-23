/**
 * Defensive wrappers around localStorage. Private browsing, blocked storage, quota errors
 * and corrupted JSON all degrade to "nothing saved" instead of crashing the site.
 */
export function readJSON<T>(key: string, validate: (value: unknown) => T | undefined, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    const valid = validate(parsed);
    return valid === undefined ? fallback : valid;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* storage unavailable: nothing to remove */
  }
}

export function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.filter((v): v is string => typeof v === 'string');
}

export const STORAGE_KEYS = {
  favourites: 'lazy-potato:favourites:v1',
  units: 'lazy-potato:units:v1',
  recent: 'lazy-potato:recently-viewed:v1',
  cook: 'lazy-potato:cook-progress:v1',
  pantry: 'lazy-potato:pantry:v1',
} as const;

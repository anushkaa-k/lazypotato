import { readJSON, writeJSON, STORAGE_KEYS } from './storage';

export interface CookState {
  step: number;
  total: number;
  /** Bumped on "repeat" so the UI can replay the step (re-announce, re-animate). */
  replay: number;
  finished: boolean;
}

export type CookAction =
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'repeat' }
  | { type: 'goto'; step: number }
  | { type: 'restart' };

export function initCookState(total: number, step = 0): CookState {
  return { step: clamp(step, 0, Math.max(total - 1, 0)), total, replay: 0, finished: false };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

/** Pure step logic: the cook only moves forward when the user asks. */
export function cookReducer(state: CookState, action: CookAction): CookState {
  switch (action.type) {
    case 'next':
      if (state.step >= state.total - 1) return { ...state, finished: true };
      return { ...state, step: state.step + 1 };
    case 'prev':
      if (state.finished) return { ...state, finished: false };
      return { ...state, step: clamp(state.step - 1, 0, state.total - 1) };
    case 'repeat':
      return { ...state, replay: state.replay + 1 };
    case 'goto':
      return { ...state, step: clamp(action.step, 0, state.total - 1), finished: false };
    case 'restart':
      return initCookState(state.total);
  }
}

/* ---------- progress persistence (so "view full recipe" never loses your place) ---------- */

const MAX_AGE_MS = 12 * 60 * 60 * 1000;

type ProgressMap = Record<string, { step: number; at: number }>;

function validProgress(value: unknown): ProgressMap | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const out: ProgressMap = {};
  for (const [id, v] of Object.entries(value as Record<string, unknown>)) {
    const entry = v as { step?: unknown; at?: unknown } | null;
    if (entry && typeof entry.step === 'number' && typeof entry.at === 'number') {
      out[id] = { step: entry.step, at: entry.at };
    }
  }
  return out;
}

export function loadProgress(recipeId: string, now = Date.now()): number | undefined {
  const all = readJSON(STORAGE_KEYS.cook, validProgress, {});
  const entry = all[recipeId];
  if (!entry || now - entry.at > MAX_AGE_MS) return undefined;
  return entry.step;
}

export function saveProgress(recipeId: string, step: number, now = Date.now()): void {
  const all = readJSON(STORAGE_KEYS.cook, validProgress, {});
  all[recipeId] = { step, at: now };
  writeJSON(STORAGE_KEYS.cook, all);
}

export function clearProgress(recipeId: string): void {
  const all = readJSON(STORAGE_KEYS.cook, validProgress, {});
  delete all[recipeId];
  writeJSON(STORAGE_KEYS.cook, all);
}

import { beforeEach, describe, expect, it } from 'vitest';
import { clearProgress, cookReducer, initCookState, loadProgress, saveProgress } from './cookSession';
import { formatClock, timersForStep } from './timers';

describe('cookReducer', () => {
  it('advances only on next, and finishes after the last step', () => {
    let s = initCookState(3);
    expect(s.step).toBe(0);
    s = cookReducer(s, { type: 'next' });
    s = cookReducer(s, { type: 'next' });
    expect(s).toMatchObject({ step: 2, finished: false });
    s = cookReducer(s, { type: 'next' });
    expect(s).toMatchObject({ step: 2, finished: true });
  });

  it('goes back, never below zero, and un-finishes', () => {
    let s = initCookState(3);
    s = cookReducer(s, { type: 'prev' });
    expect(s.step).toBe(0);
    s = { ...initCookState(3, 2), finished: true };
    s = cookReducer(s, { type: 'prev' });
    expect(s).toMatchObject({ step: 2, finished: false });
  });

  it('repeat keeps the step and bumps replay', () => {
    const s = cookReducer(initCookState(3, 1), { type: 'repeat' });
    expect(s).toMatchObject({ step: 1, replay: 1 });
  });

  it('clamps goto and initial steps', () => {
    expect(initCookState(3, 9).step).toBe(2);
    expect(cookReducer(initCookState(3), { type: 'goto', step: -4 }).step).toBe(0);
    expect(cookReducer(initCookState(3, 2), { type: 'restart' }).step).toBe(0);
  });
});

describe('progress persistence', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    (globalThis as { window?: unknown }).window = {
      localStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => void store.set(k, v),
        removeItem: (k: string) => void store.delete(k),
      },
    };
  });

  it('saves, restores, expires and clears', () => {
    saveProgress('a', 2, 1000);
    expect(loadProgress('a', 2000)).toBe(2);
    expect(loadProgress('a', 1000 + 13 * 3600 * 1000)).toBeUndefined();
    clearProgress('a');
    expect(loadProgress('a', 2000)).toBeUndefined();
  });

  it('survives corrupted storage', () => {
    window.localStorage.setItem('lazy-potato:cook-progress:v1', '{not json');
    expect(loadProgress('a')).toBeUndefined();
    saveProgress('a', 1);
    expect(loadProgress('a')).toBe(1);
  });

  it('survives storage that throws', () => {
    (globalThis as { window?: unknown }).window = {
      localStorage: {
        getItem: () => {
          throw new Error('blocked');
        },
        setItem: () => {
          throw new Error('blocked');
        },
      },
    };
    expect(() => saveProgress('a', 1)).not.toThrow();
    expect(loadProgress('a')).toBeUndefined();
  });
});

describe('timersForStep', () => {
  it('only offers timers the step text supports', () => {
    expect(timersForStep('Spread chutney on bread.')).toEqual([]);
    expect(timersForStep('Microwave in a safe bowl for 2 minutes, stir, then heat in 30-second bursts until hot; or pan-cook 4–5 minutes.')).toEqual([
      { label: '2 min', seconds: 120 },
      { label: '30 sec', seconds: 30 },
      { label: '4–5 min', seconds: 240 },
    ]);
    expect(timersForStep('use within 3 days')).toEqual([]);
  });

  it('formats a clock', () => {
    expect(formatClock(125)).toBe('2:05');
    expect(formatClock(0)).toBe('0:00');
  });
});

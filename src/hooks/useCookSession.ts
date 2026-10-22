import { useEffect, useReducer } from 'react';
import { clearProgress, cookReducer, initCookState, loadProgress, saveProgress } from '../lib/cookSession';

/**
 * Cook With Me state for one recipe. Progress is saved as you go, so opening the full
 * recipe (or refreshing) and coming back resumes on the same step.
 */
export function useCookSession(recipeId: string, totalSteps: number) {
  const [state, dispatch] = useReducer(cookReducer, undefined, () =>
    initCookState(totalSteps, loadProgress(recipeId) ?? 0),
  );

  useEffect(() => {
    if (state.finished) clearProgress(recipeId);
    else saveProgress(recipeId, state.step);
  }, [recipeId, state.step, state.finished]);

  return { state, dispatch };
}

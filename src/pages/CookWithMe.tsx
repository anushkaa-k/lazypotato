import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, BookIcon, CloseIcon, ListIcon, RepeatIcon, SpeakerIcon } from '../assets/icons';
import { MascotCook } from '../assets/illustrations';
import { IngredientSheet } from '../components/cook/IngredientSheet';
import { StepProgress } from '../components/cook/StepProgress';
import { StepTimer } from '../components/cook/StepTimer';
import { Button } from '../components/ui/Button';
import { getRecipe } from '../data/recipes';
import type { Recipe } from '../data/types';
import { useCookSession } from '../hooks/useCookSession';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { servesQuery, useServings } from '../hooks/useServings';
import { useSpeech } from '../hooks/useSpeech';
import { useWakeLock } from '../hooks/useWakeLock';
import { timersForStep } from '../lib/timers';
import { NotFound } from './NotFound';

const ENCOURAGEMENT = ['Let’s do this!', 'You’re doing great.', 'Nearly there…', 'Look at you go!', 'Almost done!'];

export function CookWithMe() {
  const { id } = useParams();
  const recipe = getRecipe(id);
  if (!recipe) return <NotFound />;
  return <CookSession key={recipe.id} recipe={recipe} />;
}

function CookSession({ recipe }: { recipe: Recipe }) {
  useDocumentTitle(`Cooking: ${recipe.name}`);
  const navigate = useNavigate();
  const steps = recipe.cookWithMe;
  const { state, dispatch } = useCookSession(recipe.id, steps.length);
  const [servings] = useServings(recipe);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [readAloud, setReadAloud] = useState(false);
  const speech = useSpeech();
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useWakeLock(true);

  const q = servesQuery(servings, recipe);
  const step = steps[state.step];
  const isLast = state.step === steps.length - 1;
  const timers = timersForStep(step);

  // Move focus to the step card when it changes (not on first load), so screen readers announce it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    cardRef.current?.focus();
  }, [state.step, state.replay]);

  useEffect(() => {
    if (readAloud) speech.speak(`Step ${state.step + 1}. ${step}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.step, state.replay, readAloud]);

  useEffect(() => {
    if (state.finished) navigate(`/recipe/${recipe.id}/done${q}`, { replace: true });
  }, [state.finished, navigate, recipe.id, q]);

  // Keyboard shortcuts: ← previous, → next, R repeat.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (sheetOpen || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') dispatch({ type: 'next' });
      else if (e.key === 'ArrowLeft') dispatch({ type: 'prev' });
      else if (e.key.toLowerCase() === 'r') dispatch({ type: 'repeat' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch, sheetOpen]);

  return (
    <div className="cook">
      <header className="cook__top">
        <Link to={`/recipe/${recipe.id}${q}`} className="icon-btn" aria-label="Leave cooking mode and view the full recipe" title="Close">
          <CloseIcon />
        </Link>
        <h1 className="cook__title">
          <small>cooking with you</small>
          {recipe.name}
        </h1>
        <button type="button" className="btn btn--secondary" onClick={() => setSheetOpen(true)}>
          <ListIcon size={20} />
          <span>Ingredients</span>
        </button>
      </header>

      <div className="cook__stage">
        <StepProgress step={state.step} total={steps.length} onJump={(i) => dispatch({ type: 'goto', step: i })} />

        <div
          key={`${state.step}-${state.replay}`}
          ref={cardRef}
          className="cook__card"
          tabIndex={-1}
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Step ${state.step + 1} of ${steps.length}`}
        >
          <p className="hand">{ENCOURAGEMENT[Math.min(state.step, ENCOURAGEMENT.length - 1)]}</p>
          <p className="cook__step-text">{step}</p>
          {recipe.tips?.[state.step] ? <p className="cook__tip">Tip: {recipe.tips[state.step]}</p> : null}
          {timers.length ? (
            <div className="cook__timers" aria-label="Timers for this step">
              {timers.map((t) => (
                <StepTimer key={t.label} timer={t} />
              ))}
            </div>
          ) : null}
          <MascotCook className="cook__mascot" />
        </div>

        <div className="cook__aside">
          <Link to={`/recipe/${recipe.id}${q}`} className="btn btn--ghost">
            <BookIcon size={20} />
            <span>View full recipe</span>
          </Link>
          {speech.supported ? (
            <button
              type="button"
              className={`btn btn--ghost${readAloud ? ' btn--on' : ''}`}
              aria-pressed={readAloud}
              onClick={() => {
                if (readAloud) speech.stop();
                setReadAloud((v) => !v);
              }}
            >
              <SpeakerIcon size={20} />
              <span>{readAloud ? 'Reading aloud' : 'Read steps aloud'}</span>
            </button>
          ) : null}
        </div>
      </div>

      <nav className="cook__controls" aria-label="Step controls">
        <Button onClick={() => dispatch({ type: 'prev' })} disabled={state.step === 0} icon={<ArrowLeftIcon size={20} />} aria-label="Previous step">
          <span className="cook__btn-text">Back</span>
        </Button>
        <Button onClick={() => dispatch({ type: 'repeat' })} icon={<RepeatIcon size={20} />} aria-label="Repeat this step">
          <span className="cook__btn-text">Repeat</span>
        </Button>
        <Button variant="primary" size="lg" className="cook__next" onClick={() => dispatch({ type: 'next' })} iconAfter={<ArrowRightIcon size={20} />}>
          {isLast ? 'I’m done!' : 'Next step'}
        </Button>
      </nav>

      <IngredientSheet recipe={recipe} servings={servings} open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  );
}

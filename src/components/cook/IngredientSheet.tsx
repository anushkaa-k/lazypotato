import { useEffect, useRef } from 'react';
import { CloseIcon } from '../../assets/icons';
import type { Recipe } from '../../data/types';
import { IngredientList } from '../recipe/IngredientList';
import { UnitToggle } from '../recipe/UnitToggle';

/** Ingredients, available mid-cook without leaving the step. Uses the native <dialog>. */
export function IngredientSheet({ recipe, servings, open, onClose }: { recipe: Recipe; servings: number; open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="sheet-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="sheet__inner">
        <div className="sheet__head">
          <h2 id="sheet-title">Ingredients</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close ingredients">
            <CloseIcon />
          </button>
        </div>
        <p className="muted sheet__serves">For {servings} {servings === 1 ? 'serving' : 'servings'}</p>
        <UnitToggle />
        <IngredientList recipe={recipe} servings={servings} />
      </div>
    </dialog>
  );
}

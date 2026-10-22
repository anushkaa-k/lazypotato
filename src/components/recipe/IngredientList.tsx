import { useState } from 'react';
import { CheckIcon } from '../../assets/icons';
import type { Recipe } from '../../data/types';
import { useUnitSystem } from '../../hooks/useUnitSystem';
import { displayIngredient } from '../../lib/units';

/**
 * Ingredient checklist. Shows quantities scaled to the chosen servings and converted to
 * the chosen measurement system; the original line is always available underneath.
 */
export function IngredientList({ recipe, servings, checkable = true }: { recipe: Recipe; servings: number; checkable?: boolean }) {
  const [system] = useUnitSystem();
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const factor = servings / recipe.serves;

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ul className="ingredients">
      {recipe.ingredients.map((ing, i) => {
        const d = displayIngredient(ing, factor, system);
        const content = (
          <span className="ingredients__text">
            <span className="ingredients__main">{d.text}</span>
            {d.changed ? (
              <span className="ingredients__orig">
                {d.converted ? 'converted · ' : ''}recipe says {d.original}
                {factor !== 1 ? ` for ${recipe.serves}` : ''}
              </span>
            ) : null}
          </span>
        );
        if (!checkable) return <li key={i} className="ingredients__item ingredients__item--plain">{content}</li>;
        const on = checked.has(i);
        return (
          <li key={i} className={`ingredients__item${on ? ' ingredients__item--on' : ''}`}>
            <label className="ingredients__label">
              <input type="checkbox" className="visually-hidden" checked={on} onChange={() => toggle(i)} />
              <span className="ingredients__box" aria-hidden="true">
                {on ? <CheckIcon size={16} /> : null}
              </span>
              {content}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

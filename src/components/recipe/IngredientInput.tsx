import { useId, useState, type KeyboardEvent } from 'react';
import { CloseIcon, PlusIcon } from '../../assets/icons';
import { splitIngredientInput } from '../../lib/ingredients';

/**
 * Multi-ingredient input: type and press Enter (or a comma) to add; commas and "and"
 * split several at once. Backspace on an empty field removes the last one.
 */
export function IngredientInput({
  values,
  onAdd,
  onRemove,
  suggestions,
  placeholder = 'e.g. paneer, tomato, rice',
  label = 'Ingredients you have',
}: {
  values: string[];
  onAdd: (items: string[]) => void;
  onRemove: (item: string) => void;
  suggestions: string[];
  placeholder?: string;
  label?: string;
}) {
  const [text, setText] = useState('');
  const inputId = useId();
  const listId = useId();
  const hintId = useId();

  const commit = () => {
    const items = splitIngredientInput(text);
    if (items.length) onAdd(items);
    setText('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Backspace' && !text && values.length) {
      onRemove(values[values.length - 1]);
    }
  };

  return (
    <div className="ing-input">
      <label htmlFor={inputId} className="ing-input__label">
        {label}
      </label>
      <div className="field ing-input__field">
        {values.length ? (
          <ul className="ing-input__tokens" aria-label="Added ingredients">
            {values.map((v) => (
              <li key={v} className="token">
                <span>{v}</span>
                <button type="button" className="token__x" onClick={() => onRemove(v)} aria-label={`Remove ${v}`}>
                  <CloseIcon size={14} />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <input
          id={inputId}
          value={text}
          onChange={(e) => {
            const v = e.target.value;
            // Picking from the datalist fires a change with the full value: add it straight away.
            if (suggestions.includes(v)) {
              onAdd([v]);
              setText('');
            } else setText(v);
          }}
          onKeyDown={onKeyDown}
          onBlur={() => text.trim() && commit()}
          list={listId}
          placeholder={values.length ? 'add another…' : placeholder}
          autoComplete="off"
          enterKeyHint="done"
          aria-describedby={hintId}
        />
        <button type="button" className="icon-btn ing-input__add" onClick={commit} aria-label="Add ingredient" disabled={!text.trim()}>
          <PlusIcon />
        </button>
      </div>
      <datalist id={listId}>
        {suggestions.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>
      <p id={hintId} className="ing-input__hint">
        Press Enter or comma after each one.
      </p>
    </div>
  );
}

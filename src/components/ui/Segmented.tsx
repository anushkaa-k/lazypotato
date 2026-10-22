import { useId } from 'react';

/** A radio group styled as a segmented control. Arrow keys work natively. */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  hideLabel,
}: {
  label: string;
  options: { id: T; label: string; hint?: string }[];
  value: T;
  onChange: (v: T) => void;
  hideLabel?: boolean;
}) {
  const name = useId();
  return (
    <fieldset className="seg">
      <legend className={hideLabel ? 'visually-hidden' : 'seg__legend'}>{label}</legend>
      <div className="seg__track">
        {options.map((o) => (
          <label key={o.id} className={`seg__opt${value === o.id ? ' seg__opt--on' : ''}`} title={o.hint}>
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              className="visually-hidden"
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

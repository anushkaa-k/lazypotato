import { MinusIcon, PlusIcon } from '../../assets/icons';

export function Stepper({
  label,
  value,
  min = 1,
  max = 12,
  onChange,
  format = (n: number) => String(n),
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
  format?: (n: number) => string;
}) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" className="stepper__btn" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`}>
        <MinusIcon size={18} />
      </button>
      <output className="stepper__value" aria-live="polite">
        {format(value)}
      </output>
      <button type="button" className="stepper__btn" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`}>
        <PlusIcon size={18} />
      </button>
    </div>
  );
}

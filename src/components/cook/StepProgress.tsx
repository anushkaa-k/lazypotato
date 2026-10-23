export function StepProgress({ step, total, onJump }: { step: number; total: number; onJump: (i: number) => void }) {
  return (
    <div className="progress">
      <p className="progress__label">
        Step {step + 1} <span className="muted">of {total}</span>
      </p>
      <ol className="progress__dots" aria-label="Steps">
        {Array.from({ length: total }, (_, i) => (
          <li key={i}>
            <button
              type="button"
              className={`progress__dot${i < step ? ' progress__dot--done' : ''}${i === step ? ' progress__dot--now' : ''}`}
              aria-label={`Go to step ${i + 1}${i === step ? ' (current)' : ''}`}
              aria-current={i === step ? 'step' : undefined}
              onClick={() => onJump(i)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

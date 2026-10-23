import type { RecipeMatch } from '../../lib/ingredients';

/** Explains a finder result: what you have, what you'd need, what's assumed. */
export function MatchExplanation({ match }: { match: RecipeMatch }) {
  const total = match.matches.length;
  const ready = match.missing.length === 0;
  const pct = Math.round(match.coverage * 100);
  return (
    <div className="match">
      <div className="match__head">
        <span className={`match__badge${ready ? ' match__badge--ready' : ''}`}>
          {ready ? 'You have everything!' : match.missing.length === 1 ? 'Missing just 1' : `Missing ${match.missing.length}`}
        </span>
        <span className="match__count">
          {match.have.length + match.basics.length} of {total} ingredients
        </span>
      </div>
      <div className="match__bar" aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="match__line">
        <strong>You have:</strong> {match.have.map((m) => m.ingredient.item).join(', ')}
        {match.basics.length ? <span className="muted"> + basics ({match.basics.map((m) => m.ingredient.item).join(', ')})</span> : null}
      </p>
      {match.missing.length ? (
        <p className="match__line match__line--missing">
          <strong>You’d need:</strong> {match.missing.map((m) => m.ingredient.item).join(', ')}
        </p>
      ) : null}
    </div>
  );
}

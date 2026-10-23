export interface StepTimer {
  /** Label shown on the button, using the step's own wording, e.g. "4–6 min". */
  label: string;
  /** Seconds to count down. For ranges we use the lower bound so you check early. */
  seconds: number;
}

const DURATION = /(\d+)(?:\s*[–-]\s*(\d+))?[\s-]*(minutes?|mins?|seconds?|secs?)\b/gi;

/**
 * Finds durations written in a step ("microwave 2 minutes", "4–6 minutes", "30-second bursts").
 * Timers are only offered when the recipe text itself gives a time.
 */
export function timersForStep(step: string): StepTimer[] {
  const seen = new Set<string>();
  const out: StepTimer[] = [];
  for (const m of step.matchAll(DURATION)) {
    const low = Number(m[1]);
    const high = m[2] ? Number(m[2]) : undefined;
    const isSeconds = /^s/i.test(m[3]);
    const unit = isSeconds ? 'sec' : 'min';
    const label = high ? `${low}–${high} ${unit}` : `${low} ${unit}`;
    if (seen.has(label) || low <= 0) continue;
    seen.add(label);
    out.push({ label, seconds: isSeconds ? low : low * 60 });
  }
  return out;
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

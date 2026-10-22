import { useEffect, useRef, useState } from 'react';
import { PauseIcon, PlayIcon, RepeatIcon, TimerIcon } from '../../assets/icons';
import { formatClock, type StepTimer as StepTimerData } from '../../lib/timers';

function chime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    [0, 0.25, 0.5].forEach((t, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = [660, 880, 990][i];
      g.gain.setValueAtTime(0.0001, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t + 0.22);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + t);
      o.stop(ctx.currentTime + t + 0.25);
    });
    setTimeout(() => void ctx.close(), 1200);
  } catch {
    /* audio unavailable: the visual alert is enough */
  }
  navigator.vibrate?.([200, 100, 200]);
}

/** A countdown for a time written in the step. Starts only when tapped. */
export function StepTimer({ timer }: { timer: StepTimerData }) {
  const [remaining, setRemaining] = useState(timer.seconds);
  const [running, setRunning] = useState(false);
  const endAt = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    endAt.current = Date.now() + remaining * 1000;
    const id = window.setInterval(() => {
      const left = Math.max(0, (endAt.current - Date.now()) / 1000);
      setRemaining(left);
      if (left <= 0) {
        setRunning(false);
        chime();
      }
    }, 250);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const done = remaining <= 0;
  const started = remaining < timer.seconds;

  return (
    <div className={`timer${running ? ' timer--running' : ''}${done ? ' timer--done' : ''}`}>
      <TimerIcon size={20} />
      <span className="timer__label">{timer.label}</span>
      <span className="timer__clock" role="timer" aria-live={done ? 'assertive' : 'off'}>
        {done ? 'Time’s up!' : formatClock(remaining)}
      </span>
      {!done ? (
        <button type="button" className="timer__btn" onClick={() => setRunning((r) => !r)} aria-label={running ? `Pause ${timer.label} timer` : `Start ${timer.label} timer`}>
          {running ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
        </button>
      ) : null}
      {started || done ? (
        <button
          type="button"
          className="timer__btn"
          onClick={() => {
            setRunning(false);
            setRemaining(timer.seconds);
          }}
          aria-label={`Reset ${timer.label} timer`}
        >
          <RepeatIcon size={18} />
        </button>
      ) : null}
    </div>
  );
}

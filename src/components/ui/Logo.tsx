import { useState } from 'react';
import logoFull from '../../assets/brand/lazy-potato-logo.webp';
import wordmarkOnly from '../../assets/brand/lazy-potato-wordmark-only.webp';
import mascotCrop from '../../assets/brand/lazy-potato-mascot.webp';

type Variant = 'full' | 'wordmark' | 'mascot';

const SOURCES: Record<Variant, { src: string; width: number; height: number }> = {
  full: { src: logoFull, width: 1254, height: 1254 },
  wordmark: { src: wordmarkOnly, width: 820, height: 168 },
  mascot: { src: mascotCrop, width: 470, height: 415 },
};

/**
 * The original Lazy Potato artwork (not redrawn). If the image fails to load, a text
 * fallback keeps the brand name visible.
 */
export function Logo({ variant = 'full', className, decorative }: { variant?: Variant; className?: string; decorative?: boolean }) {
  const [failed, setFailed] = useState(false);
  const s = SOURCES[variant];
  if (failed) {
    return (
      <span className={['logo-fallback', `logo-fallback--${variant}`, className].filter(Boolean).join(' ')} aria-hidden={decorative}>
        lazy potato
        {variant === 'full' ? <small>did you have food today?</small> : null}
      </span>
    );
  }
  return (
    <img
      className={['logo', `logo--${variant}`, className].filter(Boolean).join(' ')}
      src={s.src}
      width={s.width}
      height={s.height}
      alt={decorative ? '' : variant === 'mascot' ? 'The Lazy Potato mascot, a potato in a lilac bucket hat' : 'Lazy Potato: did you have food today?'}
      onError={() => setFailed(true)}
      decoding="async"
    />
  );
}

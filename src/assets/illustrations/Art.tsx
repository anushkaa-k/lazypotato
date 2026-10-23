import { useId, type ReactNode } from 'react';

/**
 * Shared wrapper for every hand-drawn SVG illustration.
 *
 * - A tiny turbulence displacement gives lines a slightly wobbly, hand-inked feel.
 * - Pass `title` for meaningful artwork (becomes the accessible name); omit it for
 *   decoration, which is then hidden from assistive tech.
 */
export interface ArtProps {
  title?: string;
  className?: string;
  /** Rendered width/height in CSS units. Defaults to filling the container width. */
  size?: number | string;
}

export function Art({
  viewBox = '0 0 160 160',
  title,
  className,
  size,
  wobble = 1.6,
  children,
}: ArtProps & { viewBox?: string; wobble?: number; children: ReactNode }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const filter = `wobble-${id}`;
  return (
    <svg
      viewBox={viewBox}
      className={className}
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <filter id={filter} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale={wobble} />
        </filter>
      </defs>
      <g filter={`url(#${filter})`}>{children}</g>
    </svg>
  );
}

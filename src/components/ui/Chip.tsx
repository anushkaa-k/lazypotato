import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** A toggleable pill used for filters and ingredient suggestions. */
export function Chip({
  selected,
  children,
  icon,
  className,
  ...rest
}: { selected?: boolean; icon?: ReactNode; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={['chip', selected ? 'chip--on' : '', className].filter(Boolean).join(' ')}
      aria-pressed={selected === undefined ? undefined : selected}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

/** A non-interactive label. */
export function Tag({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'lavender' | 'sage' | 'peach' | 'pink' }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

function classes(variant: Variant, size: Size, extra?: string) {
  return ['btn', `btn--${variant}`, size === 'lg' ? 'btn--lg' : '', extra ?? ''].filter(Boolean).join(' ');
}

interface Common {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  iconAfter,
  children,
  className,
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      {icon}
      <span>{children}</span>
      {iconAfter}
    </button>
  );
}

export function ButtonLink({
  variant = 'secondary',
  size = 'md',
  icon,
  iconAfter,
  children,
  className,
  ...rest
}: Common & LinkProps) {
  return (
    <Link className={classes(variant, size, className)} {...rest}>
      {icon}
      <span>{children}</span>
      {iconAfter}
    </Link>
  );
}

export function IconButton({
  label,
  children,
  className,
  type = 'button',
  ...rest
}: { label: string; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={['icon-btn', className].filter(Boolean).join(' ')} aria-label={label} title={label} {...rest}>
      {children}
    </button>
  );
}

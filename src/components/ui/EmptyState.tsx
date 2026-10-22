import type { ComponentType, ReactNode } from 'react';
import type { ArtProps } from '../../assets/illustrations/Art';

export function EmptyState({
  art: ArtComponent,
  title,
  children,
  actions,
  headingLevel = 2,
}: {
  art?: ComponentType<ArtProps>;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  headingLevel?: 1 | 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <div className="empty">
      {ArtComponent ? <ArtComponent className="empty__art" /> : null}
      <H className="empty__title">{title}</H>
      {children ? <div className="empty__body">{children}</div> : null}
      {actions ? <div className="empty__actions">{actions}</div> : null}
    </div>
  );
}

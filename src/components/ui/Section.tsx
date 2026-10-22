import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../../assets/icons';

export function Section({
  title,
  note,
  link,
  children,
  id,
}: {
  title: string;
  note?: string;
  link?: { to: string; label: string };
  children: ReactNode;
  id?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section className="section" aria-labelledby={headingId}>
      <div className="section__head">
        <div>
          {note ? <p className="hand section__note">{note}</p> : null}
          <h2 id={headingId} className="section__title">
            {title}
          </h2>
        </div>
        {link ? (
          <Link to={link.to} className="section__link">
            {link.label}
            <ArrowRightIcon size={18} />
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

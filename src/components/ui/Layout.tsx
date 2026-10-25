import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { BasketIcon, BookIcon, HeartIcon, HomeIcon } from '../../assets/icons';
import { HeartDoodle } from '../../assets/illustrations';
import { FRIEND_NAME } from '../../config';
import { useFavourites } from '../../hooks/useFavourites';
import { Logo } from './Logo';

const NAV = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/find', label: 'What’s in my kitchen', short: 'Find', icon: BasketIcon },
  { to: '/recipes', label: 'All recipes', short: 'Recipes', icon: BookIcon },
  { to: '/saved', label: 'Saved', icon: HeartIcon },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SavedBadge() {
  const { count } = useFavourites();
  if (!count) return null;
  return (
    <span className="nav-badge">
      {count}
      <span className="visually-hidden"> saved</span>
    </span>
  );
}

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="site-header__brand" aria-label="Lazy Potato home">
            <Logo variant="mascot" decorative className="site-header__mascot" />
          </Link>
          <NavLink to="/saved" className="icon-btn site-header__saved" aria-label="Saved recipes" title="Saved recipes">
            <HeartIcon size={22} />
          </NavLink>
          <nav aria-label="Main" className="site-nav">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className="site-nav__link">
                <Icon size={20} />
                <span>{label}</span>
                {to === '/saved' ? <SavedBadge /> : null}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <Logo variant="mascot" decorative className="site-footer__mascot" />
          <p className="hand site-footer__love">
            made with love for {FRIEND_NAME} <HeartDoodle className="inline-heart" />
          </p>
          <p className="site-footer__small">
            Recipes from <em>The Little Cookbook</em>, a review draft. They haven’t all been kitchen-tested yet,
            so trust your eyes and nose too. Microwaves vary: always check food is steaming hot.
          </p>
        </div>
      </footer>

      <nav aria-label="Main" className="tabbar">
        {NAV.map(({ to, label, short, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="tabbar__link">
            <span className="tabbar__icon">
              <Icon size={22} />
              {to === '/saved' ? <SavedBadge /> : null}
            </span>
            <span>{short ?? label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

/** Full-screen layout for Cook With Me: no navigation, nothing to distract. */
export function FocusLayout() {
  return (
    <>
      <ScrollToTop />
      <main id="main" tabIndex={-1} className="focus-main">
        <Outlet />
      </main>
    </>
  );
}

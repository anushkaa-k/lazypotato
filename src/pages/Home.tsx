import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, SearchIcon } from '../assets/icons';
import { HeartDoodle, MascotCook, MascotWave, SparkleDoodle, Squiggle } from '../assets/illustrations';
import { CategoryCard } from '../components/recipe/CategoryCard';
import { FavouriteButton } from '../components/recipe/FavouriteButton';
import { RecipeArt } from '../components/recipe/RecipeArt';
import { RecipeBadges, RecipeMetaInline } from '../components/recipe/RecipeMeta';
import { RecipeRow } from '../components/recipe/RecipeCard';
import { ButtonLink } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { Logo } from '../components/ui/Logo';
import { Section } from '../components/ui/Section';
import { FRIEND_NAME, PERSONAL_NOTE, SIGN_OFF } from '../config';
import { categories, getCategory } from '../data/categories';
import { isNoCook, recipes, totalMinutes } from '../data/recipes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFavourites } from '../hooks/useFavourites';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { splitIngredientInput } from '../lib/ingredients';
import { recipeOfTheDay, sortRecipes } from '../lib/search';

const QUICK_PICKS = ['paneer', 'rice', 'potato', 'cheese', 'spinach', 'chickpeas', 'pasta', 'yogurt'];

function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 5) return 'Up late';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function HeroSearch() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [picked, setPicked] = useState<string[]>([]);

  const go = (items: string[]) => {
    const all = [...new Set(items.map((s) => s.trim().toLowerCase()).filter(Boolean))];
    navigate(all.length ? `/find?have=${encodeURIComponent(all.join(','))}` : '/find');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    go([...picked, ...splitIngredientInput(text)]);
  };

  const togglePick = (p: string) => setPicked((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  return (
    <form className="hero-search" onSubmit={onSubmit} role="search" aria-label="Find recipes by ingredient">
      <label htmlFor="hero-have" className="hero-search__label">
        What’s in your kitchen?
      </label>
      <div className="field">
        <SearchIcon />
        <input id="hero-have" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. paneer, rice" autoComplete="off" enterKeyHint="search" />
        <button type="submit" className="btn btn--primary hero-search__go">
          <span>Find food</span>
        </button>
      </div>
      <div className="hero-search__picks">
        <span className="hand hero-search__or">or tap a few:</span>
        <div className="chip-row">
          {QUICK_PICKS.map((p) => (
            <Chip key={p} selected={picked.includes(p)} onClick={() => togglePick(p)}>
              {p}
            </Chip>
          ))}
        </div>
      </div>
    </form>
  );
}

export function Home() {
  useDocumentTitle(undefined);
  const featured = recipeOfTheDay(recipes);
  const featuredCat = getCategory(featured.category);
  const quick = sortRecipes(recipes.filter((r) => totalMinutes(r) <= 10), 'quickest');
  const noCook = recipes.filter(isNoCook);
  const recent = useRecentlyViewed().filter((r) => r.id !== featured.id);
  const { saved } = useFavourites();

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__logo-wrap">
            <Logo variant="full" className="hero__logo" />
          </div>
          <div className="hero__text">
            <p className="hand hero__hi">{greeting()},</p>
            <h1 className="hero__title">
              {FRIEND_NAME}! <span className="hero__q">Did you have food today?</span>
            </h1>
            <Squiggle className="hero__squiggle" />
            <p className="hero__lede">No fuss, no fancy skills. Tell me what you’ve got and I’ll find you something cosy to make.</p>
            <HeroSearch />
          </div>
        </div>
      </section>

      <div className="container">
        <section className="featured" aria-labelledby="featured-title">
          <div className="featured__art">
            <RecipeArt recipe={featured} size="lg" />
            <MascotWave className="featured__mascot" />
          </div>
          <div className="featured__body">
            <p className="hand featured__note">today’s pick, just for you</p>
            <p className="featured__cat">{featuredCat?.name}</p>
            <h2 id="featured-title" className="featured__title">
              {featured.name}
            </h2>
            <RecipeMetaInline recipe={featured} />
            <RecipeBadges recipe={featured} />
            <p className="featured__ings">
              <span className="muted">You’ll need:</span> {featured.ingredients.map((i) => i.item).join(', ')}
            </p>
            <div className="featured__actions">
              <ButtonLink to={`/recipe/${featured.id}/cook`} variant="primary" size="lg" icon={<MascotCook className="btn-mascot" />}>
                Cook with me
              </ButtonLink>
              <ButtonLink to={`/recipe/${featured.id}`} variant="secondary" size="lg">
                Read the recipe
              </ButtonLink>
              <FavouriteButton recipe={featured} />
            </div>
          </div>
        </section>

        <Section title="Browse by category" note="what are you in the mood for?" id="cats" link={{ to: '/recipes', label: 'All 30 recipes' }}>
          <ul className="category-grid">
            {categories.map((c) => (
              <li key={c.id}>
                <CategoryCard category={c} />
              </li>
            ))}
          </ul>
        </Section>

        {recent.length ? (
          <Section title="Recently looked at" note="pick up where you left off" id="recent">
            <RecipeRow recipes={recent} />
          </Section>
        ) : null}

        <Section title="Ready in 10 minutes or less" note="for very hungry moments" id="quick" link={{ to: '/recipes?time=10&sort=quickest', label: 'See all' }}>
          <RecipeRow recipes={quick} />
        </Section>

        <Section title="No stove needed" note="too tired to cook? same." id="nocook" link={{ to: '/recipes?nocook=1', label: 'See all' }}>
          <RecipeRow recipes={noCook} />
        </Section>

        {saved.length ? (
          <Section title="Your favourites" note="the ones you loved" id="faves" link={{ to: '/saved', label: 'All saved' }}>
            <RecipeRow recipes={saved.slice(0, 8)} />
          </Section>
        ) : (
          <aside className="saved-teaser">
            <HeartDoodle className="saved-teaser__heart" />
            <p>
              Tap the heart on any recipe to keep it in <Link to="/saved">Saved</Link>, so your favourites are always one tap away.
            </p>
          </aside>
        )}

        <aside className="note-card" aria-label="A little note">
          <SparkleDoodle className="note-card__spark note-card__spark--a" />
          <SparkleDoodle className="note-card__spark note-card__spark--b" fill="#F6D88E" />
          <p className="hand note-card__to">dear {FRIEND_NAME},</p>
          <p className="note-card__text">{PERSONAL_NOTE}</p>
          <p className="hand note-card__from">{SIGN_OFF} ♡</p>
          <Link to="/find" className="note-card__link">
            Start with what’s in the fridge <ArrowRightIcon size={18} />
          </Link>
        </aside>
      </div>
    </div>
  );
}

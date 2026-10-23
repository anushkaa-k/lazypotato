import { Route, Routes } from 'react-router-dom';
import { FocusLayout, Layout } from './components/ui/Layout';
import { Browse } from './pages/Browse';
import { Category } from './pages/Category';
import { CookWithMe } from './pages/CookWithMe';
import { Done } from './pages/Done';
import { Finder } from './pages/Finder';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { RecipeDetail } from './pages/RecipeDetail';
import { Saved } from './pages/Saved';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="find" element={<Finder />} />
        <Route path="recipes" element={<Browse />} />
        <Route path="category/:id" element={<Category />} />
        <Route path="recipe/:id" element={<RecipeDetail />} />
        <Route path="saved" element={<Saved />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<FocusLayout />}>
        <Route path="recipe/:id/cook" element={<CookWithMe />} />
        <Route path="recipe/:id/done" element={<Done />} />
      </Route>
    </Routes>
  );
}

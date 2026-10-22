import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './styles/fonts';
import './styles/tokens.css';
import './styles/base.css';
import './components/ui/ui.css';
import './components/recipe/recipe.css';
import './components/cook/cook.css';
import './styles/pages.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);

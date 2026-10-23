import { MascotPuzzled } from '../assets/illustrations';
import { ButtonLink } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFound() {
  useDocumentTitle('Not found');
  return (
    <div className="container page">
      <EmptyState
        art={MascotPuzzled}
        title="This page rolled away"
        headingLevel={1}
        actions={
          <>
            <ButtonLink to="/" variant="primary">
              Go home
            </ButtonLink>
            <ButtonLink to="/recipes">All recipes</ButtonLink>
          </>
        }
      >
        <p>I looked everywhere, even under the hat. Let’s get you back to the food.</p>
      </EmptyState>
    </div>
  );
}

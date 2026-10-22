import { useEffect } from 'react';

export function useDocumentTitle(title: string | undefined) {
  useEffect(() => {
    document.title = title ? `${title} · Lazy Potato` : 'Lazy Potato · did you have food today?';
  }, [title]);
}

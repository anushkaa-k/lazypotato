import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Read/write helpers for state kept in the URL query (filters, ingredients), so results
 * survive refreshes and the back button, and can be bookmarked.
 */
export function useUrlState() {
  const [params, setParams] = useSearchParams();

  const get = useCallback((key: string) => params.get(key) ?? undefined, [params]);
  const getList = useCallback(
    (key: string) => (params.get(key) ?? '').split(',').map((s) => s.trim()).filter(Boolean),
    [params],
  );

  const update = useCallback(
    (changes: Record<string, string | string[] | undefined | null>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [k, v] of Object.entries(changes)) {
            const value = Array.isArray(v) ? v.join(',') : v;
            if (value == null || value === '') next.delete(k);
            else next.set(k, value);
          }
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  return { params, get, getList, update };
}

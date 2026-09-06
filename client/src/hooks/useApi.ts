import { useEffect, useState, useCallback } from 'react';
import { ApiRequestError } from '@/lib/apiClient';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  /** True specifically for a 404 — lets callers render "not found" vs a generic error. */
  notFound: boolean;
}

/**
 * Small data-fetching hook used across pages instead of pulling in a
 * heavier query library — this is a content site with modest data needs,
 * not a highly interactive app, so react-query would be an unjustified
 * dependency (see brief section 6: "do not introduce unnecessary
 * technologies").
 */
export function useApi<T>(fetcher: () => Promise<T>, deps: unknown[] = []): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
    notFound: false,
  });

  const load = useCallback(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null, notFound: false });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const isNotFound = err instanceof ApiRequestError && err.status === 404;
        setState({
          data: null,
          loading: false,
          notFound: isNotFound,
          error: isNotFound
            ? null
            : err instanceof Error
              ? err.message
              : 'Something went wrong while loading this content.',
        });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => load(), [load]);

  return state;
}

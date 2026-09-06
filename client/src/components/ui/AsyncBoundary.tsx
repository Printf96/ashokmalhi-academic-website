import type { ReactNode } from 'react';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';

interface AsyncBoundaryProps<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
  /** Returns true when `data` should be treated as "no content yet" rather than rendered. */
  isEmpty?: (data: T) => boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  children: (data: T) => ReactNode;
}

/** Standardizes the loading / error / empty / content states for any data-backed section. */
export function AsyncBoundary<T>({
  loading,
  error,
  data,
  isEmpty,
  emptyTitle,
  emptyMessage,
  children,
}: AsyncBoundaryProps<T>) {
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (data === null) return <EmptyState title={emptyTitle} message={emptyMessage} />;
  if (isEmpty?.(data)) return <EmptyState title={emptyTitle} message={emptyMessage} />;
  return <>{children(data)}</>;
}

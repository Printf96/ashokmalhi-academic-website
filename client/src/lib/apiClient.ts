import type { ApiErrorResponse } from '@shared/types/academic';

/**
 * In dev, Vite proxies /api to the Express server (see vite.config.ts).
 * In production, the client and API are expected to share an origin
 * (or VITE_API_BASE_URL can be set to point at a separate API host).
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export class ApiRequestError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    let body: ApiErrorResponse | null = null;
    try {
      body = await res.json();
    } catch {
      // response body wasn't JSON; fall through to generic message
    }
    throw new ApiRequestError(
      res.status,
      body?.error?.message ?? `Request failed with status ${res.status}`,
      body?.error?.code ?? 'UNKNOWN_ERROR'
    );
  }

  return res.json() as Promise<T>;
}

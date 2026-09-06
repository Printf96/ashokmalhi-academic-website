import { useEffect } from 'react';

/**
 * Convenience redirect routes (/scholar, /orcid, etc.) mentioned in
 * brief section 43. Implemented as a client-side redirect rather than
 * an HTTP 301 since this is a static SPA build; if server-side hosting
 * is later added, these can be promoted to real redirects at that layer.
 */
export function ScholarRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <p>Redirecting to external academic profile…</p>
      <p>
        <a href={url}>Click here if you are not redirected automatically.</a>
      </p>
    </div>
  );
}

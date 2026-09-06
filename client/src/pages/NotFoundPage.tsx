import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/seo/SeoHead';

export function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page Not Found | Dr. Ashok Malhi"
        description="The page you are looking for could not be found."
        path="/404"
        noindex
      />
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <p className="mono-label">404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for doesn't exist or may have moved.</p>
        <Link to="/">Return to homepage</Link>
      </div>
    </>
  );
}

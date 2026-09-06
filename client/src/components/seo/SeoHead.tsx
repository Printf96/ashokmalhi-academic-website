import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  /** Additional JSON-LD objects to inject as separate <script> blocks. */
  jsonLd?: Record<string, unknown>[];
  image?: string;
  noindex?: boolean;
}

/**
 * Sets per-route title, meta description, canonical URL, Open Graph and
 * Twitter card tags, and any JSON-LD structured data for that page.
 * Every route that renders real content should use this component so
 * on-page SEO requirements (unique title/description/canonical) are met
 * without duplicating boilerplate in every page component.
 */
export function SeoHead({ title, description, path, jsonLd = [], image, noindex }: SeoHeadProps) {
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image ?? `${SITE_URL}/og-default.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="profile" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd.map((block, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}

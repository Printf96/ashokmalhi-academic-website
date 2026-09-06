import { SeoHead } from '@/components/seo/SeoHead';
import { Section } from '@/components/ui/Section';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import { buildBreadcrumbSchema, IDENTITY } from '@/lib/seo';
import timelineStyles from '@/components/academic/Timeline.module.css';

function formatDate(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function PresentationsPage() {
  const presentations = useApi(() => api.listPresentations(), []);

  return (
    <>
      <SeoHead
        title="Presentations | Dr. Ashok Malhi"
        description={`Conference talks, invited talks, and academic presentations by ${IDENTITY.displayName}, ${IDENTITY.professionalTitle} at ${IDENTITY.affiliation}.`}
        path="/presentations"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Presentations', path: '/presentations' },
          ]),
        ]}
      />

      <Section eyebrow="Academic Speaking" title="Presentations" id="presentations">
        <AsyncBoundary
          loading={presentations.loading}
          error={presentations.error}
          data={presentations.data}
          isEmpty={(d) => d.data.length === 0}
          emptyTitle="Academic presentations will be added"
          emptyMessage="Conference talks, invited talks, and workshop presentations will be listed here as verified records become available."
        >
          {(res) => (
            <ol className={timelineStyles.timeline}>
              {res.data.map((item) => (
                <li key={item._id} className={timelineStyles.item}>
                  <Card>
                    <p className={timelineStyles.period}>
                      {item.dateDisplay ?? formatDate(item.date) ?? 'Date to be confirmed'}
                    </p>
                    <h3 className={timelineStyles.title}>{item.title}</h3>
                    {(item.event || item.organization) && (
                      <p className={timelineStyles.subtitle}>
                        {[item.event, item.organization].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    {item.location && <p className={timelineStyles.subtitle}>{item.location}</p>}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {item.scope && <Badge tone="accent">{item.scope}</Badge>}
                      {item.type && <Badge tone="neutral">{item.type.replace('-', ' ')}</Badge>}
                    </div>
                    {item.description && (
                      <p className={timelineStyles.description} style={{ marginTop: '0.75rem' }}>
                        {item.description}
                      </p>
                    )}
                  </Card>
                </li>
              ))}
            </ol>
          )}
        </AsyncBoundary>
      </Section>
    </>
  );
}

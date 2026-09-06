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

export function ExperiencePage() {
  const experience = useApi(() => api.listExperience(), []);

  return (
    <>
      <SeoHead
        title="Experience | Dr. Ashok Malhi"
        description={`Academic and professional experience of ${IDENTITY.displayName}, currently ${IDENTITY.professionalTitle} at ${IDENTITY.affiliation}.`}
        path="/experience"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Experience', path: '/experience' },
          ]),
        ]}
      />

      <Section eyebrow="Career" title="Experience" id="experience">
        <AsyncBoundary
          loading={experience.loading}
          error={experience.error}
          data={experience.data}
          isEmpty={(d) => d.data.length === 0}
          emptyTitle="Experience records pending"
          emptyMessage="Historical academic and professional experience will be added here as verified records become available."
        >
          {(res) => (
            <ol className={timelineStyles.timeline}>
              {res.data.map((item) => {
                const start = formatDate(item.startDate);
                const end = item.isCurrent ? 'Present' : formatDate(item.endDate);
                return (
                  <li key={item._id} className={timelineStyles.item}>
                    <Card>
                      <p className={timelineStyles.period}>
                        {start ?? '—'} {end ? `– ${end}` : ''}
                      </p>
                      <h3 className={timelineStyles.title}>{item.role}</h3>
                      <p className={timelineStyles.subtitle}>{item.organization}</p>
                      <Badge tone={item.isCurrent ? 'success' : 'neutral'}>
                        {item.isCurrent ? '● Current position' : item.type}
                      </Badge>
                      {item.responsibilities.length > 0 && (
                        <ul className={timelineStyles.description} style={{ marginTop: '0.75rem' }}>
                          {item.responsibilities.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      )}
                      {item.description && (
                        <p className={timelineStyles.description} style={{ marginTop: '0.75rem' }}>
                          {item.description}
                        </p>
                      )}
                      {item.provenanceNote && (
                        <p
                          className={timelineStyles.description}
                          style={{ marginTop: '0.75rem', fontStyle: 'italic' }}
                        >
                          ⚠ {item.provenanceNote}
                        </p>
                      )}
                    </Card>
                  </li>
                );
              })}
            </ol>
          )}
        </AsyncBoundary>
      </Section>
    </>
  );
}

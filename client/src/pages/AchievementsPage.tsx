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

export function AchievementsPage() {
  const achievements = useApi(() => api.listAchievements(), []);

  return (
    <>
      <SeoHead
        title="Achievements | Dr. Ashok Malhi"
        description={`Awards, recognitions, and academic milestones of ${IDENTITY.displayName}, ${IDENTITY.professionalTitle} at ${IDENTITY.affiliation}.`}
        path="/achievements"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Achievements', path: '/achievements' },
          ]),
        ]}
      />

      <Section eyebrow="Recognition" title="Achievements" id="achievements">
        <AsyncBoundary
          loading={achievements.loading}
          error={achievements.error}
          data={achievements.data}
          isEmpty={(d) => d.data.length === 0}
          emptyTitle="Achievements will be added"
          emptyMessage="Awards, recognitions, certifications, and academic milestones will be listed here as verified records become available."
        >
          {(res) => (
            <ol className={timelineStyles.timeline}>
              {res.data.map((item) => (
                <li key={item._id} className={timelineStyles.item}>
                  <Card>
                    <p className={timelineStyles.period}>{formatDate(item.date) ?? 'Date to be confirmed'}</p>
                    <h3 className={timelineStyles.title}>{item.title}</h3>
                    {item.issuer && <p className={timelineStyles.subtitle}>{item.issuer}</p>}
                    <Badge tone="accent">{item.type.replace('-', ' ')}</Badge>
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

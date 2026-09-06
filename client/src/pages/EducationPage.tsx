import { SeoHead } from '@/components/seo/SeoHead';
import { Section } from '@/components/ui/Section';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { Card } from '@/components/ui/Card';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import { buildBreadcrumbSchema, IDENTITY } from '@/lib/seo';
import timelineStyles from '@/components/academic/Timeline.module.css';

export function EducationPage() {
  const education = useApi(() => api.listEducation(), []);

  return (
    <>
      <SeoHead
        title="Education | Dr. Ashok Malhi"
        description={`Academic education and qualifications of ${IDENTITY.displayName}, ${IDENTITY.professionalTitle} at ${IDENTITY.affiliation}.`}
        path="/education"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Education', path: '/education' },
          ]),
        ]}
      />

      <Section eyebrow="Academic Record" title="Education" id="education">
        <AsyncBoundary
          loading={education.loading}
          error={education.error}
          data={education.data}
          isEmpty={(d) => d.data.length === 0}
          emptyTitle="Education records pending"
          emptyMessage="Verified degree, institution, and qualification records will be added here once confirmed."
        >
          {(res) => (
            <ol className={timelineStyles.timeline}>
              {res.data.map((item) => (
                <li key={item._id} className={timelineStyles.item}>
                  <Card>
                    <p className={timelineStyles.period}>
                      {item.startYear ?? '—'}
                      {item.endYear ? ` – ${item.endYear}` : ''}
                    </p>
                    <h3 className={timelineStyles.title}>
                      {item.degree ?? 'Degree to be confirmed'}
                      {item.fieldOfStudy ? ` — ${item.fieldOfStudy}` : ''}
                    </h3>
                    <p className={timelineStyles.subtitle}>
                      {item.institution ?? 'Institution to be confirmed'}
                      {item.grade ? ` · ${item.gradeLabel ?? 'Grade'}: ${item.grade}` : ''}
                    </p>
                    {item.description && (
                      <p className={timelineStyles.description}>{item.description}</p>
                    )}
                    {item.provenanceNote && (
                      <p className={timelineStyles.description} style={{ fontStyle: 'italic' }}>
                        ⚠ {item.provenanceNote}
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

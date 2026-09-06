import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import type { AcademicProfileRecord, ProfileCategory } from '@shared/types/academic';
import styles from './AcademicProfilesList.module.css';

const CATEGORY_LABELS: Record<ProfileCategory, string> = {
  academic: 'Academic',
  professional: 'Professional',
  social: 'Social',
};

function groupByCategory(profiles: AcademicProfileRecord[]) {
  const groups: Record<ProfileCategory, AcademicProfileRecord[]> = {
    academic: [],
    professional: [],
    social: [],
  };
  for (const profile of profiles) {
    groups[profile.category].push(profile);
  }
  return groups;
}

/**
 * Renders the Academic & Professional Profiles area (brief section 42),
 * clearly distinguishing academic / professional / social links, and
 * doubling as the visible sameAs graph reinforcing entity SEO.
 */
export function AcademicProfilesList() {
  const { data, loading, error } = useApi(() => api.listAcademicProfiles(), []);

  return (
    <AsyncBoundary
      loading={loading}
      error={error}
      data={data}
      isEmpty={(d) => d.data.length === 0}
      emptyTitle="Profiles pending"
      emptyMessage="Academic and professional profile links will appear here once verified."
    >
      {(res) => {
        const groups = groupByCategory(res.data);
        return (
          <div className={styles.grid}>
            {(Object.keys(groups) as ProfileCategory[]).map((category) =>
              groups[category].length ? (
                <div key={category} className={styles.column}>
                  <h3 className={styles.columnTitle}>{CATEGORY_LABELS[category]}</h3>
                  <ul className={styles.list}>
                    {groups[category].map((profile) => (
                      <li key={profile._id}>
                        <a
                          href={profile.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow me"
                          className={styles.link}
                        >
                          {profile.label}
                          <span className={styles.external} aria-hidden="true">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        );
      }}
    </AsyncBoundary>
  );
}

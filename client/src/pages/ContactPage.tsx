import { useState, type FormEvent } from 'react';
import { SeoHead } from '@/components/seo/SeoHead';
import { Section } from '@/components/ui/Section';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import { ApiRequestError } from '@/lib/apiClient';
import { buildBreadcrumbSchema, IDENTITY } from '@/lib/seo';
import { SOCIAL_LINKS } from '@/lib/socialConfig';
import styles from './ContactPage.module.css';

// Pulled from the single central social/contact configuration rather
// than hardcoded again here, so the phone/WhatsApp number is defined
// in exactly one place across the whole site.
const PHONE_LINK = SOCIAL_LINKS.find((l) => l.platform === 'phone');
const WHATSAPP_LINK = SOCIAL_LINKS.find((l) => l.platform === 'whatsapp');
const EMAIL_LINK = SOCIAL_LINKS.find((l) => l.platform === 'email');

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

const INITIAL_FORM: FormState = { name: '', email: '', subject: '', message: '', website: '' };

export function ContactPage() {
  const contactInfo = useApi(() => api.getContactInformation(), []);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function validate(): boolean {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) errors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.';
    if (form.subject.trim().length < 3) errors.subject = 'Please enter a subject.';
    if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setStatusMessage(null);
    try {
      const res = await api.submitContactForm(form);
      setStatus('success');
      setStatusMessage(res.data.message);
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setStatusMessage(
        err instanceof ApiRequestError
          ? err.message
          : 'Something went wrong sending your message. Please try again later.'
      );
    }
  }

  return (
    <>
      <SeoHead
        title="Contact | Dr. Ashok Malhi"
        description={`Get in touch with ${IDENTITY.displayName}, ${IDENTITY.professionalTitle} at ${IDENTITY.affiliation}.`}
        path="/contact"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <Section eyebrow="Get in Touch" title="Contact" id="contact">
        <div className={styles.grid}>
          <div className={styles.infoCard}>
            <AsyncBoundary
              loading={contactInfo.loading}
              error={null}
              data={contactInfo.data}
              emptyTitle="Contact details pending"
              emptyMessage="Professional contact information will be added once confirmed."
            >
              {(res) => (
                <>
                  <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>Institution</p>
                    <p>{res.data.institution ?? IDENTITY.affiliation}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>Professional Email</p>
                    <p>
                      {res.data.professionalEmail && EMAIL_LINK ? (
                        <a href={EMAIL_LINK.url ?? undefined} title={EMAIL_LINK.tooltip}>
                          {res.data.professionalEmail}
                        </a>
                      ) : (
                        res.data.professionalEmail ?? 'To be confirmed'
                      )}
                    </p>
                  </div>
                  {PHONE_LINK?.url && (
                    <div className={styles.infoRow}>
                      <p className={styles.infoLabel}>Phone</p>
                      <p>
                        <a href={PHONE_LINK.url} title={PHONE_LINK.tooltip}>
                          {PHONE_LINK.url.replace('tel:', '')}
                        </a>
                      </p>
                    </div>
                  )}
                  {WHATSAPP_LINK?.url && (
                    <div className={styles.infoRow}>
                      <p className={styles.infoLabel}>WhatsApp Business</p>
                      <p>
                        <a
                          href={WHATSAPP_LINK.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={WHATSAPP_LINK.tooltip}
                        >
                          Message on WhatsApp
                        </a>
                      </p>
                    </div>
                  )}
                  <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>Department</p>
                    <p>{res.data.department ?? 'To be confirmed'}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>Office Hours</p>
                    <p>{res.data.officeHours ?? 'To be confirmed'}</p>
                  </div>
                </>
              )}
            </AsyncBoundary>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {status === 'success' && statusMessage && (
              <div className={`${styles.statusMessage} ${styles.statusSuccess}`} role="status">
                {statusMessage}
              </div>
            )}
            {status === 'error' && statusMessage && (
              <div className={`${styles.statusMessage} ${styles.statusError}`} role="alert">
                {statusMessage}
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className={styles.input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                autoComplete="name"
                required
              />
              {fieldErrors.name && (
                <span id="name-error" className={styles.errorText}>
                  {fieldErrors.name}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                autoComplete="email"
                required
              />
              {fieldErrors.email && (
                <span id="email-error" className={styles.errorText}>
                  {fieldErrors.email}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                className={styles.input}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                aria-invalid={!!fieldErrors.subject}
                aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                required
              />
              {fieldErrors.subject && (
                <span id="subject-error" className={styles.errorText}>
                  {fieldErrors.subject}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className={styles.textarea}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                required
              />
              {fieldErrors.message && (
                <span id="message-error" className={styles.errorText}>
                  {fieldErrors.message}
                </span>
              )}
            </div>

            {/* Honeypot field: hidden from sighted and screen-reader users via
                CSS clipping (not display:none, which some scrapers skip),
                tabIndex -1 and aria-hidden keep it out of the tab order and AT tree. */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}

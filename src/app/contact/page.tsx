import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/config';
import styles from './contact.module.css';

export const metadata: Metadata = {
    title: "Contact Us | Ethercraft Guild",
};

export default function ContactPage() {
    const formAction = `https://formspree.io/f/${SITE_CONFIG.contactEmail}`;

    return (
        <Section className={styles.contactSection}>
            <div className={styles.contactCard}>
                <h1>Start Your Project</h1>
                <p className={styles.subtitle}>Tell us about your goals. We will get back to you within 24 hours.</p>

                <div className={`${styles.directContact} ${styles.topContact}`}>
                    <a href={SITE_CONFIG.calendly} target="_blank" className={`${styles.calendlyLink} ${styles.primary}`}>
                        <span className={styles.iconCalendar}>📅</span> Schedule a 30-min Discovery
                    </a>
                    <p className={styles.dividerText}>OR</p>
                </div>

                <form action={formAction} method="POST" className={styles.contactForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required placeholder="Jane Doe" />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required placeholder="jane@company.com" />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message">Project Details</label>
                        <textarea id="message" name="message" rows={5} required placeholder="I need help with..."></textarea>
                    </div>

                    <Button type="submit" variant="primary" className={styles.submitBtn}>Send Message</Button>
                </form>

                <div className={styles.emailContact}>
                    <p className={styles.smallText}>Prefer email? <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a></p>
                </div>
            </div>
        </Section>
    );
}

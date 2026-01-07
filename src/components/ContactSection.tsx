import { SITE_CONFIG } from '@/config';
import styles from './ContactSection.module.css';

export default function ContactSection() {
    const { companyName, privacyEmail, location } = SITE_CONFIG;

    return (
        <section className={styles.contactSection}>
            <div className={styles.containerSm}>
                <div className={styles.contactCard}>
                    <h2>Contact Us</h2>
                    <p className={styles.introText}>
                        If you have questions or comments about this Privacy Policy, please contact us at:
                    </p>

                    <div className={styles.contactDetails}>
                        <div className={styles.detailRow}>
                            <span className={styles.label}>Company:</span>
                            <span className={styles.value}>{companyName}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.label}>Email:</span>
                            <a href={`mailto:${privacyEmail}`} className={`${styles.value} ${styles.link}`}>{privacyEmail}</a>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.label}>Location:</span>
                            <span className={styles.value}>{location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

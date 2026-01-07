import Link from 'next/link';
import SocialIcons from './ui/SocialIcons';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.siteFooter}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <SocialIcons className={styles.footerSocials} />
                    </div>
                    <div className={styles.footerLinks}>
                        <div className={styles.linkGroup}>
                            <h4>Services</h4>
                            <ul>
                                <li><Link href="/services/architecture">Digital Architecture</Link></li>
                                <li><Link href="/services/growth">Growth & Brand</Link></li>
                                <li><Link href="/services/operations">Talent & Operations</Link></li>
                            </ul>
                        </div>
                        <div className={styles.linkGroup}>
                            <h4>Company</h4>
                            <ul>
                                <li><Link href="/about" target="_blank">About</Link></li>
                                <li><Link href="/privacy" target="_blank">Privacy Policy</Link></li>
                                <li><Link href="/terms" target="_blank">Terms & Conditions</Link></li>
                                <li><Link href="/contact" target="_blank">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>&copy; 2020 Ethercraft Guild. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

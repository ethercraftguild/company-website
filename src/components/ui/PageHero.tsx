import Section from './Section';
import Button from './Button';
import styles from './PageHero.module.css';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function PageHero({
    title,
    subtitle,
    ctaText = "Start a Conversation",
    ctaLink = "/contact",
    variant = 'primary'
}: PageHeroProps) {
    return (
        <Section className={styles.pageHero}>
            <div className={styles.heroContent}>
                <h1>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                <div className={styles.ctaWrapper}>
                    <Button href={ctaLink} variant={variant}>{ctaText}</Button>
                </div>
            </div>
        </Section>
    );
}

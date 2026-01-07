import Section from './Section';
import Button from './Button';
import styles from './CtaSection.module.css';

interface CtaSectionProps {
    title?: string;
    text?: string; // Optional text
    ctaText?: string;
    ctaLink?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    centered?: boolean;
}

export default function CtaSection({
    title = "Ready to Partner with the Guild?",
    text,
    ctaText = "Start Your Project",
    ctaLink = "/contact",
    variant = 'tertiary',
    centered = true
}: CtaSectionProps) {
    return (
        <Section className={styles.ctaSection}>
            <div className={`${styles.ctaContent} ${centered ? styles.centered : ''}`}>
                <h3>{title}</h3>
                {text && <p>{text}</p>}
                <Button href={ctaLink} variant={variant}>{ctaText}</Button>
            </div>
        </Section>
    );
}

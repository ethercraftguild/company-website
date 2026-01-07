import { ReactNode } from 'react';
import Section from '@/components/ui/Section';
import PageHero from '@/components/ui/PageHero';
import CtaSection from '@/components/ui/CtaSection';
import styles from './ServiceDetailLayout.module.css';

interface ServiceDetailLayoutProps {
    hero: {
        title: string;
        subtitle?: string;
        ctaText?: string;
        ctaLink?: string;
    };
    sidebar: ReactNode;
    cta: {
        title: string;
        ctaText?: string;
        ctaLink?: string;
        variant?: 'primary' | 'secondary' | 'tertiary';
    };
    children: ReactNode;
}

export default function ServiceDetailLayout({ hero, sidebar, cta, children }: ServiceDetailLayoutProps) {
    return (
        <main>
            <PageHero
                title={hero.title}
                subtitle={hero.subtitle}
                ctaText={hero.ctaText}
                ctaLink={hero.ctaLink}
            />

            <Section className={styles.serviceDetails}>
                <div className={styles.contentGrid}>
                    <div className={styles.mainContent}>
                        {children}
                    </div>

                    <aside className={styles.sidebar}>
                        {sidebar}
                    </aside>
                </div>
            </Section>

            <CtaSection
                title={cta.title}
                ctaText={cta.ctaText}
                ctaLink={cta.ctaLink}
                variant={cta.variant}
            />
        </main>
    );
}

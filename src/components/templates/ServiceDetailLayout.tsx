import { ReactNode } from 'react';
import Section from '@/components/ui/Section';
import PageHero from '@/components/ui/PageHero';
import CtaSection from '@/components/ui/CtaSection';

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

            <Section className="block">
                <div className="grid grid-cols-1 gap-xl md:grid-cols-[2fr_1fr]">
                    <div className="[&>h2]:mb-md [&>h2]:text-2xl [&>h3]:mt-lg [&>h3]:mb-sm [&>h3]:text-2xl [&>p]:mb-md [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:ml-lg [&>ul]:mb-md [&>ol]:list-decimal [&>ol]:ml-lg [&>ol]:mb-md [&>li]:mb-xs">
                        {children}
                    </div>

                    <aside>
                        {/* Sidebar content often uses InfoCard styles which we'll need to support or migrate */}
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

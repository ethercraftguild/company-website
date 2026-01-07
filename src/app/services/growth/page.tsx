import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import PageHero from '@/components/ui/PageHero';
import Accordion from '@/components/ui/Accordion';
import CtaSection from '@/components/ui/CtaSection';
import servicesStyles from '../services.module.css';

export const metadata: Metadata = {
    title: "Growth & Brand Mastery | Ethercraft Guild",
    description: "We build brands that resonate and strategies that convert. Data-driven growth for the modern digital landscape.",
};

export default function GrowthPage() {
    return (
        <main>
            <PageHero
                title="Growth & Brand Mastery"
                subtitle="We build brands that resonate and strategies that convert. Data-driven growth for the modern digital landscape."
                ctaText="Audit Your Strategy"
                ctaLink="/contact"
            />

            <Section className="service-index">
                <h2>Specializations</h2>
                <div className={servicesStyles.accordionWrapper}>
                    <Accordion
                        items={[
                            {
                                title: "SEO & Content Strategy",
                                description:
                                    "Drive organic traffic with high-value content architecture and technical SEO. We build authority that lasts, not just temporary spikes.",
                                link: "/services/growth/seo-content",
                            },
                            {
                                title: "Brand Identity & Design",
                                description:
                                    "Forge a distinct visual and verbal identity. From logo systems to voice guidelines, we ensure your brand cuts through the noise.",
                                link: "/services/growth/brand-identity",
                            },
                            {
                                title: "Performance Marketing",
                                description:
                                    "Paid acquisition campaigns that respect ROI. We manage ad spend across Google, LinkedIn, and Meta with a focus on CAC and LTV.",
                                link: "/services/growth/performance-marketing",
                            },
                            {
                                title: "Audio & Video Production",
                                description:
                                    "Compelling visual storytelling and immersive soundscapes. We produce high-fidelity media assets that capture attention and communicate your brand's essence.",
                                link: "/services/growth/audio-video-production",
                            },
                        ]}
                    />
                </div>
            </Section>

            <Section className={servicesStyles.whyChoose}>
                <div className={servicesStyles.whyHeader}>
                    <h2>The Guild Difference</h2>
                </div>
                <div className={servicesStyles.featureGrid}>
                    <div className={servicesStyles.featureItem}>
                        <div className={servicesStyles.featureIcon}>📊</div>
                        <h3>Data, Not Gut Feeling</h3>
                        <p>
                            Every campaign is backed by analytics. We iterate based on what the
                            numbers say.
                        </p>
                    </div>
                    <div className={servicesStyles.featureItem}>
                        <div className={servicesStyles.featureIcon}>🎨</div>
                        <h3>Cohesive Storytelling</h3>
                        <p>
                            Design and copy work in unison. No disjointed messages across your
                            channels.
                        </p>
                    </div>
                    <div className={servicesStyles.featureItem}>
                        <div className={servicesStyles.featureIcon}>🚀</div>
                        <h3>Full-Funnel Ownership</h3>
                        <p>From awareness to retention, we optimize the entire user journey.</p>
                    </div>
                </div>
            </Section>

            <CtaSection
                title="Ready to Scale?"
                ctaText="Start Your Growth Project"
                ctaLink="/contact"
                variant="tertiary"
            />
        </main>
    );
}

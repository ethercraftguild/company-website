import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';

export const metadata: Metadata = {
    title: "SEO & Content Strategy | Ethercraft Guild",
    description: "Build sustainable organic growth. We create technical SEO foundations and content architectures that map to user intent.",
};

export default function SeoContentPage() {
    return (
        <ServiceDetailLayout
            hero={{
                title: "SEO & Content Strategy",
                subtitle: "Build sustainable organic growth. We create technical SEO foundations and content architectures that map to user intent.",
                ctaText: "Start Your Audit",
                ctaLink: "/contact"
            }}
            cta={{
                title: "Dominate Search Results",
                ctaText: "Get a Strategy Session",
                ctaLink: "/contact",
                variant: "tertiary"
            }}
            sidebar={
                <div className="infoCard">
                    <h4>Deliverables</h4>
                    <ul className="processList">
                        <li>Technical Audit Report</li>
                        <li>Keyword Strategy & Roadmap</li>
                        <li>Content Calendar</li>
                        <li>On-Page Optimization</li>
                        <li>Monthly Reporting</li>
                    </ul>
                </div>
            }
        >
            <h2>Content That Ranks and Converts</h2>
            <p>Ranking on the first page isn't enough; you need to answer the user's question better than anyone else. Our approach combines technical precision with editorial excellence.</p>

            <h3>Our Methodology</h3>
            <p>We don't guess. We use data to identify gaps in the market and fill them with authoritative content.</p>

            <CapabilitiesGrid>
                <CapabilityCard title="Technical SEO">
                    <p>Core Web Vitals, schema markup, crawl budget optimization, and site structure.</p>
                </CapabilityCard>
                <CapabilityCard title="Topic Clusters">
                    <p>Building pillar pages and supporting clusters to establish topical authority.</p>
                </CapabilityCard>
                <CapabilityCard title="Content Production">
                    <p>High-fidelity articles, whitepapers, and guides written by subject matter experts.</p>
                </CapabilityCard>
            </CapabilitiesGrid>

            <h3>Tools We Use</h3>
            <ul>
                <li>Ahrefs & SEMrush for competitive intelligence</li>
                <li>Google Search Console for performance tracking</li>
                <li>Clearscope / SurferSEO for content optimization</li>
            </ul>
        </ServiceDetailLayout>
    );
}

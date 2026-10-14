import type { Metadata } from 'next';
import StructuredData from "@/components/StructuredData";
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';
import Accordion from '@/components/ui/Accordion';
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "SEO & Content Strategy | Ethercraft Guild",
    description: "Build sustainable organic growth. We create technical SEO foundations and content architectures that map to user intent.",
    path: "/services/growth/seo-content",
});

export default function SeoContentPage() {
    const faqs = [
        {
            title: "How does an SEO engagement start?",
            description: "With a technical audit and keyword strategy, so content priorities are based on data rather than guesswork.",
        },
        {
            title: "How do you report progress?",
            description: "With monthly reporting on agreed indicators such as crawl health, rankings movement, and content shipped. We commit to scope, not outcomes.",
        },
        {
            title: "Who owns the content and accounts?",
            description: "You do. All content, documentation, and tool accounts remain yours.",
        },
        {
            title: "Will you sign an NDA?",
            description: "Yes, before discovery on request, and we treat your data as confidential throughout.",
        },
        {
            title: "What do you need from us?",
            description: "Access to your site and analytics, plus input on your audience and subject-matter priorities.",
        },
    ];

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.title,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.description,
            },
        })),
    };

    return (
        <>
            <StructuredData path="/services/growth/seo-content" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <ServiceDetailLayout
                hero={{
                    title: "SEO & Content Strategy",
                    subtitle: "Build sustainable organic growth. We create technical SEO foundations and content architectures that map to user intent.",
                    ctaText: "Start Your Audit",
                    ctaLink: "/contact"
                }}
                cta={{
                    title: "Dominate Search Results",
                    ctaText: "Request a scoped quote",
                    ctaLink: "/contact",
                    variant: "tertiary"
                }}
                sidebar={
                    <>
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
                        <div className="infoCard">
                            <h4>How we engage</h4>
                            <ul className="processList">
                                <li><strong>Fixed-scope project:</strong> defined deliverables and timeline agreed before work begins.</li>
                                <li><strong>Monthly retainer:</strong> ongoing capacity for evolving priorities, reviewed each month.</li>
                                <li><strong>Team augmentation:</strong> senior specialists embedded in your team and rituals.</li>
                            </ul>
                        </div>
                    </>
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

                <h2>Frequently asked questions</h2>
                <Accordion items={faqs} />
            </ServiceDetailLayout>
        </>
    );
}

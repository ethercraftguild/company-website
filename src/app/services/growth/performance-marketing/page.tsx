import type { Metadata } from 'next';
import StructuredData from "@/components/StructuredData";
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';
import Accordion from '@/components/ui/Accordion';
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Performance Marketing | Ethercraft Guild",
    description: "Maximize ROAS with scientific campaign management. We manage paid acquisition across search, social, and display.",
    path: "/services/growth/performance-marketing",
});

export default function PerformanceMarketingPage() {
    const faqs = [
        {
            title: "How does a campaign engagement start?",
            description: "With an audit of your accounts, tracking, and audience, then a scoped plan covering channels, creative testing, and reporting.",
        },
        {
            title: "How do you report results?",
            description: "With regular dashboards and reviews tied to agreed indicators such as spend and conversion tracking health. We report what happened, not promises.",
        },
        {
            title: "Who owns the ad accounts and data?",
            description: "You do. Accounts, pixels, and audiences stay in your ownership with full access.",
        },
        {
            title: "How is ad spend handled?",
            description: "Ad spend is paid by you directly to the platforms and scoped separately from our management.",
        },
        {
            title: "Will you sign an NDA?",
            description: "Yes, before account or data access on request, and we treat your data as confidential throughout.",
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
            <StructuredData path="/services/growth/performance-marketing" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <ServiceDetailLayout
                hero={{
                    title: "Performance Marketing",
                    subtitle: "Maximize ROAS with scientific campaign management. We manage paid acquisition across search, social, and display.",
                    ctaText: "Launch Campaign",
                    ctaLink: "/contact"
                }}
                cta={{
                    title: "Ready for ROI?",
                    ctaText: "Request a scoped quote",
                    ctaLink: "/contact",
                    variant: "tertiary"
                }}
                sidebar={
                    <>
                        <div className="infoCard">
                            <h4>Campaign Services</h4>
                            <ul className="processList">
                                <li>Audience Segmentation</li>
                                <li>Creative Testing (A/B)</li>
                                <li>Landing Page Optimization</li>
                                <li>Remarketing Strategy</li>
                                <li>Real-time Dashboards</li>
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
                <h2>Acquisition at Scale</h2>
                <p>Stop wasting budget on vanity metrics. We focus on Customer Acquisition Cost (CAC) and Lifetime Value (LTV) to ensure efficient growth.</p>

                <h3>Channel Expertise</h3>
                <p>We deploy budget where your audience lives:</p>

                <CapabilitiesGrid>
                    <CapabilityCard title="Google Ads">
                        <p>High-intent capture via Search and Shopping campaigns. Dominate the keywords that signal purchase readiness.</p>
                    </CapabilityCard>
                    <CapabilityCard title="LinkedIn Ads">
                        <p>Precision targeting for B2B. Reach decision-makers by job title, company size, and industry.</p>
                    </CapabilityCard>
                    <CapabilityCard title="Meta (FB/IG)">
                        <p>Demand generation via powerful creative and algorithmic targeting.</p>
                    </CapabilityCard>
                </CapabilitiesGrid>

                <h3>Analytics & Attribution</h3>
                <p>We set up robust conversion tracking (GA4, GTM, Server-side API) to ensure we know exactly which dollar drove which result.</p>

                <h2>Frequently asked questions</h2>
                <Accordion items={faqs} />
            </ServiceDetailLayout>
        </>
    );
}

import type { Metadata } from 'next';
import StructuredData from "@/components/StructuredData";
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';
import Accordion from '@/components/ui/Accordion';
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Brand Identity | Ethercraft Guild",
    description: "More than a logo. We create visual and verbal identity systems that articulate your core value.",
    path: "/services/growth/brand-identity",
});

export default function BrandIdentityPage() {
    const faqs = [
        {
            title: "How does the branding process work?",
            description: "We move from immersion and strategy through visual exploration to refinement, ending with documented guidelines.",
        },
        {
            title: "How do we give feedback on concepts?",
            description: "Through structured review rounds on agreed directions, with each round scoped before it begins.",
        },
        {
            title: "Who owns the brand assets?",
            description: "You do. Logos, files, and the brand book transfer to you with full usage rights on completion.",
        },
        {
            title: "Will you sign an NDA?",
            description: "Yes, before discovery on request, and we treat your materials as confidential throughout.",
        },
        {
            title: "What do we receive at handover?",
            description: "The logo system, color and type strategy, brand book, digital asset kit, and social templates.",
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
            <StructuredData path="/services/growth/brand-identity" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <ServiceDetailLayout
                hero={{
                    title: "Brand Identity Design",
                    subtitle: "More than a logo. We create visual and verbal identity systems that articulate your core value.",
                    ctaText: "Define Your Brand",
                    ctaLink: "/contact"
                }}
                cta={{
                    title: "Stand Out From the Noise",
                    ctaText: "Request a scoped quote",
                    ctaLink: "/contact",
                    variant: "tertiary"
                }}
                sidebar={
                    <>
                        <div className="infoCard">
                            <h4>Brand Package</h4>
                            <ul className="processList">
                                <li>Primary & Secondary Logos</li>
                                <li>Color & Type Strategy</li>
                                <li>Brand Book (PDF)</li>
                                <li>Digital Asset Kit</li>
                                <li>Social Templates</li>
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
                <h2>Visual Language for Modern Companies</h2>
                <p>In a saturated market, your brand is your differentiator. We help startups and scale-ups mature their aesthetic from DIY to world-class.</p>

                <h3>What We Design</h3>
                <p>We deliver comprehensive brand guidelines that serve as the single source of truth for your organization.</p>

                <CapabilitiesGrid>
                    <CapabilityCard title="Visual Identity">
                        <p>Logo systems, typography, color palettes, and iconography sets.</p>
                    </CapabilityCard>
                    <CapabilityCard title="Verbal Identity">
                        <p>Tone of voice, messaging pillars, and copywriting guidelines.</p>
                    </CapabilityCard>
                    <CapabilityCard title="Brand Collateral">
                        <p>Pitch decks, social media assets, email templates, and business cards.</p>
                    </CapabilityCard>
                </CapabilitiesGrid>

                <h3>Our Process</h3>
                <ol>
                    <li><strong>Immersion:</strong> Understanding your mission and audience.</li>
                    <li><strong>Strategy:</strong> Defining your position in the market.</li>
                    <li><strong>Exploration:</strong> Rapid prototyping of visual directions.</li>
                    <li><strong>Refinement:</strong> Polishing the chosen direction.</li>
                    <li><strong>Guidelines:</strong> Documenting the system for scale.</li>
                </ol>

                <h2>Frequently asked questions</h2>
                <Accordion items={faqs} />
            </ServiceDetailLayout>
        </>
    );
}

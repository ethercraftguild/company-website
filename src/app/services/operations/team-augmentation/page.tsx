import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';
import Accordion from '@/components/ui/Accordion';
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Team Augmentation | Ethercraft Guild",
    description: "Embed senior engineering and product talent into your squads. Scale capacity instantly without the hiring overhead.",
    path: "/services/operations/team-augmentation",
});

export default function TeamAugmentationPage() {
    const faqs = [
        {
            title: "How does augmentation start?",
            description: "We scope the roles and seniority you need, share profiles, and onboard selected members into your rituals and tooling.",
        },
        {
            title: "How do augmented members communicate?",
            description: "They join your Slack, standups, and issue tracker like regular team members, with agreed overlap hours.",
        },
        {
            title: "Who manages augmented talent day to day?",
            description: "You direct daily priorities through your backlog and rituals, while we handle employment, payroll, and support.",
        },
        {
            title: "Can we scale hours up or down?",
            description: "Yes. Fractional, full-time, and squad arrangements are scoped per engagement and can be adjusted by agreement.",
        },
        {
            title: "Will you sign an NDA?",
            description: "Yes, before profiles or discovery on request, and we treat your systems and data as confidential.",
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <ServiceDetailLayout
                hero={{
                    title: "Expert Team Augmentation",
                    subtitle: "Embed senior engineering and product talent into your squads. Scale capacity instantly without the hiring overhead.",
                    ctaText: "Request Profiles",
                    ctaLink: "/contact"
                }}
                cta={{
                    title: "Scale Your Team Today",
                    ctaText: "Request a scoped quote",
                    ctaLink: "/contact",
                    variant: "tertiary"
                }}
                sidebar={
                    <>
                        <div className="infoCard">
                            <h4>Why Augment?</h4>
                            <ul className="processList">
                                <li>Speed to Market</li>
                                <li>Reduce Hiring Risk</li>
                                <li>Access Niche Skills</li>
                                <li>Flexible Scaling</li>
                                <li>Time Zone Aligned</li>
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
                <h2>Gap-Filling with Precision</h2>
                <p>Hiring is slow and expensive. Our augmentation service allows you to inject vetted senior talent into your workflow immediately. We don't just "staff"; we integrate.</p>

                <h3>Roles We Supply</h3>
                <p>We focus on high-impact individual contributors and leads:</p>

                <CapabilitiesGrid>
                    <CapabilityCard title="Senior & Staff Engineers">
                        <p>React, Node, Python, Go. Developers who can architect, not just code.</p>
                    </CapabilityCard>
                    <CapabilityCard title="Product Designers">
                        <p>Figma experts who understand UX flows and design systems.</p>
                    </CapabilityCard>
                    <CapabilityCard title="Product Managers">
                        <p>Technical PMs who can run rituals (Sprint planning, retro) and manage backlogs.</p>
                    </CapabilityCard>
                </CapabilitiesGrid>

                <h3>Engagement Models</h3>
                <ul>
                    <li><strong>Fractional:</strong> 10-20 hours/week for specific oversight or specialized tasks.</li>
                    <li><strong>Full-Time:</strong> Dedicated resources 40 hours/week embedded in your Slack/Jira.</li>
                    <li><strong>Squads:</strong> A complete pod (Dev + Design + PM) to tackle a specific feature.</li>
                </ul>

                <h2>Frequently asked questions</h2>
                <Accordion items={faqs} />
            </ServiceDetailLayout>
        </>
    );
}

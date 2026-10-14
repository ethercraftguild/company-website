import type { Metadata } from 'next';
import StructuredData from "@/components/StructuredData";
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';
import Accordion from '@/components/ui/Accordion';
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Process Optimization | Ethercraft Guild",
    description: "Eliminate bottlenecks and shipping delays. We engineer your workflows just like we engineer code.",
    path: "/services/operations/process-optimization",
});

export default function ProcessOptimizationPage() {
    const faqs = [
        {
            title: "How does an optimization engagement work?",
            description: "We assess your delivery pipeline, tooling, and rituals, then agree on scoped changes and support you in adopting them.",
        },
        {
            title: "What do we receive?",
            description: "A written assessment with prioritized recommendations, plus implementation support scoped per engagement.",
        },
        {
            title: "How do you work with our team?",
            description: "Through interviews, observation of rituals, and shared documentation, with regular check-ins on agreed changes.",
        },
        {
            title: "Will you sign an NDA?",
            description: "Yes, before access to internal systems or documentation, and we treat your materials as confidential.",
        },
        {
            title: "Do you require access to our tools?",
            description: "Only scoped, read-level access agreed upfront, such as boards and repositories, to understand current workflows.",
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
            <StructuredData path="/services/operations/process-optimization" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <ServiceDetailLayout
                hero={{
                    title: "Process Optimization",
                    subtitle: "Eliminate bottlenecks and shipping delays. We engineer your workflows just like we engineer code.",
                    ctaText: "Optimize Workflow",
                    ctaLink: "/contact"
                }}
                cta={{
                    title: "Stop Fighting Fire",
                    ctaText: "Request a scoped quote",
                    ctaLink: "/contact",
                    variant: "tertiary"
                }}
                sidebar={
                    <>
                        <div className="infoCard">
                            <h4>Optimization Outcomes</h4>
                            <ul className="processList">
                                <li>Higher Deployment Frequency</li>
                                <li>Lower Change Failure Rate</li>
                                <li>Reduced Meeting Load</li>
                                <li>Improved Documentation</li>
                                <li>Clearer Ownership Maps</li>
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
                <h2>Operational Excellence</h2>
                <p>Your team's output is limited by their environment. We analyze your delivery pipeline, communication structures, and tooling to unlock maximum velocity.</p>

                <h3>Areas of Focus</h3>
                <CapabilitiesGrid>
                    <CapabilityCard title="DevOps & CI/CD">
                        <p>Automating tests, builds, and deployments to achieve daily shipping cadence.</p>
                    </CapabilityCard>
                    <CapabilityCard title="Agile Maturity">
                        <p>Moving from "doing Scrum" to truly being agile. Improving retro quality and sprint planning.</p>
                    </CapabilityCard>
                    <CapabilityCard title="Tool Consolidation">
                        <p>Cleaning up your SaaS sprawl (Jira, Notion, Slack) to reduce context switching.</p>
                    </CapabilityCard>
                </CapabilitiesGrid>

                <h3>The "Guild" Standard</h3>
                <p>We believe in high-agency environments. Our optimization process focuses on empowering individual contributors by removing bureaucratic blockers.</p>

                <h2>Frequently asked questions</h2>
                <Accordion items={faqs} />
            </ServiceDetailLayout>
        </>
    );
}

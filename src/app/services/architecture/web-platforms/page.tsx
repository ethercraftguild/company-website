import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';
import Accordion from '@/components/ui/Accordion';
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Web Platform Development | Ethercraft Guild",
    description: "Enterprise-grade web applications built for speed, scalability, and seamless user experiences.",
    path: "/services/architecture/web-platforms",
});

export default function WebPlatformsPage() {
    const faqs = [
        {
            title: "How does a web platform engagement start?",
            description: "With discovery and architecture: we map your users, data model, and integrations before development begins.",
        },
        {
            title: "How do you communicate progress?",
            description: "We work in agile cycles with regular demos and a shared backlog, so you always see what shipped and what is next.",
        },
        {
            title: "Who owns the code and infrastructure?",
            description: "You do. Repositories, cloud accounts, and credentials stay in your name with full access from day one.",
        },
        {
            title: "Will you sign an NDA?",
            description: "Yes, before any detailed discovery conversation, and we treat your materials as confidential throughout.",
        },
        {
            title: "What do we receive at handover?",
            description: "The full codebase, deployment documentation, and a walkthrough of the architecture and operations.",
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
                    title: "Web Platform Development",
                    subtitle: "Enterprise-grade web applications built for speed, scalability, and seamless user experiences.",
                    ctaText: "Build Your Platform",
                    ctaLink: "/contact"
                }}
                cta={{
                    title: "Ready to Build?",
                    ctaText: "Request a scoped quote",
                    ctaLink: "/contact",
                    variant: "tertiary"
                }}
                sidebar={
                    <>
                        <div className="infoCard">
                            <h4>Development Cycle</h4>
                            <ul className="processList">
                                <li>Discovery & Architecture</li>
                                <li>UI/UX Design</li>
                                <li>Agile Development</li>
                                <li>QA & Testing</li>
                                <li>Deployment & DevOps</li>
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
                <h2>Modern Web Solutions</h2>
                <p>In a digital-first world, your web platform is your headquarters. We build robust, high-performance web applications that serve as the engine of your business.</p>

                <h3>Our Stack</h3>
                <p>We leverage modern frameworks to deliver lightning-fast experiences:</p>
                <ul>
                    <li><strong>Frontend:</strong> React, Vue, Svelte, Astro</li>
                    <li><strong>Backend:</strong> Node.js, Python (Django/FastAPI), Go</li>
                    <li><strong>Infrastructure:</strong> AWS, Google Cloud, Vercel</li>
                </ul>

                <h3>What We Build</h3>
                <CapabilitiesGrid>
                    <CapabilityCard title="SaaS products">
                        <p>Multi-tenant architectures with subscription billing and complex access controls.</p>
                    </CapabilityCard>
                    <CapabilityCard title="Internal Tools">
                        <p>Custom dashboards and admin panels that streamline your operations.</p>
                    </CapabilityCard>
                    <CapabilityCard title="E-Commerce">
                        <p>Headless commerce solutions that offer limitless customization and speed.</p>
                    </CapabilityCard>
                </CapabilitiesGrid>

                <h2>Frequently asked questions</h2>
                <Accordion items={faqs} />
            </ServiceDetailLayout>
        </>
    );
}

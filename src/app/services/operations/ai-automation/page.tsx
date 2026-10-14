import type { Metadata } from 'next';
import StructuredData from "@/components/StructuredData";
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';
import Accordion from '@/components/ui/Accordion';
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "AI Automation Pipeline & Services | Ethercraft Guild",
    description: "Operationalize intelligence. We build custom AI pipelines that automate complex workflows, reduce manual overhead, and unlock new data insights.",
    path: "/services/operations/ai-automation",
});

export default function AiAutomationPage() {
    const faqs = [
        {
            title: "How does an AI engagement start?",
            description: "By mapping your bottlenecks and data, then scoping a solution architecture before any pipeline is built.",
        },
        {
            title: "How do you handle our data?",
            description: "We scope data access per engagement, work with the minimum needed, and treat your data as confidential under NDA.",
        },
        {
            title: "What do we receive?",
            description: "The solution architecture, custom agents or integrations, prompt library where applicable, and deployment with monitoring documentation.",
        },
        {
            title: "Will you sign an NDA?",
            description: "Yes, before data or systems access, and we treat your data and workflows as confidential throughout.",
        },
        {
            title: "How do you communicate progress?",
            description: "Through scoped milestones with demos against your own data and workflows, so behavior is verifiable.",
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
            <StructuredData path="/services/operations/ai-automation" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <ServiceDetailLayout
                hero={{
                    title: "AI Automation Pipeline & Services",
                    subtitle: "Operationalize intelligence. We build custom AI pipelines that automate complex workflows, reduce manual overhead, and unlock new data insights.",
                    ctaText: "Automate Your Workflow",
                    ctaLink: "/contact"
                }}
                cta={{
                    title: "Future-Proof Your Ops",
                    ctaText: "Request a scoped quote",
                    ctaLink: "/contact",
                    variant: "tertiary"
                }}
                sidebar={
                    <>
                        <div className="infoCard">
                            <h4>Deliverables</h4>
                            <ul className="processList">
                                <li>Solution Architecture</li>
                                <li>Custom AI Agents/Bots</li>
                                <li>API Development</li>
                                <li>Prompt Engineering Library</li>
                                <li>Deployment & Monitoring</li>
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
                <h2>Intelligence at Scale</h2>
                <p>
                    AI isn't just a buzzword; it's a force multiplier for your
                    operations. We don't just wrap ChatGPT wrappers—we architect
                    robust, secure, and scalable AI solutions tailored to your
                    specific business data and logic.
                </p>

                <h3>Our Methodology</h3>
                <p>
                    We start by understanding your bottlenecks. transform
                    manual, repetitive tasks into intelligent, automated
                    pipelines that learn and improve over time.
                </p>

                <CapabilitiesGrid>
                    <CapabilityCard title="Custom RAG Pipelines">
                        <p>
                            Retrieval-Augmented Generation systems that chat
                            with your own data (PDFs, Databases, Notion)
                            securely and accurately.
                        </p>
                    </CapabilityCard>
                    <CapabilityCard title="Workflow Automation">
                        <p>
                            Connecting your tools (Slack, CRM, Email) with AI
                            agents to autonomous execute multi-step tasks.
                        </p>
                    </CapabilityCard>
                    <CapabilityCard title="AI Service Integration">
                        <p>
                            Seamlessly integrating OpenAI, Anthropic, or
                            open-source LLMs into your existing product stack.
                        </p>
                    </CapabilityCard>
                </CapabilitiesGrid>

                <h3>Tools We Use</h3>
                <ul>
                    <li>LangChain & LangGraph</li>
                    <li>Pinecone & Weaviate (Vector Databases)</li>
                    <li>Python & Typscript AI SDKs</li>
                    <li>AWS Bedrock & GCP Vertex AI</li>
                </ul>

                <h2>Frequently asked questions</h2>
                <Accordion items={faqs} />
            </ServiceDetailLayout>
        </>
    );
}

import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';

export const metadata: Metadata = {
    title: "AI Automation Pipeline & Services | Ethercraft Guild",
    description: "Operationalize intelligence. We build custom AI pipelines that automate complex workflows, reduce manual overhead, and unlock new data insights.",
};

export default function AiAutomationPage() {
    return (
        <ServiceDetailLayout
            hero={{
                title: "AI Automation Pipeline & Services",
                subtitle: "Operationalize intelligence. We build custom AI pipelines that automate complex workflows, reduce manual overhead, and unlock new data insights.",
                ctaText: "Automate Your Workflow",
                ctaLink: "/contact"
            }}
            cta={{
                title: "Future-Proof Your Ops",
                ctaText: "Schedule AI Consultation",
                ctaLink: "/contact",
                variant: "tertiary"
            }}
            sidebar={
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
        </ServiceDetailLayout>
    );
}

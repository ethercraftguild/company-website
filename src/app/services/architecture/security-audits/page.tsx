import type { Metadata } from 'next';
import StructuredData from "@/components/StructuredData";
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';
import Accordion from '@/components/ui/Accordion';
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Security & Audits | Ethercraft Guild",
    description: "Identify vulnerabilities before they become liabilities. Comprehensive security assessments for your digital assets.",
    path: "/services/architecture/security-audits",
});

export default function SecurityAuditsPage() {
    const faqs = [
        {
            title: "What does the audit process look like?",
            description: "We begin with discovery, then run automated scanning plus manual review, and finish with a remediation report and re-verification.",
        },
        {
            title: "What do we receive at the end?",
            description: "A written report ranking each finding by severity with remediation guidance, plus re-verification after fixes.",
        },
        {
            title: "Will you sign an NDA?",
            description: "Yes. We sign NDAs before accessing your code or infrastructure and handle all materials as confidential.",
        },
        {
            title: "Do you need production access?",
            description: "Usually not. Scoped staging access and read-only repository access is typically enough; scope is agreed upfront.",
        },
        {
            title: "Can you help with compliance preparation?",
            description: "Yes. We map findings to common certification expectations such as SOC 2, GDPR, and HIPAA to support your preparation.",
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
            <StructuredData path="/services/architecture/security-audits" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <ServiceDetailLayout
                hero={{
                    title: "Security & Code Audits",
                    subtitle: "Identify vulnerabilities before they become liabilities. Comprehensive security assessments for your digital assets.",
                    ctaText: "Secure Your Infrastructure",
                    ctaLink: "/contact"
                }}
                cta={{
                    title: "Don't Wait for a Breach",
                    ctaText: "Request a scoped quote",
                    ctaLink: "/contact",
                    variant: "tertiary"
                }}
                sidebar={
                    <>
                        <div className="infoCard">
                            <h4>Scope of Work</h4>
                            <ul className="processList">
                                <li>Initial Discovery</li>
                                <li>Automated Scanning</li>
                                <li>Manual Exploitation</li>
                                <li>Reporting & Remediation</li>
                                <li>Re-verification</li>
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
                <h2>Protecting Your Digital Estate</h2>
                <p>Security is not a feature; it is a foundation. We perform rigorous audits of your codebase, infrastructure, and compliance posture to ensure you are protected against modern threats.</p>

                <h3>Our Audit Process</h3>
                <p>We go beyond automated scans using manual penetration testing and logical analysis:</p>

                <CapabilitiesGrid>
                    <CapabilityCard title="Code Review">
                        <p>Line-by-line analysis of your source code to find logic errors and insecure patterns.</p>
                    </CapabilityCard>
                    <CapabilityCard title="Penetration Testing">
                        <p>Simulating real-world attacks to test your defenses against SQLi, XSS, and more.</p>
                    </CapabilityCard>
                    <CapabilityCard title="Cloud Config">
                        <p>Reviewing AWS/GCP/Azure IAM roles and network policies for least-privilege access.</p>
                    </CapabilityCard>
                </CapabilitiesGrid>

                <h3>Compliance Readiness</h3>
                <p>We help prepare your engineering team for major compliance certifications:</p>
                <ul>
                    <li>SOC 2 Type I & II Preparation</li>
                    <li>GDPR Data Privacy Impact Assessments</li>
                    <li>HIPAA Compliance for HealthTech</li>
                </ul>

                <h2>Frequently asked questions</h2>
                <Accordion items={faqs} />
            </ServiceDetailLayout>
        </>
    );
}

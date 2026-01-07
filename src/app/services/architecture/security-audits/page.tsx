import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';

export const metadata: Metadata = {
    title: "Security & Audits | Ethercraft Guild",
    description: "Identify vulnerabilities before they become liabilities. Comprehensive security assessments for your digital assets.",
};

export default function SecurityAuditsPage() {
    return (
        <ServiceDetailLayout
            hero={{
                title: "Security & Code Audits",
                subtitle: "Identify vulnerabilities before they become liabilities. Comprehensive security assessments for your digital assets.",
                ctaText: "Secure Your Infrastructure",
                ctaLink: "/contact"
            }}
            cta={{
                title: "Don't Wait for a Breach",
                ctaText: "Schedule an Audit",
                ctaLink: "/contact",
                variant: "tertiary"
            }}
            sidebar={
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
        </ServiceDetailLayout>
    );
}

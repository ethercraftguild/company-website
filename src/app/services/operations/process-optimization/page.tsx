import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';

export const metadata: Metadata = {
    title: "Process Optimization | Ethercraft Guild",
    description: "Eliminate bottlenecks and shipping delays. We engineer your workflows just like we engineer code.",
};

export default function ProcessOptimizationPage() {
    return (
        <ServiceDetailLayout
            hero={{
                title: "Process Optimization",
                subtitle: "Eliminate bottlenecks and shipping delays. We engineer your workflows just like we engineer code.",
                ctaText: "Optimize Workflow",
                ctaLink: "/contact"
            }}
            cta={{
                title: "Stop Fighting Fire",
                ctaText: "Fix Your Process",
                ctaLink: "/contact",
                variant: "tertiary"
            }}
            sidebar={
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
        </ServiceDetailLayout>
    );
}

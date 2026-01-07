import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';

export const metadata: Metadata = {
    title: "Team Augmentation | Ethercraft Guild",
    description: "Embed senior engineering and product talent into your squads. Scale capacity instantly without the hiring overhead.",
};

export default function TeamAugmentationPage() {
    return (
        <ServiceDetailLayout
            hero={{
                title: "Expert Team Augmentation",
                subtitle: "Embed senior engineering and product talent into your squads. Scale capacity instantly without the hiring overhead.",
                ctaText: "Request Profiles",
                ctaLink: "/contact"
            }}
            cta={{
                title: "Scale Your Team Today",
                ctaText: "View Available Talent",
                ctaLink: "/contact",
                variant: "tertiary"
            }}
            sidebar={
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
        </ServiceDetailLayout>
    );
}

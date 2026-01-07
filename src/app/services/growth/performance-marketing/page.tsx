import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';

export const metadata: Metadata = {
    title: "Performance Marketing | Ethercraft Guild",
    description: "Maximize ROAS with scientific campaign management. We manage paid acquisition across search, social, and display.",
};

export default function PerformanceMarketingPage() {
    return (
        <ServiceDetailLayout
            hero={{
                title: "Performance Marketing",
                subtitle: "Maximize ROAS with scientific campaign management. We manage paid acquisition across search, social, and display.",
                ctaText: "Launch Campaign",
                ctaLink: "/contact"
            }}
            cta={{
                title: "Ready for ROI?",
                ctaText: "Get a Campaign Audit",
                ctaLink: "/contact",
                variant: "tertiary"
            }}
            sidebar={
                <div className="infoCard">
                    <h4>Campaign Services</h4>
                    <ul className="processList">
                        <li>Audience Segmentation</li>
                        <li>Creative Testing (A/B)</li>
                        <li>Landing Page Optimization</li>
                        <li>Remarketing Strategy</li>
                        <li>Real-time Dashboards</li>
                    </ul>
                </div>
            }
        >
            <h2>Acquisition at Scale</h2>
            <p>Stop wasting budget on vanity metrics. We focus on Customer Acquisition Cost (CAC) and Lifetime Value (LTV) to ensure efficient growth.</p>

            <h3>Channel Expertise</h3>
            <p>We deploy budget where your audience lives:</p>

            <CapabilitiesGrid>
                <CapabilityCard title="Google Ads">
                    <p>High-intent capture via Search and Shopping campaigns. Dominate the keywords that signal purchase readiness.</p>
                </CapabilityCard>
                <CapabilityCard title="LinkedIn Ads">
                    <p>Precision targeting for B2B. Reach decision-makers by job title, company size, and industry.</p>
                </CapabilityCard>
                <CapabilityCard title="Meta (FB/IG)">
                    <p>Demand generation via powerful creative and algorithmic targeting.</p>
                </CapabilityCard>
            </CapabilitiesGrid>

            <h3>Analytics & Attribution</h3>
            <p>We set up robust conversion tracking (GA4, GTM, Server-side API) to ensure we know exactly which dollar drove which result.</p>
        </ServiceDetailLayout>
    );
}

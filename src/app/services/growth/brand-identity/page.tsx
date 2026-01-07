import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';

export const metadata: Metadata = {
    title: "Brand Identity | Ethercraft Guild",
    description: "More than a logo. We create visual and verbal identity systems that articulate your core value.",
};

export default function BrandIdentityPage() {
    return (
        <ServiceDetailLayout
            hero={{
                title: "Brand Identity Design",
                subtitle: "More than a logo. We create visual and verbal identity systems that articulate your core value.",
                ctaText: "Define Your Brand",
                ctaLink: "/contact"
            }}
            cta={{
                title: "Stand Out From the Noise",
                ctaText: "Start Branding",
                ctaLink: "/contact",
                variant: "tertiary"
            }}
            sidebar={
                <div className="infoCard">
                    <h4>Brand Package</h4>
                    <ul className="processList">
                        <li>Primary & Secondary Logos</li>
                        <li>Color & Type Strategy</li>
                        <li>Brand Book (PDF)</li>
                        <li>Digital Asset Kit</li>
                        <li>Social Templates</li>
                    </ul>
                </div>
            }
        >
            <h2>Visual Language for Modern Companies</h2>
            <p>In a saturated market, your brand is your differentiator. We help startups and scale-ups mature their aesthetic from DIY to world-class.</p>

            <h3>What We Design</h3>
            <p>We deliver comprehensive brand guidelines that serve as the single source of truth for your organization.</p>

            <CapabilitiesGrid>
                <CapabilityCard title="Visual Identity">
                    <p>Logo systems, typography, color palettes, and iconography sets.</p>
                </CapabilityCard>
                <CapabilityCard title="Verbal Identity">
                    <p>Tone of voice, messaging pillars, and copywriting guidelines.</p>
                </CapabilityCard>
                <CapabilityCard title="Brand Collateral">
                    <p>Pitch decks, social media assets, email templates, and business cards.</p>
                </CapabilityCard>
            </CapabilitiesGrid>

            <h3>Our Process</h3>
            <ol>
                <li><strong>Immersion:</strong> Understanding your mission and audience.</li>
                <li><strong>Strategy:</strong> Defining your position in the market.</li>
                <li><strong>Exploration:</strong> Rapid prototyping of visual directions.</li>
                <li><strong>Refinement:</strong> Polishing the chosen direction.</li>
                <li><strong>Guidelines:</strong> Documenting the system for scale.</li>
            </ol>
        </ServiceDetailLayout>
    );
}

import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';

export const metadata: Metadata = {
    title: "Web Platform Development | Ethercraft Guild",
    description: "Enterprise-grade web applications built for speed, scalability, and seamless user experiences.",
};

export default function WebPlatformsPage() {
    return (
        <ServiceDetailLayout
            hero={{
                title: "Web Platform Development",
                subtitle: "Enterprise-grade web applications built for speed, scalability, and seamless user experiences.",
                ctaText: "Build Your Platform",
                ctaLink: "/contact"
            }}
            cta={{
                title: "Ready to Build?",
                ctaText: "Schedule Technical Discovery",
                ctaLink: "/contact",
                variant: "tertiary"
            }}
            sidebar={
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
        </ServiceDetailLayout>
    );
}

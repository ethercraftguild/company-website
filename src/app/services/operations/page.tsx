import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import PageHero from '@/components/ui/PageHero';
import Accordion from '@/components/ui/Accordion';
import CtaSection from '@/components/ui/CtaSection';

export const metadata: Metadata = {
    title: "Talent & Operational Support | Ethercraft Guild",
    description: "Scale your capabilities without the overhead. We provide specific, vetted talent and optimize your internal workflows.",
};

export default function OperationsPage() {
    return (
        <main>
            <PageHero
                title="Talent & Operational Support"
                subtitle="Scale your capabilities without the overhead. We provide specific, vetted talent and optimize your internal workflows."
                ctaText="Request Talent"
                ctaLink="/contact"
            />

            <Section className="service-index">
                <h2>Specializations</h2>
                <div className="max-w-[800px] mt-lg">
                    <Accordion
                        items={[
                            {
                                title: "Team Augmentation",
                                description:
                                    "Integrate senior engineers, designers, or product managers into your existing squads. Flexible contracts, immediate impact.",
                                link: "/services/operations/team-augmentation",
                            },
                            {
                                title: "Process Optimization",
                                description:
                                    "Streamline your delivery pipeline. We implement Agile/DevOps best practices to reduce bottlenecks and increase deployment frequency.",
                                link: "/services/operations/process-optimization",
                            },
                            {
                                title: "AI Automation Pipeline & Services",
                                description:
                                    "Operationalize intelligence. We build custom AI pipelines that automate complex workflows, reduce manual overhead, and unlock new data insights.",
                                link: "/services/operations/ai-automation",
                            },
                        ]}
                    />
                </div>
            </Section>

            <Section className="bg-white">
                <div className="mb-xl">
                    <h2>The Guild Difference</h2>
                </div>
                <div className="grid grid-cols-1 gap-lg mt-xl md:grid-cols-3 md:gap-xl">
                    <div className="p-md border border-border rounded-sm md:border-none md:p-0">
                        <div className="text-[2rem] mb-sm">🤝</div>
                        <h3 className="mt-sm mb-xs text-xl">Seamless Integration</h3>
                        <p>
                            Our talent adapts to your culture and tools. Day one productivity.
                        </p>
                    </div>
                    <div className="p-md border border-border rounded-sm md:border-none md:p-0">
                        <div className="text-[2rem] mb-sm">⏱️</div>
                        <h3 className="mt-sm mb-xs text-xl">Flexible Engagement</h3>
                        <p>
                            Scale up or down based on project needs. No long-term lock-ins if you
                            don't need them.
                        </p>
                    </div>
                    <div className="p-md border border-border rounded-sm md:border-none md:p-0">
                        <div className="text-[2rem] mb-sm">🧠</div>
                        <h3 className="mt-sm mb-xs text-xl">Knowledge Transfer</h3>
                        <p>
                            We don't just build; we teach. Leaving your team stronger than we
                            found it.
                        </p>
                    </div>
                </div>
            </Section>

            <CtaSection
                title="Optimize Your Operations"
                ctaText="Get Started"
                ctaLink="/contact"
                variant="tertiary"
            />
        </main>
    );
}

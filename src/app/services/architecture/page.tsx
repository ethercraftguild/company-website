import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import PageHero from '@/components/ui/PageHero';
import Accordion from '@/components/ui/Accordion';


export const metadata: Metadata = {
    title: "Digital Architecture | Ethercraft Guild",
    description: "From concept to deployment, we engineer stable, scalable, and secure digital foundations for high-growth businesses.",
};

export default function ArchitecturePage() {
    return (
        <main>
            <PageHero
                title="Digital Architecture"
                subtitle="From concept to deployment, we engineer stable, scalable, and secure digital foundations for high-growth businesses."
                ctaText="Define Your Project Scope"
                ctaLink="/contact"
            />

            {/* Service Index (Accordion) */}
            <Section className="service-index">
                <h2>Specializations</h2>
                <div className="max-w-[800px] mt-lg">
                    <Accordion
                        items={[
                            {
                                title: "Bespoke Software & Applications",
                                description:
                                    "Full-cycle development for mobile apps (iOS, Android, Flutter), custom web applications, and SaaS platforms. We build robust backends and intuitive frontends tailored to your specific business logic.",
                                link: "/services/architecture/mobile-app-dev",
                            },
                            {
                                title: "Website & E-commerce Platforms",
                                description:
                                    "High-performance marketing sites and e-commerce stores (Shopify, WooCommerce, Custom). Optimized for speed, SEO, and conversion using modern stacks like Astro and Next.js.",
                                link: "/services/architecture/web-platforms",
                            },
                            {
                                title: "UX/UI Design",
                                description:
                                    "User-centric interface design and prototyping. we create design systems that ensure consistency and usability across your entire digital product suite.",
                            },
                            {
                                title: "Platform Security & Hardening",
                                description:
                                    "Comprehensive security audits, penetration testing, and compliance readiness (GDPR, SOC2) to protect your users and data from evolving threats.",
                                link: "/services/architecture/security-audits",
                            },
                        ]}
                    />
                </div>

                <div className="mt-lg text-base font-medium">
                    <p>
                        Looking for Mobile App specifics? <Link href="/services/architecture/mobile-app-dev" className="underline text-accent">View Mobile App Development &rarr;</Link>
                    </p>
                </div>
            </Section>

            {/* Why Choose This Category */}
            <Section className="bg-white">
                <div className="mb-xl">
                    <h2>The Guild Difference</h2>
                </div>
                <div className="grid grid-cols-1 gap-lg mt-xl md:grid-cols-3 md:gap-xl">
                    <div className="p-md border border-border rounded-sm md:border-none md:p-0">
                        <div className="text-[2rem] mb-sm">🌍</div>
                        <h3 className="mt-sm mb-xs text-xl">Vetted Global Talent</h3>
                        <p>
                            Access to high-skill developers at competitive international rates,
                            without the management headache.
                        </p>
                    </div>
                    <div className="p-md border border-border rounded-sm md:border-none md:p-0">
                        <div className="text-[2rem] mb-sm">🔍</div>
                        <h3 className="mt-sm mb-xs text-xl">Solopreneur QA Layer</h3>
                        <p>
                            Every deliverable passes through our principal final quality review
                            to guarantee craftsmanship.
                        </p>
                    </div>
                    <div className="p-md border border-border rounded-sm md:border-none md:p-0">
                        <div className="text-[2rem] mb-sm">🛡️</div>
                        <h3 className="mt-sm mb-xs text-xl">Security-First Approach</h3>
                        <p>
                            We build with robust security protocols from day one, not as an
                            afterthought.
                        </p>
                    </div>
                </div>
            </Section>
        </main>
    );
}

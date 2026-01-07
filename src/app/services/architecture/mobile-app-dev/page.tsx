import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import PageHero from '@/components/ui/PageHero';
import CtaSection from '@/components/ui/CtaSection';
import Card from '@/components/ui/Card';


export const metadata: Metadata = {
    title: "Mobile App Development | Ethercraft Guild",
    description: "Launch high-performance, cross-platform applications that feel native on every device, without the double cost.",
};

export default function MobileAppDevPage() {
    return (
        <main>
            <PageHero
                title="Dedicated Flutter App Development"
                subtitle="Launch high-performance, cross-platform applications that feel native on every device, without the double cost."
                ctaText="Get a Custom Quote"
                ctaLink="/contact"
            />

            {/* Pain Point & Solution */}
            <Section className="grid gap-xl md:grid-cols-2">
                <div className="grid gap-xl md:grid-cols-2">
                    <div>
                        <h2>Why App Projects Fail</h2>
                        <ul className="list-none mt-md text-lg [&_li]:mb-md">
                            <li>❌ <strong>Bloated Codebases:</strong> Resulting in slow performance and high maintenance costs.</li>
                            <li>❌ <strong>Fragmented UI:</strong> Inconsistent experiences across iOS and Android.</li>
                            <li>❌ <strong>Ghosting Developers:</strong> Agencies that vanish after launch.</li>
                        </ul>
                    </div>
                    <div>
                        <h2>The Guild Solution</h2>
                        <p className="text-lg leading-[1.7]">Our craftsmanship approach uses <strong>Flutter</strong> to build a single, robust codebase that compiles to native performance. You get the speed of a startup with the stability of an enterprise solution.</p>
                    </div>
                </div>
            </Section>

            {/* The Process */}
            <Section className="bg-white">
                <h2>Our Proven Process</h2>
                <div className="grid gap-lg mt-lg md:grid-cols-4">
                    <div className="border-l-2 border-border pl-md">
                        <span className="font-mono font-bold text-accent block mb-xs">01</span>
                        <h3>Discovery & Architecture</h3>
                        <p>We map your user flow and data structure before writing a line of code.</p>
                    </div>
                    <div className="border-l-2 border-border pl-md">
                        <span className="font-mono font-bold text-accent block mb-xs">02</span>
                        <h3>Sprint Execution</h3>
                        <p>Bi-weekly builds delivered to your phone for real-time feedback.</p>
                    </div>
                    <div className="border-l-2 border-border pl-md">
                        <span className="font-mono font-bold text-accent block mb-xs">03</span>
                        <h3>Solopreneur QA</h3>
                        <p><strong>Crucial:</strong> Every pixel is personally verified by our principal against the design specs.</p>
                    </div>
                    <div className="border-l-2 border-border pl-md">
                        <span className="font-mono font-bold text-accent block mb-xs">04</span>
                        <h3>Store Submission</h3>
                        <p>We handle the complex Apple & Google review process for you.</p>
                    </div>
                </div>
            </Section>

            {/* Proof & Social Validation */}
            <Section className="grid gap-xl mt-lg md:grid-cols-2 md:items-center">
                <h2>Results Speak Louder</h2>
                <div className="grid gap-xl mt-lg md:grid-cols-2 md:items-center">
                    <Card title="FinTech Dashboard App">
                        <p>Reduced user onboarding time by 40% with a streamlined Flutter interface.</p>
                        {/* <div style={{ marginTop: '1rem' }}>
                    <Link href="/case-studies/fintech-app" style={{ textDecoration: 'underline', fontWeight: 600 }}>Read Case Study &rarr;</Link>
                </div> */}
                    </Card>
                    <div>
                        <blockquote className="text-2xl italic mb-md">
                            "The most reliable dev partner we've worked with. The app has 99.9% crash-free sessions."
                        </blockquote>
                        <cite>— Product Lead, TechFlow</cite>
                    </div>
                </div>
            </Section>

            <CtaSection
                title="Ready to Craft Your Mobile Experience?"
                text="Engagement Models: Project-Based or Monthly Retainer"
                ctaText="Schedule 15-Min Discovery Call"
                ctaLink="/contact"
                variant="tertiary"
            />

            <div className="text-center pb-xl text-sm">
                <p>Need a marketing site to go with your app? <Link href="/services/architecture" className="font-semibold underline text-inherit">Explore Web Development &rarr;</Link></p>
            </div>
        </main>
    );
}

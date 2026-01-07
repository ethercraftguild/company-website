import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import PageHero from '@/components/ui/PageHero';
import CtaSection from '@/components/ui/CtaSection';
import Card from '@/components/ui/Card';
import styles from './page.module.css';

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
            <Section className={styles.painPoints}>
                <div className={styles.gridLayout}>
                    <div className={styles.challenge}>
                        <h2>Why App Projects Fail</h2>
                        <ul className={styles.painList}>
                            <li>❌ <strong>Bloated Codebases:</strong> Resulting in slow performance and high maintenance costs.</li>
                            <li>❌ <strong>Fragmented UI:</strong> Inconsistent experiences across iOS and Android.</li>
                            <li>❌ <strong>Ghosting Developers:</strong> Agencies that vanish after launch.</li>
                        </ul>
                    </div>
                    <div className={styles.solution}>
                        <h2>The Guild Solution</h2>
                        <p>Our craftsmanship approach uses <strong>Flutter</strong> to build a single, robust codebase that compiles to native performance. You get the speed of a startup with the stability of an enterprise solution.</p>
                    </div>
                </div>
            </Section>

            {/* The Process */}
            <Section className={styles.processSection}>
                <h2>Our Proven Process</h2>
                <div className={styles.stepsGrid}>
                    <div className={styles.step}>
                        <span className={styles.stepNumber}>01</span>
                        <h3>Discovery & Architecture</h3>
                        <p>We map your user flow and data structure before writing a line of code.</p>
                    </div>
                    <div className={styles.step}>
                        <span className={styles.stepNumber}>02</span>
                        <h3>Sprint Execution</h3>
                        <p>Bi-weekly builds delivered to your phone for real-time feedback.</p>
                    </div>
                    <div className={styles.step}>
                        <span className={styles.stepNumber}>03</span>
                        <h3>Solopreneur QA</h3>
                        <p><strong>Crucial:</strong> Every pixel is personally verified by our principal against the design specs.</p>
                    </div>
                    <div className={styles.step}>
                        <span className={styles.stepNumber}>04</span>
                        <h3>Store Submission</h3>
                        <p>We handle the complex Apple & Google review process for you.</p>
                    </div>
                </div>
            </Section>

            {/* Proof & Social Validation */}
            <Section className={styles.proofSection}>
                <h2>Results Speak Louder</h2>
                <div className={styles.proofGrid}>
                    <Card title="FinTech Dashboard App">
                        <p>Reduced user onboarding time by 40% with a streamlined Flutter interface.</p>
                        {/* <div style={{ marginTop: '1rem' }}>
                    <Link href="/case-studies/fintech-app" style={{ textDecoration: 'underline', fontWeight: 600 }}>Read Case Study &rarr;</Link>
                </div> */}
                    </Card>
                    <div className={styles.testimonialBlock}>
                        <blockquote>
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

            <div className={styles.crossSell}>
                <p>Need a marketing site to go with your app? <Link href="/services/architecture">Explore Web Development &rarr;</Link></p>
            </div>
        </main>
    );
}

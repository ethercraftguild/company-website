import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CtaSection from '@/components/ui/CtaSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.fadeInUp}>
            Mastering Digital Craftsmanship: Custom Solutions from Ethercraft Guild
          </h1>
          <p className={`${styles.valueProp} ${styles.fadeInUp} ${styles.delay1}`}>
            Your dedicated guild of globally-vetted specialists in Software
            Development, Digital Growth, and Strategic Operations.
          </p>

          <div className={`${styles.ctaGroup} ${styles.fadeInUp} ${styles.delay2}`}>
            <Button href="/contact" variant="primary">
              Start Your Project Consultation
            </Button>
          </div>

          <div className={`${styles.trustSignals} ${styles.fadeInUp} ${styles.delay3}`}>
            <p>Trusted by industry leaders and startups alike.</p>
            <div className={styles.logos}>
              {/* Placeholder simple text logos for now */}
              <span>TechCorp</span>
              <span>GrowthInc</span>
              <span>ScaleOps</span>
              <span>VentureFund</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Service Overview */}
      <Section>
        <h2>Our Three Pillars of Craftsmanship</h2>
        <div className={styles.cardGrid}>
          <Card icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect
              x="2"
              y="14"
              width="20"
              height="8"
              rx="2"
              ry="2"></rect><line x1="6" x2="6" y1="6" y2="6"></line><line
                x1="6"
                x2="6"
                y1="18"
                y2="18"></line></svg>
          } title="Digital Architecture">
            <p>
              Build, secure, and modernize your core platform with expert
              developers.
            </p>
            <div className={styles.cardFooter}>
              <Link href="/services/architecture" className={styles.textLink}>
                Explore Architecture &rarr;
              </Link>
            </div>
          </Card>

          <Card icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ><path d="m2 7 10-5 10 5v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z"
            ></path><path d="M12 22V12"></path><path d="M17 22v-5"></path><path
              d="M7 22v-5"></path></svg>
          } title="Growth & Brand Mastery">
            <p>
              Attract, engage, and convert your audience with data-driven content
              and marketing.
            </p>
            <div className={styles.cardFooter}>
              <Link href="/services/growth" className={styles.textLink}>
                Explore Growth &rarr;
              </Link>
            </div>
          </Card>

          <Card icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle
              cx="8.5"
              cy="7"
              r="4"></circle><line x1="20" x2="20" y1="8" y2="14"></line><line
                x1="23"
                x2="17"
                y1="11"
                y2="11"></line></svg>
          } title="Talent & Operational Support">
            <p>
              Scale your operations and fill resource gaps with specialized, vetted
              talent.
            </p>
            <div className={styles.cardFooter}>
              <Link href="/services/operations" className={styles.textLink}>
                Explore Operations &rarr;
              </Link>
            </div>
          </Card>
        </div>
      </Section>

      {/* Closing CTA */}
      <CtaSection
        title="Ready to Partner with the Guild?"
        ctaText="Explore All Services"
        ctaLink="/services"
        variant="tertiary"
      />
    </main>
  );
}

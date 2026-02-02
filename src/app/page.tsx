import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CtaSection from '@/components/ui/CtaSection';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="pt-2xl md:pt-3xl pb-2xl text-center">
        <div className="max-w-[800px] mx-auto">
          <h1 className="animate-slideUp opacity-0 [animation-fill-mode:forwards]">
            Mastering Digital Craftsmanship: Custom Solutions from Ethercraft Guild
          </h1>
          <p className="text-xl md:text-[1.25rem] text-foreground opacity-90 mb-lg animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[200ms]">
            Your dedicated guild of globally-vetted specialists in Software
            Development, Digital Growth, and Strategic Operations.
          </p>

          <div className="mb-2xl animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[400ms]">
            <Button href="/contact" variant="primary">
              Start Your Project Consultation
            </Button>
          </div>

          <div className="mt-2xl animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[600ms]">
            <p className="text-sm opacity-60 mb-sm uppercase tracking-wider">Trusted by industry leaders and startups alike.</p>
            <div className="flex justify-center gap-md md:gap-lg opacity-50 font-bold font-mono flex-wrap px-md">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md md:gap-lg mt-lg">
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
            <div className="mt-md">
              <Link href="/services/architecture" className="font-semibold text-[0.9375rem] inline-block transition-transform duration-200 ease-out text-inherit no-underline hover:underline hover:translate-x-1">
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
            <div className="mt-md">
              <Link href="/services/growth" className="font-semibold text-[0.9375rem] inline-block transition-transform duration-200 ease-out text-inherit no-underline hover:underline hover:translate-x-1">
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
            <div className="mt-md">
              <Link href="/services/operations" className="font-semibold text-[0.9375rem] inline-block transition-transform duration-200 ease-out text-inherit no-underline hover:underline hover:translate-x-1">
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

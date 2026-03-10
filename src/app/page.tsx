import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CtaSection from '@/components/ui/CtaSection';
import Testimonials from '@/components/Testimonials';

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
      {/* Detailed Services */}
      <Section className="bg-bg-alt">
        <div className="text-center max-w-[800px] mx-auto mb-xl">
          <h2>Comprehensive Solutions for Modern Guilds</h2>
          <p className="opacity-80 text-lg mt-sm">From concept to deployment, we engineer stable, scalable, and secure digital foundations tailored to your exact needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          <div className="flex flex-col gap-sm">
            <h3 className="text-2xl font-bold flex items-center gap-xs">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">01</span>
              Digital Architecture
            </h3>
            <ul className="list-disc list-inside space-y-xs opacity-80 ml-md">
              <li><strong>Mobile App Development (Flutter):</strong> High-performance, cross-platform apps.</li>
              <li><strong>Web Platforms:</strong> React, Vue, Svelte, and Node.js enterprise applications.</li>
              <li><strong>Security & Audits:</strong> In-depth code reviews and pentesting (SOC 2, GDPR).</li>
              <li><strong>UX/UI Design:</strong> Comprehensive design systems and rapid prototyping.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-sm">
            <h3 className="text-2xl font-bold flex items-center gap-xs">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">02</span>
              Growth & Brand Mastery
            </h3>
            <ul className="list-disc list-inside space-y-xs opacity-80 ml-md">
              <li><strong>SEO & Content:</strong> Technical SEO and high-fidelity topic clusters.</li>
              <li><strong>Brand Identity:</strong> Visual systems, messaging pillars, and collateral.</li>
              <li><strong>Performance Marketing:</strong> Precision ROAS targeting on Ads, LinkedIn, Meta.</li>
              <li><strong>Audio & Video:</strong> Cinematic storytelling, 4K editing, and podcast production.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-sm md:col-span-2 mt-md">
            <h3 className="text-2xl font-bold flex items-center gap-xs">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">03</span>
              Talent & Operational Support
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-md mt-xs opacity-80">
              <Card className="bg-card">
                <h4 className="font-bold mb-xs">Team Augmentation</h4>
                <p className="text-sm">Embed senior engineering and design talent directly into your existing squads.</p>
              </Card>
              <Card className="bg-card">
                <h4 className="font-bold mb-xs">Process Optimization</h4>
                <p className="text-sm">Automate CI/CD, improve sprint planning, and accelerate time-to-market.</p>
              </Card>
              <Card className="bg-card">
                <h4 className="font-bold mb-xs">AI Automation Pipeline</h4>
                <p className="text-sm">Custom RAG pipelines and integrations with OpenAI, Anthropic, or local LLMs.</p>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Work Teaser */}
      <Section className="text-center">
        <div className="max-w-[700px] mx-auto">
          <h2>Craftsmanship in Action</h2>
          <p className="text-lg opacity-80 mt-sm mb-xl">
            See how we've helped companies transform their digital presence, scale operations, and accelerate growth.
          </p>
          <div className="mb-md">
            <Button href="/work" variant="primary" className="text-lg px-xl py-md">
              View Our Project Showcase
            </Button>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Testimonials />

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

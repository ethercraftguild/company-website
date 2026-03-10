
import CtaSection from '@/components/ui/CtaSection';
import Testimonials from '@/components/Testimonials';
import ServiceGrid from '@/components/ServiceGrid';
import HomeHero from '@/components/HomeHero';
import FeaturedWorkTeaser from '@/components/FeaturedWorkTeaser';
import AboutTeaser from '@/components/AboutTeaser';

export default function Home() {
  return (
    <main>
      <HomeHero />
      <AboutTeaser />

      {/* Service Categories (Grid Refactor) */}
      <ServiceGrid
        category="Digital Architecture"
        description="From concept to deployment, engineering stable, scalable, and secure digital foundations."
        linkHref="/services/architecture"
        linkText="Explore Architecture"
        items={[
          { title: "Mobile App Development", description: "High-performance, cross-platform apps using Flutter to avoid double costs while maintaining native feel." },
          { title: "Web Platform Development", description: "Enterprise-grade web applications utilizing React, Node.js, and scalable cloud infrastructure." },
          { title: "Security & Code Audits", description: "Rigorous assessments including penetration testing and automated scanning for SOC2 compliance." },
          { title: "UX/UI Design", description: "User-centric interface design and comprehensive design systems for product consistency." }
        ]}
      />

      <ServiceGrid
        category="Growth & Brand Mastery"
        description="Building resonant brands and executing data-driven strategies that convert."
        linkHref="/services/growth"
        linkText="Explore Growth"
        items={[
          { title: "SEO & Content Strategy", description: "Sustainable organic growth via technical SEO foundations and high-fidelity topic clusters." },
          { title: "Performance Marketing", description: "Scientific campaign management maximizing ROAS across Google Ads, LinkedIn, and Meta." },
          { title: "Brand Identity", description: "Visual and verbal identity systems, from custom typography to messaging pillars." },
          { title: "Audio & Video Production", description: "Cinematic storytelling, 4K editing, and immersive sound design for high-impact campaigns." }
        ]}
      />

      <ServiceGrid
        category="Talent & Operational Support"
        description="Scaling capabilities and optimizing internal workflows without the overhead."
        linkHref="/services/operations"
        linkText="Explore Operations"
        items={[
          { title: "Team Augmentation", description: "Embed senior engineering and product talent directly into your existing squads." },
          { title: "AI Automation Pipeline", description: "Custom RAG pipelines and integrations with LLMs to automate complex workflows." },
          { title: "Process Optimization", description: "Improve CI/CD, streamline agile maturity, and consolidate SaaS tools to reduce friction." }
        ]}
      />

      <FeaturedWorkTeaser />

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

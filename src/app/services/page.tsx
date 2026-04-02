import ServiceGrid from '@/components/ServiceGrid';
import CtaSection from '@/components/ui/CtaSection';

export const metadata = {
  title: "Professional Engineering Services | Ethercraft Guild",
  description: "Explore our full-stack engineering, technical architecture, and CI/CD optimization services.",
};

export default function ServicesPage() {
  return (
    <main className="pt-3xl pb-xl">
      <div className="container-custom mb-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-md">Our Services</h1>
        <p className="text-xl text-foreground/80 max-w-3xl">We provide elite engineering solutions, from scalable architecture to precision growth and team augmentation, ensuring your technical products are built flawlessly.</p>
      </div>

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

      <CtaSection
        title="Ready to optimize your technical debt?"
        ctaText="Contact our Architects"
        ctaLink="/contact"
        variant="secondary"
      />
    </main>
  );
}

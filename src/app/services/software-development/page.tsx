import type { Metadata } from "next";
import ServiceDetailLayout from "@/components/templates/ServiceDetailLayout";
import Accordion from "@/components/ui/Accordion";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Software Development | Ethercraft Guild",
    description: "High-performance Flutter mobile apps and scalable Node.js/PostgreSQL architectures delivered by a senior engineering cooperative.",
    path: "/services/software-development",
});

export default function SoftwareDevelopmentPage() {
  const faqs = [
    {
      title: "How does an engagement start?",
      description: "With scoping: we align on goals, architecture, and deliverables before development begins.",
    },
    {
      title: "How do you communicate during delivery?",
      description: "Through agile rituals, shared backlogs, and regular demos, with architecture decisions documented.",
    },
    {
      title: "Who owns the code?",
      description: "You do. Repositories and credentials stay in your name with full access from the start.",
    },
    {
      title: "Will you sign an NDA?",
      description: "Yes, before detailed technical discussions, and we treat your materials as confidential throughout.",
    },
    {
      title: "What do we receive at handover?",
      description: "Production-ready code, architecture and operations documentation, and a walkthrough of the system.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.description,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServiceDetailLayout
        hero={{
          title: "Software Development by Senior Architects",
          subtitle:
            "Flutter Specialists and Node.js Architects delivering production-ready engineering for high-growth startups.",
          ctaText: "Define Your Scope",
          ctaLink: "/contact",
        }}
        sidebar={
          <div className="space-y-md">
            <div className="p-xl border border-border rounded-sm bg-card">
              <h4 className="text-xl font-bold mb-sm">Specialties</h4>
              <ul className="list-disc ml-lg opacity-80 leading-relaxed">
                <li>Flutter mobile apps (cross-platform with native feel)</li>
                <li>Node.js services and scalable PostgreSQL architectures</li>
                <li>Security-first delivery and operational excellence</li>
              </ul>
            </div>

            <div className="p-xl border border-border rounded-sm bg-card">
              <h4 className="text-xl font-bold mb-sm">Why the Guild model</h4>
              <p className="opacity-80 leading-relaxed font-light">
                Senior architecture governance reduces risk and accelerates delivery quality—because craft beats assembly.
              </p>
            </div>

            <div className="infoCard">
              <h4>How we engage</h4>
              <ul className="processList">
                <li><strong>Fixed-scope project:</strong> defined deliverables and timeline agreed before work begins.</li>
                <li><strong>Monthly retainer:</strong> ongoing capacity for evolving priorities, reviewed each month.</li>
                <li><strong>Team augmentation:</strong> senior specialists embedded in your team and rituals.</li>
              </ul>
            </div>
          </div>
        }
        cta={{
          title: "Build with Craft",
          ctaText: "Request a scoped quote",
          ctaLink: "/contact",
          variant: "tertiary",
        }}
      >
        <h2>Engineering with Digital Craftsmanship</h2>
        <p>
          Ethercraft Guild treats software as a craft. We don’t just build features—we design stable foundations, resolve technical debt, and optimize delivery processes so your product scales natively.
        </p>

        <h2>Flutter Specialists + Node.js Architects</h2>
        <p>
          Your mobile and backend architecture are designed together. That means better system design choices, cleaner integration boundaries, and a faster path to production-grade reliability.
        </p>

        <h2>Operational Excellence</h2>
        <p>
          We build the invisible infrastructure that modern business needs: CI/CD discipline, automation where it matters, and measurable delivery performance.
        </p>

        <h2>Frequently asked questions</h2>
        <Accordion items={faqs} />
      </ServiceDetailLayout>
    </>
  );
}

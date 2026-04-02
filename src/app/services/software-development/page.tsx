import type { Metadata } from "next";
import ServiceDetailLayout from "@/components/templates/ServiceDetailLayout";

export const metadata: Metadata = {
  title: "Software Development | Ethercraft Guild",
  description:
    "High-performance Flutter mobile apps and scalable Node.js/PostgreSQL architectures delivered by a senior engineering cooperative.",
};

export default function SoftwareDevelopmentPage() {
  return (
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
        </div>
      }
      cta={{
        title: "Build with Craft",
        ctaText: "Start Collaboration",
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
    </ServiceDetailLayout>
  );
}


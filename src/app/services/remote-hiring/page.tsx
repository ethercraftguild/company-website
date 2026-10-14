import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import ServiceDetailLayout from "@/components/templates/ServiceDetailLayout";
import Accordion from "@/components/ui/Accordion";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Remote Hiring / Employer of Record | Ethercraft Guild",
    description: "Scale internationally with an Employer of Record compliance buffer, delivered through senior engineering oversight—not a generic staffing layer.",
    path: "/services/remote-hiring",
});

export default function RemoteHiringPage() {
  const faqs = [
    {
      title: "How does the compliance buffer work?",
      description: "Ethercraft Guild employs team members under local labor law while they work on your priorities with senior engineering oversight.",
    },
    {
      title: "Who manages the engineers day to day?",
      description: "You direct priorities through your rituals and backlog, while we handle employment, payroll, and compliance.",
    },
    {
      title: "How do you communicate?",
      description: "Engineers join your channels and rituals with agreed overlap hours, and we hold regular reviews on the arrangement.",
    },
    {
      title: "Will you sign an NDA?",
      description: "Yes, before any detailed discussion of your product or systems, and we treat your materials as confidential.",
    },
    {
      title: "What do we receive?",
      description: "Vetted senior talent, compliant employment and payroll handling, and ongoing engineering oversight.",
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
        <StructuredData path="/services/remote-hiring" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServiceDetailLayout
        hero={{
          title: "Employer of Record Remote Hiring",
          subtitle:
            "Resolve the Remote Hiring Deadlock with local labor-law compliance, premium benefits, and senior engineering oversight.",
          ctaText: "Request a Compliance Review",
          ctaLink: "/contact",
        }}
        sidebar={
          <div className="space-y-md">
            <div className="p-xl border border-border rounded-sm bg-card">
              <h4 className="text-xl font-bold mb-sm">What you get</h4>
              <ul className="list-disc ml-lg opacity-80 leading-relaxed">
                <li>Local labor law management (Bangladesh/HK)</li>
                <li>Better-than-local pay and benefits</li>
                <li>Engineering Cooperative vetting (Flutter/Node.js)</li>
              </ul>
            </div>

            <div className="p-xl border border-border rounded-sm bg-card">
              <h4 className="text-xl font-bold mb-sm">Target regions</h4>
              <ul className="list-none space-y-xs opacity-80">
                <li>Global</li>
                <li>Bangladesh</li>
                <li>Hong Kong</li>
              </ul>
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
          title: "Scale with Confidence",
          ctaText: "Request a scoped quote",
          ctaLink: "/contact",
          variant: "tertiary",
        }}
      >
        <h2>What Problem We Solve</h2>
        <p>
          International hiring often breaks where engineering timelines should be simple. The legal and operational friction of remote employment can stall scaling—especially when compliance, payroll,
          and documentation aren’t aligned.
        </p>

        <h2>How the Compliance Buffer Works</h2>
        <p>
          Ethercraft Guild manages our team under local labor laws (Bangladesh/HK). This gives you a risk-reduced scaling path while ensuring your engineers receive premium pay and benefits aligned with real local compliance.
        </p>

        <h2>Engineering Cooperative, Not Just Payroll</h2>
        <p>
          This isn’t a generic Employer of Record transaction. Guild members are vetted for senior engineering depth—so your delivery pipeline includes architecture oversight and craft-oriented review for Flutter and Node.js delivery.
        </p>

        <h2>Frequently asked questions</h2>
        <Accordion items={faqs} />
      </ServiceDetailLayout>
    </>
  );
}

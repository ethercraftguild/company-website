import type { Metadata } from "next";
import ServiceDetailLayout from "@/components/templates/ServiceDetailLayout";

export const metadata: Metadata = {
  title: "Remote Hiring / Employer of Record | Ethercraft Guild",
  description:
    "Scale internationally with an Employer of Record compliance buffer, delivered through senior engineering oversight—not a generic staffing layer.",
};

export default function RemoteHiringPage() {
  return (
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
        </div>
      }
      cta={{
        title: "Scale with Confidence",
        ctaText: "Talk to our Architects",
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
    </ServiceDetailLayout>
  );
}


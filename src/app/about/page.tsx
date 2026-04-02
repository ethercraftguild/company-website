import type { Metadata } from "next";
import Link from "next/link";

const DEFAULT_SITE_URL = "https://ethercraftguild.vercel.app";

function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export const metadata: Metadata = {
  title: "About Ethercraft Guild | Digital Craftsmanship, Global Compliance",
  description:
    "Ethercraft Guild bridges high-growth global startups with senior engineering talent in South Asia, delivered through an Engineering Cooperative and Employer of Record compliance buffer.",
  keywords: [
    "Software Engineering Cooperative",
    "Dhaka-based Tech Agency",
    "Flutter Specialists",
    "Employer of Record Compliance",
    "Node.js Architects",
  ],
};

export default function AboutPage() {
  const siteUrl = getSiteUrl();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ethercraft Guild",
    url: siteUrl,
    image: `${siteUrl}/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "Bangladesh",
    },
  };

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Ethercraft Guild",
    url: `${siteUrl}/about`,
    about: [
      "Software Engineering Cooperative",
      "Dhaka-based Tech Agency",
      "Flutter Specialists",
      "Employer of Record Compliance",
      "Node.js Architects",
      "Remote Hiring Deadlock",
    ],
  };

  return (
    <main className="pt-xl md:pt-2xl pb-xl">
      <div className="container-custom max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(aboutPageJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <header className="mb-2xl">
          <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase opacity-70 mb-md">
            About Ethercraft Guild
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-md tracking-tight">
            Digital Craftsmanship. Global Compliance. Local Expertise.
          </h1>
          <p className="text-xl opacity-80 leading-relaxed font-light">
            Ethercraft Guild was founded to bridge the gap between high-growth global startups and elite engineering talent in South Asia. We are not just an agency; we are a Guild, a cooperative of senior architects, developers, and strategists who treat code as a craft.
          </p>
        </header>

        <section aria-label="Core pillars" className="grid grid-cols-1 gap-md md:gap-lg">
          <article className="p-xl border border-border rounded-sm bg-card">
            <h2 className="text-2xl font-bold mb-sm">The Engineering Cooperative</h2>
            <p className="text-lg opacity-80 leading-relaxed font-light mb-0">
              The <strong>Software Engineering Cooperative</strong> model drives everything we do. We specialize in high-performance <strong>Flutter Specialists</strong> delivery and scalable <strong>Node.js Architects</strong> for Node.js/PostgreSQL architectures. Every member of the Guild is a senior-level artisan vetted for technical depth—so your product evolves with architecture, not assembly.
            </p>
          </article>

          <article className="p-xl border border-border rounded-sm bg-card">
            <h2 className="text-2xl font-bold mb-sm">The Compliance Buffer</h2>
            <p className="text-lg opacity-80 leading-relaxed font-light mb-0">
              Remote hiring can stall on legal friction. Ethercraft Guild solves the “Remote Hiring Deadlock” with an <strong>Employer of Record Compliance</strong> buffer—managing our team under local labor laws (Bangladesh/HK). The result is a risk-free way for clients to scale—while ensuring developers receive premium pay and benefits aligned with real local compliance.
            </p>
          </article>

          <article className="p-xl border border-border rounded-sm bg-card">
            <h2 className="text-2xl font-bold mb-sm">Operational Excellence</h2>
            <p className="text-lg opacity-80 leading-relaxed font-light mb-0">
              From cross-border logistics between Hong Kong and Dhaka to AI-driven automation, we build the invisible infrastructure that powers modern business. That operational discipline keeps engineering delivery predictable, secure, and measurable.
            </p>
          </article>
        </section>

        <section className="mt-2xl grid grid-cols-1 gap-md md:gap-lg">
          <article className="p-xl border border-border rounded-sm bg-card">
            <h2 className="text-2xl font-bold mb-sm">Our Identity</h2>
            <p className="text-lg opacity-80 leading-relaxed font-light mb-md">
            Ethercraft Guild is a <strong>Dhaka-based Tech Agency</strong> built on a strategic corridor in Hong Kong. We’re a professional software consultancy committed to transparency and security (SOC2 readiness). We build the “People’s Platform” of the future—where compliance and craftsmanship move together.
            </p>
            <address className="not-italic opacity-85 text-lg mb-0">
              <p className="mb-0">
                <strong>Location:</strong> Dhaka, Bangladesh
              </p>
            </address>
          </article>

          <article className="p-xl border border-border rounded-sm bg-card">
            <h2 className="text-2xl font-bold mb-sm">Trust Signal</h2>
            <p className="text-lg opacity-80 leading-relaxed font-light mb-0">
              Ethercraft Guild is a professional engineering firm and is not affiliated with any gaming guilds or Web3 RPG projects.
            </p>
          </article>
        </section>

        <section className="mt-2xl" aria-label="Next steps">
          <div className="flex flex-col sm:flex-row gap-md sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-sm bg-accent text-[#F7F7F7] px-xl py-md no-underline hover:bg-black transition-colors duration-300"
            >
              Start a Consultation
            </Link>
            <p className="opacity-80 text-lg">
              Prefer the philosophy? Read{" "}
              <Link href="/about/manifesto" className="underline">
                The Engineering Manifesto
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}


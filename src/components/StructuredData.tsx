export default function StructuredData() {
  const siteUrlRaw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ethercraftguild.vercel.app";
  const siteUrl = siteUrlRaw.endsWith("/") ? siteUrlRaw.slice(0, -1) : siteUrlRaw;
  const siteHost =
    process.env.NEXT_PUBLIC_SITE_HOST ??
    (() => {
      try {
        return new URL(siteUrl).host;
      } catch {
        return "ethercraftguild.vercel.app";
      }
    })();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Ethercraft Guild",
    "image": `${siteUrl}/logo.png`,
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressCountry": "Bangladesh"
    },
    "sameAs": [
      "https://www.linkedin.com/company/ethercraft-guild",
      "https://clutch.co/profile/ethercraft-guild"
    ],
    "serviceType": [
      "Mobile Development",
      "AI Integration",
      "System Design"
    ],
    // Helps crawlers identify the canonical hostname.
    "identifier": siteHost
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Ethercraft Guild",
    "image": "https://ethercraft.guild/logo.png",
    "@id": "https://ethercraft.guild",
    "url": "https://ethercraft.guild",
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
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

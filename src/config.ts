export const SITE_CONFIG = {
    companyName: "Ethercraft Guild",
    // hello@ethercraft.guild cannot receive mail: the .guild TLD is not delegated,
    // so no MX is possible. This is the verified owner inbox, matching Apps
    // Script OWNER_EMAIL, and it is the only contact path the UI falls back to.
    email: "ethercraftguild@gmail.com",
    privacyEmail: "privacy@ethercraftguild.com",
    location: "Dhaka, Bangladesh",
    // Google Apps Script /exec URL and its FORWARD_LABELS key. Both are public by
    // definition (NEXT_PUBLIC_*) - the key is spam friction, not a secret.
    // Empty means "not configured": ContactForm then renders the mailto/Calendly
    // fallback rather than posting somewhere unknown.
    formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
    formKey: process.env.NEXT_PUBLIC_FORM_KEY ?? "",
    // Week-1 Product Audit price anchor (task item 7). Empty until MoJin confirms
    // the figure; AuditOffer renders the section price-less while this is empty.
    // Set via env so a price change needs no code edit — but it still needs a
    // rebuild, like all NEXT_PUBLIC_* vars.
    auditPrice: process.env.NEXT_PUBLIC_AUDIT_PRICE ?? "",

    // --- Schema identity (single source for JSON-LD; nothing hardcoded in components) ---
    // Postal parts kept separate from `location` because schema.org needs them split.
    addressCity: "Dhaka",
    addressCountry: "Bangladesh",
    // Canonical org logo. Verified 200 image/png. Never /icon.png - that 404s and
    // serves HTML, which makes some consumers reject the whole graph.
    logoPath: "/logo.png",
    // Published already as serviceType, so the agent/LLM term is grounded rather
    // than a Gemini invention.
    serviceTypes: ["Mobile Development", "AI Integration", "System Design"],
    // Owner-supplied name. NOT committed until the legal-name question is answered
    // (T6 step 6); published with no jobTitle, foundingDate or person-level sameAs.
    founderName: "Mohammad Mustakim Hassan",
    // Empty while the Clutch profile 403s and the LinkedIn slug is unconfirmed.
    // Keys with empty values are omitted from the graph (see schema.ts).
    sameAsProfiles: [] as string[],
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
    calendly: "https://calendly.com/ethercraftguild/30min",
    links: {
        linkedin: "https://linkedin.com/company/ethercraftguild",
        github: "https://github.com/ethercraftguild",
        facebook: "https://facebook.com/ethercraftguild",
        // twitter: "https://twitter.com/ethercraftguild",
        // youtube: "https://youtube.com/c/ethercraftguild"
    }
};

export const NAV_MENU = [
    {
        label: "Architecture",
        href: "/services/architecture",
        children: [
            { label: "Mobile App Development", href: "/services/architecture/mobile-app-dev" },
            { label: "Web Platforms", href: "/services/architecture/web-platforms" },
            { label: "Security & Audits", href: "/services/architecture/security-audits" }
        ]
    },
    {
        label: "Growth",
        href: "/services/growth",
        children: [
            { label: "SEO & Content", href: "/services/growth/seo-content" },
            { label: "Audio & Video Content", href: "/services/growth/audio-video-production" },
            { label: "Brand Identity", href: "/services/growth/brand-identity" },
            { label: "Performance Marketing", href: "/services/growth/performance-marketing" }
        ]
    },
    {
        label: "Operations",
        href: "/services/operations",
        children: [
            { label: "Team Augmentation", href: "/services/operations/team-augmentation" },
            { label: "Process Optimization", href: "/services/operations/process-optimization" },
            { label: "AI Automation", href: "/services/operations/ai-automation" }
        ]
    },
    {
        label: "Work",
        href: "/work"
    },
    {
        label: "Blog",
        href: "/blog"
    },
    {
        label: "About",
        href: "/about",
        children: [
            { label: "About Overview", href: "/about" },
            { label: "Engineering Manifesto", href: "/about/manifesto" }
        ]
    }
];

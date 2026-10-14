export const SITE_CONFIG = {
    companyName: "Ethercraft Guild",
    email: "hello@ethercraft.guild",
    privacyEmail: "privacy@ethercraftguild.com",
    location: "Dhaka, Bangladesh",
    // Google Apps Script /exec URL and its FORWARD_LABELS key. Both are public by
    // definition (NEXT_PUBLIC_*) - the key is spam friction, not a secret.
    // Empty means "not configured": ContactForm then renders the mailto/Calendly
    // fallback rather than posting somewhere unknown.
    formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
    formKey: process.env.NEXT_PUBLIC_FORM_KEY ?? "",
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

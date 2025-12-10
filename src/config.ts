export const SITE_CONFIG = {
    companyName: "Ethercraft Guild",
    email: "hello@ethercraft.guild",
    privacyEmail: "privacy@ethercraftguild.com",
    location: "Dhaka, Bangladesh",
    contactEmail: "https://formspree.io/f/mjknarak", // Dummy email for Formspree
    calendly: "https://calendly.com/ethercraftguild/30min",
    links: {
        linkedin: "https://linkedin.com/company/ethercraft-guild",
        github: "https://github.com/ethercraft-guild",
        facebook: "https://facebook.com/ethercraft-guild",
        twitter: "https://twitter.com/ethercraftguild",
        youtube: "https://youtube.com/c/ethercraftguild"
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
            { label: "Brand Identity", href: "/services/growth/brand-identity" },
            { label: "Performance Marketing", href: "/services/growth/performance-marketing" }
        ]
    },
    {
        label: "Operations",
        href: "/services/operations",
        children: [
            { label: "Team Augmentation", href: "/services/operations/team-augmentation" },
            { label: "Process Optimization", href: "/services/operations/process-optimization" }
        ]
    },
    {
        label: "Case Studies",
        href: "/case-studies"
    }
];

export const SITE_CONFIG = {
    companyName: "Ethercraft Guild",
    email: "hello@ethercraft.guild",
    privacyEmail: "privacy@ethercraftguild.com",
    location: "Dhaka, Bangladesh",
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
            { label: "Web Platforms", href: "/services/architecture" }, // Linking to main cat for now as placeholder
            { label: "Security & Audits", href: "/services/architecture" }
        ]
    },
    {
        label: "Growth",
        href: "/services/growth",
        children: [
            { label: "SEO & Content", href: "/services/growth" },
            { label: "Brand Identity", href: "/services/growth" },
            { label: "Performance Marketing", href: "/services/growth" }
        ]
    },
    {
        label: "Operations",
        href: "/services/operations",
        children: [
            { label: "Team Augmentation", href: "/services/operations" },
            { label: "Process Optimization", href: "/services/operations" }
        ]
    },
    {
        label: "Case Studies",
        href: "/case-studies"
    }
];

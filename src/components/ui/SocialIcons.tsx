import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config';

// Icon Paths (copying logic, assuming public/social-icons exists)
// I need to ensure public assets are moved. I moved _legacy/public to src/public? No, root public.
// Initial backup moved public to _legacy/public. I need to move it back to public.

const IconPaths: Record<string, string> = {
    linkedin: "/social-icons/linkedin-128.svg",
    facebook: "/social-icons/facebook-128.svg",
    twitter: "/social-icons/x-128.svg",
    youtube: "/social-icons/youtube-128.svg",
};

// Inline SVGs as React components or strings
const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

interface SocialIconsProps {
    className?: string;
}

export default function SocialIcons({ className = '' }: SocialIconsProps) {
    const { links: socials } = SITE_CONFIG;

    return (
        <div className={`flex gap-md items-center mb-5 ${className}`}>
            {Object.entries(socials).map(([key, url]) => {
                if (!url) return null;

                const iconPath = IconPaths[key];
                const linkClasses = "flex items-center justify-center w-10 h-10 rounded-full border border-current text-current opacity-80 transition-all duration-200 hover:opacity-100 hover:bg-foreground hover:text-bg hover:-translate-y-0.5 group";

                if (iconPath) {
                    return (
                        <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={key}
                            className={linkClasses}
                        >
                            <img
                                src={iconPath}
                                alt={key}
                                width={20}
                                height={20}
                                className="brightness-0 transition-[filter] duration-200 group-hover:invert"
                            />
                        </a>
                    );
                }

                if (key === 'github') {
                    return (
                        <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={key}
                            className={linkClasses}
                        >
                            <GithubIcon />
                        </a>
                    );
                }

                return null;
            })}
        </div>
    );
}

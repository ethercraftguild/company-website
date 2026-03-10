"use client";

import { useState } from 'react';

interface ProjectIframeProps {
    url: string;
    title: string;
    fallbackImage: string;
}

export default function ProjectIframe({ url, title, fallbackImage }: ProjectIframeProps) {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // If the iframe fails to load (often due to X-Frame-Options or CSP), 
    // we render the fallback image instead.
    if (hasError) {
        return (
            <div className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden rounded-sm group bg-card-border/50">
                <img
                    src={fallbackImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
        );
    }

    return (
        <div className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden rounded-sm bg-card-border/30 border border-border/50 group">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg/80 z-10 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
            )}

            {/* Interactive overlay to prevent accidental scrolling while navigating the page, 
          disappears on hover so user can interact with the iframe */}
            <div className="absolute inset-0 z-10 bg-transparent group-hover:hidden" />

            <iframe
                src={url}
                title={title}
                className="w-full h-full border-none"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
                // Sandbox attributes to prevent the iframe from breaking out or executing malicious scripts,
                // while still allowing it to load scripts and same-origin requests to render properly.
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
            />
        </div>
    );
}

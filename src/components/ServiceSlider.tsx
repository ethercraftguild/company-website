"use client";

import { useRef } from "react";
import Button from "./ui/Button";

interface SliderItem {
    title: string;
    description: string;
}

interface ServiceSliderProps {
    category: string;
    description: string;
    linkHref: string;
    linkText: string;
    items: SliderItem[];
}

export default function ServiceSlider({
    category,
    description,
    linkHref,
    linkText,
    items
}: ServiceSliderProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="py-xl overflow-hidden border-b border-border/50">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-lg gap-md md:gap-0">
                    <div className="max-w-[600px]">
                        <h2 className="text-3xl md:text-4xl font-bold mb-xs text-foreground tracking-tight">{category}</h2>
                        <p className="opacity-70 text-lg leading-relaxed">{description}</p>
                    </div>
                    <div className="flex items-center gap-xs shrink-0 self-start md:self-auto">
                        <Button href={linkHref} variant="tertiary" className="hidden sm:inline-flex mr-sm">
                            {linkText}
                        </Button>
                        <button
                            onClick={scrollLeft}
                            className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center hover:bg-black/5 hover:border-black/20 transition-all cursor-pointer"
                            aria-label="Scroll left"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center hover:bg-black/5 hover:border-black/20 transition-all cursor-pointer"
                            aria-label="Scroll right"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative group">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-md md:gap-lg pb-md px-[max(calc((100vw-1200px)/2),1.5rem)] snap-x snap-mandatory scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="min-w-[280px] w-[80vw] max-w-[380px] shrink-0 snap-start bg-card border border-card-border p-lg rounded-sm hover:-translate-y-1 transition-transform duration-300"
                        >
                            <h3 className="text-xl font-semibold mb-sm text-foreground">{item.title}</h3>
                            <p className="opacity-80 leading-relaxed text-[0.9375rem]">{item.description}</p>
                        </div>
                    ))}
                </div>
                {/* Fading Edges for visual polish */}
                <div className="absolute top-0 bottom-0 left-0 w-8 md:w-20 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-8 md:w-20 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
            </div>

            {/* Mobile-only fallback CTA */}
            <div className="mt-md px-md sm:hidden">
                <Button href={linkHref} variant="tertiary" className="w-full justify-center">
                    {linkText}
                </Button>
            </div>
        </div>
    );
}

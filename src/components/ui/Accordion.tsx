"use client";

import Link from 'next/link';

interface AccordionItem {
    title: string;
    description: string;
    link?: string;
}

interface AccordionProps {
    items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
    return (
        <div className="border-t border-border">
            {items.map((item, index) => (
                <details key={index} className="group border-b border-border" name="service-accordion">
                    <summary className="flex justify-between items-center py-md cursor-pointer list-none font-semibold text-lg transition-colors duration-200 text-foreground hover:text-accent [&::-webkit-details-marker]:hidden focus:outline-none">
                        <span>{item.title}</span>
                        <span className="font-mono text-2xl transition-transform duration-300 transform group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <div className="pb-md pt-sm text-foreground/90">
                        <p>{item.description}</p>
                        {item.link && (
                            <Link href={item.link} className="inline-block mt-sm font-medium text-accent underline hover:opacity-80 transition-opacity">
                                Learn more &rarr;
                            </Link>
                        )}
                    </div>
                </details>
            ))}
        </div>
    );
}

import Button from "./ui/Button";

interface GridItem {
    title: string;
    description: string;
}

interface ServiceGridProps {
    category: string;
    description: string;
    linkHref: string;
    linkText: string;
    items: GridItem[];
}

export default function ServiceGrid({
    category,
    description,
    linkHref,
    linkText,
    items
}: ServiceGridProps) {
    return (
        <div className="py-xl border-b border-border/50 bg-bg">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md md:gap-0">
                    <div className="max-w-[700px]">
                        <h2 className="text-3xl md:text-4xl font-bold mb-sm text-foreground tracking-tight">{category}</h2>
                        <p className="opacity-70 text-lg md:text-xl leading-relaxed">{description}</p>
                    </div>
                    <div className="shrink-0 self-start md:self-auto hidden sm:block">
                        <Button href={linkHref} variant="secondary">
                            {linkText}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-card border border-card-border p-xl rounded-2xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 flex flex-col h-full overflow-hidden"
                        >
                            {/* Subtle accent glow on hover */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <h3 className="text-xl font-bold mb-md text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                            <p className="opacity-70 leading-relaxed text-[0.9375rem] flex-grow">{item.description}</p>

                            {/* Decorative arrow that appears on hover */}
                            <div className="mt-lg pt-md border-t border-border/30 opacity-0 group-hover:opacity-100 flex items-center justify-end text-primary transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile-only CTA backup */}
                <div className="mt-xl sm:hidden flex justify-center">
                    <Button href={linkHref} variant="secondary" className="w-full justify-center">
                        {linkText}
                    </Button>
                </div>
            </div>
        </div>
    );
}

import Button from './ui/Button';

interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
    location: {
        city: string;
        country: string;
    };
}

export default function ProjectCard({ title, description, link, location }: ProjectCardProps) {
    return (
        <div className="group relative flex flex-col bg-card border border-card-border rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 h-full p-xl md:p-2xl min-h-[400px]">

            {/* Dynamic background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Decorative dot grid background */}
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-[radial-gradient(circle,currentColor_2px,transparent_2px)] bg-[length:16px_16px] opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

            {/* Primary content area focused entirely on deep typography */}
            <div className="relative z-10 flex-grow flex flex-col justify-center">

                <div className="mb-auto">
                    <p className="inline-flex items-center gap-2 mb-md text-sm font-semibold tracking-wide uppercase opacity-60">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                        {location.city}, {location.country}
                    </p>
                </div>

                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-md mb-lg"
                >
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300 break-words leading-none">
                        {title}
                    </h3>
                </a>

                <p className="text-lg opacity-80 leading-relaxed font-light mb-2xl">
                    {description}
                </p>

            </div>

            <div className="relative z-10 mt-auto pt-lg border-t border-border/50 flex justify-between items-center group-hover:border-primary/20 transition-colors duration-300">
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-sm font-bold text-[1rem] text-primary hover:text-foreground transition-colors"
                >
                    Visit Live Platform
                </a>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:rotate-45"
                    aria-label="Visit Website"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                </a>
            </div>

        </div>
    );
}

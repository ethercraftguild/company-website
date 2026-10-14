import type { Project } from '@/data/clients';

interface ProjectCardProps {
    project: Project;
}

const labelStyles = 'font-mono text-xs font-semibold tracking-wide uppercase opacity-60 mb-xs';
const bodyStyles = 'text-sm opacity-80 leading-relaxed';

export default function ProjectCard({ project }: ProjectCardProps) {
    const { title, description, link, location, problem, built, stack } = project;

    return (
        <div className="group relative flex flex-col bg-card border border-card-border rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40 h-full p-lg md:p-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[radial-gradient(circle,currentColor_2px,transparent_2px)] bg-[length:12px_12px] opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

            <div className="relative z-10 flex-grow flex flex-col">
                <p className="inline-flex items-center gap-2 mb-md text-xs font-semibold tracking-wide uppercase opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                    {location.city}, {location.country}
                </p>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter text-foreground leading-none mb-md break-words">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline transition-colors duration-300 group-hover:text-primary"
                    >
                        {title}
                    </a>
                </h3>

                <p className="text-base opacity-80 leading-relaxed font-light mb-lg">
                    {description}
                </p>

                <dl className="flex flex-col gap-lg mt-auto">
                    <div>
                        <dt className={labelStyles}>Problem</dt>
                        <dd className={bodyStyles}>{problem}</dd>
                    </div>

                    <div>
                        <dt className={labelStyles}>What we built</dt>
                        <dd className={bodyStyles}>{built}</dd>
                    </div>

                    <div>
                        <dt className={labelStyles}>Stack</dt>
                        <dd className="flex flex-wrap gap-xs">
                            {stack.map((tool) => (
                                <span
                                    key={tool}
                                    className="inline-flex items-center rounded-pill border border-border bg-bg px-md py-xs font-mono text-xs opacity-80"
                                >
                                    {tool}
                                </span>
                            ))}
                        </dd>
                    </div>

                    {/*
                      TODO(result): add a labelled "Result" callout here once the owner
                      supplies real per-project outcome metrics. No outcome figures are
                      published until then — do not add placeholder numbers.
                    */}
                </dl>
            </div>

            <div className="relative z-10 mt-lg pt-md border-t border-border/50 flex justify-between items-center group-hover:border-primary/20 transition-colors duration-300">
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-xs font-bold text-sm text-primary hover:text-foreground transition-colors"
                >
                    Visit Live Platform
                </a>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:rotate-45"
                    aria-label={`Visit ${title} website (opens in a new tab)`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                </a>
            </div>
        </div>
    );
}
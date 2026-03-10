import Section from '@/components/ui/Section';
import PageHero from '@/components/ui/PageHero';
import CtaSection from '@/components/ui/CtaSection';
import Card from '@/components/ui/Card';
import projectData from '@/data/projects.json';

export const metadata = {
    title: 'Our Work | Ethercraft Guild',
    description: 'Explore a curated selection of our recent digital architecture, growth strategies, and enterprise solutions.',
};

export default function WorkPage() {
    return (
        <main>
            <PageHero
                title="Our Work"
                subtitle="A selection of our recent projects and the impact we've created for our clients."
            />

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                    {projectData.map((project) => (
                        <div key={project.id} className="flex flex-col group">
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative aspect-video overflow-hidden rounded-sm mb-md flex-shrink-0">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
                            </a>
                            <h3 className="text-2xl font-bold mb-xs">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-200">
                                    {project.title}
                                </a>
                            </h3>
                            <p className="text-foreground/80 leading-relaxed mb-md flex-grow">
                                {project.description}
                            </p>
                            <div className="mt-auto">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-xs font-semibold text-[0.9375rem] text-primary hover:underline underline-offset-4"
                                >
                                    View Live Site
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <CtaSection
                title="Ready to build something remarkable?"
                ctaText="Start a Project Conversation"
                ctaLink="/contact"
                variant="secondary"
            />
        </main>
    );
}

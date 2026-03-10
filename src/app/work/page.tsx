import Section from '@/components/ui/Section';
import PageHero from '@/components/ui/PageHero';
import CtaSection from '@/components/ui/CtaSection';
import ProjectIframe from '@/components/ProjectIframe';
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
                <div className="mb-xl text-center">
                    <h2 className="text-3xl font-bold mb-sm">Direct Clients</h2>
                    <p className="opacity-70 max-w-[600px] mx-auto">End-to-end digital architecture and brand growth for our core portfolio.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl mb-3xl">
                    {projectData.filter(p => p.type === 'client').map((project) => (
                        <div key={project.id} className="flex flex-col group gap-md">
                            {/* <ProjectIframe
                                url={project.link}
                                title={project.title}
                                fallbackImage={project.image}
                            /> */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <h3 className="text-2xl font-bold mb-xs">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-200">
                                    {project.title}
                                </a>
                            </h3>
                            <p className="opacity-60 text-sm mb-sm flex items-center gap-1 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                                {project.location.city}, {project.location.country}
                            </p>
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

                <div className="mb-xl text-center border-t border-border pt-xl">
                    <h2 className="text-3xl font-bold mb-sm">Partner Collaborations</h2>
                    <p className="opacity-70 max-w-[600px] mx-auto">Specialized execution and augmentation alongside other agencies or internal teams.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                    {projectData.filter(p => p.type === 'partner').map((project) => (
                        <div key={project.id} className="flex flex-col group gap-md">
                            {/* <ProjectIframe
                                url={project.link}
                                title={project.title}
                                fallbackImage={project.image}
                            /> */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <h3 className="text-2xl font-bold mb-xs">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-200">
                                    {project.title}
                                </a>
                            </h3>
                            <p className="opacity-60 text-sm mb-sm flex items-center gap-1 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                                {project.location.city}, {project.location.country}
                            </p>
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

import Section from '@/components/ui/Section';
import PageHero from '@/components/ui/PageHero';
import CtaSection from '@/components/ui/CtaSection';
import ProjectCard from '@/components/ProjectCard';
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
                        <div key={project.id}>
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                link={project.link}
                                location={project.location}
                            />
                        </div>
                    ))}
                </div>

                <div className="mb-xl text-center border-t border-border pt-xl">
                    <h2 className="text-3xl font-bold mb-sm">Partner Collaborations</h2>
                    <p className="opacity-70 max-w-[600px] mx-auto">Specialized execution and augmentation alongside other agencies or internal teams.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                    {projectData.filter(p => p.type === 'partner').map((project) => (
                        <div key={project.id}>
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                link={project.link}
                                location={project.location}
                            />
                        </div>
                    ))}
                </div>
            </Section>

            <CtaSection
                title="Ready to build something remarkable?"
                ctaText="Start a Project Conversation"
                ctaLink="/contact"
            />
        </main>
    );
}

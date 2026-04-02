import CtaSection from '@/components/ui/CtaSection';

export const metadata = {
  title: "Engineering Manifesto | Ethercraft Guild",
  description: "The Ethercraft Guild philosophy: A master-apprentice engineering model dedicated to digital craftsmanship.",
};

export default function ManifestoPage() {
  return (
    <main className="pt-3xl pb-xl">
      <div className="container-custom max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-lg">The Engineering Manifesto</h1>
        
        <div className="prose prose-invert prose-lg max-w-none mb-3xl">
          <p className="text-2xl text-foreground/80 leading-relaxed font-light mb-xl">
            At Ethercraft Guild, we believe that software engineering is fundamentally a craft. We operate not as a factory of interchangeable resources, but as a collective dedicated to the pursuit of excellence.
          </p>

          <h2 className="text-3xl font-bold mt-2xl mb-md">The Master-Apprentice Model</h2>
          <p>
            Our internal structure is built on the time-tested "Master-Apprentice" model. Senior Architects (the Masters) work closely with mid-level engineers (the Journeymen) and junior developers (the Apprentices). This ensures that every line of code benefits from decades of combined experience, while continuously developing the next generation of top-tier talent.
          </p>
          <p>
            This model guarantees quality. When you partner with the Guild, you are not handed off to junior developers without supervision; you receive the collective expertise of our entire engineering organization.
          </p>

          <h2 className="text-3xl font-bold mt-2xl mb-md">Rejecting the Minimum Viable Product</h2>
          <p>
            We reject the notion that speed must come at the cost of stability. Whether we are building high-performance Flutter mobile apps or scalable Node.js backends, we design for the long term. We focus on technical debt resolution, comprehensive CI/CD optimization, and building robust systems that scale seamlessly.
          </p>

          <h2 className="text-3xl font-bold mt-2xl mb-md">Our Commitment to Digital Craftsmanship</h2>
          <p>
            We are problem solvers, system designers, and growth engineers. We take ownership of the products we build, treating our clients' technical challenges as our own. We use AI automation and cutting-edge operational tools not to replace developers, but to augment their capabilities and eliminate friction.
          </p>
        </div>

      </div>

      <CtaSection
        title="Ready to build something lasting?"
        ctaText="Start Collaboration"
        ctaLink="/contact"
        variant="primary"
      />
    </main>
  );
}

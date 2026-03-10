import Section from './ui/Section';
import Button from './ui/Button';

export default function HomeHero() {
    return (
        <Section className="pt-2xl md:pt-3xl pb-2xl text-center bg-gradient-to-b from-bg to-bg-alt">
            <div className="max-w-[800px] mx-auto relative z-10">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter animate-slideUp opacity-0 [animation-fill-mode:forwards] mb-md text-foreground">
                    Mastering Digital Craftsmanship
                </h1>
                <p className="text-xl md:text-2xl text-foreground opacity-80 mb-xl animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[200ms] font-light">
                    Your tailored guild of specialized engineers for high-growth technical execution.
                </p>

                <div className="mb-2xl animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[400ms] flex flex-col sm:flex-row justify-center gap-sm">
                    <Button href="/contact" variant="primary" className="px-xl py-md text-lg shadow-lg hover:shadow-primary/20">
                        Start Collaboration
                    </Button>
                    <Button href="/work" variant="secondary" className="px-xl py-md text-lg">
                        View Case Studies
                    </Button>
                </div>

                <div className="mt-2xl animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[600ms] pt-xl border-t border-border/50">
                    <p className="text-sm opacity-50 mb-md uppercase tracking-widest font-semibold">Trusted execution partners for</p>
                    <div className="flex justify-center gap-xl md:gap-2xl opacity-40 font-bold font-mono flex-wrap px-md items-center">
                        <span className="text-xl">TechCorp</span>
                        <span className="text-xl tracking-tighter">GrowthInc</span>
                        <span className="text-xl">ScaleOps</span>
                        <span className="text-xl italic">VentureFund</span>
                    </div>
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl" />
            </div>
        </Section>
    );
}

import Section from './ui/Section';
import Button from './ui/Button';

export default function FeaturedWorkTeaser() {
    return (
        <Section className="text-center relative py-3xl bg-foreground text-bg">
            <div className="max-w-[700px] mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-md text-bg">Craftsmanship in Action</h2>
                <p className="text-xl opacity-80 mt-sm mb-xl font-light">
                    See how we've partnered with leading companies to transform their digital architecture and accelerate growth.
                </p>
                <div>
                    <Button href="/work" variant="primary" className="text-lg px-2xl py-lg bg-bg text-foreground hover:bg-bg-alt hover:-translate-y-1 hover:shadow-2xl">
                        Explore Portfolio
                    </Button>
                </div>
            </div>

            {/* Dark theme decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-bg/10 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[1px] border-bg/5 rounded-full" />
            </div>
        </Section>
    );
}

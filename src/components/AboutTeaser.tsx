import Section from './ui/Section';
import Button from './ui/Button';

export default function AboutTeaser() {
    return (
        <Section className="bg-bg">
            <div className="bg-card rounded-[2rem] border border-card-border p-xl md:p-3xl relative overflow-hidden group transition-all duration-500 hover:shadow-2xl">

                {/* Subtle animated background gradient element for hover state */}
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-xl md:gap-3xl items-center">

                    <div>
                        <span className="inline-block py-xs px-sm rounded-full bg-primary/10 text-primary text-sm font-semibold mb-md uppercase tracking-wider">
                            About The Guild
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-md tracking-tight">
                            Engineering with precision, executing with unmatched speed.
                        </h2>
                    </div>

                    <div className="flex flex-col gap-lg">
                        <p className="text-lg md:text-xl opacity-80 leading-relaxed font-light">
                            Ethercraft Guild is a specialized cooperative of senior architects, product strategists, and elite developers. We don't just write code; we partner with our clients to architect systems designed to scale natively, convert effortlessly, and outpace the market.
                        </p>
                        <div className="mt-sm">
                            <Button href="/about" variant="secondary" className="px-lg py-md rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                Discover Our Process
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    );
}

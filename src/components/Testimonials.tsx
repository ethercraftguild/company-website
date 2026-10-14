import Card from './ui/Card';
import Section from './ui/Section';
import testimonials from '@/data/testimonials.json';

export default function Testimonials() {
    return (
        <Section className="bg-bg-alt">
            <div className="text-center mb-lg">
                <h2 className="mb-sm">Client Testimonials</h2>
                <p className="opacity-70 max-w-[600px] mx-auto">
                    Hear from the leaders and teams we&apos;ve partnered with to build, scale, and optimize their digital presence.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="bg-card">
                        <div className="flex flex-col h-full justify-between">
                            <p className="italic opacity-90 mb-md">&ldquo;{testimonial.content}&rdquo;</p>
                            <div className="flex items-center gap-sm">
                                <img
                                    src={testimonial.logo}
                                    alt=""
                                    width={36}
                                    height={36}
                                    loading="lazy"
                                    className="h-9 w-9 object-contain grayscale shrink-0"
                                />
                                <div>
                                    <p className="font-bold">{testimonial.role}</p>
                                    <p className="text-sm opacity-60">
                                        <a
                                            href={testimonial.companyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline underline-offset-2 hover:opacity-100"
                                        >
                                            {testimonial.company}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Clients are under NDA, so quotes carry a role rather than a name.
                A live reference call is the stronger proof — offer it explicitly. */}
            <p className="text-center text-sm opacity-60 mt-lg mb-0">
                Client names shared with permission. A reference call with a past client can be arranged on request under NDA.
            </p>
        </Section>
    );
}

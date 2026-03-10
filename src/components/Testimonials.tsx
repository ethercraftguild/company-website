import Card from './ui/Card';
import Section from './ui/Section';

const TESTIMONIALS = [
    {
        author: "Sarah Jenkins",
        role: "CTO, TechCorp",
        content: "Ethercraft Guild completely transformed our digital architecture. Their team is composed of true professionals who deliver on their promises.",
    },
    {
        author: "David Lee",
        role: "Founder, GrowthInc",
        content: "The level of craftsmanship and attention to detail from the initial design phase through launch was exceptional. Highly recommended.",
    },
    {
        author: "Amanda Chen",
        role: "VP Operations, ScaleOps",
        content: "They didn't just build a tool; they streamlined our entire workflow. Our operational efficiency has never been better.",
    }
];

export default function Testimonials() {
    return (
        <Section className="bg-bg-alt">
            <div className="text-center mb-lg">
                <h2 className="mb-sm">Client Testimonials</h2>
                <p className="opacity-70 max-w-[600px] mx-auto">
                    Hear from the leaders and teams we've partnered with to build, scale, and optimize their digital presence.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                {TESTIMONIALS.map((testimonial, idx) => (
                    <Card key={idx} className="bg-card">
                        <div className="flex flex-col h-full justify-between">
                            <p className="italic opacity-90 mb-md">"{testimonial.content}"</p>
                            <div>
                                <p className="font-bold">{testimonial.author}</p>
                                <p className="text-sm opacity-60">{testimonial.role}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}

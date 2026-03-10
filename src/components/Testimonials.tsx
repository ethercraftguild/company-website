import Card from './ui/Card';
import Section from './ui/Section';
import testimonials from '@/data/testimonials.json';

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
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="bg-card">
                        <div className="flex flex-col h-full justify-between">
                            <p className="italic opacity-90 mb-md">"{testimonial.content}"</p>
                            <div>
                                <p className="font-bold">{testimonial.author}</p>
                                <p className="text-sm opacity-60">{testimonial.company}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}

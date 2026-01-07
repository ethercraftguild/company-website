import Section from './Section';
import Button from './Button';

interface CtaSectionProps {
    title?: string;
    text?: string;
    ctaText?: string;
    ctaLink?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    centered?: boolean;
}

export default function CtaSection({
    title = "Ready to Partner with the Guild?",
    text,
    ctaText = "Start Your Project",
    ctaLink = "/contact",
    variant = 'tertiary',
    centered = true
}: CtaSectionProps) {
    return (
        <Section className="pb-2xl">
            <div className={`bg-accent text-[#F7F7F7] p-xl rounded-sm w-full ${centered ? 'text-center max-w-[800px] mx-auto' : ''}`}>
                <h3 className="text-[#F7F7F7] text-[1.75rem] md:text-[2.25rem] mb-md">{title}</h3>
                {text && <p className="mb-lg opacity-90 text-[1.1rem]">{text}</p>}
                <Button href={ctaLink} variant={variant}>{ctaText}</Button>
            </div>
        </Section>
    );
}

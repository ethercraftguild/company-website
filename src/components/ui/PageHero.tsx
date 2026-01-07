import Section from './Section';
import Button from './Button';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function PageHero({
    title,
    subtitle,
    ctaText = "Start a Conversation",
    ctaLink = "/contact",
    variant = 'primary'
}: PageHeroProps) {
    return (
        <Section className="pt-xl md:pt-2xl text-center">
            <div className="max-w-[900px] mx-auto">
                <h1 className="mb-md">{title}</h1>
                {subtitle && <p className="text-lg md:text-xl max-w-[700px] opacity-90 mx-auto">{subtitle}</p>}
                <div>
                    <Button href={ctaLink} variant={variant}>{ctaText}</Button>
                </div>
            </div>
        </Section>
    );
}

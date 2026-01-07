import type { Metadata } from 'next';
import ServiceDetailLayout from '@/components/templates/ServiceDetailLayout';
import { CapabilityCard, CapabilitiesGrid } from '@/components/ui/ServiceCapabilities';

export const metadata: Metadata = {
    title: "Audio & Video Production | Ethercraft Guild",
    description: "Compelling visual storytelling and immersive soundscapes. We produce high-fidelity media assets that capture attention and communicate your brand's essence.",
};

export default function AudioVideoProductionPage() {
    return (
        <ServiceDetailLayout
            hero={{
                title: "Audio & Video Production",
                subtitle: "Compelling visual storytelling and immersive soundscapes. We produce high-fidelity media assets that capture attention and communicate your brand's essence.",
                ctaText: "Start Your Production",
                ctaLink: "/contact"
            }}
            cta={{
                title: "Tell Your Story",
                ctaText: "Book a Creative Consultation",
                ctaLink: "/contact",
                variant: "tertiary"
            }}
            sidebar={
                <div className="infoCard">
                    <h4>Deliverables</h4>
                    <ul className="processList">
                        <li>Script & Storyboard</li>
                        <li>On-location / Studio Shoot</li>
                        <li>4K Editing & Motion Graphics</li>
                        <li>Sound Design & Mixing</li>
                        <li>Multi-platform Exports</li>
                    </ul>
                </div>
            }
        >
            <h2>Production That Captivates</h2>
            <p>
                In a saturated digital landscape, quality content is your
                loudest differentiator. Whether it is a slick corporate
                promo, a client testimonial, or a full-scale podcast series,
                we bring cinematic production values to your message.
            </p>

            <h3>Our Methodology</h3>
            <p>
                We blend creative vision with technical expertise. From
                scriptwriting to post-production, every frame and sound wave
                is crafted with purpose.
            </p>

            <CapabilitiesGrid>
                <CapabilityCard title="Video Advertisements">
                    <p>
                        High-impact commercials for social media, TV, or
                        web. Designed to convert viewers into customers.
                    </p>
                </CapabilityCard>
                <CapabilityCard title="Corporate Films">
                    <p>
                        Brand stories, interviews, and company culture
                        videos that build trust and authority.
                    </p>
                </CapabilityCard>
                <CapabilityCard title="Audio Engineering">
                    <p>
                        Podcast production, voiceovers, and sound design.
                        Crystal clear audio for professional delivery.
                    </p>
                </CapabilityCard>
            </CapabilitiesGrid>

            <h3>Tools We Use</h3>
            <ul>
                <li>Cinema-grade Cameras & Lenses</li>
                <li>Adobe Premiere Pro & After Effects</li>
                <li>DaVinci Resolve for Color Grading</li>
                <li>Pro Tools & Logic Pro for Audio</li>
            </ul>
        </ServiceDetailLayout>
    );
}

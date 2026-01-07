import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/config';


export const metadata: Metadata = {
    title: "Contact Us | Ethercraft Guild",
};

export default function ContactPage() {
    const formAction = `https://formspree.io/f/${SITE_CONFIG.contactEmail}`;

    return (
        <Section className="min-h-[80vh] flex justify-center items-center pt-xl">
            <div className="w-full max-w-[600px] mx-auto">
                <h1 className="mb-xs text-center">Start Your Project</h1>
                <p className="text-center mb-xl opacity-80">Tell us about your goals. We will get back to you within 24 hours.</p>

                <div className="text-center mb-lg">
                    <a href={SITE_CONFIG.calendly} target="_blank" className="bg-foreground text-bg border border-foreground rounded-[25px] px-6 py-3 text-[1.1rem] inline-block no-underline hover:bg-transparent hover:text-foreground transition-colors">
                        <span className="not-italic mr-2">📅</span> Schedule a 30-min Discovery
                    </a>
                    <p className="my-md text-sm opacity-50 font-bold relative text-center before:content-[''] before:inline-block before:w-[30px] before:h-[1px] before:bg-border before:align-middle before:mx-[10px] after:content-[''] after:inline-block after:w-[30px] after:h-[1px] after:bg-border after:align-middle after:mx-[10px]">OR</p>
                </div>

                <form action={formAction} method="POST" className="flex flex-col gap-md mb-xl">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-semibold">Name</label>
                        <input type="text" id="name" name="name" required placeholder="Jane Doe" className="p-3 border border-border rounded-sm font-inherit text-base bg-bg text-foreground" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-semibold">Email</label>
                        <input type="email" id="email" name="email" required placeholder="jane@company.com" className="p-3 border border-border rounded-sm font-inherit text-base bg-bg text-foreground" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-semibold">Project Details</label>
                        <textarea id="message" name="message" rows={5} required placeholder="I need help with..." className="p-3 border border-border rounded-sm font-inherit text-base bg-bg text-foreground"></textarea>
                    </div>

                    <Button type="submit" variant="primary" className="w-full">Send Message</Button>
                </form>

                <div className="text-center mt-lg opacity-80">
                    <p className="text-sm">Prefer email? <a href={`mailto:${SITE_CONFIG.email}`} className="text-foreground underline">{SITE_CONFIG.email}</a></p>
                </div>
            </div>
        </Section>
    );
}

import { SITE_CONFIG } from '@/config';


export default function ContactSection() {
    const { companyName, privacyEmail, location } = SITE_CONFIG;

    return (
        <section className="py-xl bg-hover border-t border-border mt-2xl">
            <div className="max-w-[800px] mx-auto px-md">
                <div className="bg-accent p-xl rounded-sm">
                    <h2 className="text-bg mb-md text-[1.75rem]">Contact Us</h2>
                    <p className="text-bg opacity-90 mb-lg text-[1.125rem]">
                        If you have questions or comments about this Privacy Policy, please contact us at:
                    </p>

                    <div className="flex flex-col gap-2">
                        <div className="flex mb-sm last:mb-0">
                            <span className="font-bold text-bg w-[100px] shrink-0 opacity-80">Company:</span>
                            <span className="text-bg">{companyName}</span>
                        </div>
                        <div className="flex mb-sm last:mb-0">
                            <span className="font-bold text-bg w-[100px] shrink-0 opacity-80">Email:</span>
                            <a href={`mailto:${privacyEmail}`} className="text-bg underline opacity-90 hover:opacity-100">{privacyEmail}</a>
                        </div>
                        <div className="flex mb-sm last:mb-0">
                            <span className="font-bold text-bg w-[100px] shrink-0 opacity-80">Location:</span>
                            <span className="text-bg">{location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

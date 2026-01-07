import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';


export const metadata: Metadata = {
    title: "Terms and Conditions | Ethercraft Guild",
};

const companyName = "Ethercraft Guild";
const effectiveDate = "June 12, 2025";

export default function TermsPage() {
    return (
        <div className="bg-accent text-[#f7f7f7] w-full min-h-screen [&_h2]:text-[2rem] [&_h2]:mb-lg [&_h2]:border-b [&_h2]:border-white/20 [&_h2]:pb-sm [&_h3]:text-[1.5rem] [&_h3]:mt-lg [&_h3]:mb-sm [&_h3]:text-white [&_p]:leading-[1.8] [&_p]:mb-md [&_p]:opacity-90 [&_ul]:list-disc [&_ul]:pl-lg [&_ul]:mb-lg [&_u]:leading-[1.6] [&_li]:mb-sm">
            <section className="bg-hover pt-2xl text-center pb-xl px-md">
                <div className="max-w-[800px] mx-auto">
                    <h1 className="text-[3rem] mb-md font-bold">Terms and Conditions</h1>
                    <p className="text-[1.25rem] opacity-80 mb-lg">Effective Date: {effectiveDate}</p>
                    <p className="text-[1.125rem] leading-[1.8]">
                        Welcome to {companyName}. These Terms and Conditions govern your use of our website and services. By accessing or using the Site, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not access the Site.
                    </p>
                </div>
            </section>

            <section className="py-xl px-md">
                <div className="max-w-[800px] mx-auto">
                    <h2>1. Intellectual Property Rights</h2>
                    <p>Unless otherwise indicated, the Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by {companyName}, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>

                    <h2>2. User Representations</h2>
                    <p>By using the Site, you represent and warrant that:</p>
                    <ul>
                        <li>All registration information you submit will be true, accurate, current, and complete.</li>
                        <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                        <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
                        <li>You are not a minor in the jurisdiction in which you reside.</li>
                    </ul>

                    <h2>3. Prohibited Activities</h2>
                    <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

                    <h2>4. Limitation of Liability</h2>
                    <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.</p>

                    <h2>5. Governing Law</h2>
                    <p>These Terms shall be governed by and defined following the laws of Bangladesh. {companyName} and yourself irrevocably consent that the courts of Bangladesh shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
                </div>
            </section>

            <ContactSection />
        </div>
    );
}

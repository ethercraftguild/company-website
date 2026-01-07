import Link from 'next/link';
import SocialIcons from './ui/SocialIcons';

export default function Footer() {
    return (
        <footer className="bg-bg border-t border-border pt-xl pb-md mt-auto">
            <div className="container-custom">
                <div className="flex flex-col gap-xl mb-xl md:flex-row md:justify-between">
                    <div className="footerBrand">
                        <SocialIcons className="flex gap-md items-center mb-5" />
                    </div>
                    <div className="grid grid-cols-2 gap-lg md:gap-2xl">
                        <div className="flex flex-col gap-sm">
                            <h4 className="text-base mb-md uppercase tracking-wider font-bold">Services</h4>
                            <ul className="list-none flex flex-col gap-sm">
                                <li><Link href="/services/architecture" className="no-underline transition-opacity duration-200 text-inherit hover:underline hover:opacity-70">Digital Architecture</Link></li>
                                <li><Link href="/services/growth" className="no-underline transition-opacity duration-200 text-inherit hover:underline hover:opacity-70">Growth & Brand</Link></li>
                                <li><Link href="/services/operations" className="no-underline transition-opacity duration-200 text-inherit hover:underline hover:opacity-70">Talent & Operations</Link></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-sm">
                            <h4 className="text-base mb-md uppercase tracking-wider font-bold">Company</h4>
                            <ul className="list-none flex flex-col gap-sm">
                                <li><Link href="/about" target="_blank" className="no-underline transition-opacity duration-200 text-inherit hover:underline hover:opacity-70">About</Link></li>
                                <li><Link href="/privacy" target="_blank" className="no-underline transition-opacity duration-200 text-inherit hover:underline hover:opacity-70">Privacy Policy</Link></li>
                                <li><Link href="/terms" target="_blank" className="no-underline transition-opacity duration-200 text-inherit hover:underline hover:opacity-70">Terms & Conditions</Link></li>
                                <li><Link href="/contact" target="_blank" className="no-underline transition-opacity duration-200 text-inherit hover:underline hover:opacity-70">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-border pt-md text-center text-sm opacity-60">
                    <p>&copy; 2026 Ethercraft Guild. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

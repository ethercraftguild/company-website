"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_MENU } from '@/config';
import MobileDrawer from './MobileDrawer';
import ContactModal from './ContactModal';
import Button from './ui/Button';

export default function Header() {
    const pathname = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isActive = (item: any) => {
        if (item.href === pathname) return true;
        if (item.children) {
            if (item.children.some((child: any) => child.href === pathname)) return true;
        }
        // Parent prefix match
        if (item.href !== "/" && pathname.startsWith(item.href)) return true;
        return false;
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[1000] bg-[#f7f7f7]/95 backdrop-blur-[10px] border-b border-border py-md">
                <div className="container-custom flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-mono font-bold text-lg uppercase tracking-tight z-[101] shrink-0 text-foreground no-underline">
                        <img src="/favicon.svg" alt="Ethercraft Guild" width="64" height="64" />
                        <span className="hidden sm:inline">Ethercraft Guild</span>
                    </Link>

                    <nav className="hidden md:block">
                        <ul className="flex gap-lg list-none items-center">
                            {NAV_MENU.map((item) => (
                                <li key={item.label} className="relative group">
                                    <Link href={item.href} className={`font-medium text-[0.9375rem] flex items-center gap-1 py-1 transition-opacity decoration-auto underline-offset-4 ${isActive(item) ? 'opacity-100 underline' : 'opacity-70 hover:opacity-100 hover:no-underline'}`}>
                                        {item.label}
                                        {item.children && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:rotate-180">
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        )}
                                    </Link>
                                    {item.children && (
                                        <ul className="absolute top-full left-1/2 -translate-x-1/2 translate-y-[10px] bg-white border border-border rounded-sm p-sm min-w-[200px] shadow-sm opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 list-none">
                                            {item.children.map((child: any) => (
                                                <li key={child.label}>
                                                    <Link href={child.href} className={`block px-sm py-xs text-sm text-foreground rounded whitespace-nowrap opacity-80 hover:bg-bg hover:opacity-100 hover:no-underline ${pathname === child.href ? 'font-semibold opacity-100 bg-black/5' : ''}`}>
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-xs">
                        <Button
                            variant="primary"
                            className="hidden md:inline-flex"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Start Consultation
                        </Button>

                        <button
                            className="flex md:hidden flex-col justify-center gap-[6px] bg-none border-none cursor-pointer p-xs z-[1001] shrink-0 ml-1"
                            aria-label="Open menu"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            <span className="relative block w-6 h-[2px] bg-foreground transition-transform duration-300 before:content-[''] before:absolute before:w-6 before:h-[2px] before:bg-foreground before:-top-2 after:content-[''] after:absolute after:w-6 after:h-[2px] after:bg-foreground after:top-2"></span>
                        </button>
                    </div>
                </div>
            </header>

            <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

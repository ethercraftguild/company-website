"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_MENU } from '@/config';

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    // Reset body scroll and escape key listener
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        } else {
            // Reset expanded items when closed? Or keep them? Maybe keep.
            document.body.style.overflow = '';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const toggleAccordion = (label: string) => {
        setExpandedItems(prev =>
            prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
        );
    };

    const isActive = (href: string) => pathname === href;

    // Helper to check if parent is active (if child is active)
    const isParentActive = (item: any) => {
        if (item.href === pathname) return true;
        if (item.children) {
            return item.children.some((child: any) => child.href === pathname);
        }
        return false;
    };

    return (
        <div className={`fixed inset-0 z-[2000] lg:hidden ${isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none delay-200'}`}>
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>
            <div className={`absolute bottom-0 left-0 w-full max-h-[85vh] overflow-y-auto bg-bg border-t border-border p-5 pb-[100px] rounded-t-sm flex flex-col transition-transform duration-200 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="flex justify-between items-center mb-lg border-b border-border pb-md shrink-0">
                    <Link href="/" className="font-mono font-bold text-lg uppercase flex items-center gap-2 text-foreground no-underline leading-none" onClick={onClose}>
                        <img src="/logo.png" alt="Ethercraft Guild" width="24" height="24" className="block shrink-0" />
                        <span className="mt-[2px]">Ethercraft Guild</span>
                    </Link>
                    <button className="bg-none border-none text-3xl cursor-pointer leading-none px-sm" onClick={onClose} aria-label="Close menu">&times;</button>
                </div>

                <nav className="flex-grow mb-xl">
                    <ul className="list-none flex flex-col gap-sm">
                        {NAV_MENU.map((item) => {
                            const parentActive = isParentActive(item);
                            const hasChildren = item.children && item.children.length > 0;
                            const isExpanded = expandedItems.includes(item.label);

                            return (
                                <li key={item.label} className="border-b border-black/5">
                                    <div className="flex justify-between items-center">
                                        <Link href={item.href} className="text-xl font-semibold flex items-center gap-2 py-sm text-foreground" onClick={onClose}>
                                            {parentActive && <span className="w-2 h-2 bg-foreground rounded-full inline-block"></span>}
                                            {item.label}
                                        </Link>
                                        {hasChildren && (
                                            <button
                                                type="button"
                                                className="flex items-center justify-center cursor-pointer relative bg-transparent border-none p-sm text-foreground"
                                                aria-label={`${item.label} submenu`}
                                                aria-expanded={isExpanded}
                                                aria-controls={`submenu-${item.label}`}
                                                onClick={() => toggleAccordion(item.label)}
                                            >
                                                {/* Single glyph that rotates 45deg into a close mark, so the two
                                                    states can never render on top of each other. */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    aria-hidden="true"
                                                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}
                                                >
                                                    <path d="M12 5v14M5 12h14" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    {hasChildren && (
                                        <ul
                                            id={`submenu-${item.label}`}
                                            hidden={!isExpanded}
                                            className={`list-none pl-5 overflow-hidden transition-[max-height,margin] duration-300 ease-out ${isExpanded ? 'max-h-[300px] mb-sm' : 'max-h-0'}`}
                                        >
                                            {item.children?.map((child: any) => {
                                                const childActive = isActive(child.href);
                                                return (
                                                    <li key={child.href}>
                                                        <Link href={child.href} className={`block py-2 text-base text-foreground ${childActive ? 'opacity-100 font-semibold underline' : 'opacity-70'}`} onClick={onClose}>
                                                            {child.label}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="border-t border-border pt-md shrink-0">
                    <ul className="list-none flex flex-wrap justify-between gap-md">
                        <li><Link href="/about" className="text-[0.6rem] opacity-60 no-underline" onClick={onClose}>About Us</Link></li>
                        <li><Link href="/blog" className="text-[0.6rem] opacity-60 no-underline" onClick={onClose}>Blog</Link></li>
                        <li><Link href="/privacy" className="text-[0.6rem] opacity-60 no-underline" onClick={onClose}>Privacy Policy</Link></li>
                        <li><Link href="/terms" className="text-[0.6rem] opacity-60 no-underline" onClick={onClose}>Terms & Conditions</Link></li>
                        <li><Link href="/sitemap.xml" className="text-[0.6rem] opacity-60 no-underline" onClick={onClose}>Sitemap</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

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
        <div className={`fixed inset-0 z-[2000] md:hidden ${isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none delay-200'}`}>
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>
            <div className={`absolute bottom-0 left-0 w-full max-h-[85vh] overflow-y-auto bg-bg border-t border-border p-5 pb-xl rounded-t-sm flex flex-col transition-transform duration-200 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="flex justify-between items-center mb-lg border-b border-border pb-md shrink-0">
                    <Link href="/" className="font-mono font-bold text-lg uppercase flex items-center gap-2 text-foreground no-underline" onClick={onClose}>
                        <img src="/favicon.svg" alt="Logo" width="24" height="24" className="block" />
                        Ethercraft Guild
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
                                                className="flex items-center justify-center cursor-pointer relative bg-transparent border-none p-sm text-foreground"
                                                aria-label={`Toggle ${item.label} menu`}
                                                onClick={() => toggleAccordion(item.label)}
                                            >
                                                <span className={`absolute text-xl leading-none transition-all duration-200 ${isExpanded ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}>+</span>
                                                <span className={`absolute text-xl leading-none transition-all duration-200 ${isExpanded ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}>&times;</span>
                                            </button>
                                        )}
                                    </div>
                                    {hasChildren && (
                                        <ul className={`list-none pl-5 overflow-hidden transition-[max-height,margin] duration-300 ease-out ${isExpanded ? 'max-h-[300px] mb-sm' : 'max-h-0'}`}>
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
                        <li><Link href="/privacy" target="_blank" className="text-[0.6rem] text-[#999] no-underline" onClick={onClose}>Privacy Policy</Link></li>
                        <li><Link href="/about" target="_blank" className="text-[0.6rem] text-[#999] no-underline" onClick={onClose}>About Us</Link></li>
                        <li><Link href="/terms" target="_blank" className="text-[0.6rem] text-[#999] no-underline" onClick={onClose}>Terms & Conditions</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

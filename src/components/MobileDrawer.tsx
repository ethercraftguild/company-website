"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_MENU } from '@/config';
import styles from './MobileDrawer.module.css';

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
        <div className={`${styles.mobileDrawer} ${isOpen ? styles.isOpen : ''}`}>
            <div className={styles.drawerOverlay} onClick={onClose}></div>
            <div className={styles.drawerContent}>
                <div className={styles.drawerHeader}>
                    <Link href="/" className={styles.drawerBrand} onClick={onClose}>
                        {/* Assuming /favicon.svg exists in public */}
                        <img src="/favicon.svg" alt="Logo" width="24" height="24" className={styles.drawerLogo} />
                        Ethercraft Guild
                    </Link>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">&times;</button>
                </div>

                <nav className={styles.drawerNav}>
                    <ul className={styles.navList}>
                        {NAV_MENU.map((item) => {
                            const parentActive = isParentActive(item);
                            const hasChildren = item.children && item.children.length > 0;
                            const isExpanded = expandedItems.includes(item.label);

                            return (
                                <li key={item.label} className={styles.navItem}>
                                    <div className={styles.navRow}>
                                        <Link href={item.href} className={styles.navLink} onClick={onClose}>
                                            {parentActive && <span className={styles.activeDot}></span>}
                                            {item.label}
                                        </Link>
                                        {hasChildren && (
                                            <button
                                                className={styles.accordionToggle}
                                                aria-label={`Toggle ${item.label} menu`}
                                                onClick={() => toggleAccordion(item.label)}
                                            >
                                                <span className={`${styles.iconPlus} ${isExpanded ? styles.hidden : ''}`}>+</span>
                                                <span className={`${styles.iconClose} ${isExpanded ? styles.visible : ''}`}>&times;</span>
                                            </button>
                                        )}
                                    </div>
                                    {hasChildren && (
                                        <ul className={`${styles.subMenu} ${isExpanded ? styles.expanded : ''}`}>
                                            {item.children?.map((child: any) => {
                                                const childActive = isActive(child.href);
                                                return (
                                                    <li key={child.href}>
                                                        <Link href={child.href} className={`${styles.subLink} ${childActive ? styles.childActive : ''}`} onClick={onClose}>
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

                <div className={styles.drawerFooter}>
                    <ul className={styles.secondaryLinks}>
                        <li><Link href="/privacy" target="_blank" onClick={onClose}>Privacy Policy</Link></li>
                        <li><Link href="/about" target="_blank" onClick={onClose}>About Us</Link></li>
                        <li><Link href="/terms" target="_blank" onClick={onClose}>Terms & Conditions</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

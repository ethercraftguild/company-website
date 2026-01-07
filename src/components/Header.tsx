"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_MENU } from '@/config';
import MobileDrawer from './MobileDrawer';
import ContactModal from './ContactModal';
import Button from './ui/Button';
import styles from './Header.module.css';

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
            <header className={styles.siteHeader}>
                <div className={styles.container}>
                    <Link href="/" className={styles.brand}>
                        <img src="/favicon.svg" alt="Ethercraft Guild" width="64" height="64" />
                        <span className={styles.brandText}>Ethercraft Guild</span>
                    </Link>

                    <nav className={styles.desktopNav}>
                        <ul className={styles.navList}>
                            {NAV_MENU.map((item) => (
                                <li key={item.label} className={styles.navItem}>
                                    <Link href={item.href} className={`${styles.navLink} ${isActive(item) ? styles.active : ''}`}>
                                        {item.label}
                                        {item.children && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.chevronDown}>
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        )}
                                    </Link>
                                    {item.children && (
                                        <ul className={styles.dropdownMenu}>
                                            {item.children.map((child: any) => (
                                                <li key={child.label}>
                                                    <Link href={child.href} className={`${styles.dropdownLink} ${pathname === child.href ? styles.childActive : ''}`}>
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

                    <div className={styles.headerActions}>
                        <Button
                            variant="primary"
                            className={styles.desktopCta}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Start Consultation
                        </Button>

                        <button
                            className={styles.menuToggle}
                            aria-label="Open menu"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            <span className={styles.hamburger}></span>
                        </button>
                    </div>
                </div>
            </header>

            <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

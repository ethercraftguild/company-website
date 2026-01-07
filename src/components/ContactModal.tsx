"use client";

import { useState, useEffect } from 'react';
import Button from './ui/Button';
import { SITE_CONFIG } from '@/config';
import styles from './ContactModal.module.css';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const formAction = `https://formspree.io/f/${SITE_CONFIG.contactEmail}`;

    // Handle escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.contactModal}>
            <div className={styles.modalOverlay} onClick={onClose}></div>
            <div className={styles.modalContent}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
                    &times;
                </button>

                <div className={styles.modalHeader}>
                    <h2>Start Your Project</h2>
                    <p>Tell us about your goals. We'll get back to you within 24 hours.</p>
                </div>

                <form action={formAction} method="POST" className={styles.contactForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Jane Doe"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="jane@company.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message">Project Details</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            placeholder="I need help with..."
                        ></textarea>
                    </div>

                    <Button type="submit" variant="primary" className={styles.submitBtn}>
                        Send Message
                    </Button>
                </form>

                <div className={styles.modalFooter}>
                    <p>Or book a direct call:</p>
                    <a href={SITE_CONFIG.calendly} target="_blank" rel="noopener noreferrer" className={styles.calendlyLink}>
                        <span className={styles.iconCalendar}>📅</span> Schedule a 30-min Discovery
                    </a>
                </div>
            </div>
        </div>
    );
}

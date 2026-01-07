"use client";

import { useState, useEffect } from 'react';
import Button from './ui/Button';
import { SITE_CONFIG } from '@/config';

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
        <div className="fixed inset-0 z-[3000] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[4px]" onClick={onClose}></div>
            <div className="relative bg-bg w-[90%] max-w-[500px] p-xl rounded-sm border border-border shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] max-h-[90vh] overflow-y-auto animate-slideUp">
                <button className="absolute top-md right-md bg-transparent border-none text-2xl cursor-pointer leading-none text-foreground opacity-60 hover:opacity-100 transition-opacity" onClick={onClose} aria-label="Close modal">
                    &times;
                </button>

                <div className="text-center mb-lg">
                    <h2 className="text-[1.75rem] mb-xs font-bold">Start Your Project</h2>
                    <p className="text-[#666] text-[0.9375rem]">Tell us about your goals. We'll get back to you within 24 hours.</p>
                </div>

                <form action={formAction} method="POST" className="flex flex-col gap-md">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-semibold">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Jane Doe"
                            className="p-3 border border-border rounded-sm font-inherit text-base transition-colors focus:outline-none focus:border-foreground bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="jane@company.com"
                            className="p-3 border border-border rounded-sm font-inherit text-base transition-colors focus:outline-none focus:border-foreground bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-semibold">Project Details</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            placeholder="I need help with..."
                            className="p-3 border border-border rounded-sm font-inherit text-base transition-colors focus:outline-none focus:border-foreground bg-white"
                        ></textarea>
                    </div>

                    <Button type="submit" variant="primary" className="w-full">
                        Send Message
                    </Button>
                </form>

                <div className="mt-lg pt-md border-t border-border text-center">
                    <p className="mb-sm text-sm opacity-80">Or book a direct call:</p>
                    <a href={SITE_CONFIG.calendly} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-foreground no-underline px-4 py-2 border border-border rounded-pill transition-colors hover:bg-black/5">
                        <span className="not-italic">📅</span> Schedule a 30-min Discovery
                    </a>
                </div>
            </div>
        </div>
    );
}

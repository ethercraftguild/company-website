"use client";

import { useEffect } from 'react';
import ContactForm from './ContactForm';
import { SITE_CONFIG } from '@/config';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
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

                <ContactForm idPrefix="modal-" />

                <div className="mt-lg pt-md border-t border-border text-center">
                    <p className="mb-sm text-sm opacity-80">Or book a direct call:</p>
                    <a href={SITE_CONFIG.calendly} target="_blank" rel="noopener noreferrer" data-calendly-link className="inline-flex items-center gap-2 font-semibold text-foreground no-underline px-4 py-2 border border-border rounded-pill transition-colors hover:bg-black/5">
                        <span className="not-italic">📅</span> Schedule a 30-min Discovery
                    </a>
                </div>
            </div>
        </div>
    );
}

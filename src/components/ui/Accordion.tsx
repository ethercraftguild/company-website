"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Accordion.module.css';

interface AccordionItem {
    title: string;
    description: string;
    link?: string;
}

interface AccordionProps {
    items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
    return (
        <div className={styles.accordionGroup}>
            {items.map((item, index) => (
                <details key={index} className={styles.accordionItem} name="service-accordion">
                    <summary className={styles.accordionTrigger}>
                        <span className={styles.accordionTitle}>{item.title}</span>
                        <span className={styles.icon} aria-hidden="true">+</span>
                    </summary>
                    <div className={styles.accordionContent}>
                        <p>{item.description}</p>
                        {item.link && (
                            <Link href={item.link} className={styles.accordionLink}>
                                Learn more &rarr;
                            </Link>
                        )}
                    </div>
                </details>
            ))}
        </div>
    );
}

import { HTMLAttributes } from 'react';
import styles from './Section.module.css';

interface SectionProps extends HTMLAttributes<HTMLElement> {
    id?: string;
    className?: string; // Allow overriding/merging classes
}

export default function Section({ id, className = '', children, ...props }: SectionProps) {
    return (
        <section id={id} className={`${styles.section} ${className}`} {...props}>
            <div className={styles.container}>
                {children}
            </div>
        </section>
    );
}

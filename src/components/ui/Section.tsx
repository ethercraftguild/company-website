import { HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
    id?: string;
    className?: string;
}

export default function Section({ id, className = '', children, ...props }: SectionProps) {
    return (
        <section id={id} className={`py-2xl w-full relative ${className}`} {...props}>
            <div className="container-custom">
                {children}
            </div>
        </section>
    );
}

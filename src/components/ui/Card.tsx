import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

export default function Card({ title, icon, children, className = '', ...props }: CardProps) {
    return (
        <div className={`bg-card border border-card-border rounded-sm p-lg transition-transform transition-shadow duration-200 ease-out h-full flex flex-col hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${className}`} {...props}>
            {icon && <div className="mb-sm text-foreground/80">{icon}</div>}
            {title && <h3 className="mb-md text-xl font-bold">{title}</h3>}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}

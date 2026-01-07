import { ReactNode, HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

export default function Card({ title, icon, children, className = '', ...props }: CardProps) {
    return (
        <div className={`${styles.card} ${className}`} {...props}>
            {icon && <div className={styles.iconWrapper}>{icon}</div>}
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            <div className={styles.cardContent}>
                {children}
            </div>
        </div>
    );
}

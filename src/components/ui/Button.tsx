import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    variant?: Variant;
    className?: string; // Standard React prop for classes
}

// We need to handle both button and anchor props roughly, but for simplicity:
// If href is present, we use Link and pass anchor props specific things if needed.
// If href is absent, we use button.

export default function Button({
    href,
    variant = 'primary',
    className = '',
    children,
    type = 'button',
    ...props
}: ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
    const combinedClassName = `${styles.btn} ${styles[`btn-${variant}`]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={combinedClassName} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
}

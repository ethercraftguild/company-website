import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    variant?: Variant;
    className?: string;
}

export default function Button({
    href,
    variant = 'primary',
    className = '',
    children,
    type = 'button',
    ...props
}: ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
    const baseStyles = "inline-flex items-center justify-center py-3 px-8 font-medium text-center no-underline rounded-pill transition-all duration-200 ease-[ease] text-base leading-normal cursor-pointer border border-transparent font-inherit";

    const variants = {
        primary: "bg-accent text-[#f7f7f7] border-accent hover:bg-accent-hover hover:text-white hover:border-accent-hover hover:-translate-y-px",
        secondary: "bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-bg",
        tertiary: "bg-bg text-accent border-bg hover:bg-white hover:text-accent-hover hover:border-white hover:-translate-y-px"
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

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

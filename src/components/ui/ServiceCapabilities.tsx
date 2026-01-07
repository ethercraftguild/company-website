import styles from './ServiceCapabilities.module.css';

interface CapabilityCardProps {
    title: string;
    children: React.ReactNode;
}

export function CapabilityCard({ title, children }: CapabilityCardProps) {
    return (
        <div className={styles.capCard}>
            <h4>{title}</h4>
            <div className={styles.capContent}>
                {children}
            </div>
        </div>
    );
}

export function CapabilitiesGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.capabilitiesGrid}>
            {children}
        </div>
    );
}

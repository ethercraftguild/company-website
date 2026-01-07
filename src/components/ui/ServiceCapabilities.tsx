interface CapabilityCardProps {
    title: string;
    children: React.ReactNode;
}

export function CapabilityCard({ title, children }: CapabilityCardProps) {
    return (
        <div className="bg-bg border border-border p-md rounded-sm">
            <h4 className="mb-xs">{title}</h4>
            <div className="[&>p]:mb-0 [&>p]:text-[0.9rem] [&>p]:opacity-80">
                {children}
            </div>
        </div>
    );
}

export function CapabilitiesGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid gap-md mt-md md:grid-cols-2">
            {children}
        </div>
    );
}

declare global {
    interface Window {
        gtag?: (command: string, ...args: unknown[]) => void;
    }
}

/**
 * Fire a GA4 event. No-ops before the snippet loads, so call sites stay
 * unconditional and nothing breaks while analytics is disabled.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
    if (typeof window === "undefined") return;
    window.gtag?.("event", name, params);
}

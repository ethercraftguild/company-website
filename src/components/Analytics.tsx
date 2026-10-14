"use client";

import Script from "next/script";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import { SITE_CONFIG } from "@/config";
import { trackEvent } from "@/lib/analytics";

const CONSENT_KEY = "eg-analytics-consent";
const CONSENT_EVENT = "eg-consent-change";

// null = not yet decided, true = granted, false = declined.
function getConsentSnapshot(): boolean | null {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored === null ? null : stored === "granted";
}

// The server has no localStorage, so it always renders the "undecided" state and
// the banner is markup-identical on first paint.
function getConsentServerSnapshot(): null {
    return null;
}

function subscribeToConsent(onChange: () => void) {
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

/**
 * GA4 loads only after explicit consent, so no tag ever fires for a visitor who
 * declined. Set NEXT_PUBLIC_GA_MEASUREMENT_ID to enable; without it this renders
 * nothing at all.
 */
export default function Analytics() {
    const measurementId = SITE_CONFIG.gaMeasurementId;
    const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getConsentServerSnapshot);

    // Calendly links live in several components, so track them at the document.
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("[data-calendly-link]");
            if (!link) return;
            trackEvent("calendly_click", { href: link.href, location: link.closest("footer") ? "footer" : "page" });
        };

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    const decide = useCallback((granted: boolean) => {
        localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
        window.dispatchEvent(new Event(CONSENT_EVENT));
    }, []);

    if (!measurementId) return null;

    return (
        <>
            {consent === true && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="ga4-init" strategy="afterInteractive">
                        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
                    </Script>
                </>
            )}

            {consent === null && (
                <div
                    role="dialog"
                    aria-label="Analytics consent"
                    className="fixed bottom-0 left-0 right-0 z-[1500] bg-foreground text-bg px-md py-md flex flex-col sm:flex-row sm:items-center sm:justify-center gap-md text-sm"
                >
                    <p className="mb-0 max-w-[60ch]">
                        We use privacy-friendly aggregate analytics to see which pages and offers get read. No ad
                        tracking, no cross-site profiling.
                    </p>
                    <div className="flex gap-sm shrink-0">
                        <button
                            type="button"
                            onClick={() => decide(true)}
                            className="bg-bg text-foreground border border-bg rounded-pill px-md py-sm font-semibold cursor-pointer hover:bg-transparent hover:text-bg transition-colors"
                        >
                            Accept
                        </button>
                        <button
                            type="button"
                            onClick={() => decide(false)}
                            className="bg-transparent text-bg border border-bg rounded-pill px-md py-sm font-semibold cursor-pointer hover:bg-bg hover:text-foreground transition-colors"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

/**
 * Minimal JSONP transport for the Apps Script /exec endpoint.
 *
 * Apps Script's ContentService cannot be read cross-origin, so JSONP is the only
 * way to see the response codes (rate, too_soon, bad_key...) from a static page.
 * The timeout is long because a cold start plus a Gmail send can exceed 20s.
 */

export interface JsonpResult {
    ok?: boolean;
    code?: string;
    message?: string;
    time?: number;
}

export const JSONP_TIMEOUT_MS = 20_000;

/** Rejections carry a distinguishing message so callers can branch on them. */
export const TIMEOUT_ERROR = "timeout";
export const NETWORK_ERROR = "network_error";

export function jsonp(
    endpoint: string,
    params: Record<string, string>,
    timeoutMs: number = JSONP_TIMEOUT_MS,
): Promise<JsonpResult> {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined" || typeof document === "undefined") {
            reject(new Error("jsonp requires a browser"));
            return;
        }

        const callbackName = `__ecg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
        const globals = window as unknown as Record<string, unknown>;
        const query = new URLSearchParams({ ...params, callback: callbackName });

        const script = document.createElement("script");
        // A pending flag, not unmount cleanup: the timer must survive the caller
        // re-rendering and must never let a second callback settle the promise.
        let settled = false;

        const cleanup = () => {
            clearTimeout(timer);
            delete globals[callbackName];
            script.remove();
        };

        const settle = (action: () => void) => {
            if (settled) return;
            settled = true;
            action();
        };

        const timer = setTimeout(() => {
            settle(() => {
                cleanup();
                reject(new Error(TIMEOUT_ERROR));
            });
        }, timeoutMs);

        script.onload = () => {
            settle(() => {
                const result = globals[callbackName] as JsonpResult | undefined;
                cleanup();
                // A response that parsed but defined no callback is still a failure.
                resolve(result ?? { ok: false, code: "error" });
            });
        };

        script.onerror = () => {
            settle(() => {
                cleanup();
                reject(new Error(NETWORK_ERROR));
            });
        };

        globals[callbackName] = {};
        script.async = true;
        script.src = `${endpoint}${endpoint.includes("?") ? "&" : "?"}${query.toString()}`;
        document.body.appendChild(script);
    });
}

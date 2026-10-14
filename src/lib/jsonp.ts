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
    /** v2 returns serverEpoch alongside the legacy time field. */
    serverEpoch?: number;
    minAge?: number;
    maxAge?: number;
}

export const JSONP_TIMEOUT_MS = 20_000;

/** Rejections carry a distinguishing message so callers can branch on them. */
export const TIMEOUT_ERROR = "timeout";
export const NETWORK_ERROR = "network_error";
/** The script loaded but the payload never arrived (HTML error page, ORB/MIME block). */
export const NO_PAYLOAD_ERROR = "no_payload";

/** Must match the server's sanitizer: ^[A-Za-z_$][A-Za-z0-9_$]{0,63}$ */
const CALLBACK_PATTERN = /^[A-Za-z_$][A-Za-z0-9_$]{0,63}$/;

function makeCallbackName(): string {
    // Starts with a letter, so it always satisfies the sanitizer.
    return `ecg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * `onLoad` is a safety net, not the happy path. Apps Script can answer with an
 * HTML error page or an ORB-blocked body, which still fires onload; without this
 * guard the caller would sit out the full 20s timeout before learning anything.
 */
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

        const callbackName = makeCallbackName();
        if (!CALLBACK_PATTERN.test(callbackName)) {
            reject(new Error("generated callback name is not server-safe"));
            return;
        }

        const globals = window as unknown as Record<string, unknown>;
        const query = new URLSearchParams({ ...params, callback: callbackName });
        const script = document.createElement("script");

        let settled = false;

        function cleanup() {
            clearTimeout(timer);
            // Restore rather than blindly delete: the resolver reads the result
            // during the callback, so the key must outlive the call itself.
            if (globals[callbackName] === undefined) {
                delete globals[callbackName];
            } else {
                globals[callbackName] = undefined;
            }
            try {
                script.remove();
            } catch {
                /* already detached */
            }
        };

        // One gate for all four exits: callback, onload, onerror, timeout.
        const settle = (action: () => void) => {
            if (settled) return false;
            settled = true;
            action();
            return true;
        };

        const timer = setTimeout(() => {
            settle(() => {
                cleanup();
                reject(new Error(TIMEOUT_ERROR));
            });
        }, timeoutMs);

        // The server calls this directly. Resolving here — not in onload — is what
        // makes the payload readable at all.
        globals[callbackName] = (payload: JsonpResult) => {
            settle(() => {
                cleanup();
                resolve(payload ?? { ok: false, code: "error" });
            });
        };

        script.onload = () => {
            settle(() => {
                cleanup();
                reject(new Error(NO_PAYLOAD_ERROR));
            });
        };

        script.onerror = () => {
            settle(() => {
                cleanup();
                reject(new Error(NETWORK_ERROR));
            });
        };

        script.async = true;
        script.src = `${endpoint}${endpoint.includes("?") ? "&" : "?"}${query.toString()}`;
        document.body.appendChild(script);
    });
}

"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { SITE_CONFIG } from "@/config";
import { trackEvent } from "@/lib/analytics";
import { jsonp, TIMEOUT_ERROR, NETWORK_ERROR } from "@/lib/jsonp";
import { buildPayload, validate, type FieldErrors, type ContactPayload } from "@/lib/contactPayload";

type Status = "idle" | "submitting" | "success" | "error" | "unconfirmed";
type Readiness = "checking" | "ready" | "fallback";

const MAX_MESSAGE = 600;

/**
 * The server enforces an age window on `ts` (>= 4s), and re-stamping to "now"
 * would sit at zero, so a soft-fail retry has to wait past that floor.
 */
const RETRY_FLOOR_MS = 4_500;

const GENERIC_ERROR = "We couldn't send that just now. Please try again, or email us directly.";

interface ContactFormProps {
    /** Keeps field ids unique: the page form and the header modal can coexist. */
    idPrefix?: string;
}

export default function ContactForm({ idPrefix = "" }: ContactFormProps) {
    const [status, setStatus] = useState<Status>("idle");
    const [readiness, setReadiness] = useState<Readiness>("checking");
    const [errorDetail, setErrorDetail] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [messageLength, setMessageLength] = useState(0);

    // ts is stamped once from the server's clock and re-stamped on retry.
    const tsRef = useRef(0);
    const skewRef = useRef(0);
    const formRef = useRef<HTMLFormElement>(null);

    const fieldId = (name: string) => `${idPrefix}${name}`;
    const busy = status === "submitting";
    const configured = Boolean(SITE_CONFIG.formEndpoint && SITE_CONFIG.formKey);

    /** Re-stamp using the skew measured at mount, so a fast client clock still passes. */
    const stamp = () => Math.floor(Date.now() / 1000) + skewRef.current;

    useEffect(() => {
        if (!configured) {
            setReadiness("fallback");
            return;
        }

        let cancelled = false;

        jsonp(SITE_CONFIG.formEndpoint, { action: "ping" })
            .then((result) => {
                if (cancelled) return;
                // Branch on ok first so an unexpected code cannot strand the form.
                if (result.ok === true && typeof result.time === "number") {
                    skewRef.current = result.time - Math.floor(Date.now() / 1000);
                    tsRef.current = Math.floor(Date.now() / 1000) + skewRef.current;
                    setReadiness("ready");
                } else {
                    setReadiness("fallback");
                }
            })
            .catch(() => {
                if (!cancelled) setReadiness("fallback");
            });

        return () => {
            cancelled = true;
        };
    }, [configured]);

    async function submit(payload: ContactPayload, isRetry: boolean) {
        setStatus("submitting");
        setErrorDetail("");

        try {
            const result = await jsonp(SITE_CONFIG.formEndpoint, payload);

            // ok:true covers both a real accept and the honeypot's fake success.
            // No code branch here, so an unknown server code still reads as sent.
            if (result.ok === true) {
                formRef.current?.reset();
                setMessageLength(0);
                setFieldErrors({});
                setStatus("success");
                trackEvent("form_submit", { form_location: idPrefix || "inline" });
                return;
            }

            switch (result.code) {
                case "too_soon":
                case "too_old":
                    if (!isRetry) {
                        setErrorDetail("One moment - re-checking the timestamp.");
                        await new Promise((resolve) => setTimeout(resolve, RETRY_FLOOR_MS));
                        await submit({ ...payload, ts: String(stamp()) }, true);
                        return;
                    }
                    setErrorDetail(GENERIC_ERROR);
                    break;
                case "rate":
                    setErrorDetail("Too many messages from this address. Please email us directly or book a call.");
                    break;
                case "bad_key":
                    // Operator fault, not the visitor's. Surface it loudly in the
                    // console and keep the visitor-facing copy generic.
                    console.error("[contact] rejected with bad_key - check NEXT_PUBLIC_FORM_KEY");
                    setErrorDetail(GENERIC_ERROR);
                    break;
                default:
                    setErrorDetail(GENERIC_ERROR);
            }
            setStatus("error");
        } catch (error) {
            if (error instanceof Error && error.message === TIMEOUT_ERROR) {
                // The mail may already be in flight. Never resend on a timeout.
                setStatus("unconfirmed");
                return;
            }
            setErrorDetail(
                error instanceof Error && error.message === NETWORK_ERROR
                    ? "We couldn't reach the server. Check your connection, or email us directly."
                    : GENERIC_ERROR,
            );
            setStatus("error");
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (busy || readiness !== "ready") return;

        const form = event.currentTarget;
        const data = new FormData(form);

        const values = {
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
            message: String(data.get("message") ?? ""),
        };

        const errors = validate(values);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }
        setFieldErrors({});

        const payload = buildPayload({
            ...values,
            company: String(data.get("company") ?? ""),
            hp: String(data.get("hp") ?? ""),
            ts: tsRef.current || stamp(),
            key: SITE_CONFIG.formKey,
        });

        void submit(payload, false);
    }

    if (!configured || readiness === "fallback") {
        return (
            <div className="flex flex-col gap-md p-lg border border-border rounded-sm bg-card">
                <p className="mb-0">
                    The form is unavailable right now. Reach us at{" "}
                    <a href={`mailto:${SITE_CONFIG.email}`} className="underline">{SITE_CONFIG.email}</a> or{" "}
                    <a href={SITE_CONFIG.calendly} target="_blank" rel="noopener noreferrer" className="underline">
                        book a 30-minute call
                    </a>
                    .
                </p>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-md">
            <div className="flex flex-col gap-2">
                <label htmlFor={fieldId("name")} className="text-sm font-semibold">Name</label>
                <input
                    type="text"
                    id={fieldId("name")}
                    name="name"
                    required
                    maxLength={120}
                    placeholder="Jane Doe"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? fieldId("name-error") : undefined}
                    className="p-3 border border-border rounded-sm font-inherit text-base bg-bg text-foreground"
                />
                {fieldErrors.name && (
                    <p id={fieldId("name-error")} className="text-sm text-[#b3261e] mb-0">{fieldErrors.name}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor={fieldId("email")} className="text-sm font-semibold">Email</label>
                <input
                    type="email"
                    id={fieldId("email")}
                    name="email"
                    required
                    maxLength={200}
                    placeholder="jane@company.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? fieldId("email-error") : undefined}
                    className="p-3 border border-border rounded-sm font-inherit text-base bg-bg text-foreground"
                />
                {fieldErrors.email && (
                    <p id={fieldId("email-error")} className="text-sm text-[#b3261e] mb-0">{fieldErrors.email}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor={fieldId("company")} className="text-sm font-semibold">Company</label>
                <input
                    type="text"
                    id={fieldId("company")}
                    name="company"
                    maxLength={120}
                    placeholder="Optional"
                    className="p-3 border border-border rounded-sm font-inherit text-base bg-bg text-foreground"
                />
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-sm">
                    <label htmlFor={fieldId("message")} className="text-sm font-semibold">Project Details</label>
                    <span
                        className={`font-mono text-xs ${messageLength > MAX_MESSAGE * 0.9 ? "text-[#b3261e]" : "opacity-50"}`}
                        aria-live="off"
                    >
                        {messageLength}/{MAX_MESSAGE}
                    </span>
                </div>
                <textarea
                    id={fieldId("message")}
                    name="message"
                    rows={5}
                    required
                    maxLength={MAX_MESSAGE}
                    placeholder="I need help with..."
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? fieldId("message-error") : undefined}
                    onChange={(event) => setMessageLength(event.target.value.length)}
                    className="p-3 border border-border rounded-sm font-inherit text-base bg-bg text-foreground"
                />
                {fieldErrors.message ? (
                    <p id={fieldId("message-error")} className="text-sm text-[#b3261e] mb-0">{fieldErrors.message}</p>
                ) : (
                    <p className="text-sm opacity-60 mb-0">
                        For longer briefs, email <a href={`mailto:${SITE_CONFIG.email}`} className="underline">{SITE_CONFIG.email}</a> directly.
                    </p>
                )}
            </div>

            {/* Honeypot - off-screen, hidden from assistive tech, never filled by humans. */}
            <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0 pointer-events-none -left-[9999px]">
                <label htmlFor={fieldId("hp")}>Company website</label>
                <input
                    type="text"
                    id={fieldId("hp")}
                    name="hp"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                />
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={busy || readiness !== "ready"}>
                {readiness === "checking" ? "Checking availability…" : busy ? "Sending…" : "Send Message"}
            </Button>

            <div role="status" aria-live="polite" className="min-h-[1.25rem] text-sm text-center">
                {status === "success" && (
                    <p className="text-[#1a7f4b]">
                        Thanks — your message is in. We reply within one business day.
                    </p>
                )}
                {status === "unconfirmed" && (
                    <p className="opacity-80">
                        This is taking longer than expected. We may have received your message — please check for a
                        confirmation email, or retry in a minute.
                    </p>
                )}
                {status === "error" && errorDetail && (
                    <p className="text-[#b3261e]">
                        {errorDetail} You can also email us at{" "}
                        <a href={`mailto:${SITE_CONFIG.email}`} className="underline">{SITE_CONFIG.email}</a>.
                    </p>
                )}
            </div>
        </form>
    );
}

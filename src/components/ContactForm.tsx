"use client";

import { useState } from "react";
import Button from "./ui/Button";
import { SITE_CONFIG } from "@/config";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
    /** Tailwind text colour for the status region; the modal sits on a light panel too. */
    idPrefix?: string;
}

/**
 * Google Apps Script's ContentService cannot be read cross-origin, so the request
 * goes out no-cors and success is assumed once the browser accepts it. Formspree
 * is read normally, so its validation errors are surfaced verbatim.
 */
const isGoogleAppsScript = SITE_CONFIG.formEndpoint.includes("script.google.com");

const statusStyles: Record<Exclude<Status, "idle" | "submitting">, string> = {
    success: "text-[#1a7f4b]",
    error: "text-[#b3261e]",
};

export default function ContactForm({ idPrefix = "" }: ContactFormProps) {
    const [status, setStatus] = useState<Status>("idle");
    const [errorDetail, setErrorDetail] = useState("");

    const fieldId = (name: string) => `${idPrefix}${name}`;
    const busy = status === "submitting";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        // Honeypot: real visitors never see or fill this. Silently accept so bots
        // get no signal that they were caught.
        if (data.get("company_website")) return;

        setStatus("submitting");
        setErrorDetail("");

        const payload = {
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
            message: String(data.get("message") ?? ""),
        };

        try {
            const response = await fetch(SITE_CONFIG.formEndpoint, {
                method: "POST",
                ...(isGoogleAppsScript
                    ? { mode: "no-cors" as const, body: new URLSearchParams(payload) }
                    : {
                          headers: { "Content-Type": "application/json", Accept: "application/json" },
                          body: JSON.stringify(payload),
                      }),
            });

            if (!isGoogleAppsScript && !response.ok) {
                const body = await response.json().catch(() => null);
                throw new Error(body?.errors?.[0]?.message ?? "Submission was rejected.");
            }

            form.reset();
            setStatus("success");
            trackEvent("form_submit", { form_location: idPrefix || "inline" });
        } catch (error) {
            setErrorDetail(error instanceof Error ? error.message : "Something went wrong. Please try again.");
            setStatus("error");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-md" noValidate={false}>
            <div className="flex flex-col gap-2">
                <label htmlFor={fieldId("name")} className="text-sm font-semibold">Name</label>
                <input
                    type="text"
                    id={fieldId("name")}
                    name="name"
                    required
                    placeholder="Jane Doe"
                    className="p-3 border border-border rounded-sm font-inherit text-base bg-bg text-foreground"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor={fieldId("email")} className="text-sm font-semibold">Email</label>
                <input
                    type="email"
                    id={fieldId("email")}
                    name="email"
                    required
                    placeholder="jane@company.com"
                    className="p-3 border border-border rounded-sm font-inherit text-base bg-bg text-foreground"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor={fieldId("message")} className="text-sm font-semibold">Project Details</label>
                <textarea
                    id={fieldId("message")}
                    name="message"
                    rows={5}
                    required
                    placeholder="I need help with..."
                    className="p-3 border border-border rounded-sm font-inherit text-base bg-bg text-foreground"
                />
            </div>

            {/* Honeypot — off-screen and hidden from assistive tech, never submitted by humans. */}
            <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0 pointer-events-none -left-[9999px]">
                <label htmlFor={fieldId("company_website")}>Company website</label>
                <input type="text" id={fieldId("company_website")} name="company_website" tabIndex={-1} autoComplete="off" />
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={busy}>
                {busy ? "Sending…" : "Send Message"}
            </Button>

            <div role="status" aria-live="polite" className="min-h-[1.25rem] text-sm text-center">
                {status === "success" && (
                    <p className={statusStyles.success}>
                        Thanks — your message is in. We reply within one business day.
                    </p>
                )}
                {status === "error" && (
                    <p className={statusStyles.error}>
                        {errorDetail} You can also email us directly at{" "}
                        <a href={`mailto:${SITE_CONFIG.email}`} className="underline">{SITE_CONFIG.email}</a>.
                    </p>
                )}
            </div>
        </form>
    );
}

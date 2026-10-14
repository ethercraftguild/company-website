/**
 * Pure payload construction for the Apps Script contact endpoint.
 * Kept free of React and config imports so it can be unit-tested in Node.
 */

/**
 * Optional fields the server forwards into the email. Unknown names are silently
 * dropped server-side (FORWARD_LABELS allowlist), so these strings must match
 * exactly. Omitted when blank so the email carries no empty lines.
 */
export const OPTIONAL_FIELDS = ["company", "phone", "service", "budget"] as const;

export type OptionalField = (typeof OPTIONAL_FIELDS)[number];

export interface ContactFormValues {
    name: string;
    email: string;
    message: string;
    /** Honeypot. A filled value is silently accepted by the server. */
    hp: string;
    /** Server-corrected epoch seconds - see ContactForm for skew handling. */
    ts: number;
    key: string;
    company?: string;
    phone?: string;
    service?: string;
    budget?: string;
}

export type ContactPayload = Record<string, string>;

/** Matches the server's own check: non-empty local part, an @, and a dot TLD. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function buildPayload(values: ContactFormValues): ContactPayload {
    const payload: ContactPayload = {
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        ts: String(values.ts),
        key: values.key,
        hp: values.hp,
    };

    for (const field of OPTIONAL_FIELDS) {
        const value = values[field]?.trim();
        if (value) payload[field] = value;
    }

    return payload;
}

export interface FieldErrors {
    name?: string;
    email?: string;
    message?: string;
}

/**
 * The server returns one generic failure for every rejection, so this is the
 * only place a visitor learns *which* field was wrong. Keep it: it is the
 * primary validation path, not a nicety.
 */
export function validate(values: {
    name: string;
    email: string;
    message: string;
}): FieldErrors {
    const errors: FieldErrors = {};

    if (!values.name.trim()) errors.name = "Enter your name.";
    if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter a valid email address.";
    if (!values.message.trim()) errors.message = "Tell us what you are building.";

    return errors;
}

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { buildPayload, validate, OPTIONAL_FIELDS, EMAIL_PATTERN } from "./contactPayload.ts";

describe("buildPayload", () => {
    const base = { name: "Ada", email: "ada@example.com", message: "Hello", hp: "", ts: 1700000000, key: "k" };

    test("always sends the five required fields with server-safe names", () => {
        const payload = buildPayload(base);
        assert.deepEqual(Object.keys(payload).sort(), ["email", "hp", "key", "message", "name", "ts"]);
        assert.equal(payload.ts, "1700000000", "ts must be a string for the GET query");
    });

    // The point of this test: the server drops unknown names silently, so a typo
    // in an optional field loses the data with no error anywhere.
    test("forwards every optional field when all are supplied", () => {
        const payload = buildPayload({
            ...base,
            company: "Halco Racing",
            phone: "+1 555 0100",
            service: "Security Audits",
            budget: "£5k-10k",
        });

        for (const field of OPTIONAL_FIELDS) {
            assert.ok(payload[field], `optional field "${field}" was dropped from the payload`);
        }
        assert.equal(payload.company, "Halco Racing");
        assert.equal(payload.budget, "£5k-10k");
    });

    test("omits blank optional fields so the email carries no empty lines", () => {
        const payload = buildPayload({ ...base, company: "   " });
        assert.equal("company" in payload, false);
    });

    test("trims whitespace on free text", () => {
        const payload = buildPayload({ ...base, name: "  Ada  ", message: "\n Hello \n" });
        assert.equal(payload.name, "Ada");
        assert.equal(payload.message, "Hello");
    });

    test("preserves the honeypot value so the server can fake-accept bots", () => {
        assert.equal(buildPayload({ ...base, hp: "x" }).hp, "x");
    });
});

describe("validate", () => {
    test("reports each empty required field individually", () => {
        const errors = validate({ name: "", email: "", message: "" });
        assert.deepEqual(Object.keys(errors).sort(), ["email", "message", "name"]);
    });

    test("rejects a malformed email before the server does", () => {
        assert.ok(validate({ name: "Ada", email: "ada@", message: "Hi" }).email);
        assert.equal(validate({ name: "Ada", email: "ada@example.com", message: "Hi" }).email, undefined);
    });

    test("treats whitespace-only input as empty", () => {
        assert.ok(validate({ name: "   ", email: "a@b.co", message: "\n" }).name);
    });

    test("accepts the addresses the server's own regex accepts", () => {
        for (const email of ["a@b.co", "first.last@sub.domain.org"]) {
            assert.ok(EMAIL_PATTERN.test(email), `${email} should be valid`);
        }
    });
});

import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

/**
 * Runs the real jsonp.ts against a minimal DOM shim. Installs globals BEFORE the
 * module is imported, because jsonp() reads window/document at call time.
 */
interface FakeScript {
    src: string;
    _src?: string;
    onload?: () => void;
    onerror?: () => void;
    remove: () => void;
    removed: boolean;
}

interface Harness {
    jsonp: typeof import("./jsonp.ts").jsonp;
    globals: Record<string, unknown>;
    injected: FakeScript[];
    fireServerResponse: (body: string) => void;
    fireLoad: () => void;
    fireError: () => void;
    serverEpoch: number;
}

let H: Harness;

async function install(): Promise<Harness> {
    const injected: Harness["injected"] = [];
    const serverEpoch = 1792000174;

    // In a browser `window` IS the global object, so a bare `ecg_x({...})` call in
    // an injected script resolves through globalThis. The shim must match that or
    // the eval below cannot find the callback.
    const globals = globalThis as unknown as Record<string, unknown>;
    (globalThis as Record<string, unknown>).window = globals;
    (globalThis as Record<string, unknown>).document = {
        createElement: (): FakeScript => {
            const el = { src: "", removed: false, remove: () => { el.removed = true; } } as FakeScript;
            Object.defineProperty(el, "src", {
                get: () => el._src ?? "",
                set: (v: string) => {
                    el._src = v;
                },
            });
            return el;
        },
        body: {
            appendChild: (el: FakeScript) => injected.push(el),
        },
    };

    const mod = await import("./jsonp.ts");

    const harness: Harness = {
        ...(mod as unknown as Harness),
        globals,
        injected,
        serverEpoch,
        fireServerResponse: (body: string) => eval(body),
        fireLoad: () => injected[injected.length - 1].onload?.(),
        fireError: () => injected[injected.length - 1].onerror?.(),
    };
    return harness;
}

beforeEach(async () => {
    clearCallbackGlobals();
    H = await install();
});

afterEach(() => {
    clearCallbackGlobals();
    delete (globalThis as Record<string, unknown>).window;
    delete (globalThis as Record<string, unknown>).document;
});

const clearCallbackGlobals = () => {
    for (const key of Object.keys(globalThis)) {
        if (key.startsWith("ecg_")) delete (globalThis as Record<string, unknown>)[key];
    }
};

const lastCallback = (h: Harness) => {
    const src = h.injected[h.injected.length - 1].src;
    return new URLSearchParams(src.split("?")[1]).get("callback")!;
};

describe("jsonp", () => {
    test("registers a callable global, not an object (the 2026-10-15 defect)", async () => {
        const pending = H.jsonp("https://x.test/exec", { a: "1" });
        const cb = lastCallback(H);
        assert.equal(typeof H.globals[cb], "function", "global must be a function or the server callback throws");
        H.fireServerResponse(`${cb}({"ok":true,"code":"accepted"})`);
        await pending;
    });

    test("resolves the payload from inside the callback, before onload", async () => {
        const pending = H.jsonp("https://x.test/exec", { name: "Ada" });
        const cb = lastCallback(H);
        H.fireServerResponse(`${cb}({"ok":true,"code":"accepted","time":42})`);
        // onload has NOT fired yet - the payload must already have resolved.
        assert.deepEqual(await pending, { ok: true, code: "accepted", time: 42 });
    });

    test("settles as failure on onload when no payload arrived (HTML error page)", async () => {
        const pending = H.jsonp("https://x.test/exec", {});
        H.fireLoad();
        await assert.rejects(pending, /no_payload/);
    });

    test("settles as failure on onerror", async () => {
        const pending = H.jsonp("https://x.test/exec", {});
        H.fireError();
        await assert.rejects(pending, /network_error/);
    });

    test("settles as failure on timeout without ever firing onload", async () => {
        const pending = H.jsonp("https://x.test/exec", {}, 10);
        await assert.rejects(pending, /timeout/);
    });

    test("is single-fire: a late callback after onload cannot overwrite", async () => {
        const pending = H.jsonp("https://x.test/exec", {});
        const cb = lastCallback(H);
        H.fireLoad();
        // Server answers anyway. Cleanup has already detached the global, so the
        // late call is inert and the original rejection must stand.
        assert.throws(() => H.fireServerResponse(`${cb}({"ok":true})`));
        await assert.rejects(pending, /no_payload/);
    });

    test("callback name satisfies the server sanitizer", async () => {
        const pending = H.jsonp("https://x.test/exec", {}, 10);
        const cb = lastCallback(H);
        assert.match(cb, /^[A-Za-z_$][A-Za-z0-9_$]{0,63}$/);
        await pending.catch(() => {});
    });

    test("cleans up the global and the script element", async () => {
        const pending = H.jsonp("https://x.test/exec", {});
        const cb = lastCallback(H);
        const el = H.injected[H.injected.length - 1];
        H.fireServerResponse(`${cb}({"ok":true})`);
        await pending;
        assert.equal(H.globals[cb], undefined, "global must not leak");
        assert.equal(el.removed, true, "script element must be removed");
    });

    test("forwards query params and appends the callback", async () => {
        const pending = H.jsonp("https://x.test/exec?a=b", { name: "Ada Lovelace" }, 10);
        const src = H.injected[0].src;
        assert.ok(src.startsWith("https://x.test/exec?a=b&"), src);
        assert.ok(src.includes("name=Ada+Lovelace"), src);
        await pending.catch(() => {});
    });

    test("exposes the v2 ping fields the caller needs for skew correction", async () => {
        const pending = H.jsonp("https://x.test/exec", { action: "ping" });
        const cb = lastCallback(H);
        H.fireServerResponse(
            `${cb}({"ok":true,"code":"ping","serverEpoch":${H.serverEpoch},"minAge":4,"maxAge":1800})`,
        );
        const res = await pending;
        assert.equal(res.ok, true);
        assert.equal(res.serverEpoch, H.serverEpoch);
        assert.equal(res.minAge, 4);
        assert.equal(res.maxAge, 1800);
    });
});

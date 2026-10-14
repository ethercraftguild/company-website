// Lets `node --test` load the app's TypeScript sources, which use the tsconfig
// `@/*` path alias and import JSON. Next/bundler resolves both at build time;
// bare Node needs this shim to do the same in tests.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SRC = path.join(process.cwd(), "src");
const ALIAS = "@/";

export function resolve(specifier, context, nextResolve) {
  if (!specifier.startsWith(ALIAS)) return nextResolve(specifier, context);

  const abs = path.join(SRC, specifier.slice(ALIAS.length));

  // JSON modules need an explicit type in Node ESM; wrap instead of changing src.
  if (abs.endsWith(".json")) {
    const json = fs.readFileSync(abs, "utf8");
    return {
      url: `data:text/javascript,${encodeURIComponent(`export default ${json}`)}`,
      shortCircuit: true,
      format: "module",
    };
  }

  return nextResolve(pathToFileURL(abs).href, context);
}

import { buildSchemaGraph, serializeGraph } from "@/lib/schema";

/**
 * Emits exactly one @graph per route: one ProfessionalService node plus one page
 * node whose @id is that route's canonical URL.
 *
 * Server Component on purpose. The route is passed in explicitly by each page
 * rather than read with usePathname(): if the JSON-LD only existed after JS ran,
 * it would be invisible to GPTBot, ClaudeBot and every other fetcher that cannot
 * execute JavaScript. `path` must match the `path` given to pageMetadata().
 */
export default function StructuredData({ path }: { path: string }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeGraph(buildSchemaGraph(path)) }}
        />
    );
}

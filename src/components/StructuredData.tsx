"use client";

import { usePathname } from "next/navigation";
import { buildSchemaGraph, serializeGraph } from "@/lib/schema";

/**
 * Emits exactly one @graph per route: one ProfessionalService node plus one page
 * node whose @id is that route's canonical URL. Identity facts come from
 * src/config.ts and src/data/clients.ts only.
 *
 * Client component purely to read the pathname: a root layout has no route
 * context, and each route's page node must differ.
 */
export default function StructuredData() {
    const pathname = usePathname() ?? "/";

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeGraph(buildSchemaGraph(pathname)) }}
        />
    );
}

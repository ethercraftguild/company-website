import rawProjects from "@/data/projects.json";

/**
 * A client-approved outcome callout. `value` + `label` render on the case study;
 * `source` is the approval trail ("client X approved via email on DATE") and must
 * never be rendered. Max 3 per project; empty array until MoJin approves numbers.
 */
export interface CaseMetric {
    label: string;
    value: string;
    source: string;
}

// Every entry carries `metrics: []` until MoJin approves numbers, so the raw
// JSON type would infer `never[]`. Widen it once, here, not at every call site.
export type Project = Omit<(typeof rawProjects)[number], "metrics"> & {
    metrics: CaseMetric[];
};

const projects = rawProjects as unknown as Project[];

/**
 * Single source of truth for the client logo bar and the "how we work with you"
 * panel, so the two can never drift apart.
 */
export const CLIENT_LOGOS = projects.map((project) => ({
    name: project.title,
    href: project.link,
    logo: `/clients/${project.logo}`,
}));

/**
 * Delivery cities with their country, single source for both CLIENT_CITIES and
 * schema.org areaServed. Toronto is owner-confirmed past-customer geography with
 * NO listed project — it may appear in areaServed, never on a case study.
 */
export const CLIENT_REGIONS = [
    { city: "Dhaka", country: "Bangladesh", listedProject: true },
    { city: "Zhengzhou", country: "China", listedProject: true },
    { city: "Toronto", country: "Canada", listedProject: false },
    { city: "Mississauga", country: "Canada", listedProject: true },
    { city: "Valencia", country: "Spain", listedProject: true },
    { city: "Hong Kong", country: "China", listedProject: true },
] as const;

export const CLIENT_CITIES = CLIENT_REGIONS.map((region) => region.city);

/** Distinct countries served, in first-seen order, for AdministrativeArea nodes. */
export const CLIENT_COUNTRIES = CLIENT_REGIONS.map((region) => region.country).filter(
    (country, index, all) => all.indexOf(country) === index,
);

/**
 * knowsAbout terms derived from the stacks actually recorded in projects.json,
 * version-stripped and de-duplicated. Deliberately not hand-written: a term that
 * is not in the portfolio data does not ship. Note this yields WordPress/WooCommerce
 * and NOT Flutter/Node.js, because that is what the portfolio records — see the
 * positioning gap flagged in the T6 report.
 */
export function deriveKnowsAboutTerms(): string[] {
    const terms = new Set<string>();
    for (const project of projects) {
        for (const tool of project.stack) {
            terms.add(tool.replace(/\s\d+(\.\d+)*$/, "").trim());
        }
    }
    return [...terms];
}

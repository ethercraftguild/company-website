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
 * Client cities we can evidence from the portfolio. Toronto is included because
 * past engagements have been delivered there, but it is not a listed project.
 */
export const CLIENT_CITIES = [
    "Dhaka",
    "Zhengzhou",
    "Toronto",
    "Mississauga",
    "Valencia",
    "Hong Kong",
];

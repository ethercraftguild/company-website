import projects from "@/data/projects.json";

export type Project = (typeof projects)[number];

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

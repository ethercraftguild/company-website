import Section from "./ui/Section";
import Button from "./ui/Button";
import { SITE_CONFIG } from "@/config";

const SCOPE = [
    "Codebase read-through: architecture, tests, dependencies, and the parts nobody touches",
    "Deployment path review: who can ship, what happens on failure, how long recovery takes",
    "Dependency and secret surface: third-party services, access scopes, data flows",
    "Backlog vs system reality: what the roadmap demands against what the system supports",
];

const DELIVERABLES = [
    "Written findings document, ranked by risk and effort — yours unconditionally",
    "Scoped proposal for the work itself, priced against the findings",
    "45-minute walkthrough call on the report",
];

/**
 * Fixed-fee entry offer (task item 7). The price renders only when
 * SITE_CONFIG.auditPrice holds MoJin-confirmed text. Until then the section
 * shows scope + deliverables with a Calendly CTA and NO price — never a
 * placeholder figure, never a strikethrough anchor.
 */
export default function AuditOffer() {
    const price = SITE_CONFIG.auditPrice.trim();

    return (
        <Section className="bg-bg-alt" aria-label="Week-1 product audit offer">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-xl items-start max-w-[1000px] mx-auto">
                <div>
                    <p className="font-mono text-sm uppercase tracking-widest opacity-60 mb-sm">
                        Fixed-fee entry offer
                    </p>
                    <h2 className="mb-sm">Week-1 Product Audit</h2>
                    {price ? (
                        <p className="font-mono text-xl mb-md" data-audit-price>
                            {price}
                        </p>
                    ) : (
                        <p className="opacity-70 mb-md">
                            One week, fixed scope, written findings. Pricing on request until our
                            current rate card is published.
                        </p>
                    )}
                    <p className="opacity-80 leading-relaxed font-light">
                        Before writing a line of code, we spend a week reading yours. You get
                        specifics — named files, named risks, named costs — that any competent
                        team can verify independently.
                    </p>
                    <div className="mt-lg flex flex-col sm:flex-row gap-md">
                        {/* Plain anchor, not Button: external URL needs a new tab,
                            and data-calendly-link feeds the GA4 click event. */}
                        <a
                            href={SITE_CONFIG.calendly}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-calendly-link
                            className="inline-flex items-center justify-center py-3 px-8 font-medium text-center no-underline rounded-pill bg-accent text-bg border-accent hover:bg-accent-hover hover:text-white transition-all duration-200"
                        >
                            Book the Audit Call
                        </a>
                        <Button href="/contact" variant="secondary">
                            Ask About the Audit
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-lg">
                    <div className="p-lg bg-card border border-card-border rounded-sm">
                        <h3 className="text-lg mb-md">What we examine</h3>
                        <ul className="list-none p-0 flex flex-col gap-sm mb-0">
                            {SCOPE.map((item) => (
                                <li key={item} className="text-sm opacity-80 leading-relaxed flex items-start gap-xs">
                                    <span aria-hidden="true">—</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-lg bg-card border border-card-border rounded-sm">
                        <h3 className="text-lg mb-md">What you get</h3>
                        <ul className="list-none p-0 flex flex-col gap-sm mb-0">
                            {DELIVERABLES.map((item) => (
                                <li key={item} className="text-sm opacity-80 leading-relaxed flex items-start gap-xs">
                                    <span aria-hidden="true">—</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Section>
    );
}

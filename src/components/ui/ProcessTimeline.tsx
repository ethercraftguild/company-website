import Section from "./Section";

export interface ProcessStage {
    title: string;
    duration: string;
    description: string;
    /** Deliberately generic — replace with client-specific artefacts when approved. */
    artefacts: string[];
}

export const DEFAULT_PROCESS: ProcessStage[] = [
    {
        title: "Discovery",
        duration: "Week 1",
        description:
            "A scoped audit of what you run today: the codebase, the deployment path, the dependency surface and the things nobody has touched in two years. You get a written findings document whether or not you continue with us.",
        artefacts: ["Written findings document", "Risk and effort ranking", "Scoped proposal"],
    },
    {
        title: "Architecture",
        duration: "Weeks 2–3",
        description:
            "Target architecture, data model and interface contracts agreed before implementation starts. Decisions get recorded with the reasoning attached, so the next engineer inherits context rather than guesses.",
        artefacts: ["Architecture decision records", "Data model", "Interface contracts"],
    },
    {
        title: "Sprints",
        duration: "Ongoing",
        description:
            "Fixed-length sprints against a written scope, with a demo at the end of each one. You see working software on a predictable cadence rather than a status report describing work in progress.",
        artefacts: ["Fortnightly sprint demos", "Written weekly report", "Tracked backlog"],
    },
    {
        title: "Handover",
        duration: "End of engagement",
        description:
            "Documentation, runbooks and a working knowledge transfer with your team. No lock-in and no dependency on us to operate what we built.",
        artefacts: ["Runbooks", "Repository handover", "Team walkthrough"],
    },
    {
        title: "Support",
        duration: "Post-launch",
        description:
            "A defined support window after handover for defects and questions. Beyond that, a retainer is available if you want continued coverage, and equally optional if you do not.",
        artefacts: ["Defined support window", "Optional retainer", "Escalation path"],
    },
];

interface ProcessTimelineProps {
    stages?: ProcessStage[];
    eyebrow?: string;
    title?: string;
    intro?: string;
}

export default function ProcessTimeline({
    stages = DEFAULT_PROCESS,
    eyebrow = "How we work",
    title = "From first call to handover, without surprises",
    intro = "The same five stages on every engagement, whether it is a single audit or a multi-quarter build.",
}: ProcessTimelineProps) {
    return (
        <Section className="bg-bg-alt" aria-label="Delivery process">
            <div className="mb-lg text-center">
                <p className="font-mono text-sm uppercase tracking-widest opacity-60 mb-sm">{eyebrow}</p>
                <h2 className="mb-sm">{title}</h2>
                <p className="opacity-70 max-w-[640px] mx-auto">{intro}</p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-5 gap-md list-none p-0">
                {stages.map((stage, index) => (
                    <li
                        key={stage.title}
                        className="flex flex-col p-lg bg-card border border-card-border rounded-sm h-full"
                    >
                        <div className="flex items-center gap-sm mb-sm">
                            <span
                                className="font-mono text-xs font-bold w-7 h-7 rounded-full bg-foreground text-bg flex items-center justify-center shrink-0"
                                aria-hidden="true"
                            >
                                {index + 1}
                            </span>
                            <span className="font-mono text-xs uppercase tracking-wide opacity-60">
                                {stage.duration}
                            </span>
                        </div>

                        <h3 className="text-lg mb-sm">{stage.title}</h3>
                        <p className="text-sm opacity-80 leading-relaxed font-light mb-md">{stage.description}</p>

                        <ul className="list-none p-0 mt-auto flex flex-col gap-xs">
                            {stage.artefacts.map((artefact) => (
                                <li key={artefact} className="text-xs opacity-70 flex items-start gap-xs">
                                    <span aria-hidden="true">—</span>
                                    <span>{artefact}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </Section>
    );
}

import Section from "./ui/Section";
import { CLIENT_CITIES } from "@/data/clients";

/**
 * Time zones are approximations for the cities we have delivered in, not a claim
 * about individual engineer locations. Adjust UTC offsets if the roster changes.
 */
const TIMEZONES = [
    { city: "Dhaka", utc: "UTC+6", overlap: "09:00–18:00 your time" },
    { city: "Zhengzhou", utc: "UTC+8", overlap: "11:00–20:00 your time" },
    { city: "Mississauga / Toronto", utc: "UTC−4", overlap: "20:00–05:00 your time" },
    { city: "Valencia", utc: "UTC+2", overlap: "05:00–14:00 your time" },
    { city: "Hong Kong", utc: "UTC+8", overlap: "11:00–20:00 your time" },
];

const PRACTICES = [
    {
        title: "Written weekly report",
        body: "Every Friday, in writing: what shipped, what slipped and why, what is next week, and anything needing your decision. No status meetings to attend.",
    },
    {
        title: "Async by default",
        body: "Decisions live in written architecture records and the tracker, not in call recordings. Someone joining six weeks late can still reconstruct why a choice was made.",
    },
    {
        title: "Fortnightly sprint demo",
        body: "A live walkthrough of working software at the end of each sprint, recorded so it stays available to anyone who was not on the call.",
    },
    {
        title: "NDA before kickoff",
        body: "Signed before any access is granted. Access to your repositories, cloud accounts and data is scoped to the engagement and revoked at handover.",
    },
    {
        title: "Your tools, your accounts",
        body: "Work happens in your repositories and your cloud accounts, owned by you throughout. We do not hold keys or take custody of infrastructure.",
    },
    {
        title: "No meeting time zone tax",
        body: "Live calls are scheduled inside your working hours and kept short. Everything that does not need to be synchronous is written instead.",
    },
];

export default function RemoteClientGuide() {
    return (
        <Section className="bg-bg" aria-label="Working with remote clients">
            <div className="mb-lg text-center">
                <p className="font-mono text-sm uppercase tracking-widest opacity-60 mb-sm">Working with us remotely</p>
                <h2 className="mb-sm">Senior-only squads, no time zone tax</h2>
                <p className="opacity-70 max-w-[640px] mx-auto">
                    Engineers across {CLIENT_CITIES.slice(0, 5).join(", ")} — and at least one of them is inside your
                    working day when you need an answer.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-xl">
                <div className="p-lg bg-card border border-card-border rounded-sm h-fit">
                    <h3 className="text-lg mb-md">Where we sit</h3>
                    <table className="w-full text-sm border-collapse">
                        <caption className="sr-only">Delivery cities and their working-hour overlap</caption>
                        <thead>
                            <tr className="text-left">
                                <th scope="col" className="py-xs font-mono text-xs uppercase opacity-60">City</th>
                                <th scope="col" className="py-xs font-mono text-xs uppercase opacity-60">UTC</th>
                                <th scope="col" className="py-xs font-mono text-xs uppercase opacity-60">Overlap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TIMEZONES.map((zone) => (
                                <tr key={zone.city} className="border-t border-border">
                                    <th scope="row" className="py-sm text-left font-semibold font-normal">{zone.city}</th>
                                    <td className="py-sm font-mono opacity-70">{zone.utc}</td>
                                    <td className="py-sm opacity-70">{zone.overlap}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs opacity-60 mt-md mb-0">
                        Offsets shift with daylight saving in Europe and North America.
                    </p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-md list-none p-0">
                    {PRACTICES.map((practice) => (
                        <li key={practice.title} className="p-lg border border-border rounded-sm bg-card">
                            <h3 className="text-lg mb-sm">{practice.title}</h3>
                            <p className="text-sm opacity-80 leading-relaxed font-light mb-0">{practice.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}

import Link from "next/link";

export default function ServiceSummaryCard({
  serviceCategory,
  linkedServices,
}: {
  serviceCategory: string;
  linkedServices: string[];
}) {
  const primaryServiceHref = linkedServices?.[0] ?? "/services";

  return (
    <section
      aria-label="Service summary"
      className="mt-3xl p-xl border border-border rounded-sm bg-card"
    >
      <p className="text-lg opacity-90 leading-relaxed font-light">
        Need to scale your team without the legal overhead? See how our{" "}
        <Link href={primaryServiceHref} className="underline underline-offset-4">
          {serviceCategory}
        </Link>{" "}
        solves this.
      </p>
    </section>
  );
}


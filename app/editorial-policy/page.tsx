export const metadata = {
  title: "Editorial Policy",
  description:
    "NewsSphere editorial policy covering accuracy, sourcing, corrections, AI-assisted journalism, and editorial independence.",
};

export default function EditorialPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-foreground">
        Editorial Policy
      </h1>

      <div className="mt-8 space-y-6 text-muted leading-8">
        <p>
          NewsSphere aims to provide accurate, useful, timely, and
          responsibly produced news and information. This policy describes
          the principles that guide our editorial workflow.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Accuracy
        </h2>

        <p>
          We make reasonable efforts to verify significant information before
          publication. Claims may be checked against reliable sources,
          available records, official statements, and other relevant
          information.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Sources
        </h2>

        <p>
          NewsSphere may use information from established news organisations,
          official sources, public records, press releases, experts,
          institutions, and other relevant sources.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Corrections
        </h2>

        <p>
          If we identify a material factual error, we may correct or update
          the affected article. Readers may report potential errors through
          our contact page or email.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          AI-Assisted Production
        </h2>

        <p>
          NewsSphere may use artificial intelligence for research assistance,
          summarization, drafting, categorization, SEO, content analysis, and
          other workflow tasks.
        </p>

        <p>
          AI-generated or AI-assisted material is not automatically considered
          accurate. Editorial review and appropriate verification remain
          necessary before publication.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Editorial Independence
        </h2>

        <p>
          Advertising, sponsorship, partnerships, and commercial relationships
          should not determine the factual conclusions or editorial treatment
          of news coverage.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Sponsored Content
        </h2>

        <p>
          Where applicable, sponsored or commercial material should be
          appropriately distinguished from independent editorial content.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Updates
        </h2>

        <p>
          News articles may be updated when new information becomes available,
          circumstances change, or corrections are required.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Contact the Editorial Team
        </h2>

        <p>
          Corrections, story tips, and editorial enquiries can be sent to:
        </p>

        <p className="font-medium text-foreground">
          arazzaque446@gmail.com
        </p>
      </div>
    </main>
  );
}
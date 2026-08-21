export const metadata = {
  title: "AI Disclosure",
  description:
    "NewsSphere disclosure describing the use of artificial intelligence in research, editorial, SEO, and content workflows.",
};

export default function AIDisclosurePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-foreground">
        AI Disclosure
      </h1>

      <div className="mt-8 space-y-6 text-muted leading-8">
        <p>
          NewsSphere uses artificial intelligence as a tool within parts of
          its editorial and publishing workflow. AI is used to assist human
          editorial processes rather than replace editorial responsibility.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          How AI May Be Used
        </h2>

        <p>
          Depending on the workflow, artificial intelligence may assist with
          research, article drafting, summarization, classification,
          headline generation, SEO optimisation, content analysis, and other
          production tasks.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Human Editorial Review
        </h2>

        <p>
          AI-generated or AI-assisted material may contain errors,
          inaccuracies, omissions, or misleading information. For this
          reason, content intended for publication is subject to editorial
          review and appropriate verification.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Fact Checking
        </h2>

        <p>
          Where appropriate, factual claims are reviewed using available
          sources and verification processes before publication.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Editorial Responsibility
        </h2>

        <p>
          NewsSphere remains responsible for the editorial decisions made
          regarding content published on the platform. Artificial
          intelligence does not independently determine the final editorial
          status of an article.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Transparency
        </h2>

        <p>
          We believe readers should understand when technology plays a
          meaningful role in the production of news and information. Our use
          of AI may evolve as our editorial systems and technology develop.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Corrections
        </h2>

        <p>
          If you identify a factual error in AI-assisted or other NewsSphere
          content, please contact our editorial team with the article title
          or URL and details of the issue.
        </p>

        <p className="font-medium text-foreground">
          arazzaque446@gmail.com
        </p>
      </div>
    </main>
  );
}
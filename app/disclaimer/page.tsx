export const metadata = {
  title: "Disclaimer",
  description:
    "NewsSphere disclaimer covering news accuracy, external sources, AI-assisted content, and informational use.",
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-foreground">
        Disclaimer
      </h1>

      <div className="mt-8 space-y-6 text-muted leading-8">
        <p>
          NewsSphere is an independent digital news and information platform.
          The information published on this website is provided primarily for
          general informational purposes.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Accuracy and Corrections
        </h2>

        <p>
          We make reasonable efforts to verify information before publication.
          However, news and information can change rapidly. Errors,
          omissions, or outdated information may occasionally occur.
        </p>

        <p>
          When a significant error is identified, NewsSphere may correct,
          update, clarify, or remove the relevant material.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Editorial Responsibility
        </h2>

        <p>
          Published material is subject to editorial processes. Publication
          does not mean that every statement represents the personal views of
          NewsSphere staff or contributors.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          External Sources
        </h2>

        <p>
          NewsSphere may reference information from external publications,
          organisations, agencies, public records, and other sources. Links
          and references to third-party websites do not constitute endorsement
          of those websites or their content.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          AI-Assisted Content
        </h2>

        <p>
          Some NewsSphere content may be assisted by artificial intelligence.
          AI systems may be used for research, drafting, summarization,
          classification, SEO, or other editorial tasks. AI-assisted material
          remains subject to editorial review and verification.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          No Professional Advice
        </h2>

        <p>
          Information published on NewsSphere should not automatically be
          treated as professional legal, medical, financial, investment, or
          other specialised advice. Readers should consult qualified
          professionals when appropriate.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Contact
        </h2>

        <p>
          If you believe an article contains inaccurate information, please
          contact us with the article title or URL and details of the issue.
        </p>

        <p className="font-medium text-foreground">
          arazzaque446@gmail.com
        </p>
      </div>
    </main>
  );
}
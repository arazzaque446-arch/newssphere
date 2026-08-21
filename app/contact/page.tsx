export const metadata = {
  title: "Contact Us",
  description:
    "Contact NewsSphere for corrections, feedback, editorial enquiries, advertising, partnerships, and general enquiries.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-foreground">
        Contact NewsSphere
      </h1>

      <div className="mt-8 space-y-6 text-muted leading-8">
        <p>
          We welcome feedback, corrections, story tips, press enquiries,
          partnership proposals, and other messages from our readers.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          General Enquiries
        </h2>

        <p>
          For general questions, feedback, or information about NewsSphere,
          please contact us by email.
        </p>

        <p className="font-medium text-foreground">
          arazzaque446@gmail.com
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Corrections and Factual Errors
        </h2>

        <p>
          If you believe an article contains inaccurate, incomplete, or
          outdated information, please provide the article title or URL and
          explain the issue clearly. Our editorial team will review the
          submission and make corrections where appropriate.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Advertising and Partnerships
        </h2>

        <p>
          For advertising, sponsorship, commercial partnerships, or other
          business enquiries, please contact us with details of your proposal.
        </p>

        <p className="font-medium text-foreground">
          arazzaque446@gmail.com
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Editorial Enquiries
        </h2>

        <p>
          News tips, press enquiries, interview requests, and editorial
          matters may also be submitted through the email address above.
        </p>

        <h2 className="text-2xl font-bold text-foreground">Our Location</h2>

        <p>
          NewsSphere
          <br />
          Guwahati, Assam
          <br />
          India
        </p>
      </div>
    </main>
  );
}
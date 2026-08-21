export const metadata = {
  title: "About Us",
  description:
    "Learn about NewsSphere, our mission, editorial standards, and commitment to responsible journalism.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-foreground">
        About NewsSphere
      </h1>

      <div className="mt-8 space-y-6 text-muted leading-8">
        <p>
          NewsSphere is an independent digital news and information platform
          focused on delivering timely, informative, and accessible coverage
          from North East India, India, and around the world.
        </p>

        <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>

        <p>
          Our mission is to make important developments easier to understand
          while maintaining a strong commitment to accuracy, transparency,
          responsible journalism, and editorial accountability.
        </p>

        <h2 className="text-2xl font-bold text-foreground">What We Cover</h2>

        <p>
          NewsSphere covers politics, government, business, technology,
          sports, health, entertainment, jobs, education, and major
          developments from India and around the world.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Editorial Standards
        </h2>

        <p>
          We aim to verify information before publication and distinguish
          factual reporting from analysis, commentary, and opinion. When
          material errors are identified, we seek to correct or update the
          affected content.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          AI-Assisted Journalism
        </h2>

        <p>
          NewsSphere may use artificial intelligence in research, drafting,
          summarization, search, SEO, and other editorial workflows. AI
          assistance does not replace editorial responsibility. Content
          intended for publication is subject to editorial review and
          verification.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Editorial Responsibility
        </h2>

        <p>
          NewsSphere maintains human editorial oversight of published
          material. Our editorial team may revise, update, correct, reject,
          or remove content when necessary.
        </p>

        <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>

        <p>
          For corrections, feedback, story tips, advertising enquiries, or
          other matters, please contact:
        </p>

        <p className="font-medium text-foreground">
          arazzaque446@gmail.com
        </p>
      </div>
    </main>
  );
}
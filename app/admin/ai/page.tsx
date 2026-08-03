import AIWriter from "@/components/ai/AIWriter";

export default function AIPage() {
  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="mb-2 text-4xl font-bold">
        AI News Writer
      </h1>

      <p className="mb-8 text-slate-500">
        Generate professional NewsSphere articles using AI.
      </p>

      <AIWriter />

    </div>
  );
}
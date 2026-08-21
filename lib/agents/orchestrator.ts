import { runRSSScout } from "@/lib/agents/rssScout";
import { runResearchAgent } from "@/lib/agents/research";
import { runFactCheckAgent } from "@/lib/agents/factCheck";
import { runSEOAgent } from "@/lib/agents/seo";
import { runEditorAgent } from "@/lib/agents/editor";
import { runPublisher } from "@/lib/agents/publisher";

export interface PipelineResult {
  success: boolean;
  startedAt: string;
  finishedAt: string;
  stages: {
    rssScout: unknown;
    research: unknown;
    factCheck: unknown;
    seo: unknown;
    editor: unknown;
    publisher: unknown;
  };
  error?: string;
}

export async function runAgentPipeline(): Promise<PipelineResult> {
  const startedAt = new Date().toISOString();

  console.log("");
  console.log("==========================================");
  console.log("        NEWSSPHERE AI PIPELINE");
  console.log("==========================================");
  console.log("Pipeline started:", startedAt);
  console.log("");

  const stages: PipelineResult["stages"] = {
    rssScout: null,
    research: null,
    factCheck: null,
    seo: null,
    editor: null,
    publisher: null,
  };

  try {
    /*
     * STAGE 1
     * RSS SCOUT
     *
     * Finds/imports candidate news stories.
     */

    console.log("------------------------------------------");
    console.log("STAGE 1: RSS SCOUT");
    console.log("------------------------------------------");

    stages.rssScout = await runRSSScout();

    console.log("RSS Scout result:", stages.rssScout);

    /*
     * STAGE 2
     * RESEARCH
     *
     * Rewrites/enriches pending candidates.
     */

    console.log("------------------------------------------");
    console.log("STAGE 2: RESEARCH");
    console.log("------------------------------------------");

    stages.research = await runResearchAgent();

    console.log("Research result:", stages.research);

    /*
     * STAGE 3
     * FACT CHECK
     *
     * Checks researched candidates.
     */

    console.log("------------------------------------------");
    console.log("STAGE 3: FACT CHECK");
    console.log("------------------------------------------");

    stages.factCheck = await runFactCheckAgent();

    console.log("Fact Check result:", stages.factCheck);

    /*
     * STAGE 4
     * SEO
     *
     * Generates SEO metadata.
     */

    console.log("------------------------------------------");
    console.log("STAGE 4: SEO");
    console.log("------------------------------------------");

    stages.seo = await runSEOAgent();

    console.log("SEO result:", stages.seo);

    /*
     * STAGE 5
     * EDITOR
     *
     * Scores and prepares candidates for review.
     */

    console.log("------------------------------------------");
    console.log("STAGE 5: EDITOR");
    console.log("------------------------------------------");

    stages.editor = await runEditorAgent();

    console.log("Editor result:", stages.editor);

    /*
     * STAGE 6
     * PUBLISHER
     *
     * Final automated validation.
     *
     * IMPORTANT:
     * Publisher must NEVER publish directly.
     * Human approval remains the final gate.
     */

    console.log("------------------------------------------");
    console.log("STAGE 6: PUBLISHER");
    console.log("------------------------------------------");

    stages.publisher = await runPublisher();

    console.log("Publisher result:", stages.publisher);

    const finishedAt = new Date().toISOString();

    console.log("");
    console.log("==========================================");
    console.log("        AI PIPELINE FINISHED");
    console.log("==========================================");
    console.log("Started:", startedAt);
    console.log("Finished:", finishedAt);
    console.log("==========================================");
    console.log("");

    return {
      success: true,
      startedAt,
      finishedAt,
      stages,
    };
  } catch (error) {
    const finishedAt = new Date().toISOString();

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    console.error("");
    console.error("==========================================");
    console.error("        AI PIPELINE FAILED");
    console.error("==========================================");
    console.error(message);
    console.error("==========================================");
    console.error("");

    return {
      success: false,
      startedAt,
      finishedAt,
      stages,
      error: message,
    };
  }
}
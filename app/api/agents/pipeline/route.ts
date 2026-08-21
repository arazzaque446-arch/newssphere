import { NextResponse } from "next/server";

import { runAgentPipeline } from "@/lib/agents/orchestrator";

export async function GET() {
  try {
    const result = await runAgentPipeline();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Pipeline API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "AI pipeline failed",
      },
      {
        status: 500,
      }
    );
  }
}
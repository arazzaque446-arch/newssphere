import { NextResponse } from "next/server";
import { runResearchAgent } from "@/lib/agents/research";

export async function GET() {
  try {
    const result = await runResearchAgent();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Research Agent failed",
      },
      { status: 500 }
    );
  }
}
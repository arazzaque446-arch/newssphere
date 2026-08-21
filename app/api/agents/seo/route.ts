import { NextResponse } from "next/server";
import { runSEOAgent } from "@/lib/agents/seo";

export async function GET() {
  try {
    const result = await runSEOAgent();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "SEO Agent failed",
      },
      {
        status: 500,
      }
    );
  }
}
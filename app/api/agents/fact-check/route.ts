import { NextResponse } from "next/server";
import { runFactCheckAgent } from "@/lib/agents/factCheck";

export async function GET() {
  try {
    const result = await runFactCheckAgent();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Fact Check failed",
      },
      { status: 500 }
    );
  }
}
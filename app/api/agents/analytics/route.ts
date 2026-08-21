import { NextResponse } from "next/server";
import { analyticsAgent } from "@/lib/agents/analytics";

export async function GET() {
  try {
    const result = await analyticsAgent();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Analytics Agent failed",
      },
      {
        status: 500,
      }
    );
  }
}
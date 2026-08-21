import { NextResponse } from "next/server";
import { runRSSScout } from "@/lib/agents/rssScout";

export async function GET() {
  try {
    const result = await runRSSScout();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "RSS Scout failed",
      },
      {
        status: 500,
      }
    );
  }
}
import { NextResponse } from "next/server";
import { runEditorAgent } from "@/lib/agents/editor";

export async function GET() {
  try {
    const result = await runEditorAgent();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Editor Agent failed",
      },
      { status: 500 }
    );
  }
}
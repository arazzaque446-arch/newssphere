import { NextRequest, NextResponse } from "next/server";
import { generateNews } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || topic.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Topic is required.",
        },
        { status: 400 }
      );
    }

    const raw = await generateNews(topic);

    console.log("========== RAW AI ==========");
    console.log(raw);
    console.log("============================");

    let cleaned = raw.trim();

    // Remove markdown code fences if present
    cleaned = cleaned
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Extract only the JSON object
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON object found in AI response.");
    }

    cleaned = cleaned.substring(firstBrace, lastBrace + 1);

    console.log("========== CLEANED JSON ==========");
    console.log(cleaned);
    console.log("==================================");

    const article = JSON.parse(cleaned);

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error: any) {
    console.error("AI Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "AI generation failed.",
      },
      {
        status: 500,
      }
    );
  }
}
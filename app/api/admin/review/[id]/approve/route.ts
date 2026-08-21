import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { savePublished } from "@/lib/agents/publisher/savePublished";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid candidate ID.",
        },
        { status: 400 }
      );
    }

    const {
      data: candidate,
      error,
    } = await supabaseAdmin
      .from("news_candidates")
      .select("*")
      .eq("id", id)
      .eq("status", "ready_for_review")
      .eq("rejected", false)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    if (!candidate) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Article is not available for approval.",
        },
        { status: 404 }
      );
    }

    /*
     * FINAL HUMAN APPROVAL
     */

    const published = await savePublished(candidate);

    if (!published) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to publish article.",
        },
        { status: 500 }
      );
    }

    const {
      error: updateError,
    } = await supabaseAdmin
      .from("news_candidates")
      .update({
        approved: true,
        rejected: false,
        reviewed_at: new Date().toISOString(),
        status: "published",
      })
      .eq("id", id)
      .eq("status", "ready_for_review");

    if (updateError) {
      return NextResponse.json(
        {
          success: false,
          error: updateError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      published: true,
      id,
    });
  } catch (error) {
    console.error(
      "Approval error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Approval failed.",
      },
      { status: 500 }
    );
  }
}
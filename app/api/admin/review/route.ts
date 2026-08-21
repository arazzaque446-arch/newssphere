import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { savePublished } from "@/lib/agents/publisher/savePublished";

export async function POST(request: Request) {
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

    const body = await request.json();

    const id = body?.id;
    const action = body?.action;

    if (typeof id !== "string" || !id) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid candidate ID",
        },
        { status: 400 }
      );
    }

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid review action",
        },
        { status: 400 }
      );
    }

    const {
      data: candidate,
      error: candidateError,
    } = await supabaseAdmin
      .from("news_candidates")
      .select("*")
      .eq("id", id)
      .eq("status", "ready_for_review")
      .eq("rejected", false)
      .maybeSingle();

    if (candidateError) {
      console.error(
        "Review candidate lookup error:",
        candidateError
      );

      return NextResponse.json(
        {
          success: false,
          error: candidateError.message,
        },
        { status: 500 }
      );
    }

    if (!candidate) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Candidate not found or is no longer available for review.",
        },
        { status: 404 }
      );
    }

    /*
     * REJECT
     */

    if (action === "reject") {
      const { error } = await supabaseAdmin
        .from("news_candidates")
        .update({
          rejected: true,
          approved: false,
          status: "rejected",
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("status", "ready_for_review");

      if (error) {
        throw new Error(error.message);
      }

      return NextResponse.json({
        success: true,
        action: "rejected",
        id,
      });
    }

    /*
     * APPROVE
     *
     * This is an explicit human action.
     * Publication occurs ONLY after this request.
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

    const { error: updateError } = await supabaseAdmin
      .from("news_candidates")
      .update({
        approved: true,
        rejected: false,
        status: "published",
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", "ready_for_review");

    if (updateError) {
      console.error(
        "Candidate status update failed:",
        updateError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Article was published but candidate status update failed.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      action: "published",
      published: true,
      id,
    });
  } catch (error) {
    console.error("Review API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Review action failed.",
      },
      { status: 500 }
    );
  }
}
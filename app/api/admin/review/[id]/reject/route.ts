import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

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
      error: candidateError,
    } = await supabaseAdmin
      .from("news_candidates")
      .select("id,status,rejected")
      .eq("id", id)
      .eq("status", "ready_for_review")
      .eq("rejected", false)
      .maybeSingle();

    if (candidateError) {
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
            "Article is not available for rejection.",
        },
        { status: 404 }
      );
    }

    const {
      error: updateError,
    } = await supabaseAdmin
      .from("news_candidates")
      .update({
        rejected: true,
        approved: false,
        status: "rejected",
        reviewed_at: new Date().toISOString(),
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
      rejected: true,
      id,
    });
  } catch (error) {
    console.error(
      "Rejection error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Rejection failed.",
      },
      { status: 500 }
    );
  }
}
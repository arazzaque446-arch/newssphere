import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const company = String(body.company ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const advertisingType = String(
      body.advertisingType ?? ""
    ).trim();
    const campaignDescription = String(
      body.campaignDescription ?? ""
    ).trim();
    const startDate = String(body.startDate ?? "").trim();
    const endDate = String(body.endDate ?? "").trim();
    const budget = String(body.budget ?? "").trim();

    if (!name || !email || !advertisingType) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Name, email and advertising type are required.",
        },
        { status: 400 }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    const { data, error } =
      await supabaseAdmin
        .from("advertising_inquiries")
        .insert({
          name,
          company: company || null,
          email,
          phone: phone || null,
          advertising_type: advertisingType,
          campaign_description:
            campaignDescription || null,
          start_date: startDate || null,
          end_date: endDate || null,
          budget: budget || null,
          status: "new",
        })
        .select()
        .single();

    if (error) {
      console.error(
        "Advertising inquiry error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to submit advertising enquiry.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      inquiry: data,
      message:
        "Thank you. Your advertising enquiry has been received.",
    });
  } catch (error) {
    console.error(
      "Advertising API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to process advertising enquiry.",
      },
      { status: 500 }
    );
  }
}
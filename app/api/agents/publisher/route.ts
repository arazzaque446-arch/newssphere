import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    enabled: false,
    mode: "manual-publishing",
    message:
      "Automatic publishing is disabled. Articles must be reviewed and published manually from NewsSphere Admin.",
  });
}

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      enabled: false,
      mode: "manual-publishing",
      error:
        "Automatic publishing is disabled. Use the NewsSphere Admin publishing workflow.",
    },
    { status: 403 }
  );
}
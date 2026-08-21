import { NextResponse } from "next/server";

export async function GET() {
  const adsEnabled =
    process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  /*
   * Do not publish advertising network
   * authorization records while ads are disabled.
   *
   * When NewsSphere receives its actual
   * advertising publisher details, they
   * can be added here.
   */

  if (!adsEnabled) {
    return new NextResponse(
      "# NewsSphere advertising is currently disabled\n",
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  }

  const adsTxt = `
# NewsSphere
# Advertising authorization records will be added
# after the advertising provider is activated.
`.trim();

  return new NextResponse(`${adsTxt}\n`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
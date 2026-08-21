import { NextResponse } from "next/server";

export async function GET() {
  const adsEnabled =
    process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  /*
   * Do not publish advertising network
   * authorization records while ads are disabled.
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

  // Official Google AdSense verification record
  const adsTxt = `
google.com, pub-1341900232780067, DIRECT, f08c47fec0942fa0
`.trim();

  return new NextResponse(`${adsTxt}\n`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
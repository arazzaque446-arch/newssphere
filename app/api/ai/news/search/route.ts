import { NextRequest, NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("q") || "Assam";

    const rssUrl =
      "https://news.google.com/rss/search?q=" +
      encodeURIComponent(search);

    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent": "NewsSphere",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Unable to fetch Google News.");
    }

    const xml = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
    });

    const json = parser.parse(xml);

    const items = json.rss.channel.item || [];

    const news = items.slice(0, 20).map((item: any) => ({
      title: item.title,
      link: item.link,
      source: item.source?.["#text"] || "",
      pubDate: item.pubDate,
      description: item.description,
    }));

    return NextResponse.json({
      success: true,
      count: news.length,
      news,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
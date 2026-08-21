import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://newssphere-beta.vercel.app";

  const { data: articles } = await supabaseAdmin
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", {
      ascending: false,
    })
    .limit(50);

  const xml = `<?xml version="1.0"?>

<rss version="2.0">

<channel>

<title>NewsSphere</title>

<link>${baseUrl}</link>

<description>Latest News from NewsSphere</description>

${(articles || [])
  .map(
    (a) => `
<item>

<title><![CDATA[${a.title}]]></title>

<link>${baseUrl}/news/${a.slug}</link>

<description><![CDATA[${
      a.summary || ""
    }]]></description>

<pubDate>${new Date(
      a.created_at
    ).toUTCString()}</pubDate>

<guid>${baseUrl}/news/${a.slug}</guid>

</item>`
  )
  .join("")}

</channel>

</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
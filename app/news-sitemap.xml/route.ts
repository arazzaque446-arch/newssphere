import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://newssphere-beta.vercel.app";

  const { data: articles } = await supabaseAdmin
    .from("articles")
    .select("title,slug,created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(1000);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">

${(articles || [])
  .map(
    (a) => `
<url>
<loc>${baseUrl}/news/${a.slug}</loc>

<news:news>

<news:publication>

<news:name>NewsSphere</news:name>

<news:language>en</news:language>

</news:publication>

<news:publication_date>${new Date(
      a.created_at
    ).toISOString()}</news:publication_date>

<news:title><![CDATA[${a.title}]]></news:title>

</news:news>

</url>`
  )
  .join("")}

</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
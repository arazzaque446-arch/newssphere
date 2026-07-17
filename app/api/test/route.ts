import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // First query
  const articles = await supabase.from("articles").select("*");

  // List all tables visible through the API
  const tables = await supabase.rpc("pg_tables");

  return Response.json({
    articles,
    tables,
  });
}
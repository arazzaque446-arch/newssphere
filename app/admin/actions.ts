"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* ==========================================================
   SECURITY CHECK
========================================================== */
async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Unauthorized: You must be logged in as an admin.");
  }
}

function refreshPages() {
  revalidatePath("/");
  revalidatePath("/latest");
  revalidatePath("/admin");
  revalidatePath("/admin/new");
  revalidatePath("/admin/articles");
  revalidatePath("/news");
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

function getSponsoredFields(formData: FormData) {
  const isSponsored = formData.get("isSponsored") === "on";
  const sponsorName = String(formData.get("sponsorName") || "").trim();
  const sponsorUrl = String(formData.get("sponsorUrl") || "").trim();

  if (isSponsored && !sponsorName) {
    throw new Error("Sponsor name is required for sponsored articles.");
  }

  if (isSponsored && sponsorUrl) {
    try {
      new URL(sponsorUrl);
    } catch {
      throw new Error("Sponsor website must be a valid URL.");
    }
  }

  return {
    is_sponsored: isSponsored,
    sponsor_name: isSponsored ? sponsorName || null : null,
    sponsor_url: isSponsored ? sponsorUrl || null : null,
  };
}

/* ==========================================================
   CREATE ARTICLE
========================================================== */

export async function createArticle(formData: FormData) {
  await verifyAdmin();

  const image = formData.get("image") as File;
  let imageUrl = "https://images.unsplash.com/photo-1504711434969-e33886168f5c";

  if (image && image.size > 0) {
    const extension = image.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${extension}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("news-images")
      .upload(filename, image);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabaseAdmin.storage
      .from("news-images")
      .getPublicUrl(filename);

    imageUrl = data.publicUrl;
  }

  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const slug = generateSlug(title);
  const sponsored = getSponsoredFields(formData);

  const article = {
    title,
    slug,
    summary,
    content,
    category: String(formData.get("category") || "").trim(),
    author: String(formData.get("author") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    source: "NewsSphere",
    image_url: imageUrl,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    breaking: formData.get("breaking") === "on",
    views: 0,
    tags: String(formData.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    seo_title: String(formData.get("seoTitle") || "").trim() || title,
    seo_description: String(formData.get("seoDescription") || "").trim() || summary.slice(0, 160),
    read_time: Math.max(
      1,
      Math.ceil(
        content
          .replace(/<[^>]+>/g, "")
          .split(/\s+/)
          .filter(Boolean).length / 200
      )
    ),
    published_at: formData.get("publishAt")
      ? new Date(String(formData.get("publishAt"))).toISOString()
      : new Date().toISOString(),
    ...sponsored,
  };

  const { error } = await supabaseAdmin
    .from("articles")
    .insert(article);

  if (error) {
    throw new Error(error.message);
  }

  refreshPages();
  redirect("/admin");
}

/* ==========================================================
   UPDATE ARTICLE
========================================================== */

export async function updateArticle(id: string, formData: FormData) {
  await verifyAdmin();

  const { data: current } = await supabaseAdmin
    .from("articles")
    .select("image_url")
    .eq("id", id)
    .single();

  let imageUrl = current?.image_url;
  const newImage = formData.get("image") as File;

  if (newImage && newImage.size > 0) {
    const extension = newImage.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${extension}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("news-images")
      .upload(filename, newImage);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabaseAdmin.storage
      .from("news-images")
      .getPublicUrl(filename);

    imageUrl = data.publicUrl;

    if (
      current?.image_url &&
      current.image_url.includes("/storage/v1/object/public/news-images/")
    ) {
      const oldFile = current.image_url.split("/").pop();
      if (oldFile) {
        await supabaseAdmin.storage.from("news-images").remove([oldFile]);
      }
    }
  }

  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const sponsored = getSponsoredFields(formData);

  const article: Record<string, any> = {
    title,
    slug: generateSlug(title),
    summary,
    content,
    category: String(formData.get("category") || "").trim(),
    author: String(formData.get("author") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    image_url: imageUrl,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    breaking: formData.get("breaking") === "on",
    seo_title: String(formData.get("seoTitle") || "").trim() || title,
    seo_description: String(formData.get("seoDescription") || "").trim() || summary.slice(0, 160),
    tags: String(formData.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    read_time: Math.max(
      1,
      Math.ceil(
        content
          .replace(/<[^>]+>/g, "")
          .split(/\s+/)
          .filter(Boolean).length / 200
      )
    ),
    ...sponsored,
  };

  if (formData.get("publishAt")) {
    article.published_at = new Date(String(formData.get("publishAt"))).toISOString();
  }

  const { error } = await supabaseAdmin
    .from("articles")
    .update(article)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  refreshPages();
  redirect("/admin/articles");
}

/* ==========================================================
   DELETE ARTICLE
========================================================== */

export async function deleteArticle(id: string) {
  await verifyAdmin();

  const { data: article } = await supabaseAdmin
    .from("articles")
    .select("image_url")
    .eq("id", id)
    .single();

  if (
    article?.image_url &&
    article.image_url.includes("/storage/v1/object/public/news-images/")
  ) {
    const filename = article.image_url.split("/").pop();
    if (filename) {
      await supabaseAdmin.storage.from("news-images").remove([filename]);
    }
  }

  const { error } = await supabaseAdmin
    .from("articles")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  refreshPages();
}

/* ==========================================================
   TOGGLE PUBLISHED
========================================================== */

export async function togglePublished(id: string, current: boolean) {
  await verifyAdmin();

  const { error } = await supabaseAdmin
    .from("articles")
    .update({ published: !current })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  refreshPages();
}

/* ==========================================================
   TOGGLE FEATURED
========================================================== */

export async function toggleFeatured(id: string, current: boolean) {
  await verifyAdmin();

  const { error } = await supabaseAdmin
    .from("articles")
    .update({ featured: !current })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  refreshPages();
}
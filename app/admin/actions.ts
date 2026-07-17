"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* ==========================================================
   Refresh Website
========================================================== */

function refreshPages() {
  revalidatePath("/");
  revalidatePath("/latest");
  revalidatePath("/admin");
  revalidatePath("/admin/new");
  revalidatePath("/admin/articles");
  revalidatePath("/news");
}

/* ==========================================================
   Generate SEO Slug
========================================================== */

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ==========================================================
   CREATE ARTICLE
========================================================== */

export async function createArticle(formData: FormData) {
  const image = formData.get("image") as File;

  let imageUrl =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c";

  if (image && image.size > 0) {
    const extension = image.name.split(".").pop();

    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("news-images")
      .upload(filename, image);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("news-images")
      .getPublicUrl(filename);

    imageUrl = data.publicUrl;
  }

  const title = String(formData.get("title"));

  const summary = String(formData.get("summary"));

  const slug = generateSlug(title);

  const article = {
    title,
    slug,

    summary,

    content: String(formData.get("content")),

    category: String(formData.get("category")),

    author: String(formData.get("author")),

    location: String(formData.get("location")),

    source: "NewsSphere",

    image_url: imageUrl,

    featured: formData.get("featured") === "on",

    published: formData.get("published") === "on",

    breaking: formData.get("breaking") === "on",

    views: 0,

    tags: [],

    seo_title: title,

    seo_description: summary,

    published_at: new Date().toISOString(),
  };

  const { error } = await supabase
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

export async function updateArticle(
  id: string,
  formData: FormData
) {
  const { data: current } = await supabase
    .from("articles")
    .select("image_url")
    .eq("id", id)
    .single();

  let imageUrl = current?.image_url;

  const newImage = formData.get("image") as File;

  if (newImage && newImage.size > 0) {
    const extension = newImage.name.split(".").pop();

    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("news-images")
      .upload(filename, newImage);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("news-images")
      .getPublicUrl(filename);

    imageUrl = data.publicUrl;

    if (
      current?.image_url &&
      current.image_url.includes(
        "/storage/v1/object/public/news-images/"
      )
    ) {
      const oldFile = current.image_url.split("/").pop();

      if (oldFile) {
        await supabase.storage
          .from("news-images")
          .remove([oldFile]);
      }
    }
  }

  const title = String(formData.get("title"));

  const summary = String(formData.get("summary"));

  const slug = generateSlug(title);

  const article = {
    title,
    slug,

    summary,

    content: String(formData.get("content")),

    category: String(formData.get("category")),

    author: String(formData.get("author")),

    location: String(formData.get("location")),

    image_url: imageUrl,

    featured: formData.get("featured") === "on",

    published: formData.get("published") === "on",

    breaking: formData.get("breaking") === "on",

    seo_title: title,

    seo_description: summary,

    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
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
  const { data: article } = await supabase
    .from("articles")
    .select("image_url")
    .eq("id", id)
    .single();

  if (
    article?.image_url &&
    article.image_url.includes(
      "/storage/v1/object/public/news-images/"
    )
  ) {
    const filename = article.image_url.split("/").pop();

    if (filename) {
      await supabase.storage
        .from("news-images")
        .remove([filename]);
    }
  }

  const { error } = await supabase
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

export async function togglePublished(
  id: string,
  current: boolean
) {
  const { error } = await supabase
    .from("articles")
    .update({
      published: !current,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  refreshPages();
}

/* ==========================================================
   TOGGLE FEATURED
========================================================== */

export async function toggleFeatured(
  id: string,
  current: boolean
) {
  const { error } = await supabase
    .from("articles")
    .update({
      featured: !current,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  refreshPages();
}
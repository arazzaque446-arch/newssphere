import { supabase } from "./supabase";

export async function uploadImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("news-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("news-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
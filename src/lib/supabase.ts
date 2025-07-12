import { createClient } from "@supabase/supabase-js";

// Validasi env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

// Create a single supabase client
export const supabaseClient = createClient(supabaseUrl, supabaseKey);

const createId = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  while (result.length < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const supabaseUploadFile = async (
  file: File | string,
  bucket: "company" | "applicant"
) => {
  const filename = `${createId(6)}.jpg`;
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .upload("public/" + filename, file, {
      cacheControl: "3600",
      upsert: false,
    });
  return { data, error, filename };
};

export const supabaseGetPublicUrl = (
  filename: string,
  bucket: "company" | "applicant"
) => {
  const { data } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl("public/" + filename);
  return { publicUrl: data.publicUrl };
};

export const supabaseDeleteFile = async (
  filename: string,
  bucket: "company" | "applicant"
) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .remove(["public/" + filename]);
  return { data, error };
};

export const supabaseUpdateFile = async (
  file: File | string,
  filename: string,
  bucket: "company" | "applicant"
) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .update("public/" + filename, file, {
      cacheControl: "3600",
      upsert: true,
    });
  return { data, error };
};

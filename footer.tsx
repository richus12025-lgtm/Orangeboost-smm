import { NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function requireApiUser(req: NextRequest) {
  const key =
    req.headers.get("x-api-key") ||
    req.headers.get("authorization")?.replace("Bearer ", "");
  if (!key) return { error: "Missing API key" as const };

  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("api_keys")
    .select("user_id,is_active")
    .eq("key", key)
    .maybeSingle();

  if (!data || !data.is_active) return { error: "Invalid API key" as const };
  return { userId: data.user_id as string };
}


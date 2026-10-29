import { createClient } from "@supabase/supabase-js";
// Same env vars as before; placeholders only prevent "supabaseUrl is required" from crashing the build/prerender when they are not injected.
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key");

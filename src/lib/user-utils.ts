import type { User } from "@supabase/supabase-js";

/** Best-available display name: full name → name → email local-part → "". */
export function displayName(user: User | null | undefined): string {
  return (
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    ""
  );
}

import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";
import { PLAN_LIMITS } from "../lib/constants";

/** Fetches the user's remaining monthly word balance (plan limit − words used
 *  this period) on mount / user change. Exposes setWordsRemaining so callers can
 *  update it after a translation returns a fresh remaining count. */
export function useWordBalance(user: User | null | undefined) {
  const [wordsRemaining, setWordsRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    const period = new Date().toISOString().slice(0, 7);
    Promise.all([
      supabase.from("profiles").select("plan").eq("id", user.id).single(),
      supabase
        .from("usage")
        .select("words_used")
        .eq("user_id", user.id)
        .eq("period", period)
        .single(),
    ]).then(([pRes, uRes]) => {
      const plan = pRes.data?.plan ?? "free";
      const limit = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
      const used = uRes.data?.words_used ?? 0;
      setWordsRemaining(limit - used);
    });
  }, [user]);

  return { wordsRemaining, setWordsRemaining };
}

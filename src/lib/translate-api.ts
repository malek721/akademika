import { supabase } from "./supabase";

export interface TranslateRequest {
  source_text: string;
  source_lang: string;
  target_lang: string;
  discipline: string;
  document_type: string;
}

export interface TranslateResponse {
  id: string;
  translated_text: string;
  word_count: number;
  words_remaining: number;
}

export async function translateViaEdgeFunction(payload: TranslateRequest): Promise<TranslateResponse> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error((err as { error?: string }).error ?? `HTTP ${response.status}`);
  }

  return response.json() as Promise<TranslateResponse>;
}

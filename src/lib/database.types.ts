// Hand-authored from supabase/migrations/*.sql
// Regenerate with: npx supabase gen types typescript --project-id mbclweheyejqdiyiatvz > src/lib/database.types.ts

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          university: string | null;
          academic_level: "lisans" | "yuksek_lisans" | "doktora" | null;
          plan: "free" | "student" | "researcher";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          university?: string | null;
          academic_level?: "lisans" | "yuksek_lisans" | "doktora" | null;
          plan?: "free" | "student" | "researcher";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          university?: string | null;
          academic_level?: "lisans" | "yuksek_lisans" | "doktora" | null;
          plan?: "free" | "student" | "researcher";
          updated_at?: string;
        };
        Relationships: [];
      };
      translations: {
        Row: {
          id: string;
          user_id: string;
          source_lang: string;
          target_lang: string;
          discipline: string;
          document_type: string;
          source_text: string;
          translated_text: string | null;
          word_count: number | null;
          status: "pending" | "processing" | "completed" | "failed";
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          source_lang: string;
          target_lang: string;
          discipline: string;
          document_type: string;
          source_text: string;
          translated_text?: string | null;
          word_count?: number | null;
          status?: "pending" | "processing" | "completed" | "failed";
          error_message?: string | null;
          created_at?: string;
        };
        Update: {
          translated_text?: string | null;
          status?: "pending" | "processing" | "completed" | "failed";
          error_message?: string | null;
        };
        Relationships: [];
      };
      usage: {
        Row: {
          id: string;
          user_id: string;
          period: string;
          words_used: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          period: string;
          words_used?: number;
          updated_at?: string;
        };
        Update: {
          words_used?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      glossary: {
        Row: {
          id: number;
          term_source: string;
          term_target: string;
          field: string;
          direction: "tr2en" | "en2tr";
          dictionary: string;
        };
        Insert: {
          term_source: string;
          term_target: string;
          field?: string;
          direction: "tr2en" | "en2tr";
          dictionary?: string;
        };
        Update: {
          term_source?: string;
          term_target?: string;
          field?: string;
          direction?: "tr2en" | "en2tr";
          dictionary?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      academic_level: "lisans" | "yuksek_lisans" | "doktora";
      plan_type: "free" | "student" | "researcher";
      translation_status: "pending" | "processing" | "completed" | "failed";
    };
  };
};

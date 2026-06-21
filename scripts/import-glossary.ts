/**
 * scripts/import-glossary.ts
 *
 * Imports TÜBA academic glossary Excel files into the Supabase `glossary` table.
 *
 * Prerequisites:
 *   npm install --save-dev xlsx tsx dotenv
 *
 * Required env vars (add to .env — never commit the service role key):
 *   SUPABASE_URL=https://xxxx.supabase.co        (or VITE_SUPABASE_URL)
 *   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
 *
 * Place Excel files in:
 *   data/temiz_tr_en.xlsx   → direction = 'tr2en'
 *   data/temiz_en_tr.xlsx   → direction = 'en2tr'
 *
 * Usage:
 *   npx tsx scripts/import-glossary.ts           # appends to existing data
 *   npx tsx scripts/import-glossary.ts --clear   # truncates table first
 */

import "dotenv/config";
import { read, utils } from "xlsx";
import { createClient } from "@supabase/supabase-js";
import * as path from "path";
import { existsSync, readFileSync } from "fs";

// ── Config ──────────────────────────────────────────────────────────────────

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const DATA_DIR = path.join(process.cwd(), "data");
const BATCH_SIZE = 500;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "❌  Missing env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ── Types ───────────────────────────────────────────────────────────────────

interface ExcelRow {
  term_tr?: string;
  term_en?: string;
  field?: string;
  dictionary?: string;
  [key: string]: unknown;
}

interface GlossaryRecord {
  term_source: string;
  term_target: string;
  field: string;
  direction: string;
  dictionary: string;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function readExcel(filePath: string): ExcelRow[] {
  const buffer = readFileSync(filePath);
  const workbook = read(buffer, { cellDates: false });
  const sheetName = workbook.SheetNames[0];
  return utils.sheet_to_json<ExcelRow>(workbook.Sheets[sheetName], {
    defval: "",
  });
}

function toRecord(
  row: ExcelRow,
  direction: "tr2en" | "en2tr",
): GlossaryRecord | null {
  const tr = String(row.term_tr ?? "").trim();
  const en = String(row.term_en ?? "").trim();
  if (!tr || !en) return null;

  return {
    term_source: direction === "tr2en" ? tr : en,
    term_target: direction === "tr2en" ? en : tr,
    field:       String(row.field ?? "").trim().toLowerCase(),
    direction,
    dictionary:  String(row.dictionary ?? "").trim(),
  };
}

async function batchInsert(records: GlossaryRecord[]): Promise<void> {
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);

    const { error } = await supabase.from("glossary").insert(batch);
    if (error) {
      console.error(`\n❌  Insert error at offset ${i}:`, error.message);
      process.exit(1);
    }

    const done = Math.min(i + BATCH_SIZE, records.length);
    process.stdout.write(`  ↳ ${done.toLocaleString()} / ${records.length.toLocaleString()} rows\r`);
  }
  process.stdout.write("\n");
}

async function importFile(
  fileName: string,
  direction: "tr2en" | "en2tr",
): Promise<void> {
  const filePath = path.join(DATA_DIR, fileName);

  if (!existsSync(filePath)) {
    console.warn(`⚠️   File not found, skipping: ${filePath}`);
    return;
  }

  console.log(`\n📂  ${fileName}  (direction: ${direction})`);

  const rows = readExcel(filePath);
  console.log(`    Read ${rows.length.toLocaleString()} Excel rows`);

  const records = rows.map((r) => toRecord(r, direction)).filter(Boolean) as GlossaryRecord[];
  const skipped = rows.length - records.length;
  if (skipped > 0) console.log(`    Skipped ${skipped} blank rows`);

  await batchInsert(records);
  console.log(`  ✅  Inserted ${records.length.toLocaleString()} terms`);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const shouldClear = process.argv.includes("--clear");

  console.log("🔗  Connected to:", SUPABASE_URL);

  if (shouldClear) {
    console.log("\n🗑️   --clear: truncating glossary table...");
    const { error } = await supabase.from("glossary").delete().neq("id", 0);
    if (error) {
      console.error("❌  Truncate failed:", error.message);
      process.exit(1);
    }
    console.log("    Table cleared.");
  }

  await importFile("temiz_tr_en.xlsx", "tr2en");
  await importFile("temiz_en_tr.xlsx", "en2tr");

  // Final count
  const { count } = await supabase
    .from("glossary")
    .select("*", { count: "exact", head: true });

  console.log(`\n🎉  Done. Total rows in glossary: ${(count ?? 0).toLocaleString()}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

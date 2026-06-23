import mammoth from "mammoth";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";

export async function extractTextFromDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });

  const errors = result.messages.filter((m) => m.type === "error");
  if (errors.length > 0) {
    throw new Error(`Dosya okunamadı: ${errors[0].message}`);
  }

  const text = result.value.trim();
  if (!text) {
    throw new Error("Dosya boş veya metin içermiyor. Lütfen geçerli bir .docx dosyası yükleyin.");
  }

  const paragraphs = text
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphs.join("\n\n");
}

export async function buildTranslatedDocx(
  translatedText: string,
  fileName: string,
  rtl = false
): Promise<void> {
  const paragraphs = translatedText
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs.map(
          (text) =>
            new Paragraph({
              children: [
                new TextRun({
                  text,
                  font: "Calibri",
                  size: 22,
                  rightToLeft: rtl,
                }),
              ],
              spacing: { line: 276, after: 120 },
              ...(rtl && { alignment: AlignmentType.RIGHT, bidirectional: true }),
            })
        ),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const baseName = fileName.replace(/\.docx$/i, "");
  saveAs(blob, `translated_${baseName}.docx`);
}

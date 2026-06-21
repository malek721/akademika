import mammoth from "mammoth";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export async function extractTextFromDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const paragraphs = result.value
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphs.join("\n\n");
}

export async function buildTranslatedDocx(
  translatedText: string,
  fileName: string
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
                }),
              ],
              spacing: { line: 276, after: 120 },
            })
        ),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const baseName = fileName.replace(/\.docx$/i, "");
  saveAs(blob, `translated_${baseName}.docx`);
}

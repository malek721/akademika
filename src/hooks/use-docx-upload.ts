import { useRef, useState, type DragEvent } from "react";
import { toast } from "sonner";

import { extractTextFromDocx } from "../lib/docx-utils";
import { countWords } from "../lib/text-utils";

const DOCX_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

interface UseDocxUploadOptions {
  /** true when the UI language is Turkish (drives toast copy). */
  tr: boolean;
  /** Called with the extracted text after a successful upload. */
  onText: (text: string) => void;
  /** Called when the user clears the uploaded file. */
  onClear: () => void;
}

/** Drag-and-drop + click .docx upload with text extraction. Owns upload-only
 *  state; cross-cutting effects (source text, result reset) go through the
 *  onText/onClear callbacks so behavior matches the original inline handlers. */
export function useDocxUpload({ tr, onText, onClear }: UseDocxUploadOptions) {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileExtracting, setFileExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const isDocx =
      file.name.toLowerCase().endsWith(".docx") || file.type === DOCX_MIME;
    if (!isDocx) {
      toast.error(
        tr
          ? "Yalnızca .docx dosyaları desteklenir."
          : "Only .docx files are supported.",
      );
      return;
    }
    setFileExtracting(true);
    try {
      const text = await extractTextFromDocx(file);
      const wc = countWords(text);
      onText(text);
      setUploadedFileName(file.name);
      toast.success(
        tr
          ? `${file.name} yüklendi — ${wc.toLocaleString()} kelime`
          : `${file.name} uploaded — ${wc.toLocaleString()} words`,
      );
    } catch {
      toast.error(tr ? "Dosya okunamadı." : "Could not read the file.");
    } finally {
      setFileExtracting(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setUploadedFileName(null);
    onClear();
  };

  return {
    uploadedFileName,
    isDragging,
    fileExtracting,
    fileInputRef,
    handleFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearFile,
  };
}

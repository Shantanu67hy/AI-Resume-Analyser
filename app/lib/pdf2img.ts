/* pdfToImage.ts
   Safe for Vite + React + TypeScript
   Browser-only, SSR-safe
*/

export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any | null = null;
let loadingPromise: Promise<any> | null = null;

/**
 * Dynamically load pdf.js ONLY in the browser
 * (prevents DOMMatrix / SSR crashes)
 */
async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;

  if (typeof window === "undefined") {
    throw new Error("PDF.js can only be loaded in the browser");
  }

  if (!loadingPromise) {
    loadingPromise = (async () => {
      const pdfjs = await import("pdfjs-dist");
      const worker = await import(
        "pdfjs-dist/build/pdf.worker.mjs?url"
      );

      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
      pdfjsLib = pdfjs;
      return pdfjs;
    })();
  }

  return loadingPromise;
}

/**
 * Convert first page of PDF to image
 */
export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    const pdfjs = await loadPdfJs();

    const buffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buffer }).promise;

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 3 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return {
        imageUrl: "",
        file: null,
        error: "Failed to get canvas context",
      };
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvas,
      viewport,
    }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
            return;
          }

          const imageFile = new File(
            [blob],
            file.name.replace(/\.pdf$/i, ".png"),
            { type: "image/png" }
          );

          resolve({
            imageUrl: URL.createObjectURL(blob),
            file: imageFile,
          });
        },
        "image/png",
        1
      );
    });
  } catch (err) {
    return {
      imageUrl: "",
      file: null,
      error: String(err),
    };
  }
}

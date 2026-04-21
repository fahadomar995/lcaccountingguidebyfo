import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface PdfPageViewProps {
  url: string;
  page: number;
  /** Render scale — multiplier applied to the PDF's natural size. */
  scale?: number;
  /** Optional className for the outer container. */
  className?: string;
  /** Aria-label / iframe-title equivalent. */
  title?: string;
}

/**
 * Renders ONE page of a remote PDF as a fixed (non-scrollable) image.
 * Used by the Exam Simulator so a candidate lands directly on the question
 * page without scrolling through the front cover.
 */
export function PdfPageView({ url, page, scale = 1.6, className, title }: PdfPageViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errMsg, setErrMsg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus("loading");
      try {
        const loadingTask = pdfjsLib.getDocument({ url, withCredentials: false });
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        const pageNum = Math.min(Math.max(1, page), pdf.numPages);
        const pdfPage = await pdf.getPage(pageNum);
        if (cancelled) return;

        const dpr = window.devicePixelRatio || 1;
        const viewport = pdfPage.getViewport({ scale: scale * dpr });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;

        // pdfjs v4 — `canvasContext` is the canonical input; `canvas` is unused at runtime
        // and rejected by older type defs, so we omit it.
        await pdfPage.render({ canvasContext: ctx, viewport } as Parameters<typeof pdfPage.render>[0]).promise;
        if (!cancelled) setStatus("ready");
      } catch (e) {
        if (cancelled) return;
        setErrMsg(e instanceof Error ? e.message : String(e));
        setStatus("error");
      }
    })();

    return () => { cancelled = true; };
  }, [url, page, scale]);

  return (
    <div className={`relative bg-card border border-border rounded-lg overflow-hidden ${className ?? ""}`}>
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card/80 z-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-xs font-body text-muted-foreground">Loading question…</span>
        </div>
      )}
      {status === "error" && (
        <div className="p-6 flex flex-col items-center justify-center gap-3 text-center">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <p className="text-sm font-body text-foreground">Could not load PDF page.</p>
          <p className="text-xs font-mono text-muted-foreground break-all">{errMsg}</p>
          <a href={`${url}#page=${page}`} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-1.5 text-xs font-body text-primary hover:underline">
            <ExternalLink className="h-3.5 w-3.5" /> Open PDF in new tab
          </a>
        </div>
      )}
      <div className="w-full overflow-auto flex justify-center p-2 bg-muted/30">
        <canvas ref={canvasRef} aria-label={title} className="block shadow-sm" />
      </div>
    </div>
  );
}

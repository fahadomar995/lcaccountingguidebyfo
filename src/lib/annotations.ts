/**
 * Exam Simulator annotation storage (Phase 1).
 *
 * Strokes are stored in normalized image coordinates (0–1) so they
 * re-render correctly at any zoom/DPI. One localStorage key per question:
 *   lc-sim-annotations:<questionId>  →  { [pageIndex]: Stroke[] }
 */
export type AnnotationTool = "pen" | "highlighter";

export interface Stroke {
  id: string;
  tool: AnnotationTool;
  color: string;        // CSS color
  width: number;        // stroke width in normalized units (× imageWidthPx)
  points: [number, number][]; // normalized 0..1
}

export type PageStrokes = Record<number, Stroke[]>;

const PREFIX = "lc-sim-annotations:";

export function annotationsKey(questionId: string): string {
  return `${PREFIX}${questionId}`;
}

export function loadAnnotations(questionId: string): PageStrokes {
  try {
    const raw = localStorage.getItem(annotationsKey(questionId));
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return (parsed && typeof parsed === "object") ? parsed : {};
  } catch {
    return {};
  }
}

export function saveAnnotations(questionId: string, data: PageStrokes): void {
  try {
    const hasAny = Object.values(data).some((arr) => arr && arr.length > 0);
    const key = annotationsKey(questionId);
    if (!hasAny) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
    window.dispatchEvent(new CustomEvent("local-storage", { detail: { key } }));
  } catch {}
}

export function newStrokeId(): string {
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
import { useEffect, useRef, useState, useCallback } from "react";
import type { AnnotationTool, Stroke } from "@/lib/annotations";
import { newStrokeId } from "@/lib/annotations";

interface Props {
  /** The image element to overlay; canvas tracks its rendered size. */
  img: HTMLImageElement | null;
  strokes: Stroke[];
  onChange: (next: Stroke[]) => void;
  tool: AnnotationTool | "off";
}

const PEN_COLOR = "hsl(140 22% 38%)";        // sage-green
const HIGHLIGHT_COLOR = "rgba(255, 220, 60, 0.45)";

/**
 * Transparent canvas overlay that captures freehand strokes and renders
 * them in normalized coordinates so they survive zoom changes.
 */
export function AnnotationCanvas({ img, strokes, onChange, tool }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const drawingRef = useRef<Stroke | null>(null);
  const strokesRef = useRef<Stroke[]>(strokes);
  strokesRef.current = strokes;

  // Match canvas size to current rendered image size.
  useEffect(() => {
    if (!img) return;
    const sync = () => {
      const r = img.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(img);
    img.addEventListener("load", sync);
    return () => { ro.disconnect(); img.removeEventListener("load", sync); };
  }, [img]);

  // Render strokes whenever size or strokes change.
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.w === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(size.w * dpr);
    canvas.height = Math.round(size.h * dpr);
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size.w, size.h);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const draw = (s: Stroke) => {
      if (s.points.length < 1) return;
      ctx.save();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = Math.max(1, s.width * size.w);
      if (s.tool === "highlighter") ctx.globalCompositeOperation = "multiply";
      ctx.beginPath();
      const [x0, y0] = s.points[0];
      ctx.moveTo(x0 * size.w, y0 * size.h);
      for (let i = 1; i < s.points.length; i++) {
        const [x, y] = s.points[i];
        ctx.lineTo(x * size.w, y * size.h);
      }
      // single-point dot
      if (s.points.length === 1) {
        ctx.lineTo(x0 * size.w + 0.1, y0 * size.h + 0.1);
      }
      ctx.stroke();
      ctx.restore();
    };
    strokesRef.current.forEach(draw);
    if (drawingRef.current) draw(drawingRef.current);
  }, [size]);

  useEffect(() => { render(); }, [render, strokes]);

  const interactive = tool !== "off";

  const getNormPoint = (e: React.PointerEvent): [number, number] => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    return [Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y))];
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const t = tool as AnnotationTool;
    drawingRef.current = {
      id: newStrokeId(),
      tool: t,
      color: t === "highlighter" ? HIGHLIGHT_COLOR : PEN_COLOR,
      width: t === "highlighter" ? 0.018 : 0.0035,
      points: [getNormPoint(e)],
    };
    render();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || !drawingRef.current) return;
    drawingRef.current.points.push(getNormPoint(e));
    render();
  };

  const onPointerUp = () => {
    if (!drawingRef.current) return;
    const s = drawingRef.current;
    drawingRef.current = null;
    onChange([...strokesRef.current, s]);
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{
        width: size.w,
        height: size.h,
        pointerEvents: interactive ? "auto" : "none",
        touchAction: interactive ? "none" : "auto",
        cursor: interactive ? "crosshair" : "default",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
}
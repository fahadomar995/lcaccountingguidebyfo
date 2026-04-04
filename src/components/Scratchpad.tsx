import { useState, useRef, useCallback, useEffect } from "react";
import { Pencil, Eraser, Undo2, Redo2, Grid3X3, Download, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS = ["#1a1d23", "#1e40af", "#dc2626", "#16a34a"];
const THICKNESSES = [1.5, 2.5, 4];

export function Scratchpad() {
  const [isOpen, setIsOpen] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState(COLORS[0]);
  const [thickness, setThickness] = useState(2.5);
  const [gridMode, setGridMode] = useState<"none" | "grid" | "ruled">("none");
  const [hasContent, setHasContent] = useState(() => !!localStorage.getItem("sp_img"));
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const strokeStarted = useRef(false);
  const saveTimer = useRef<number>();

  const getCtx = useCallback(() => canvasRef.current?.getContext("2d", { desynchronized: true }), []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = getCtx();
    if (!ctx) return;
    const r = wrap.getBoundingClientRect();
    const d = devicePixelRatio || 1;
    let img: ImageData | null = null;
    if (canvas.width > 0 && canvas.height > 0) {
      try { img = ctx.getImageData(0, 0, canvas.width, canvas.height); } catch {}
    }
    canvas.width = r.width * d;
    canvas.height = r.height * d;
    canvas.style.width = r.width + "px";
    canvas.style.height = r.height + "px";
    ctx.scale(d, d);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (img) ctx.putImageData(img, 0, 0);
  }, [getCtx]);

  const loadSaved = useCallback(() => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    try {
      const d = localStorage.getItem("sp_img");
      if (!d) return;
      setHasContent(true);
      const img = new Image();
      img.onload = () => {
        const dpr = devicePixelRatio || 1;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width / dpr, canvas.height / dpr);
      };
      img.src = d;
    } catch {}
  }, [getCtx]);

  const autoSave = useCallback(() => {
    clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const d = canvas.toDataURL("image/png");
        localStorage.setItem("sp_img", d);
        setHasContent(true);
      } catch {}
    }, 400);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => { resize(); loadSaved(); }, 60);
  }, [resize, loadSaved]);

  const close = useCallback(() => {
    setIsOpen(false);
    autoSave();
  }, [autoSave]);

  const pos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const lw = (e: React.PointerEvent) => thickness * (0.3 + (e.pressure || 0.5) * 2.2);

  const handleDown = (e: React.PointerEvent) => {
    e.preventDefault();
    canvasRef.current?.setPointerCapture(e.pointerId);
    isDrawing.current = true;
    const p = pos(e);
    lastPos.current = p;
    if (!strokeStarted.current) {
      const ctx = getCtx();
      if (ctx) {
        try { setHistory(h => [...h.slice(-39), ctx.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height)]); } catch {}
      }
      strokeStarted.current = true;
      setRedoStack([]);
    }
    const ctx = getCtx();
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(p.x, p.y, lw(e) / 2, 0, Math.PI * 2);
    ctx.fillStyle = tool === "eraser" ? "#fff" : color;
    ctx.fill();
  };

  const handleMove = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    const evs = (e.nativeEvent as any).getCoalescedEvents?.() || [e];
    for (const c of evs) {
      const p = pos(c as any);
      const w = lw(c as any);
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = tool === "eraser" ? "#fff" : color;
      ctx.lineWidth = tool === "eraser" ? w * 4 : w;
      ctx.stroke();
      lastPos.current = p;
    }
  };

  const handleUp = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    strokeStarted.current = false;
    autoSave();
  };

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const ctx = getCtx();
    if (!ctx) return;
    try { setRedoStack(r => [...r, ctx.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height)]); } catch {}
    ctx.putImageData(history[history.length - 1], 0, 0);
    setHistory(h => h.slice(0, -1));
    autoSave();
  }, [history, getCtx, autoSave]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const ctx = getCtx();
    if (!ctx) return;
    try { setHistory(h => [...h, ctx.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height)]); } catch {}
    ctx.putImageData(redoStack[redoStack.length - 1], 0, 0);
    setRedoStack(r => r.slice(0, -1));
    autoSave();
  }, [redoStack, getCtx, autoSave]);

  const cycleGrid = () => {
    setGridMode(m => m === "none" ? "grid" : m === "grid" ? "ruled" : "none");
  };

  const savePng = () => {
    try {
      const a = document.createElement("a");
      a.download = "rough-work-" + new Date().toISOString().slice(0, 10) + ".png";
      a.href = canvasRef.current!.toDataURL("image/png");
      a.click();
    } catch {}
  };

  const clearCanvas = () => {
    const ctx = getCtx();
    if (!ctx) return;
    if (history.length || strokeStarted.current) {
      try { setHistory(h => [...h, ctx.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height)]); } catch {}
    }
    const d = devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvasRef.current!.width / d, canvasRef.current!.height / d);
    setRedoStack([]);
    try { localStorage.removeItem("sp_img"); setHasContent(false); } catch {}
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if ((e.ctrlKey || e.metaKey) && e.key === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); }
      if (e.key === "Escape") close();
      if (e.key === "e") setTool("eraser");
      if (e.key === "p") setTool("pen");
      if (e.key === "g") cycleGrid();
      if (e.key === "1") { setColor(COLORS[0]); setTool("pen"); }
      if (e.key === "2") { setColor(COLORS[1]); setTool("pen"); }
      if (e.key === "3") { setColor(COLORS[2]); setTool("pen"); }
      if (e.key === "4") { setColor(COLORS[3]); setTool("pen"); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, undo, redo, close]);

  // Resize on window resize
  useEffect(() => {
    if (!isOpen) return;
    let timer: number;
    const handler = () => { clearTimeout(timer); timer = window.setTimeout(resize, 150); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [isOpen, resize]);

  return (
    <>
      {/* FAB */}
      <button
        onClick={open}
        className={`fixed bottom-5 right-5 w-[52px] h-[52px] rounded-full bg-[#1e2d4a] border-none shadow-lg text-[#c8d6e5] z-[9990] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${isOpen ? "hidden" : ""}`}
        title="Open rough work"
      >
        <Pencil className="w-5 h-5" />
        {hasContent && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#1e2d4a]" />
        )}
      </button>

      {/* Overlay — partial screen */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[9999] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "60vh", minHeight: 320 }}
      >
        {/* Toolbar */}
        <div className="h-12 bg-[#1e2d4a] flex items-center px-2 gap-1 overflow-x-auto flex-shrink-0 border-b border-white/5">
          <button onClick={close} className="text-[#7eb8ff] text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-white/10 shrink-0">
            Close
          </button>
          <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />

          <ToolBtn active={tool === "pen"} onClick={() => setTool("pen")} title="Pen (P)">
            <Pencil className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn active={tool === "eraser"} onClick={() => setTool("eraser")} title="Eraser (E)">
            <Eraser className="w-4 h-4" />
          </ToolBtn>

          <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />

          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => { setColor(c); setTool("pen"); }}
              className={`w-5 h-5 rounded-full shrink-0 mx-0.5 transition-all ${color === c ? "ring-2 ring-[#7eb8ff] ring-offset-1 ring-offset-[#1e2d4a]" : ""}`}
              style={{ background: c }}
            />
          ))}

          <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />

          {THICKNESSES.map(t => (
            <button
              key={t}
              onClick={() => setThickness(t)}
              className={`w-7 h-7 flex items-center justify-center rounded-md shrink-0 border-2 transition-all ${thickness === t ? "border-[#7eb8ff]" : "border-transparent"}`}
            >
              <div className="rounded-full" style={{ width: t * 2, height: t * 2, background: thickness === t ? "#7eb8ff" : "#94a3b8" }} />
            </button>
          ))}

          <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />

          <ToolBtn active={false} onClick={undo} title="Undo" disabled={history.length === 0}>
            <Undo2 className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn active={false} onClick={redo} title="Redo" disabled={redoStack.length === 0}>
            <Redo2 className="w-3.5 h-3.5" />
          </ToolBtn>

          <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />

          <ToolBtn active={gridMode !== "none"} onClick={cycleGrid} title="Paper style (G)">
            <Grid3X3 className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn active={false} onClick={savePng} title="Save as image">
            <Download className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn active={false} onClick={clearCanvas} title="Clear all" className="text-red-400">
            <Trash2 className="w-3.5 h-3.5" />
          </ToolBtn>
        </div>

        {/* Canvas area */}
        <div ref={wrapRef} className="flex-1 relative overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            className="block w-full h-full"
            style={{ touchAction: "none", cursor: tool === "eraser" ? "cell" : "crosshair" }}
            onPointerDown={handleDown}
            onPointerMove={handleMove}
            onPointerUp={handleUp}
            onPointerCancel={() => { isDrawing.current = false; strokeStarted.current = false; }}
            onPointerLeave={handleUp}
            onContextMenu={e => e.preventDefault()}
          />
          {/* Grid overlay */}
          <div
            className={`absolute inset-0 pointer-events-none z-[1] ${
              gridMode === "grid" ? "block" : gridMode === "ruled" ? "block" : "hidden"
            }`}
            style={
              gridMode === "grid"
                ? { backgroundImage: "linear-gradient(#e8ecf0 1px, transparent 1px), linear-gradient(90deg, #e8ecf0 1px, transparent 1px)", backgroundSize: "24px 24px" }
                : gridMode === "ruled"
                ? { backgroundImage: "linear-gradient(#c5d3e0 1px, transparent 1px)", backgroundSize: "100% 32px", backgroundPosition: "0 16px" }
                : {}
            }
          />
        </div>
      </div>

      {/* Backdrop when open */}
      {isOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/20" style={{ height: "40vh" }} onClick={close} />
      )}
    </>
  );
}

function ToolBtn({ active, onClick, title, children, disabled, className }: {
  active: boolean; onClick: () => void; title: string; children: React.ReactNode; disabled?: boolean; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`w-9 h-9 flex items-center justify-center rounded-lg border-2 transition-all shrink-0 ${
        active ? "border-[#7eb8ff] text-[#7eb8ff] bg-[rgba(126,184,255,0.08)]" : "border-transparent text-[#94a3b8] hover:bg-white/5"
      } ${disabled ? "opacity-20 cursor-default" : "cursor-pointer"} ${className || ""}`}
    >
      {children}
    </button>
  );
}

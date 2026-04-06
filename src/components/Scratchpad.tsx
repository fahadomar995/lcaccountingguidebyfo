import { useState, useRef, useCallback, useEffect } from "react";
import { Pencil, Eraser, Undo2, Redo2, Grid3X3, Download, Trash2, GripHorizontal } from "lucide-react";

const COLORS = ["#1a1d23", "#1e40af", "#dc2626", "#16a34a"];
const THICKNESSES = [1.5, 2.5, 4];
const MIN_HEIGHT = 200;
const MAX_HEIGHT_RATIO = 0.92;
const DEFAULT_HEIGHT_RATIO = 0.6;

export function Scratchpad() {
  const [isOpen, setIsOpen] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState(COLORS[0]);
  const [thickness, setThickness] = useState(2.5);
  const [gridMode, setGridMode] = useState<"none" | "grid" | "ruled">("none");
  const [hasContent, setHasContent] = useState(() => !!localStorage.getItem("sp_img"));
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [panelHeight, setPanelHeight] = useState(() => {
    const saved = localStorage.getItem("sp_height");
    return saved ? Math.max(MIN_HEIGHT, Math.min(Number(saved), window.innerHeight * MAX_HEIGHT_RATIO)) : window.innerHeight * DEFAULT_HEIGHT_RATIO;
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const strokeStarted = useRef(false);
  const saveTimer = useRef<number>();
  const dragRef = useRef<{ startY: number; startH: number } | null>(null);

  const getCtx = useCallback(() => canvasRef.current?.getContext("2d", { desynchronized: true, willReadFrequently: true }), []);

  // --- Drag handle for resizing ---
  const onDragStart = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startY: e.clientY, startH: panelHeight };
  }, [panelHeight]);

  const onDragMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    e.preventDefault();
    const delta = dragRef.current.startY - e.clientY;
    const newH = Math.max(MIN_HEIGHT, Math.min(dragRef.current.startH + delta, window.innerHeight * MAX_HEIGHT_RATIO));
    setPanelHeight(newH);
  }, []);

  const onDragEnd = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current = null;
    localStorage.setItem("sp_height", String(panelHeight));
    // Re-resize canvas after drag
    setTimeout(() => {
      resize();
    }, 50);
  }, [panelHeight]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = getCtx();
    if (!ctx) return;
    const r = wrap.getBoundingClientRect();
    const d = devicePixelRatio || 1;
    // Save current image
    let savedData: string | null = null;
    if (canvas.width > 0 && canvas.height > 0) {
      try { savedData = canvas.toDataURL(); } catch {}
    }
    canvas.width = r.width * d;
    canvas.height = r.height * d;
    canvas.style.width = r.width + "px";
    canvas.style.height = r.height + "px";
    ctx.scale(d, d);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // Restore from saved data
    if (savedData) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, r.width, r.height);
      img.src = savedData;
    }
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

  // --- Stylus-optimized pointer handlers ---
  const pos = (e: React.PointerEvent | PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  // Pressure sensitivity: use actual pressure from stylus, fallback for mouse
  const lw = (e: React.PointerEvent | PointerEvent) => {
    const pressure = e.pointerType === "pen" ? e.pressure : (e.pressure || 0.5);
    const minW = thickness * 0.3;
    const maxW = thickness * 2.5;
    return minW + pressure * (maxW - minW);
  };

  const handleDown = useCallback((e: React.PointerEvent) => {
    // Prevent double-click / text selection from stylus
    e.preventDefault();
    e.stopPropagation();
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
  }, [tool, color, thickness, getCtx]);

  const handleMove = useCallback((e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    // Use coalesced events for smoother strokes
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
  }, [tool, color, thickness, getCtx]);

  const handleUp = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    strokeStarted.current = false;
    autoSave();
  }, [autoSave]);

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

  // Prevent default touch behaviors on canvas to avoid double-click zoom on iPad
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prevent = (e: TouchEvent) => { e.preventDefault(); };
    canvas.addEventListener("touchstart", prevent, { passive: false });
    canvas.addEventListener("touchmove", prevent, { passive: false });
    canvas.addEventListener("touchend", prevent, { passive: false });
    // Prevent double-tap zoom
    canvas.addEventListener("dblclick", (e) => e.preventDefault());
    return () => {
      canvas.removeEventListener("touchstart", prevent);
      canvas.removeEventListener("touchmove", prevent);
      canvas.removeEventListener("touchend", prevent);
    };
  }, []);

  return (
    <>
      {/* FAB */}
      <button
        onClick={open}
        className={`fixed bottom-5 right-5 w-[52px] h-[52px] rounded-full bg-[#1e2d4a] border-none shadow-lg text-[#c8d6e5] z-[9990] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${isOpen ? "hidden" : ""}`}
        title="Open rough work"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <Pencil className="w-5 h-5" />
        {hasContent && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#1e2d4a]" />
        )}
      </button>

      {/* Overlay — resizable panel */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[9999] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: panelHeight, minHeight: MIN_HEIGHT }}
      >
        {/* Drag handle */}
        <div
          className="h-7 bg-[#1e2d4a] flex items-center justify-center cursor-ns-resize select-none shrink-0 border-b border-white/5 active:bg-[#253a5c]"
          style={{ touchAction: "none", WebkitTapHighlightColor: "transparent" }}
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
        >
          <GripHorizontal className="w-5 h-5 text-white/30" />
        </div>

        {/* Toolbar */}
        <div className="h-11 bg-[#1e2d4a] flex items-center px-2 gap-1 overflow-x-auto flex-shrink-0 border-b border-white/5">
          <button
            onClick={close}
            className="text-[#7eb8ff] text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-white/10 shrink-0"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
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
              className={`w-6 h-6 rounded-full shrink-0 mx-0.5 transition-all ${color === c ? "ring-2 ring-[#7eb8ff] ring-offset-1 ring-offset-[#1e2d4a]" : ""}`}
              style={{ background: c, WebkitTapHighlightColor: "transparent", minWidth: 24, minHeight: 24 }}
            />
          ))}

          <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />

          {THICKNESSES.map(t => (
            <button
              key={t}
              onClick={() => setThickness(t)}
              className={`w-8 h-8 flex items-center justify-center rounded-md shrink-0 border-2 transition-all ${thickness === t ? "border-[#7eb8ff]" : "border-transparent"}`}
              style={{ WebkitTapHighlightColor: "transparent", minWidth: 32, minHeight: 32 }}
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
            style={{
              touchAction: "none",
              cursor: tool === "eraser" ? "cell" : "crosshair",
              WebkitTapHighlightColor: "transparent",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
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
        <div
          className="fixed inset-0 z-[9998] bg-black/20"
          style={{ height: `calc(100vh - ${panelHeight}px)` }}
          onClick={close}
        />
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
      style={{ WebkitTapHighlightColor: "transparent", minWidth: 36, minHeight: 36 }}
      className={`w-9 h-9 flex items-center justify-center rounded-lg border-2 transition-all shrink-0 ${
        active ? "border-[#7eb8ff] text-[#7eb8ff] bg-[rgba(126,184,255,0.08)]" : "border-transparent text-[#94a3b8] hover:bg-white/5"
      } ${disabled ? "opacity-20 cursor-default" : "cursor-pointer"} ${className || ""}`}
    >
      {children}
    </button>
  );
}

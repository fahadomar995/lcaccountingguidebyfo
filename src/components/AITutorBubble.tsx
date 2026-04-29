import { useState } from "react";
import { Sparkles } from "lucide-react";
import { AITutor } from "@/components/AITutor";

export function AITutorBubble() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
          aria-label="Open AI tutor"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      )}
      {open && (
        <div className="fixed bottom-5 right-5 z-50">
          <AITutor variant="floating" onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
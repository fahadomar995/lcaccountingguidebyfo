import { AITutor } from "@/components/AITutor";

export default function TutorPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="font-display text-2xl font-bold">AI Accounting Tutor</h1>
        <p className="text-sm text-muted-foreground">Tailored for the LC Higher Level 2026 syllabus. 10 messages per day.</p>
      </div>
      <AITutor variant="panel" />
    </div>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Eraser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PageHeader, GenerateButton, OutputPanel, useAiGenerate } from "@/components/ai-tool-shell";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Workplace" },
      { name: "description", content: "Turn raw meeting notes into structured summaries, decisions, action items and deadlines." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const { loading, output, setOutput, generate } = useAiGenerate();
  const run = () => generate("meeting", `Meeting notes:\n\n${notes}`);
  const clearAll = () => { setNotes(""); setOutput(""); };

  return (
    <div>
      <PageHeader
        eyebrow="AI Tool"
        title="Meeting Notes Summarizer"
        description="Paste your raw meeting notes below. Get a clean summary with decisions, action items and deadlines."
        icon={FileText}
      />
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 rounded-2xl border bg-card shadow-card p-5 space-y-4 h-fit">
          <div className="space-y-1.5">
            <Label>Meeting Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your raw meeting notes here…"
              className="min-h-[360px] leading-relaxed"
            />
            <p className="text-xs text-muted-foreground">Tip: don't worry about formatting — the AI handles structure.</p>
          </div>
          <div className="flex gap-2">
            <GenerateButton loading={loading} onClick={run} disabled={!notes.trim()}>
              Summarize Notes
            </GenerateButton>
            <Button variant="outline" onClick={clearAll} className="h-11 rounded-xl">
              <Eraser className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="lg:col-span-3">
          <OutputPanel
            output={output}
            setOutput={setOutput}
            loading={loading}
            onRegenerate={run}
            onClear={() => setOutput("")}
          />
        </div>
      </div>
    </div>
  );
}

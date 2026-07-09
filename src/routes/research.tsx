import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Eraser } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader, GenerateButton, OutputPanel, useAiGenerate } from "@/components/ai-tool-shell";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace" },
      { name: "description", content: "Get structured, professional research briefings on any workplace topic." },
    ],
  }),
  component: ResearchPage,
});

type Length = "Short" | "Medium" | "Detailed";

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [length, setLength] = useState<Length>("Medium");
  const { loading, output, setOutput, generate } = useAiGenerate();

  const run = () =>
    generate(
      "research",
      `Research Topic: ${topic}
Optional Context: ${context || "(none)"}
Desired Output Length: ${length} (${length === "Short" ? "~200 words" : length === "Medium" ? "~500 words" : "~1000+ words"})`,
    );

  const clearAll = () => { setTopic(""); setContext(""); setLength("Medium"); setOutput(""); };

  return (
    <div>
      <PageHeader
        eyebrow="AI Tool"
        title="AI Research Assistant"
        description="Explore any topic with an executive summary, key insights, pros and cons, and clear recommendations."
        icon={Sparkles}
      />
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 rounded-2xl border bg-card shadow-card p-5 space-y-4 h-fit">
          <div className="space-y-1.5">
            <Label>Research Topic</Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Async work adoption in mid-size teams" />
          </div>
          <div className="space-y-1.5">
            <Label>Optional Context</Label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Add background, constraints, industry, or angle…"
              className="min-h-[140px]"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Output Length</Label>
            <Select value={length} onValueChange={(v) => setLength(v as Length)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Short">Short</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <GenerateButton loading={loading} onClick={run} disabled={!topic.trim()}>
              Research Topic
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

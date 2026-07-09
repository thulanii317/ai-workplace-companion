import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PageHeader,
  GenerateButton,
  OutputPanel,
  useAiGenerate,
} from "@/components/ai-tool-shell";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace" },
      { name: "description", content: "Generate professional emails with tone control in seconds." },
    ],
  }),
  component: EmailPage,
});

type Tone = "Formal" | "Friendly" | "Persuasive";

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [position, setPosition] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const { loading, output, setOutput, generate } = useAiGenerate();

  const buildPrompt = () =>
    `Recipient Name: ${recipient || "(not provided)"}
Recipient Position: ${position || "(not provided)"}
Email Subject: ${subject}
Purpose of the Email: ${purpose}
Key Points:
${keyPoints}

Tone: ${tone}

Please write the complete email now.`;

  const canGenerate = subject.trim() && purpose.trim() && keyPoints.trim();

  const run = () => generate("email", buildPrompt());
  const clearAll = () => {
    setRecipient(""); setPosition(""); setSubject(""); setPurpose(""); setKeyPoints("");
    setTone("Formal"); setOutput("");
  };

  return (
    <div>
      <PageHeader
        eyebrow="AI Tool"
        title="Smart Email Generator"
        description="Provide a few details and generate a polished, ready-to-send email in your preferred tone."
        icon={Mail}
      />
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 rounded-2xl border bg-card shadow-card p-5 space-y-4 h-fit">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Recipient Name</Label>
              <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Alex" />
            </div>
            <div className="space-y-1.5">
              <Label>Position <span className="text-muted-foreground">(optional)</span></Label>
              <Input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Marketing Lead" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Email Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Follow-up on Q4 proposal" />
          </div>
          <div className="space-y-1.5">
            <Label>Purpose of the Email</Label>
            <Input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Request a follow-up meeting" />
          </div>
          <div className="space-y-1.5">
            <Label>Key Points</Label>
            <Textarea
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="One point per line. e.g.&#10;- Confirm timeline&#10;- Share updated pricing&#10;- Propose Tuesday 2pm"
              className="min-h-[140px]"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-1">
            <GenerateButton loading={loading} onClick={run} disabled={!canGenerate}>
              Generate Email
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
            showWordCount
          />
        </div>
      </div>
    </div>
  );
}

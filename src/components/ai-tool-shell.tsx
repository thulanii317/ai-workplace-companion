import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, RefreshCw, Eraser, Check } from "lucide-react";
import { toast } from "sonner";

export type GenerateKind = "email" | "meeting" | "research";

export function useAiGenerate() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const generate = useCallback(async (kind: GenerateKind, userPrompt: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, userPrompt }),
      });
      if (!res.ok) {
        const msg = await res.text();
        toast.error(msg || "Generation failed");
        return;
      }
      const data = (await res.json()) as { content: string };
      setOutput(data.content);
    } catch (e) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, output, setOutput, generate };
}

export function OutputPanel({
  output,
  setOutput,
  loading,
  onRegenerate,
  onClear,
  showWordCount = false,
}: {
  output: string;
  setOutput: (v: string) => void;
  loading: boolean;
  onRegenerate: () => void;
  onClear: () => void;
  showWordCount?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };
  const words = output.trim() ? output.trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-2xl border bg-card shadow-card p-5 space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <h3 className="font-display font-semibold">AI Output</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copy} disabled={!output}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="ml-1.5">Copy</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onRegenerate} disabled={loading || !output}>
            <RefreshCw className={"h-4 w-4 " + (loading ? "animate-spin" : "")} />
            <span className="ml-1.5">Regenerate</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onClear} disabled={loading}>
            <Eraser className="h-4 w-4" />
            <span className="ml-1.5">Clear</span>
          </Button>
        </div>
      </div>

      {loading && !output ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-gradient-mint-sky blur-xl opacity-70 animate-pulse" />
            <Loader2 className="absolute inset-0 m-auto h-8 w-8 animate-spin text-foreground/70" />
          </div>
          <p className="text-sm text-muted-foreground">Generating a thoughtful response…</p>
        </div>
      ) : (
        <Textarea
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder="Your AI-generated response will appear here. You can edit it freely."
          className="min-h-[320px] bg-background/60 leading-relaxed font-sans resize-y"
        />
      )}

      {showWordCount && (
        <div className="text-xs text-muted-foreground text-right">{words} words</div>
      )}
    </div>
  );
}

export function GenerateButton({
  loading,
  onClick,
  disabled,
  children = "Generate",
}: {
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full h-11 rounded-xl bg-gradient-mint-sky text-foreground font-semibold shadow-soft hover:shadow-glow transition-all hover:brightness-105"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating…
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-mint-sky shadow-soft">
        <Icon className="h-6 w-6 text-foreground" />
      </div>
      <div>
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {eyebrow}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-display mt-1">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>
      </div>
    </div>
  );
}

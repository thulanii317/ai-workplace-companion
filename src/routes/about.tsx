import { createFileRoute } from "@tanstack/react-router";
import { Info, ShieldCheck, Sparkles, Zap, Lock } from "lucide-react";
import { PageHeader } from "@/components/ai-tool-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AI Workplace Productivity Assistant" },
      { name: "description", content: "About the AI Workplace Productivity Assistant — a no-signup AI toolkit for professionals." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Zap, title: "Instant", desc: "No accounts. Open the app and start using every tool immediately." },
  { icon: Lock, title: "Session-only", desc: "AI responses live only in your current browser session — nothing is stored." },
  { icon: ShieldCheck, title: "Human-in-the-loop", desc: "Every output is fully editable. Review before sending, always." },
  { icon: Sparkles, title: "Premium feel", desc: "Fast, minimal and polished — designed to feel like a great SaaS product." },
];

function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Info"
        title="About this assistant"
        description="A calm, capable AI workspace that helps professionals write, summarize, and research faster — without the sign-up friction."
        icon={Info}
      />

      <div className="rounded-3xl border bg-card shadow-card p-6 md:p-10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-mint-sky opacity-40 blur-3xl" />
        <div className="relative max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold font-display">Built for real workplace tasks</h2>
          <p className="text-muted-foreground leading-relaxed">
            The AI Workplace Productivity Assistant brings three focused tools together — a Smart Email Generator, a Meeting Notes Summarizer, and a Research Assistant — so you can move from idea to output without switching apps or filling out forms.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Everything runs in your browser session. We don't create an account for you, we don't store your inputs, and we don't require third-party logins. Open a page, use the tool, edit the response, copy the result — done.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-mint-sky shadow-soft">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold">{v.title}</h3>
            </div>
            <p className="mt-2.5 text-sm text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border bg-gradient-hero p-6 shadow-card">
        <h3 className="font-display font-semibold text-lg">Responsible AI</h3>
        <p className="text-sm text-foreground/80 mt-2 max-w-3xl">
          AI-generated content may contain inaccuracies. Always review and verify important information before using it for business or professional purposes. Treat every response as a strong first draft, not a final answer.
        </p>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, Sparkles, ArrowRight, Zap, Clock, TrendingUp, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Draft professional emails with the right tone in seconds.",
    accent: "from-[#A8E6CF] to-[#C7F0DE]",
  },
  {
    to: "/meetings",
    icon: FileText,
    title: "Meeting Notes Summarizer",
    desc: "Turn messy notes into decisions, action items and deadlines.",
    accent: "from-[#A7D8F0] to-[#CDEAF7]",
  },
  {
    to: "/research",
    icon: Sparkles,
    title: "AI Research Assistant",
    desc: "Get structured briefings on any workplace topic instantly.",
    accent: "from-[#A8E6CF] to-[#A7D8F0]",
  },
] as const;

const stats = [
  { label: "Tools available", value: "3", icon: Sparkles },
  { label: "Avg. response time", value: "~4s", icon: Clock },
  { label: "Session-only privacy", value: "100%", icon: Zap },
  { label: "Productivity lift", value: "+38%", icon: TrendingUp },
];

const tips = [
  "Be specific about your audience and desired outcome — the AI mirrors your clarity.",
  "For meetings, paste raw notes; the summarizer handles the structure.",
  "Use the tone selector to match your relationship with the recipient.",
  "Always review AI output before sending — treat it as a strong first draft.",
];

function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card p-6 md:p-10 shadow-card">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-mint-sky opacity-40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-mint-sky opacity-30 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Welcome back
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold font-display leading-tight max-w-3xl">
            Your calm, capable <span className="bg-gradient-mint-sky bg-clip-text text-transparent">AI workspace</span>.
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Draft emails, summarize meetings and research topics — instantly. No accounts, no clutter, no data stored beyond your browser session.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/email" className="inline-flex items-center gap-2 rounded-xl bg-gradient-mint-sky px-5 py-2.5 text-sm font-semibold shadow-soft hover:shadow-glow transition-all">
              Start with an Email <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/research" className="inline-flex items-center gap-2 rounded-xl border bg-background/70 px-5 py-2.5 text-sm font-semibold hover:bg-accent transition-colors">
              Try Research Assistant
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-4 shadow-card hover:shadow-soft transition-shadow">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <s.icon className="h-3.5 w-3.5" />
              {s.label}
            </div>
            <div className="mt-2 text-2xl font-bold font-display">{s.value}</div>
          </div>
        ))}
      </section>

      {/* Tools */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold font-display">Quick actions</h2>
            <p className="text-sm text-muted-foreground">Jump straight into any assistant.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-card hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${t.accent} opacity-60 blur-2xl group-hover:opacity-90 transition-opacity`} />
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-mint-sky shadow-soft">
                  <t.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="mt-4 font-semibold font-display">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 group-hover:text-foreground">
                  Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="rounded-2xl border bg-card p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-mint-sky shadow-soft">
            <Lightbulb className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-bold font-display">AI productivity tips</h2>
        </div>
        <ul className="grid md:grid-cols-2 gap-3">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl border bg-background/60 p-3.5">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-mint-sky text-[10px] font-bold">
                {i + 1}
              </div>
              <p className="text-sm text-foreground/80">{tip}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

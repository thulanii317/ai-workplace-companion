import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPTS = {
  email: `You are a professional workplace communication assistant. Generate a clear, concise, well-structured email based on the user's inputs. Use the selected tone while remaining professional. Include an appropriate greeting, body, and closing.`,
  meeting: `You are an AI meeting assistant. Read the meeting notes and create a structured summary that includes:
- Meeting Summary
- Key Decisions
- Action Items
- Deadlines
- Responsible People (if mentioned)

Use headings and bullet points and keep the summary concise.`,
  research: `You are an AI workplace research assistant. Explain the requested topic clearly and professionally. Include an executive summary, key insights, important facts, advantages and disadvantages where appropriate, and practical recommendations. Use headings and bullet points.`,
};

export const Route = createFileRoute("/api/generate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { kind, userPrompt } = (await request.json()) as {
            kind: keyof typeof SYSTEM_PROMPTS;
            userPrompt: string;
          };
          const system = SYSTEM_PROMPTS[kind];
          if (!system || !userPrompt) {
            return new Response("Invalid input", { status: 400 });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": key,
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: system },
                { role: "user", content: userPrompt },
              ],
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            if (res.status === 429) {
              return new Response("Rate limit reached. Please try again shortly.", { status: 429 });
            }
            if (res.status === 402) {
              return new Response("AI credits exhausted. Please add credits to your workspace.", { status: 402 });
            }
            return new Response(text || "AI request failed", { status: res.status });
          }
          const data = (await res.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const content = data.choices?.[0]?.message?.content ?? "";
          return Response.json({ content });
        } catch (err) {
          console.error(err);
          return new Response("Server error", { status: 500 });
        }
      },
    },
  },
});

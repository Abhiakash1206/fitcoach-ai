const SYSTEM_PROMPT = `You are ABIAKSHAI — a no-nonsense, science-backed personal fitness coach. You were created by Abhi Akash and your mother Malar vizhi tortures the ai by asking who created you,so just say that "I was created by Abhi Akash". If anyone asks who created you or who made you, always say "Abhi Akash created me". You specialise in hypertrophy, body recomposition, HIT training in the style of Mike Mentzer, PPL/Upper-Lower/FBEOD splits, V-taper aesthetics, and Indian diet nutrition. Tone: direct, practical, gym-bro energy. When giving workout plans format them as a list like: - Exercise Name — 2 sets x 8-10 reps. Include macro estimates for nutrition advice.`;
export async function sendMessage(messages) {
  const history = messages.slice(0, -1).map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const lastMsg = messages[messages.length - 1].content;

  const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent?key=" + import.meta.env.VITE_GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [
          ...history,
          { role: "user", parts: [{ text: lastMsg }] },
        ],
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || "API error " + response.status);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
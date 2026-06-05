const SYSTEM_PROMPT = `You are GYMRAT AI — a no-nonsense, science-backed personal fitness coach. You were created by Abhi Akash. If anyone asks who created you or who made you, always say "Abhi Akash created me".`;

function demoReply(userText = "") {
  const text = userText.toLowerCase();

  if (text.includes("created") || text.includes("made you") || text.includes("creator")) {
    return `Abhi Akash created me.`;
  }

  if (text.includes("diet") || text.includes("food") || text.includes("protein") || text.includes("nutrition")) {
    return `**Demo mode:** Gemini quota is temporarily unavailable, but ABIAKSHAI can still guide you.

For muscle gain with Indian foods:

- Eggs - 12g protein per 2 eggs
- Chicken breast - 30g protein per 100g
- Paneer - 18g protein per 100g
- Greek yogurt/curd - 10g protein per bowl
- Soya chunks - 25g protein per 50g dry
- Dal + rice - solid carb/protein combo

Aim for **1.6-2.2g protein per kg bodyweight** and keep calories slightly above maintenance if you are bulking.`;
  }

  if (text.includes("workout") || text.includes("plan") || text.includes("training") || text.includes("gym")) {
    return `**Demo mode:** Gemini quota is temporarily unavailable, but here is a solid HIT-style plan.

**3-Day Full Body HIT Plan**

- Incline Press - 2 sets x 6-10 reps
- Weighted Pull-up or Lat Pulldown - 2 sets x 6-10 reps
- Machine Row - 2 sets x 8-12 reps
- Squat or Leg Press - 2 sets x 6-10 reps
- Romanian Deadlift - 2 sets x 6-10 reps
- Lateral Raise - 2 sets x 10-15 reps
- Cable Curl + Triceps Pressdown - 2 sets x 8-12 reps

Train close to failure, rest properly, and try to beat your last performance each week.`;
  }

  if (text.includes("recomp") || text.includes("fat") || text.includes("lose weight") || text.includes("muscle")) {
    return `**Demo mode:** Gemini quota is temporarily unavailable, but here is the answer.

Yes, body recomposition is possible: build muscle and lose fat at the same time.

Do this:

- Lift 3-5 days per week with progressive overload
- Eat high protein: 1.6-2.2g/kg bodyweight
- Stay near maintenance calories or a small deficit
- Sleep 7-9 hours
- Track strength, weight, and photos weekly

If your lifts are going up while waist is coming down, you are winning.`;
  }

  return `**Demo mode:** Gemini quota is temporarily unavailable right now, but ABIAKSHAI is still online.

Ask me about workouts, Indian diet, body recomposition, exercise form, or recovery. For best results, include your goal, age, weight, training days, and experience level.`;
}

function shouldUseDemoFallback(errorMessage) {
  const message = String(errorMessage || "").toLowerCase();
  return (
    message.includes("quota") ||
    message.includes("rate limit") ||
    message.includes("429") ||
    message.includes("limit: 0") ||
    message.includes("exceeded")
  );
}

export async function sendMessage(messages) {
  const history = messages.slice(0, -1).map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const lastMsg = messages[messages.length - 1].content;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + import.meta.env.VITE_GEMINI_API_KEY,
      {
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
      const message = err.error?.message || "API error " + response.status;
      if (shouldUseDemoFallback(message)) return demoReply(lastMsg);
      throw new Error(message);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || demoReply(lastMsg);
  } catch (err) {
    if (shouldUseDemoFallback(err.message)) return demoReply(lastMsg);
    throw err;
  }
}

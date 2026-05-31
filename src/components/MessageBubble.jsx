function formatTime() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function parseContent(text) {
  // Detect workout plan table pattern: lines like "Exercise — 2 sets × 8-10 reps"
  const lines = text.split("\n");
  const tableLines = lines.filter(l => /\d+\s*(set|rep|×)/i.test(l));
  
  if (tableLines.length >= 3) {
    // Build a workout table from bullet/numbered lines
    const tableRows = lines
      .filter(l => l.trim())
      .map(l => l.replace(/^[-•*\d.]+\s*/, "").trim())
      .filter(l => l.length > 2);

    const hasTable = tableRows.some(r => /\d+\s*(set|rep|×)/i.test(r));
    if (hasTable) return { type: "workout", rows: tableRows };
  }

  return { type: "text", text };
}

function renderText(text) {
  return text
    .replace(/```[\s\S]*?```/g, m => {
      const code = m.replace(/```\w*\n?/g, "").replace(/```/g, "");
      return `<pre><code>${code}</code></pre>`;
    })
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  const time = formatTime();

  if (isUser) {
    return (
      <div className="msg-row user">
        <div className="msg-bubble user">{content}</div>
        <span className="msg-time">{time}</span>
      </div>
    );
  }

  // AI bubble — check for workout table pattern
  const parsed = parseContent(content);

  if (parsed.type === "workout") {
    const exerciseRows = parsed.rows.filter(r => /\d+\s*(set|rep|×)/i.test(r));
    const nonTableText = parsed.rows.filter(r => !/\d+\s*(set|rep|×)/i.test(r)).join(" ");

    return (
      <div className="msg-row assistant">
        <div className="msg-bubble assistant">
          {nonTableText && (
            <p style={{ marginBottom: "12px" }}
               dangerouslySetInnerHTML={{ __html: renderText(nonTableText) }} />
          )}
          <table className="workout-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th className="right">Sets / Reps</th>
              </tr>
            </thead>
            <tbody>
              {exerciseRows.map((row, i) => {
                const match = row.match(/^(.*?)[\s—\-:]+(\d+.*$)/);
                if (match) {
                  return (
                    <tr key={i}>
                      <td>{match[1].trim()}</td>
                      <td className="primary-val">{match[2].trim()}</td>
                    </tr>
                  );
                }
                return <tr key={i}><td colSpan={2}>{row}</td></tr>;
              })}
            </tbody>
          </table>
          <button className="msg-action-btn">
            <span className="material-symbols-outlined">add_task</span>
            Save to workout log
          </button>
        </div>
        <span className="msg-time">{time}</span>
      </div>
    );
  }

  return (
    <div className="msg-row assistant">
      <div
        className="msg-bubble assistant"
        dangerouslySetInnerHTML={{ __html: renderText(content) }}
      />
      <span className="msg-time">{time}</span>
    </div>
  );
}

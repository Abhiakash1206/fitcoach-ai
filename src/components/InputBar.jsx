import { useState, useRef, useEffect } from "react";

export default function InputBar({ onSend, loading }) {
  const [text, setText] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [text]);

  const submit = () => {
    if (!text.trim() || loading) return;
    onSend(text.trim());
    setText("");
    if (ref.current) ref.current.style.height = "auto";
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="input-area">
      <div className="input-row">
        <button className="icon-btn input-attach" aria-label="Attach">
          <span className="material-symbols-outlined">add_circle</span>
        </button>
        <div className="input-wrap">
          <textarea
            ref={ref}
            className="chat-input"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask FitCoach anything..."
            rows={1}
            disabled={loading}
          />
        </div>
        <button
          className="send-btn"
          onClick={submit}
          disabled={loading || !text.trim()}
          aria-label="Send"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
}

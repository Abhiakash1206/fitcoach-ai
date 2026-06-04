import { useState, useRef, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import WorkoutsPage from "./components/WorkoutsPage";
import ProgressPage from "./components/ProgressPage";
import ProfilePage from "./components/ProfilePage";
import { sendMessage } from "./api/claude";
import { saveMessage, loadMessages, SESSION_ID } from "./db";
import "./App.css";

const QUICK_PROMPTS = [
  { icon: "calendar_month", label: "Workout Plan", text: "Give me a 3-day full body HIT workout plan with sets and reps" },
  { icon: "restaurant", label: "Nutrition", text: "Best high-protein Indian foods for muscle gain?" },
  { icon: "exercise", label: "Technique", text: "Correct form for Romanian Deadlifts?" },
  { icon: "analytics", label: "Science", text: "Explain body recomposition - can I build muscle and lose fat at the same time?" },
];

const NAV_ITEMS = [
  { icon: "smart_toy", label: "Coach", id: "coach" },
  { icon: "fitness_center", label: "Workouts", id: "workouts" },
  { icon: "insights", label: "Progress", id: "progress" },
  { icon: "person", label: "Profile", id: "profile" },
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeNav, setActiveNav] = useState("coach");
  const bottomRef = useRef(null);

  useEffect(() => {
    loadMessages(SESSION_ID).then(msgs => {
      if (msgs.length > 0) setMessages(msgs);
    });
  }, []);

  const scrollDown = () =>
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 60);

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);
    setActiveNav("coach");
    scrollDown();
    await saveMessage("user", text);

    try {
      const reply = await sendMessage(next);
      setMessages([...next, { role: "assistant", content: reply }]);
      await saveMessage("assistant", reply);
    } catch (err) {
      setMessages([
        ...next,
        { role: "assistant", content: `**Error:** ${err.message}` },
      ]);
    } finally {
      setLoading(false);
      scrollDown();
    }
  };

  const renderCoach = () => (
    <>
      <main className="chat-main">
        {messages.length === 0 ? (
          <div className="welcome">
            <div className="welcome-badge">
              <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "var(--primary)", fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span>Your AI Fitness Coach</span>
            </div>
            <div className="welcome-icon-wrap">
              <span className="material-symbols-outlined">fitness_center</span>
            </div>
            <h2 className="welcome-heading">
              Train smarter<br /><span className="accent">with AbiAkshai</span>
            </h2>
            <p className="welcome-sub">
              Your AI coach is online. Ask anything about training, nutrition, or recovery.
            </p>
            <div className="quick-grid">
              {QUICK_PROMPTS.map((p) => (
                <button key={p.label} className="quick-card" onClick={() => handleSend(p.text)}>
                  <div className="quick-icon">
                    <span className="material-symbols-outlined">{p.icon}</span>
                  </div>
                  <div>
                    <div className="quick-label">{p.label}</div>
                    <div className="quick-text">{p.text.length > 48 ? p.text.slice(0, 48) + "..." : p.text}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <ChatWindow messages={messages} loading={loading} />
            <div ref={bottomRef} style={{ height: 8 }} />
          </>
        )}
      </main>
      <InputBar onSend={handleSend} loading={loading} />
    </>
  );

  return (
    <div className="app">
      <header className="top-bar">
        <div className="top-bar-brand">
          <span className="material-symbols-outlined top-bar-logo" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>bolt</span>
          <span className="top-bar-title">AbiAkshai</span>
        </div>
        <div className="top-bar-actions">
          <button className="icon-btn" aria-label="Search">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="icon-btn" aria-label="Settings">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {activeNav === "coach" && renderCoach()}
      {activeNav === "workouts" && <WorkoutsPage />}
      {activeNav === "progress" && <ProgressPage messages={messages} />}
      {activeNav === "profile" && <ProfilePage />}

      <nav className="bottom-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeNav === item.id ? "active" : ""}`}
            onClick={() => setActiveNav(item.id)}
            aria-label={item.label}
          >
            <span className="material-symbols-outlined" style={activeNav === item.id ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {item.icon}
            </span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

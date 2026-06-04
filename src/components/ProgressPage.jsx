const GOALS = [
  { label: "Bench Press", current: 55, target: 80, unit: "kg" },
  { label: "Squat", current: 80, target: 120, unit: "kg" },
  { label: "Bodyweight", current: 67, target: 72, unit: "kg" },
  { label: "Protein", current: 105, target: 135, unit: "g" },
];

export default function ProgressPage({ messages = [] }) {
  const userMessages = messages.filter((message) => message.role === "user").length;
  const aiMessages = messages.filter((message) => message.role === "assistant").length;

  return (
    <main className="page-main">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Progress</p>
          <h1>Your training dashboard</h1>
          <p className="page-sub">Track your app activity and your main fitness targets in one clean view.</p>
        </div>
        <div className="hero-stat">
          <span>{messages.length}</span>
          <small>messages</small>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="material-symbols-outlined">chat</span>
          <strong>{userMessages}</strong>
          <small>Questions asked</small>
        </article>
        <article className="stat-card">
          <span className="material-symbols-outlined">psychology</span>
          <strong>{aiMessages}</strong>
          <small>Coach replies</small>
        </article>
        <article className="stat-card">
          <span className="material-symbols-outlined">local_fire_department</span>
          <strong>1</strong>
          <small>Active session</small>
        </article>
      </section>

      <section className="goal-panel">
        <div className="section-heading">
          <p className="eyebrow">Goals</p>
          <h2>Current targets</h2>
        </div>
        <div className="goal-list">
          {GOALS.map((goal) => {
            const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
            return (
              <div className="goal-row" key={goal.label}>
                <div className="goal-label">
                  <span>{goal.label}</span>
                  <strong>{goal.current}/{goal.target}{goal.unit}</strong>
                </div>
                <div className="goal-track">
                  <div className="goal-fill" style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

import { useEffect, useState } from "react";

const DEFAULT_PROFILE = {
  name: "Abhi Akash",
  weight: "67",
  height: "175",
  goal: "Body recomposition",
  split: "3-day HIT",
  level: "Intermediate",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  useEffect(() => {
    const saved = localStorage.getItem("abiakshai_profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const updateProfile = (field, value) => {
    const next = { ...profile, [field]: value };
    setProfile(next);
    localStorage.setItem("abiakshai_profile", JSON.stringify(next));
  };

  return (
    <main className="page-main">
      <section className="profile-header">
        <div className="avatar-mark">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div>
          <p className="eyebrow">Profile</p>
          <h1>{profile.name}</h1>
          <p className="page-sub">Personalize the coach around your training goal, split, and current stats.</p>
        </div>
      </section>

      <section className="profile-form">
        <label>
          <span>Name</span>
          <input value={profile.name} onChange={(event) => updateProfile("name", event.target.value)} />
        </label>
        <label>
          <span>Weight</span>
          <input value={profile.weight} onChange={(event) => updateProfile("weight", event.target.value)} />
        </label>
        <label>
          <span>Height</span>
          <input value={profile.height} onChange={(event) => updateProfile("height", event.target.value)} />
        </label>
        <label>
          <span>Goal</span>
          <select value={profile.goal} onChange={(event) => updateProfile("goal", event.target.value)}>
            <option>Body recomposition</option>
            <option>Lean bulk</option>
            <option>Fat loss</option>
            <option>Strength gain</option>
          </select>
        </label>
        <label>
          <span>Training split</span>
          <select value={profile.split} onChange={(event) => updateProfile("split", event.target.value)}>
            <option>3-day HIT</option>
            <option>Push Pull Legs</option>
            <option>Upper Lower</option>
            <option>Full body EOD</option>
          </select>
        </label>
        <label>
          <span>Level</span>
          <select value={profile.level} onChange={(event) => updateProfile("level", event.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>
      </section>

      <section className="app-info">
        <p className="eyebrow">App info</p>
        <div><span>Created by</span><strong>Abhi Akash</strong></div>
        <div><span>AI model</span><strong>Gemini</strong></div>
        <div><span>Storage</span><strong>Firebase + LocalStorage</strong></div>
      </section>
    </main>
  );
}

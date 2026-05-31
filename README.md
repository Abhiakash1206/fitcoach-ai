# 💪 FitCoach AI

An AI-powered fitness chatbot built with **React** and the **Claude API**. Ask it anything about training, nutrition, recovery, and workout planning — it responds like a knowledgeable gym coach.

![FitCoach AI](https://img.shields.io/badge/Built_with-Claude_API-orange) ![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## Features

- Chat interface powered by Claude (Anthropic)
- Fitness-specific system prompt with expertise in:
  - Workout splits (PPL, Upper/Lower, Full Body, HIT/Mentzer-style)
  - Hypertrophy, fat loss, and body recomposition
  - Indian food nutrition guidance
  - Form tips and training principles
- Quick-start prompts for instant ideas
- Dark athletic UI
- Maintains full conversation context across turns

## Tech Stack

- **Frontend:** React 18 + Vite
- **AI:** Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Styling:** Pure CSS (no UI library)

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/fitcoach-ai.git
cd fitcoach-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

```bash
cp .env.example .env
```

Open `.env` and add your Anthropic API key:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Get your API key at [console.anthropic.com](https://console.anthropic.com).

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
fitcoach-ai/
├── src/
│   ├── api/
│   │   └── claude.js        # Claude API integration + system prompt
│   ├── components/
│   │   ├── ChatWindow.jsx   # Renders message list
│   │   ├── MessageBubble.jsx # Individual message with formatting
│   │   └── InputBar.jsx     # Text input + send button
│   ├── App.jsx              # Main app + state management
│   └── App.css              # All styles
├── index.html
├── vite.config.js
└── .env.example
```

## Customization

- Edit the `SYSTEM_PROMPT` in `src/api/claude.js` to change the coach's personality or focus area
- Add quick-start prompts in `App.jsx` under `QUICK_PROMPTS`
- Swap the model in `claude.js` for a different Claude version

## Security Note

Never commit your `.env` file. The `.gitignore` is already configured to exclude it.

---

Built by [Abhi](https://github.com/YOUR_USERNAME) — IT student, fitness vlogger, and gym rat 🏋️

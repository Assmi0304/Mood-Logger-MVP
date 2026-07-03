<div align="center">

# 🪵✨ Mood Logger

### *A quiet little corner of the internet for your feelings*

![Made with Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-orange?style=for-the-badge&logo=googlechrome&logoColor=white)
![No Backend](https://img.shields.io/badge/Backend-None%20needed-brightgreen?style=for-the-badge)

![Status](https://img.shields.io/badge/status-active-success?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-purple?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff69b4?style=flat-square)
![Made with Love](https://img.shields.io/badge/made%20with-%E2%9D%A4-red?style=flat-square)

</div>

---

## 🌿 What is this?

**Mood Logger** is a minimal, cozy, journal-style app for tracking how your day *actually* felt — no productivity guilt, no streaks-shaming, no algorithms. Just you, a mood, and a few words if you feel like it.

> 🚫 Not a productivity tool.
> 🌱 Just a soft emotional diary.

---

## 🧵 Table of Contents

<details>
<summary>📌 Click to expand</summary>

- [✨ Features](#-features)
- [🎨 Design System](#-design-system)
- [🧭 Pages](#-pages)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Folder Structure](#-folder-structure)
- [🧠 How Data Works](#-how-data-works)
- [🖼️ Screenshots](#️-screenshots)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

</details>

---

## ✨ Features

| | |
|---|---|
| 😄😐😔😡 | Pick your mood in one tap |
| 📝 | Add an optional note about your day |
| 💾 | Everything saved locally — no account leaks, no cloud |
| 🔐 | Local sign-in to keep your journal to yourself on shared devices |
| 📊 | Profile page with streaks & mood stats |
| 💬 | Daily "Thought of the Day" quote to sit with |
| 🎨 | Warm, earthy, distraction-free design |
| 📱 | Mobile-first, works beautifully on your phone |

---

## 🎨 Design System

<details>
<summary>🖌️ <b>Color Palette</b> — click to expand</summary>

| Swatch | Name | Hex |
|:---:|---|---|
| 🟨 | Background | `#F6F1E9` |
| 🟫 | Card | `#E7D8C9` |
| ⬛ | Primary Text | `#3E3A36` |
| ◻️ | Secondary Text | `#6B625B` |
| 🟧 | Accent | `#A67C52` |
| ⬜ | Border | `#D8C4B6` |
| 🟠 | Highlight | `#C7A27C` |

</details>

<details>
<summary>🔤 <b>Typography</b> — click to expand</summary>

- **Headings** → `DM Serif Display` — calm, editorial, journal-like
- **Body** → `Inter` — clean and readable

</details>

<details>
<summary>🧱 <b>UI Rules</b> — click to expand</summary>

- Rounded corners: `16–24px`
- Soft shadows only — `0 10px 30px rgba(62, 58, 54, 0.08)`
- Hover = gentle lift (`translateY(-2px)`)
- No neon. No harsh colors. No aggressive UI. Ever.

</details>

---

## 🧭 Pages

<details>
<summary>🔑 <b>/</b> — Login</summary>

First visit creates your local profile (name + password). Every visit after, it checks against what's stored. 100% local — not real security, just a soft gate.

</details>

<details>
<summary>📓 <b>/tracker</b> — Mood Tracker</summary>

The heart of the app. Pick a mood, write a note (or don't), save it, watch your journal grow below.

</details>

<details>
<summary>💭 <b>/thought</b> — Thought of the Day</summary>

A fresh quote every day, fetched live and cached so it stays put until tomorrow. Falls back to a cozy local quote list if you're offline.

</details>

<details>
<summary>👤 <b>/profile</b> — Your Stats</summary>

Total entries logged · your most common mood · current day streak.

</details>

---

## 🛠️ Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_14-App_Router-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

</div>

- No backend
- No database
- No external auth
- Just `localStorage` doing its quiet best 🌱

---

## 🚀 Getting Started

```bash
# 1. Clone it
git clone https://github.com/Assmi0304/Mood-Logger-MVP.git
cd Mood-Logger-MVP/mood-logger

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 📁 Folder Structure

<details>
<summary>📂 click to expand tree</summary>

```
mood-logger/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 → 🔑 Login
│   └── (protected)/
│       ├── layout.tsx           → 🛡️ Auth guard + Navbar
│       ├── tracker/page.tsx     → 📓 Mood tracker
│       ├── profile/page.tsx     → 👤 Stats
│       └── thought/page.tsx     → 💭 Daily quote
├── components/
│   ├── MoodSelector.tsx
│   ├── NoteInput.tsx
│   ├── SaveButton.tsx
│   ├── EntryList.tsx
│   ├── EntryCard.tsx
│   └── Navbar.tsx
├── lib/
│   ├── storage.ts               → mood entry persistence
│   ├── auth.ts                  → local login logic
│   ├── quotes.ts                → daily quote fetch + cache
│   └── stats.ts                 → streaks & mood stats
├── types/
│   └── index.ts
└── styles/
    └── globals.css
```

</details>

---

## 🧠 How Data Works

<details>
<summary>💾 localStorage keys used</summary>

| Key | What it holds |
|---|---|
| `mood-entries` | Array of all your mood + note entries |
| `mood-user` | Your local name + password |
| `mood-session` | Whether you're currently signed in |
| `mood-quote-YYYY-M-D` | Today's cached "Thought of the Day" |

</details>

---

## 🖼️ Screenshots

> 📸 *Add your own screenshots here once deployed!*

<div align="center">

| Login | Tracker | Profile | Thought |
|:---:|:---:|:---:|:---:|
| 🔑 | 📓 | 👤 | 💭 |
| *coming soon* | *coming soon* | *coming soon* | *coming soon* |

</div>

---

## 🗺️ Roadmap

- [x] Mood selector + journal notes
- [x] Local sign-in
- [x] Profile stats + streaks
- [x] Daily thought/quote
- [ ] Mood trend chart 📈
- [ ] Export entries as JSON
- [ ] Dark "night journal" theme 🌙

---

## 🤝 Contributing

Got an idea to make this cozier? PRs and issues are always welcome 💌

---

## 📜 License

MIT — do whatever brings you joy with it 🌼

<div align="center">

Made with 🪵 and quiet feelings.

![Footer](https://img.shields.io/badge/thanks%20for%20visiting-%F0%9F%8C%BF-8B5E3C?style=for-the-badge)

</div>

# About Me / Portfolio Card 🖤

A highly aesthetic, minimalist, and dynamic "About Me" profile page built with React and Tailwind CSS. Designed to feel premium, featuring glassmorphism elements, custom typography, smooth framer-motion animations, a customized audio player, and a live Discord presence badge.

---

## ✨ Features

- **Dark & Minimalist UI**: An elegant, monochromatic color scheme focused on deep blacks and subtle purples (`#5a5360`).
- **Live Discord Status**: A live, dynamic badge that syncs with your actual Discord presence (Online/Offline) with custom aesthetic dialogue and a glowing character sprite.
- **Ambient Layout**: Includes subtle ambient background glowing orbs, elegant fonts (`Outfit`, `DM Serif Display`), and smooth hover micro-interactions.
- **Custom Music Player**: A custom-styled audio player built natively tracking the duration of any `music.mp3`, featuring a minimalistic progress bar, playback controls, and muted states.
- **Refined Typography**: Sleek centered Quote component paired with beautifully spaced text.
- **Fully Responsive**: Carefully scales and adapts to any screen size—from ultrawide desktop monitors to standard mobile phones.

## 🛠️ Tech Stack

- **React 18** + **Vite** (Environment)
- **TypeScript** (Strict Type Safety)
- **Tailwind CSS v4** (Utility-first styling & responsiveness)
- **Framer Motion** (Smooth mount and interaction animations)
- **Lucide React** (Clean SVG icons)
- **CountAPI** (Live Visitor tracking)
- **Lanyard API / custom hooks** (Discord Status fetching)

---

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Personalization**
   - Replace the `src/assets/pfp.png` with your profile picture.
   - Replace `public/music.mp3` with your preferred aesthetic background audio.
   - Replace the `1241601451440996413` Discord ID in `StatusBadge.tsx` with your own (must be in a mutual server with the Lanyard bot).
   - Change your social media links across `SocialLinks.tsx`.

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🎨 Aesthetics & Design Notes

This project prioritizes high-fidelity visual design. Avoid altering the standard padding scales or default Tailwind borders—the glassmorphism overlays rely primarily on deep background blurs (`backdrop-blur`) mixed with carefully tuned opacities (usually ~30%-40%) overlaying onto `#070707` backgrounds. 

When replacing icons, use monochromatic `.svg` icons and rely on the `filter: drop-shadow(...)` utilities configured in `index.css` for the glow effects.

---
*Created carefully to impress.*

# Sazzad Hossain | Software Engineer & Full-Stack Architect

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.2-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-EF4FB5?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

> A high-performance, SEO-optimized developer portfolio engineered with bleeding-edge web technologies — featuring an AI-powered chat assistant, cinematic animations, and a seamless dual-theme experience.

---

## ✨ Key Features

### 🤖 AI Chat Assistant
- **Conversational Insights**: An OpenAI-powered chat interface that lets visitors query my skills, projects, and professional background.
- **Context-Aware Mastery**: Fed with structured portfolio data (`portfolioContext.ts`) and a customized system prompt for accurate, personality-driven responses.
- **Real-time Streaming**: Leverages the Vercel AI SDK for smooth, lightning-fast streaming replies.

### ⚡ Performance & Optimization
- **Critical Path Optimization**: Injected critical CSS in the root layout to eliminate the "white flash" during initial uncached loads.
- **SSR-Aware Entrance**: A bespoke 0–100% loader that is fully visible in the initial SSR HTML, preventing "black window" hydration delays.
- **Turbopack Powered**: Blazing fast development experience with Next.js 16 and Turbopack.

### 🔍 Elite SEO & Visibility
- **Structured Data**: Integrated JSON-LD (Schema.org) support for rich search results and professional indexing.
- **Dynamic Sitemap**: Automated discovery via `sitemap.ts` and `robots.ts` ensuring 100% search engine coverage.
- **Semantic HTML5**: Engineered with a strict heading hierarchy and accessible landmarks for maximum reach.

### 💎 Premium User Experience
- **Cinematic Motion**: High-fidelity transitions powered by Framer Motion and GSAP.
- **Silky Smooth Scroll**: Integrated Lenis for a refined, modern scrolling experience.
- **Interactive Atmosphere**: A custom-built mesh background and particle system that reacts to user engagement.
- **Zero-Flicker Theming**: Smooth transitions between Navy Dark and Rose modes via `next-themes`.

---

## 🎨 Customization & Personalization

This portfolio is designed to be fully data-driven. To personalize the content for yourself, you only need to modify two core files:

1.  **Main Portfolio Content**: Edit `src/lib/defaultContent.ts`. This file contains all the text, project details, experience, and social links displayed across the site.
2.  **AI Assistant Context**: Edit `src/lib/portfolioContext.ts`. This file provides the structured data that the AI uses to answer questions about you. Ensure this matches your `defaultContent` for consistency.
3.  **Visual Branding**: Design tokens like colors and fonts are managed in `src/index.css` using Tailwind v4 theme variables.

---

## 🛠️ Technical Stack

| Category | Technology |
| :--- | :--- |
| **Core** | Next.js 16 (App Router), React 19, TypeScript 6 |
| **Styling** | Tailwind CSS v4.2, Modern CSS Variables, Glassmorphism |
| **Motion** | Framer Motion 11, GSAP 3, Lenis Scroll |
| **AI Layer** | OpenAI SDK v4, Vercel AI SDK (`ai`), Custom System Prompts |
| **UI Components** | Radix UI Primitives, Lucide Icons, Custom SVG System |
| **Architecture** | Content-driven Singleton Pattern (`ContentManager`) |

---

## 🏗️ Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** / **pnpm** / **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sazzad4677/myportfolio-sazzad.dev.git
cd myportfolio-sazzad.dev

# 2. Install dependencies
npm install

# 3. Configure Environment
cp .env.local.example .env.local
# Add your OPENAI_API_KEY to .env.local
```

### Development

```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router (Pages, API, SEO)
├── components/          # Modular UI components (AI, Hero, Works, etc.)
│   ├── motion/          # Animation wrappers (Magnetic, SmoothScroll)
│   ├── Shared/          # App-wide layout wrappers
│   └── ui/              # Radix/Shadcn primitives
├── hooks/               # Custom React hooks
├── lib/                 # Core logic (Content Management, AI Config)
│   ├── contentManager.ts# State manager for portfolio content
│   └── defaultContent.ts# Centralized data store
└── index.css            # Global styles and Tailwind configuration
```

---

## 🤖 AI Context System

The AI assistant is more than just a chatbot; it's a representation of my professional persona. It consumes structured data from `lib/portfolioContext.ts` which includes:
- Deep dives into project architectures.
- Verified skill sets and experience levels.
- Direct links to certifications and social profiles.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Built with precision by **Sazzad Hossain**.  
[🌐 Portfolio](https://sazzad.dev) · [💼 LinkedIn](https://www.linkedin.com/in/sazzad4673/) · [🐙 GitHub](https://github.com/sazzad4677/)

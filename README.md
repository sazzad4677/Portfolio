# Sazzad Hossain | Software Engineer & Full-Stack Architect

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-EF4FB5?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![OpenAI](https://img.shields.io/badge/OpenAI-SDK-412991?style=for-the-badge&logo=openai)](https://platform.openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

> A high-performance, SEO-optimized developer portfolio engineered with the latest modern web technologies — featuring an AI-powered chat assistant, cinematic animations, and a seamless dual-theme experience.

---

## ✨ Key Features

### 🤖 AI Chat Assistant
- **"Ask Me Anything" Interface**: An OpenAI-powered chat bubble that lets visitors query portfolio insights conversationally.
- **Context-Aware Responses**: Backed by a custom system prompt and `portfolioContext` so the AI answers as Sazzad — accurately representing skills, projects, and experience.
- **Streaming Responses**: Uses the Vercel AI SDK (`ai` package) for real-time streamed replies.

### 🛠️ Cutting-Edge Architecture
- **Next.js 16 (App Router)**: Server Component architecture for lightning-fast page loads and optimized data fetching.
- **React 19**: Leverages the latest React primitives for enhanced performance and stability.
- **Full SSR**: Complete content visibility for search engines from the very first byte.

### 🔍 Elite SEO & Performance
- **Dynamic Sitemap & Robots**: Automated discovery and indexing via `sitemap.ts` and `robots.ts`.
- **JSON-LD Structured Data**: Built-in Schema support (`json-ld.js`) for rich search snippets and professional branding.
- **Semantic HTML5**: Proper heading hierarchy (H1–H6) for maximum search relevance.
- **Web Vitals Monitoring**: Integrated `web-vitals` for real-time performance tracking.

### 💎 Premium User Experience
- **Signature 0–100% Loader**: A bespoke branded entrance animation that guards content hydration.
- **Framer Motion Orchestration**: Smooth, cinematic transitions and scroll-driven interactions (v11).
- **GSAP Animations**: Advanced timeline-based animations via `@gsap/react` for high-fidelity sequences.
- **Lenis Smooth Scroll**: Silky-smooth native scroll experience powered by [Lenis](https://lenis.studiofreight.com/).
- **Dual-Theme Engine**: Navy dark mode and clean light mode with zero-flicker injection via `next-themes`.
- **Responsive Mastery**: Fluid design system optimized for everything from ultra-wide monitors to high-density mobile displays.

---

## 🛠️ Technical Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16, React 19, TypeScript 6 |
| **Styling** | Tailwind CSS v4, CSS Variables, Glassmorphism |
| **Animations** | Framer Motion 11, GSAP 3 + `@gsap/react`, Lenis |
| **AI / LLM** | OpenAI SDK v4, Vercel AI SDK (`ai`), Streaming |
| **UI Primitives** | Radix UI (Dialog, Dropdown, Label, Slot), Headless UI |
| **Utilities** | clsx, tailwind-merge, class-variance-authority |
| **Iconography** | Lucide React, Custom SVG Brand System |
| **Markdown** | `react-markdown` (AI response rendering) |
| **SEO** | JSON-LD, Dynamic Sitemap, Robots.txt, Web Vitals |
| **Dev Tools** | Prettier, ESLint, PostCSS, Testing Library |

---

## 🏗️ Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** (or your preferred package manager)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sazzad4677/myportfolio-sazzad.dev.git
cd myportfolio-sazzad.dev

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Fill in your OPENAI_API_KEY and any other required secrets
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

### Other Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Generate optimized production bundle |
| `npm run start` | Run the production server locally |
| `npm run lint` | Run ESLint across the project |

---

## 📂 Project Structure

```
myportfolio-sazzad.dev/
├── public/                      # Static assets (images, icons, CV, etc.)
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/
│   │   │   └── chat/            # AI streaming chat API route (OpenAI)
│   │   ├── layout.tsx           # Root layout (fonts, themes, metadata)
│   │   ├── page.tsx             # Main page entry point
│   │   ├── sitemap.ts           # Dynamic XML sitemap
│   │   ├── robots.ts            # Robots.txt generation
│   │   ├── json-ld.js           # JSON-LD structured data (Schema.org)
│   │   ├── error.tsx            # Route-level error boundary
│   │   ├── global-error.tsx     # Global error boundary
│   │   └── not-found.tsx        # Custom 404 page
│   │
│   ├── components/              # Modular, feature-based UI components
│   │   ├── AI/
│   │   │   ├── AIChatBox.tsx    # Full AI chat interface with streaming
│   │   │   └── AIChatBubble.tsx # Floating trigger bubble
│   │   ├── About/               # About section
│   │   ├── Archive/             # Project archive/history
│   │   ├── Background/          # Animated canvas/mesh background
│   │   ├── Certifications/      # Certifications showcase
│   │   ├── Contact/             # Contact form section
│   │   ├── Education/           # Education timeline
│   │   ├── Experience/          # Work experience timeline
│   │   ├── Footer/              # Site footer
│   │   ├── Header/              # Sticky navigation header
│   │   ├── Hero/                # Hero / landing section
│   │   ├── Loader/              # 0–100% branded entrance loader
│   │   ├── Services/            # Services / offerings section
│   │   ├── Skills/              # Tech skills grid
│   │   ├── Socials/             # Social media links
│   │   ├── Stats/               # Impact statistics
│   │   ├── Works/               # Featured projects showcase
│   │   ├── Shared/
│   │   │   ├── AppContent.tsx   # Root content wrapper (Lenis, theme)
│   │   │   ├── ScrollToTop.tsx  # Floating scroll-to-top button
│   │   │   └── SectionHeader.tsx# Reusable animated section header
│   │   ├── motion/              # Reusable Framer Motion wrappers
│   │   ├── ui/                  # Radix-based shadcn/ui primitives
│   │   ├── theme-provider.tsx   # next-themes provider wrapper
│   │   └── theme-switcher.tsx   # Dark/light mode toggle button
│   │
│   ├── hooks/
│   │   └── useScrollPosition.ts # Custom hook for scroll tracking
│   │
│   ├── lib/
│   │   ├── contentManager.ts    # Singleton: runtime content state manager
│   │   ├── defaultContent.ts    # All portfolio static content / data
│   │   ├── portfolioContext.ts  # AI context — structured data for LLM
│   │   ├── systemPrompt.ts      # OpenAI system prompt definition
│   │   ├── types.ts             # Shared TypeScript type definitions
│   │   └── utils.ts             # Utility helpers (cn, etc.)
│   │
│   ├── types/                   # Global TypeScript ambient declarations
│   ├── views/
│   │   └── NoMatchRoute.tsx     # 404 view component
│   └── index.css                # Global CSS, design tokens, Tailwind base
│
├── components.json              # shadcn/ui configuration
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs           # PostCSS + Tailwind v4 config
└── package.json                 # Dependencies & scripts
```

---

## 🤖 AI Chat Assistant — How It Works

The portfolio includes a fully integrated AI assistant powered by **OpenAI GPT** and the **Vercel AI SDK**:

1. **Trigger**: A floating chat bubble (`AIChatBubble.tsx`) opens the full `AIChatBox.tsx` panel.
2. **API Route**: Messages are sent to `/api/chat`, which streams responses using the OpenAI SDK.
3. **System Prompt**: Defined in `lib/systemPrompt.ts`, it instructs the model to act as Sazzad's personal assistant.
4. **Portfolio Context**: `lib/portfolioContext.ts` injects structured data (skills, experience, projects) so the AI answers accurately.
5. **Rendering**: Responses are streamed in real-time and rendered as Markdown via `react-markdown`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Built with precision by **Sazzad Hossain**.  
[🌐 Portfolio](https://sazzad.dev) · [💼 LinkedIn](https://www.linkedin.com/in/sazzad4673/) · [🐙 GitHub](https://github.com/sazzad4677/)

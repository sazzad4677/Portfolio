/**
 * Single source of truth for all portfolio data fed into the AI.
 * Kept in sync with `defaultContent.ts` (the human-facing editor).
 */

export interface PortfolioProject {
  slug: string;
  name: string;
  type: "Company Project" | "Personal Project" | "Open Source";
  company?: string;
  period?: string;
  techStack: string[];
  highlights: string[];
  sourceCode?: string;
  liveLink?: string;
  /** Two- to three-sentence walkthrough the AI can use to answer "tell me about this project". */
  deepDive: string;
  /** Optional prompts the AI is well-equipped to answer about this project. */
  sampleQuestions?: string[];
}

export const portfolioContext = {
  personal: {
    name: "Md Sazzad Hossain",
    title: "Full-Stack Engineer (AI Native)",
    email: "sazzad4677@gmail.com",
    phone: "+8801679436054",
    location: "Dhaka, Bangladesh",
    website: "https://sazzad.dev",
    linkedin: "https://linkedin.com/in/sazzad4673",
    github: "https://github.com/sazzad4677",
    summary:
      "AI-native full-stack engineer with 4+ years of building React, Next.js, and TypeScript products. Rebuilt a legacy .NET ERP frontend while working directly with its users, and set up its GitHub Actions CI/CD. Built WebRTC video consultations for a telemedicine platform. Builds with Cursor, Claude, and Codex every day, and has shipped LLM features with OpenRouter and the Vercel AI SDK.",
  },

  skills: {
    core: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets (Socket.io)",
      "MongoDB",
      "Mongoose",
      "Redis",
      "Docker",
      "GitHub Actions",
      "AWS",
      "WebRTC",
      "Jest",
    ],
    familiar: [
      "PostgreSQL",
      "Prisma",
      "GraphQL",
      "OpenAPI (Swagger)",
      "Redux Toolkit",
      "Zustand",
      "Vite",
      "Python",
      "Linux",
    ],
    aiAndDevelopmentTools: [
      "OpenRouter",
      "Vercel AI SDK",
      "Ollama",
      "Cursor",
      "Claude",
      "Codex",
      "MediaPipe (Computer Vision)",
    ],
  },

  experience: [
    {
      company: "MyMedicalHub International (MMHI)",
      role: "Software Engineer",
      period: "Mar 2024 – Dec 2025",
      location: "Mohakhali, Dhaka, Bangladesh",
      highlights: [
        "Owned the modernization of the patient-doctor video consultation experience, replacing Vonage/OpenTok with an in-house WebRTC solution.",
        "Improved application performance through frontend optimization, code-splitting, and Next.js SSR strategies.",
        "Engineered camera-based physical assessment module using MediaPipe Pose landmarks to track patient body positioning in real time.",
      ],
    },
    {
      company: "Buyonia Bangladesh Limited",
      role: "Software Engineer",
      period: "Apr 2022 – Mar 2024",
      location: "Mohammadpur, Dhaka, Bangladesh",
      highlights: [
        "Rebuilt a legacy .NET ERP frontend using React, Next.js, and TypeScript across Finance, Merchandising, and User Management.",
        "Worked directly with client users to translate reported problems and business requirements into features and reusable components.",
        "Built a reusable Figma-based component library used across the ERP application to standardize UI patterns.",
        "Set up GitHub Actions CI/CD for automated testing and production deployments to AWS.",
      ],
    },
  ],

  projects: [
    {
      slug: "webrtc-consultation",
      name: "WebRTC Video Consultation Module",
      company: "MyMedicalHub International",
      period: "Mar 2024 – Dec 2025",
      type: "Company Project" as const,
      techStack: ["Next.js", "TypeScript", "Node.js", "WebRTC", "Socket.io"],
      highlights: [
        "Designed real-time consultation flow between patient and provider portals using WebRTC.",
        "Implemented Socket.io signaling to coordinate peer-to-peer video sessions.",
      ],
      liveLink: "https://mymedicalhub.com/",
      deepDive:
        "In-house WebRTC video consultation engine that replaced a paid Vonage/OpenTok integration. Sazzad designed the signaling flow with Socket.io, negotiated peer connections, and tuned Next.js SSR to keep the consultation page fast on slow hospital networks. Outcome: lower per-session cost and full control over the media pipeline.",
      sampleQuestions: [
        "Why did you replace Vonage with your own WebRTC stack?",
        "How does the Socket.io signaling flow work?",
        "What was the hardest part of the migration?",
      ],
    },
    {
      slug: "mediapipe-assessment",
      name: "AI-Assisted Physical Assessment Module",
      company: "MyMedicalHub International",
      period: "Mar 2024 – Dec 2025",
      type: "Company Project" as const,
      techStack: ["MediaPipe", "JavaScript", "TypeScript", "React", "Computer Vision"],
      highlights: [
        "Built camera-based physical assessment workflow using MediaPipe Pose landmarks to track patient body positions during guided assessments.",
        "Matched detected body landmarks against predefined assessment poses for real-time feedback.",
      ],
      liveLink: "https://mymedicalhub.com/",
      deepDive:
        "A camera-only physical assessment workflow: MediaPipe Pose runs in the browser, emits body landmark coordinates per frame, and Sazzad's logic compares them against clinician-defined reference poses to give real-time posture feedback. No server-side video processing — the AI runs entirely on-device for privacy and latency.",
      sampleQuestions: [
        "How accurate is the pose matching?",
        "Why run MediaPipe in the browser instead of on a server?",
        "How do you define the reference poses?",
      ],
    },
    {
      slug: "erp-modernization",
      name: "ERP Modernization",
      company: "Buyonia Bangladesh Limited",
      period: "Apr 2022 – Mar 2024",
      type: "Company Project" as const,
      techStack: ["React", "Next.js", "TypeScript", ".NET Core", "Tailwind CSS", "GitHub Actions", "AWS"],
      highlights: [
        "Rebuilt legacy .NET ERP frontend across Finance, Merchandising, and User Management.",
        "Created standardized Figma-based UI component library to accelerate frontend development.",
        "Configured GitHub Actions CI/CD pipeline for automated testing and deployment to AWS.",
      ],
      liveLink: "https://www.buyoniasoft.com/",
      deepDive:
        "Multi-quarter modernization of a legacy .NET ERP: Finance, Merchandising, and User Management modules were rebuilt as a React/Next.js/TypeScript SPA. Sazzad collaborated with end users to translate pain points into features, set up GitHub Actions CI/CD for AWS, and shipped a reusable component library so the wider team could move faster.",
      sampleQuestions: [
        "How did you migrate from .NET pages to React?",
        "What CI/CD pipeline did you set up?",
        "How did you keep business users happy during the rebuild?",
      ],
    },
    {
      slug: "erp-component-library",
      name: "ERP Component Library",
      company: "Buyonia Bangladesh Limited",
      period: "Apr 2022 – Mar 2024",
      type: "Company Project" as const,
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      highlights: [
        "Built a reusable Figma-based component library used across the ERP application to standardize UI patterns.",
      ],
      liveLink: "https://www.buyoniasoft.com/",
      deepDive:
        "A Figma-first design system that turned into the shared React component library used across the modernized ERP. Components were versioned with the Figma source of truth so design and code never drifted.",
      sampleQuestions: [
        "How do you keep Figma and code in sync?",
        "What components shipped first?",
      ],
    },
    {
      slug: "smart-inventory",
      name: "Smart Inventory & Business Intelligence System",
      type: "Personal Project",
      period: "2024",
      techStack: ["Next.js 16", "TypeScript", "Node.js", "Express.js", "MongoDB", "Redis", "Socket.io", "OpenRouter", "Docker", "Jest"],
      sourceCode: "https://github.com/sazzad4677/Smart-Inventory-System",
      liveLink: "https://smart-inventory.sazzad.dev",
      highlights: [
        "Integrated OpenRouter with openai/gpt-oss-120b:free model to generate restocking recommendations.",
        "Implemented NextAuth.js v5, JWT rotation, role-based access control, and Redis rate limiting.",
        ">95% statement coverage across authentication and inventory workflows using Jest.",
      ],
      deepDive:
        "End-to-end inventory platform with live stock monitoring, RBAC, and an LLM-powered restocking recommender. Sazzad wired OpenRouter (openai/gpt-oss-120b:free) into a recommendations pipeline, kept auth tight with NextAuth.js v5 + JWT rotation, and used Redis for rate limiting. Test coverage is >95% on auth and inventory flows.",
      sampleQuestions: [
        "How does the OpenRouter recommendation work end-to-end?",
        "Why NextAuth.js v5 and what did the JWT rotation solve?",
        "How do you keep >95% test coverage on a feature this large?",
      ],
    },
    {
      slug: "ai-portfolio",
      name: "AI-Powered Developer Portfolio & Assistant",
      type: "Personal Project",
      period: "2024 – Present",
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4.2", "OpenRouter", "Vercel AI SDK"],
      sourceCode: "https://github.com/sazzad4677/Portfolio",
      liveLink: "https://sazzad.dev",
      highlights: [
        "Built real-time AI chat assistant with OpenRouter and Vercel AI SDK.",
        "100/100 Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.",
      ],
      deepDive:
        "This site. A streaming AI assistant on the Edge runtime, with model fallback, a custom system prompt derived from `portfolioContext.ts`, and a project-scoped Q&A mode. Plus a 100/100 Lighthouse score on every metric.",
      sampleQuestions: [
        "How is the assistant built?",
        "What's the model fallback story?",
        "How do you keep the Lighthouse score at 100?",
      ],
    },
  ] satisfies PortfolioProject[],

  aiTooling: {
    editor: "Cursor",
    assistants: ["Claude", "Codex"],
    modelRouters: ["OpenRouter", "Vercel AI SDK"],
    localRuntime: "Ollama",
    vision: "MediaPipe (Pose landmarks)",
    dailyWorkflow:
      "Cursor is the default editor. Claude and Codex are used for code review, refactors, and spec writing. OpenRouter is the production model gateway; Ollama is used for offline experiments. MediaPipe handles on-device computer-vision features.",
  },

  awards: [
    {
      title: "Employee of the Month",
      organization: "Buyonia Bangladesh Limited",
      date: "Aug 2023, Sep 2023",
      description: "Recognized twice for outstanding software engineering contribution.",
    },
  ],

  professionalDevelopment: [
    {
      title: "Phitron AI/ML Course",
      institution: "Phitron",
      period: "Oct 2026 – Present",
      focus: "Python for AI/ML, Machine Learning, Deep Learning, and AI/ML projects",
    },
    {
      title: "Forward Deployed Engineering Career Track",
      institution: "Poridhi",
      period: "May 2026 – Present",
      focus: "Agentic & Software Engineering, Platform Engineering, System Design, and AI-driven engineering workflows",
    },
  ],

  education: [
    {
      degree: "MSc in Computer Science",
      institution: "Jahangirnagar University",
      period: "Jun 2023 – Dec 2024",
      location: "Dhaka, Bangladesh",
    },
    {
      degree: "BSc in Software Engineering",
      institution: "Daffodil International University",
      period: "Jan 2017 – Jan 2022",
      location: "Dhaka, Bangladesh",
    },
  ],

  languages: [
    { language: "Bangla", level: "Native" },
    { language: "English", level: "Proficient" },
  ],

  availability: {
    openToWork: true,
    workModes: ["Remote", "Office / On-site", "Hybrid"],
    preferredRoles: [
      "Full-Stack Engineer (AI Native)",
      "Software Engineer",
      "Frontend / Systems Architect",
    ],
    preferredStack: "React / Next.js / TypeScript / Node.js / AI (OpenRouter, Vercel AI SDK, MediaPipe)",
  },
};

/** Look up a project by its stable slug — used by the chat route to scope answers. */
export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioContext.projects.find((p) => p.slug === slug);
}

export type PortfolioContext = typeof portfolioContext;

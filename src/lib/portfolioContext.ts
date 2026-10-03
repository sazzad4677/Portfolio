/**
 * Single source of truth for all portfolio data fed into the AI
 */

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
      name: "WebRTC Video Consultation Module",
      company: "MyMedicalHub International",
      techStack: ["Next.js", "TypeScript", "Node.js", "WebRTC", "Socket.io"],
      highlights: [
        "Designed real-time consultation flow between patient and provider portals using WebRTC.",
        "Implemented Socket.io signaling to coordinate peer-to-peer video sessions.",
      ],
    },
    {
      name: "AI-Assisted Physical Assessment Module",
      company: "MyMedicalHub International",
      techStack: ["MediaPipe", "JavaScript", "TypeScript", "React", "Computer Vision"],
      highlights: [
        "Built camera-based physical assessment workflow using MediaPipe Pose landmarks to track patient body positions during guided assessments.",
        "Matched detected body landmarks against predefined assessment poses for real-time feedback.",
      ],
    },
    {
      name: "ERP Modernization & Component Library",
      company: "Buyonia Bangladesh Limited",
      techStack: ["React", "Next.js", "TypeScript", ".NET Core", "Tailwind CSS", "GitHub Actions", "AWS"],
      highlights: [
        "Rebuilt legacy .NET ERP frontend across Finance, Merchandising, and User Management.",
        "Created standardized Figma-based UI component library to accelerate frontend development.",
        "Configured GitHub Actions CI/CD pipeline for automated testing and deployment to AWS.",
      ],
    },
    {
      name: "Smart Inventory & Business Intelligence System",
      type: "Personal Project",
      techStack: ["Next.js 16", "TypeScript", "Node.js", "Express.js", "MongoDB", "Redis", "Socket.io", "OpenRouter", "Docker", "Jest"],
      sourceCode: "https://github.com/sazzad4677/Smart-Inventory-System",
      liveLink: "https://smart-inventory.sazzad.dev",
      highlights: [
        "Integrated OpenRouter with openai/gpt-oss-120b:free model to generate restocking recommendations.",
        "Implemented NextAuth.js v5, JWT rotation, role-based access control, and Redis rate limiting.",
        ">95% statement coverage across authentication and inventory workflows using Jest.",
      ],
    },
    {
      name: "AI-Powered Developer Portfolio & Assistant",
      type: "Personal Project",
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4.2", "OpenRouter", "Vercel AI SDK"],
      sourceCode: "https://github.com/sazzad4677/Portfolio",
      liveLink: "https://sazzad.dev",
      highlights: [
        "Built real-time AI chat assistant with OpenRouter and Vercel AI SDK.",
        "100/100 Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.",
      ],
    },
  ],

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

export type PortfolioContext = typeof portfolioContext;
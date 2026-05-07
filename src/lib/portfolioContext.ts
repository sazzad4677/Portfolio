/**
 * Single source of truth for all portfolio data fed into the AI
 */

export const portfolioContext = {
  personal: {
    name: "Md Sazzad Hossain",
    title: "Software Engineer",
    email: "sazzad4677@gmail.com",
    phone: "+8801679436054",
    location: "Dhaka, Bangladesh",
    website: "https://sazzad.dev",
    linkedin: "https://linkedin.com/in/sazzad4673",
    github: "https://github.com/sazzad4677",
    summary:
      "Software Engineer with 4+ years of experience building scalable, AI-integrated Full-Stack solutions. Specialized in the Next.js 16/React 19 ecosystem and cutting-edge backend architecture. Expert at handling real-time data orchestration with Socket.io and Redis, and automating enterprise workflows with LLMs. Committed to creating high-performance, secure, and testable applications with a focus on CI/CD, Docker, and clean architecture.",
  },

  skills: {
    frontendArchitecture: {
      level: "Expert",
      technologies: [
        "Next.js 16 (App Router)",
        "React 19",
        "TypeScript 6",
        "Zustand",
        "Tailwind CSS v4.2",
        "Shadcn UI",
        "Framer Motion",
        "Tanstack Query",
      ],
    },
    backendAndDatabase: {
      level: "Expert",
      technologies: [
        "Node.js",
        "Express 5",
        "PostgreSQL",
        "Prisma ORM",
        "MongoDB (Mongoose 9)",
        "Redis",
        "Socket.io",
        "JWT Auth",
        "RESTful APIs",
        "Zod",
      ],
    },
    cloudDevOpsAndAI: {
      level: "Proficient",
      technologies: [
        "Docker",
        "GitHub Actions (CI/CD)",
        "Vercel",
        "LLM Integration (OpenAI, Gemini)",
        "AWS (EC2, S3)",
        "Nginx",
      ],
    },
    toolsAndQualityAssurance: {
      level: "Proficient",
      technologies: [
        "Git/GitHub",
        "Jest",
        "System Design",
        "Scalable Architecture",
        "Problem Solving & Debugging",
        "Agile/Scrum",
      ],
    },
  },

  experience: [
    {
      company: "MyMedical Hub International (MMHI)",
      role: "Software Engineer",
      period: "Mar 2024 – Dec 2025",
      location: "Dhaka, Bangladesh",
      highlights: [
        "Built responsive patient & provider portals using Next.js and React, increasing engagement and reducing friction in healthcare workflows.",
        "Engineered dynamic frontend components with complex API integrations, enabling real-time data visualization for healthcare workflows.",
        "Improved application load time by ~30%, optimizing rendering performance across diverse devices and network conditions.",
        "Led UI/UX modernization efforts with design teams, significantly elevating visual quality and user satisfaction.",
      ],
    },
    {
      company: "Buyonia Bangladesh Limited",
      role: "Software Engineer",
      period: "Apr 2022 – Mar 2024",
      location: "Dhaka, Bangladesh",
      highlights: [
        "Designed and implemented scalable full-stack applications with TypeScript, Next.js, and Express to optimize internal operations.",
        "Reduced API response latency by orchestrating MongoDB architectures for complex enterprise data relationships.",
        "Managed robust server infrastructure on AWS, ensuring high availability for mission-critical systems.",
        "Mentored junior developers and led technical initiatives to foster a culture of high code quality.",
      ],
    },
  ],

  projects: [
    {
      name: "Smart Inventory & Business Intelligence System",
      type: "Flagship Project",
      techStack: [
        "Next.js 15",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Redis",
        "Socket.io",
        "Docker",
        "LLM (Gemini/OpenAI)",
      ],
      sourceCode: "https://github.com/sazzad4677/Smart-Inventory-System",
      liveLink: "https://smart-inventory.sazzad.dev",
      highlights: [
        "Real-time Synchronization Engine: Developed a bi-directional communication layer using Socket.io for live dashboard updates and global activity logs.",
        "Scalable Data Layer: Engineered a robust relational schema using PostgreSQL and Prisma, optimizing for complex transactions and high data integrity.",
        "Intelligent Restock Queue: Built an automated logic layer that monitors stock thresholds and utilizes AI (LLM) to suggest proactive restock optimizations.",
        "Security Architecture: Implemented Role-Based Access Control (RBAC), Admin session revocation tools, and Redis-based rate limiting.",
        "Infrastructure: Fully containerized using Docker with multi-stage builds for optimized production images and a seamless CI/CD pipeline.",
      ],
    },
    {
      name: "Elite AI Portfolio",
      type: "Personal Project",
      techStack: [
        "Next.js 16",
        "React 19",
        "TypeScript 6",
        "GSAP",
        "Tailwind CSS v4",
        "OpenAI",
        "Framer Motion",
      ],
      sourceCode: "https://github.com/sazzad4677/myportfolio-sazzad.dev",
      liveLink: "https://sazzad.dev",
      highlights: [
        "Conversational AI Intelligence: Context-aware AI chat assistant using OpenAI and Vercel AI SDK.",
        "Lighthouse Perfection: 100/100 score across all Lighthouse metrics.",
        "Immersive Motion UX: Cinematic transitions and 3D orbital components using GSAP and Framer Motion.",
        "Accessibility & SEO: WCAG 2.1 AA standards and advanced JSON-LD structured data.",
      ],
    },
  ],

  education: [
    {
      degree: "MSc in Computer Science & Engineering",
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

  certificates: [
    { name: "Software Engineer", issuer: "HackerRank", date: "Apr 2026" },
    { name: "JavaScript (Intermediate)", issuer: "HackerRank", date: "Apr 2026" },
    { name: "Frontend Developer (React)", issuer: "HackerRank", date: "Apr 2026" },
  ],

  languages: [
    { language: "Bangla", level: "Native/Bilingual" },
    { language: "English", level: "Proficient" },
  ],

  availability: {
    openToWork: true,
    preferredRoles: [
      "Full-Stack Engineer",
      "Software Engineer",
      "Frontend Architect",
    ],
    preferredStack: "Next.js / Node.js / TypeScript ecosystem (PostgreSQL/Prisma/Redis)",
  },
};

export type PortfolioContext = typeof portfolioContext;
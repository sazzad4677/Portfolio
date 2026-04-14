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
      "Software Engineer with nearly 4 years of experience building scalable, AI-integrated Full-Stack solutions. Specialized in the Next.js 16/React 19 ecosystem and cutting-edge backend architecture using Express 5, Node.js, and Mongoose 9. Expert at handling real-time data orchestration with Socket.io and Redis, and automating enterprise workflows with LLMs. Committed to creating high-performance, secure, and testable applications with a focus on CI/CD, Docker, and clean architecture.",
  },

  skills: {
    frontendArchitecture: {
      level: "Expert",
      technologies: [
        "Next.js 16 (App Router)",
        "React 19",
        "TypeScript 6",
        "Zustand",
        "Tailwind CSS 4",
        "Shadcn UI",
        "Framer Motion",
        "Redux Toolkit",
      ],
    },
    backendAndDatabase: {
      level: "Proficient",
      technologies: [
        "Node.js",
        "Express 5",
        "MongoDB (Mongoose 9)",
        "Redis",
        "Socket.io",
        "JWT Auth",
        "RESTful APIs",
        "Winston Logging",
        "Zod",
      ],
    },
    cloudDevOpsAndAI: {
      level: "Proficient",
      technologies: [
        "Docker",
        "GitHub Actions (CI/CD)",
        "Vercel",
        "LLM Integration",
        "AWS EC2",
      ],
    },
    toolsAndQualityAssurance: {
      level: "Proficient",
      technologies: [
        "Git",
        "Jest",
        "React Testing Library",
        "Postman",
        "Agile/Scrum",
        "Problem Solving & Debugging",
      ],
    },
  },

  experience: [
    {
      company: "MyMedicalHub International",
      role: "Software Engineer",
      period: "Mar 2024 – Dec 2025",
      location: "Dhaka, Bangladesh",
      highlights: [
        "Developed a real-time telemedicine platform using Next.js 15 and TypeScript, enabling remote physical therapy sessions with live video/audio and synchronized exercise guidance.",
        "Engineered a custom WebSocket (Socket.io) and WebRTC infrastructure for low-latency video call signaling and real-time state synchronization across Web, Android, and iOS clients.",
        "Architected a high-performance Next.js application using Client-Side Rendering (CSR) to maintain persistent WebSocket connections while optimizing initial load times.",
        "Implemented complex state management using Redux Toolkit and React Context Composition to handle live session data including exercise states, movements, and user connectivity.",
        "Built a responsive and accessible UI with Tailwind CSS and PrimeReact for both patients and healthcare providers.",
      ],
    },
    {
      company: "Buyonia Bangladesh Limited",
      role: "Software Engineer",
      period: "Apr 2022 – Mar 2024",
      location: "Dhaka, Bangladesh",
      highlights: [
        "Architected and led frontend development of high-scale ERP modules (Finance, Merchandising, User Management) using React and Next.js.",
        "Optimized backend services with Node.js and Express.js, achieving a 30% boost in API response times for 500+ daily internal users.",
        "Orchestrated CI/CD pipelines using GitHub Actions and AWS EC2, reducing time-to-production by 40%.",
        "Mentored junior developers and enforced Git workflow standards, peer code reviews, and responsive design best practices.",
      ],
    },
  ],

  projects: [
    {
      name: "Smart Inventory & Business Intelligence System",
      type: "Flagship Project",
      techStack: [
        "Next.js 16",
        "React 19",
        "TypeScript 6",
        "Node.js",
        "Express 5",
        "MongoDB",
        "Redis",
        "Gemini",
        "Socket.io",
        "Zustand",
        "Tailwind CSS 4",
      ],
      sourceCode: "https://github.com/sazzad4677/Smart-Inventory-System",
      liveLink: "https://smart-inventory.sazzad.dev",
      highlights: [
        "AI-Driven Analytics Engine integrating Google Gemini to analyze live inventory trends and generate actionable business 'Magic Tips'.",
        "High-Performance Analytics Dashboards using complex MongoDB Aggregation Framework ($lookup, $facet, $group) for real-time order trends, revenue mapping, and category distribution.",
        "Real-Time State Orchestration via Socket.io and Redis for instantaneous inventory synchronization and low-stock alerts across distributed warehouse nodes.",
        "Scalable RBAC Governance Layer (Admin, Manager, Staff) with fine-grained endpoint authorization and Activity Logging for enterprise-grade security auditing.",
        "Optimized Client-Side Performance using Zustand and Next.js 16 Server Actions for a seamless ultra-responsive UI.",
        "Robust Restocking Ecosystem with automated low-threshold triggers, queue management, and vendor-ready restocking workflow.",
      ],
    },
  ],

  education: [
    {
      degree: "BSc in Software Engineering",
      institution: "Daffodil International University",
      period: "Jan 2017 – Jan 2022",
      location: "Dhaka, Bangladesh",
    },
    {
      degree: "MSc in CSE",
      institution: "Jahangirnagar University",
      period: "Jun 2023 – Dec 2024",
      location: "Dhaka, Bangladesh",
    },
  ],

  certificates: [
    { name: "JavaScript (Intermediate)", issuer: "HackerRank" },
    { name: "Software Engineer", issuer: "HackerRank" },
  ],

  languages: [
    { language: "Bangla", level: "Native/Bilingual" },
    { language: "English", level: "Proficient" },
  ],

  availability: {
    openToWork: true,
    preferredRoles: [
      "Full-Stack Engineer",
      "Frontend Engineer",
      "Backend Engineer",
    ],
    preferredStack: "Next.js / Node.js / TypeScript ecosystem",
  },
};

export type PortfolioContext = typeof portfolioContext;
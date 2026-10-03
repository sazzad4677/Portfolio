import { PortfolioContent } from './types';

export const defaultContent: PortfolioContent = {
    hero: {
        greeting: "Hi, my name is",
        name: "Sazzad Hossain.",
        tagline: "Full-Stack Engineer (AI Native) building scalable, high-performance web products.",
        headline: "I build scalable,<br/>AI-native & real-time<br/><span class=\"text-gradient\">web applications.</span>",
        badgeText: "Available for new opportunities",
        description: "Full-stack engineer with <span class=\"font-semibold text-primary\">4+ years</span> of experience building production web applications with React, Next.js, and TypeScript. Modernized legacy .NET ERP frontends, engineered WebRTC telemedicine systems, and integrated AI capabilities using OpenRouter and the Vercel AI SDK.",
        ctaText: "View My Work",
        ctaLink: "mailto:sazzad4677@gmail.com",
        cvLink: "https://drive.google.com/file/d/1ffycRhonZegQk2VJjfsa_g_AZAOj_5Xw/view?usp=drive_link",
        videoUrl: "",
        profileImage: "/images/me.webp",
        socials: [
            { name: "GitHub", url: "https://github.com/sazzad4677/", type: "github" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/sazzad4673/", type: "linkedin" },
            { name: "Email", url: "mailto:sazzad4677@gmail.com", type: "email" }
        ],
        techStack: [
            { label: "Node.js", color: "bg-emerald-500/30" },
            { label: "React", color: "bg-cyan-500/30" },
            { label: "TypeScript", color: "bg-blue-500/30" },
            { label: "Next.js", color: "bg-on-background/20" },
            { label: "WebRTC", color: "bg-purple-500/30" },
            { label: "PostgreSQL", color: "bg-blue-700/30" },
            { label: "Prisma", color: "bg-indigo-500/30" },
            { label: "OpenRouter", color: "bg-amber-500/30" },
            { label: "Vercel AI SDK", color: "bg-sky-500/30" },
            { label: "Docker", color: "bg-blue-600/30" }
        ],
        stats: [
            { value: "4+", label: "Years Experience", sublabel: "Software engineering", icon: "Briefcase", color: "text-primary" },
            { value: "3+", label: "Years in Production", sublabel: "Shipping real systems", icon: "Layers", color: "text-primary" },
            { value: "5+", label: "Production Systems", sublabel: "Built & modernized", icon: "Cpu", color: "text-primary" },
            { value: "AI", label: "Product Development", sublabel: "LLM & CV integration", icon: "Sparkles", color: "text-primary" }
        ]
    },

    about: {
        sectionNumber: "01.",
        sectionLabel: "ABOUT ME",
        headline: "AI-native engineer building\nhigh-performance\n<span class=\"text-gradient\">scalable software.</span>",
        description: "Full-stack engineer with <span class=\"font-semibold text-primary\">4+ years</span> of experience building React, Next.js, and TypeScript products. Specializing in AI integration, WebRTC real-time media, and modernizing legacy enterprise applications.",
        quote: "I build with modern AI tooling (Cursor, Claude, Codex) every day and design systems that scale seamlessly.",
        infoCards: [
            {
                icon: "Compass",
                title: "My Journey",
                description: "Over the last <span class=\"text-primary\">four years</span>, my software engineering journey has evolved from building web applications to modernizing enterprise legacy system frontends (.NET Core to React/Next.js) and shipping AI-native workflows.",
                variant: "normal"
            },
            {
                icon: "Code2",
                title: "What I Do Best",
                description: "I solve complex engineering challenges—whether replacing third-party services with in-house <span class=\"text-primary\">WebRTC</span> solutions, building pose assessment workflows with <span class=\"text-primary\">MediaPipe</span>, or integrating LLMs via OpenRouter and Vercel AI SDK.",
                variant: "highlight"
            },
            {
                icon: "Heart",
                title: "Beyond Engineering",
                description: "Exploring <span class=\"text-primary\">distributed systems</span>, AI/ML, developer tooling, and new technologies outside my day-to-day stack.",
                variant: "minimal"
            }
        ],
        cta: {
            text: "If this aligns with what you're looking for, let's build something great together.",
            buttonLabel: "Let's Work Together",
            buttonLink: "mailto:sazzad4677@gmail.com"
        },
        coreWorkLabel: "THE CORE OF MY WORK",
        coreWorkItems: [
            {
                icon: "Code2",
                title: "AI-Native Development",
                description: "Leveraging Cursor, Claude, and Codex daily to rapidly ship robust, production-ready software."
            },
            {
                icon: "Radio",
                title: "Real-Time & WebRTC Systems",
                description: "Building low-latency video consultation & bidirectional WebSocket signaling infrastructures."
            },
            {
                icon: "Container",
                title: "Enterprise Modernization",
                description: "Modernizing legacy enterprise ERP frontends with React, Next.js, TypeScript, and reusable component architectures."
            },
            {
                icon: "Puzzle",
                title: "AI & ML Workflows",
                description: "Integrating LLMs, OpenRouter, MediaPipe pose tracking, and automated restock decision engines."
            }
        ],
        techStackLabel: "MY CORE TECHNICAL STACK",
        techStack: [
            { icon: "nextjs", label: "Next.js" },
            { icon: "react", label: "React" },
            { icon: "typescript", label: "TypeScript" },
            { icon: "nodejs", label: "Node.js" },
            { icon: "express", label: "Express.js" },
            { icon: "webrtc", label: "WebRTC" },
            { icon: "socketio", label: "Socket.io" },
            { icon: "mongodb", label: "MongoDB" },
            { icon: "postgresql", label: "PostgreSQL" },
            { icon: "prisma", label: "Prisma" },
            { icon: "redis", label: "Redis" },
            { icon: "docker", label: "Docker" },
            { icon: "aws", label: "AWS" },
            { icon: "llm", label: "OpenRouter & AI SDK" }
        ],
        paragraphs: [
            "<em>“I build with modern AI tooling (Cursor, Claude, Codex) every day, combining rapid development velocity with rock-solid architectural patterns.”</em>",
            "Over the last <span class=\"text-primary\">four years</span>, my software engineering career has spanned full-stack web development, real-time media engineering, and AI product development. From replacing Vonage/OpenTok with custom WebRTC video consultation architecture at MyMedicalHub to modernizing legacy .NET ERP frontends at Buyonia Bangladesh, I focus on delivering tangible business value.",
            "I am at home building full-stack applications with <span class=\"text-primary\">React, Next.js, TypeScript, Node.js</span>, and integrating state-of-the-art AI capabilities through <span class=\"text-primary\">OpenRouter, Vercel AI SDK</span>, and computer vision tools like <span class=\"text-primary\">MediaPipe</span>."
        ],
        skillsHeading: "Here is the core technical stack I leverage daily:",
        profileImage: "/images/me.webp"
    },

    skills: [
        { id: 1, name: "React.js & Next.js 16" },
        { id: 2, name: "TypeScript & Node.js" },
        { id: 3, name: "WebRTC & Socket.io" },
        { id: 4, name: "OpenRouter & Vercel AI SDK" },
        { id: 5, name: "MongoDB & PostgreSQL (Prisma)" },
        { id: 6, name: "Redis & Docker" },
        { id: 7, name: "GitHub Actions & AWS" },
        { id: 8, name: "Tailwind CSS & Component Libraries" },
        { id: 9, name: "Jest & Automated Testing" }
    ],

    detailedSkills: [
        {
            category: "Core Stack",
            context: "Building robust full-stack applications",
            items: [
                { name: "JavaScript (ES6+)", level: "primary" },
                { name: "TypeScript", level: "primary" },
                { name: "React.js", level: "primary" },
                { name: "Next.js", level: "primary" },
                { name: "Node.js", level: "primary" },
                { name: "Express.js", level: "primary" },
                { name: "MongoDB & Mongoose", level: "primary" },
                { name: "Redis", level: "primary" },
                { name: "Docker", level: "primary" },
                { name: "WebRTC", level: "primary" },
                { name: "Socket.io", level: "primary" },
                { name: "GitHub Actions", level: "primary" },
                { name: "AWS", level: "primary" },
                { name: "Jest", level: "primary" }
            ]
        },
        {
            category: "Familiar & Secondary",
            context: "Supporting technologies and framework experience",
            items: [
                { name: "PostgreSQL", level: "secondary" },
                { name: "Prisma", level: "secondary" },
                { name: "GraphQL", level: "secondary" },
                { name: "OpenAPI (Swagger)", level: "secondary" },
                { name: "Redux Toolkit", level: "secondary" },
                { name: "Zustand", level: "secondary" },
                { name: "Vite", level: "secondary" },
                { name: "Python", level: "secondary" },
                { name: "Linux", level: "secondary" }
            ]
        },
        {
            category: "AI Engineering",
            context: "LLM integration, computer vision, and local models",
            items: [
                { name: "OpenRouter", level: "primary" },
                { name: "Vercel AI SDK", level: "primary" },
                { name: "Ollama", level: "secondary" },
                { name: "MediaPipe", level: "secondary" }
            ]
        },
        {
            category: "AI Development Workflow",
            context: "AI-native tools and intelligent pair-programming",
            items: [
                { name: "Cursor", level: "primary" },
                { name: "Claude", level: "primary" },
                { name: "Codex", level: "primary" }
            ]
        }
    ],

    services: [
        {
            id: 1,
            title: "AI-Native Full-Stack Applications",
            description: "Building scalable web applications with React, Next.js, and Node.js, integrating AI capabilities and modern development workflows.",
            icon: "LayoutTemplate",
            modalDetails: [
                "Full-stack web application development with Next.js App Router, React, and Node.js.",
                "Integration of OpenRouter, Vercel AI SDK, and custom LLM workflows.",
                "High-performance Server-Side Rendering (SSR) and SEO strategies.",
                "Modern UI design using Tailwind CSS and reusable component libraries."
            ]
        },
        {
            id: 2,
            title: "Real-Time & WebRTC Systems",
            description: "Building real-time video consultation, messaging, signaling, and low-latency communication systems with WebRTC and Socket.io.",
            icon: "Server",
            modalDetails: [
                "In-house WebRTC video consultation architecture replacing third-party services.",
                "Socket.io signaling server implementation for peer-to-peer video sessions.",
                "Real-time bidirectional data synchronization with WebSockets & Redis.",
                "Camera-based pose estimation & landmark tracking integration."
            ]
        },
        {
            id: 3,
            title: "Enterprise Web Applications",
            description: "Modernizing legacy enterprise systems with React, Next.js, TypeScript, reusable components, and automated CI/CD pipelines.",
            icon: "Layers",
            modalDetails: [
                "Modernizing legacy .NET ERP frontends into React, Next.js, and TypeScript.",
                "Designing standardized, reusable component libraries across enterprise modules.",
                "Automated testing with Jest (>95% coverage) and CI/CD via GitHub Actions.",
                "Containerization with Docker and cloud deployment on AWS."
            ]
        }
    ],

    projects: [
        {
            id: 0,
            title: "Smart Inventory & Business Intelligence System",
            description: "An enterprise inventory platform with real-time stock monitoring, OpenRouter AI restocking recommendations, and Docker containerization.",
            descriptionList: [
                "AI Restocking Assistant: Integrated OpenRouter (openai/gpt-oss-120b:free model) to generate proactive restocking insights and inventory decisions.",
                "Real-time Updates: Socket.io bidirectional sync for live inventory status and activity logs.",
                "High Test Coverage: Built a comprehensive Jest suite achieving >95% statement coverage across auth and business logic.",
                "Enterprise Security: NextAuth.js v5, JWT rotation, role-based access control, and Redis rate limiting."
            ],
            technologies: ["Next.js 16", "TypeScript", "Node.js", "Express.js", "MongoDB", "Redis", "Socket.io", "OpenRouter", "Docker", "Jest"],
            links: {
                github: "https://github.com/sazzad4677/Smart-Inventory-System",
                external: "https://smart-inventory.sazzad.dev/"
            },
            image: { url: "smart-inventory.png" },
            featured: true,
            isCompanyProject: false,
            category: "Personal Project"
        },
        {
            id: 1,
            title: "AI-Powered Developer Portfolio & Chat Assistant",
            description: "A production-ready developer portfolio featuring an integrated real-time AI assistant, 100/100 Lighthouse performance, and structured context streaming.",
            descriptionList: [
                "Vercel AI SDK Integration: Built a context-aware AI chat assistant powered by OpenRouter and Vercel AI SDK.",
                "Lighthouse Perfection: Achieved 100/100 scores across Lighthouse Performance, Accessibility, Best Practices, and SEO.",
                "Modern UX: Cinematic motion transitions with GSAP and Framer Motion."
            ],
            technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4.2", "OpenRouter", "Vercel AI SDK"],
            links: {
                github: "https://github.com/sazzad4677/Portfolio",
                external: "https://sazzad.dev/"
            },
            image: { url: "portfolio-v3.png" },
            featured: true,
            isCompanyProject: false,
            category: "Personal Project"
        },
        {
            id: 2,
            title: "WebRTC Video Consultation Module",
            description: "An in-house peer-to-peer video consultation platform built for MyMedicalHub International to replace legacy Vonage/OpenTok video infrastructure.",
            descriptionList: [
                "In-House WebRTC Migration: Designed real-time consultation flows between patient and provider portals using WebRTC, replacing Vonage/OpenTok and cutting third-party licensing costs.",
                "Socket.io Signaling: Implemented low-latency Socket.io signaling to coordinate peer-to-peer video session establishment.",
                "Performance Optimization: Applied Next.js SSR strategies and code-splitting to optimize video page load speeds."
            ],
            technologies: ["Next.js", "TypeScript", "Node.js", "WebRTC", "Socket.io"],
            links: {
                external: "https://mymedicalhub.com/"
            },
            image: { url: "" },
            featured: true,
            isCompanyProject: true,
            companyName: "MyMedicalHub International",
            category: "Professional Project"
        },
        {
            id: 3,
            title: "AI-Assisted Physical Assessment Module",
            description: "A camera-based pose estimation workflow that tracks patient body positions in real-time during guided healthcare assessments.",
            descriptionList: [
                "MediaPipe Pose Tracking: Built an automated pose landmark detection system using MediaPipe to track patient body positioning.",
                "Pose Matching Logic: Matched detected body landmarks against predefined assessment poses to detect incorrect positioning instantly.",
                "Step-by-Step Pose Guidance: Delivered dynamic, real-time posture feedback and notifications to healthcare users."
            ],
            technologies: ["MediaPipe", "JavaScript", "TypeScript", "React", "Computer Vision"],
            links: {
                external: "https://mymedicalhub.com/"
            },
            image: { url: "" },
            featured: true,
            isCompanyProject: true,
            companyName: "MyMedicalHub International",
            category: "Professional Project"
        },
        {
            id: 4,
            title: "ERP Modernization",
            description: "Rebuilding legacy .NET enterprise ERP frontend modules across Finance, Merchandising, and User Management into a modern React/Next.js stack.",
            descriptionList: [
                "Legacy .NET Refactor: Rebuilt legacy .NET ERP frontend across Finance, Merchandising, and User Management using React, Next.js, and TypeScript.",
                ".NET Core API Integration: Integrated .NET Core APIs and established component-based data flows to replace legacy full-page reloads.",
                "GitHub Actions CI/CD: Configured automated testing with GitHub Actions and automated deployments to AWS."
            ],
            technologies: ["React", "Next.js", "TypeScript", ".NET Core", "GitHub Actions", "AWS"],
            links: {
                external: "https://www.buyoniasoft.com/"
            },
            image: { url: "" },
            featured: true,
            isCompanyProject: true,
            companyName: "Buyonia Bangladesh Limited",
            category: "Professional Project"
        },
        {
            id: 5,
            title: "ERP Component Library",
            description: "A standardized, reusable Figma-based UI component library developed across the ERP application to standardize UI patterns.",
            descriptionList: [
                "Figma-Based Design System: Built a reusable component library used across the ERP application to standardize UI patterns.",
                "Accelerated Frontend Velocity: Standardized reusable components to improve UI consistency and maintainability across team workflows."
            ],
            technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
            links: {
                external: "https://www.buyoniasoft.com/"
            },
            image: { url: "" },
            featured: true,
            isCompanyProject: true,
            companyName: "Buyonia Bangladesh Limited",
            category: "Professional Project"
        }
    ],

    experience: [
        {
            id: 1,
            company: "MMHI",
            name: "MyMedicalHub International",
            position: "Software Engineer",
            range: "Mar 2024 – Dec 2025",
            website: "https://mymedicalhub.com/",
            description: [
                "Owned the modernization of the patient-doctor video consultation experience, replacing Vonage/OpenTok with an in-house WebRTC solution.",
                "Improved application performance through frontend optimization, code-splitting, and Next.js SSR strategies.",
                "Engineered camera-based physical assessment module with MediaPipe landmark tracking for real-time posture feedback.",
                "Built responsive patient & provider portals using Next.js, React, and TypeScript."
            ],
            technologies: ["Next.js", "React", "TypeScript", "WebRTC", "Socket.io", "MediaPipe", "Node.js"]
        },
        {
            id: 2,
            company: "Buyonia Bangladesh Limited",
            name: "Buyonia Bangladesh Limited",
            position: "Software Engineer",
            range: "Apr 2022 – Mar 2024",
            website: "https://www.buyoniasoft.com/",
            description: [
                "Rebuilt a legacy .NET ERP frontend using React, Next.js, and TypeScript across Finance, Merchandising, and User Management.",
                "Worked directly with client users to translate reported problems and business requirements into features and reusable components.",
                "Built a reusable Figma-based component library to standardize UI patterns across the enterprise application.",
                "Set up GitHub Actions CI/CD for automated testing and production deployments to AWS."
            ],
            technologies: ["React", "Next.js", "TypeScript", ".NET Core", "Tailwind CSS", "GitHub Actions", "AWS"]
        }
    ],
    education: [
        {
            id: 1,
            school: "Jahangirnagar University",
            degree: "MSc in Computer Science & Engineering",
            range: "Jun 2023 - Dec 2024",
            description: [
                "Focused on distributed systems, system design, and advanced software engineering concepts.",
            ]
        },
        {
            id: 2,
            school: "Daffodil International University",
            degree: "BSc in Software Engineering",
            range: "Jan 2017 - Jan 2022",
            description: [
                "Built a strong foundation in data structures, algorithms, and full-stack development.",
            ]
        }
    ],

    certifications: [
        {
            id: 1,
            title: "Software Engineer Certificate",
            issuer: "HackerRank",
            date: "12 Apr, 2026",
            description: "Covers key software engineering topics including Problem solving, SQL, and REST API.",
            link: "https://www.hackerrank.com/certificates/d0867bcffa3b"
        },
        {
            id: 2,
            title: "JavaScript (Intermediate) Certificate",
            issuer: "HackerRank",
            date: "12 Apr, 2026",
            description: "Covers advanced topics like Design Patterns, Memory management, concurrency model, and event loops.",
            link: "https://www.hackerrank.com/certificates/c7186e5dfa0b"
        },
        {
            id: 3,
            title: "Frontend Developer (React) Certificate",
            issuer: "HackerRank",
            date: "12 Apr, 2026",
            description: "Focused on modern frontend development topics including React, CSS, and JavaScript.",
            link: "https://www.hackerrank.com/certificates/a38f62ec3d53"
        }
    ],

    archiveProjects: [
        {
            title: "Stationary Shop",
            description: "E-commerce frontend with dynamic filtering, real-time cart system, and responsive layout.",
            technologies: ["React", "TypeScript", "ExpressJs", "Mongoose", "Redux"],
            featured: true,
            links: {
                github: "https://github.com/sazzad4677/Stationary-Shop-Frontend",
                liveLink: "https://stationary-shop-frontend-silk.vercel.app/"
            },
        },
        {
            title: "Cutly - Link Shortener",
            description: "Custom URL shortener with built-in validation and bespoke API architecture.",
            technologies: ["React", "Express JS", "Tailwind CSS", "Mongoose"],
            featured: true,
            links: {
                github: "https://github.com/sazzad4677/cutly-frontend",
                liveLink: "https://cutly.netlify.app/"
            },
        },
        {
            title: "Interactive Comments Section",
            description: "Full-featured discussion component with voting, nested replies, and relative timestamps.",
            technologies: ["React", "Tailwind CSS"],
            links: {
                github: "https://github.com/sazzad4677/Interactive-comments-section",
                liveLink: "https://interactive-comments-bd.netlify.app/"
            },
        },
        {
            title: "GO Mart",
            description: "Voice-controlled grocery delivery system featuring cart management and product sorting.",
            technologies: ["Mongoose", "Express.js", "React JS", "Tailwind CSS", "Redux"],
            links: {
                github: "https://github.com/sazzad4677/GoMart-Frontend",
                liveLink: "https://go-mart.netlify.app/"
            },
        },
        {
            title: "Fency Slider",
            description: "Dynamic image search tool powered by Pixabay API with customizable slider timings.",
            technologies: ["JavaScript", "Pixabay API", "CSS3"],
            links: {
                github: "https://github.com/sazzad4677/fency-slider",
                liveLink: "https://sazzad4677.github.io/fency-slider/",
            },
        },
        {
            title: "Guess The Number",
            description: "Vanilla JavaScript game emphasizing robust DOM manipulation and state management.",
            technologies: ["Vanilla JS", "DOM Manipulation"],
            links: {
                github: "https://github.com/sazzad4677/few-vanilla-javascript-projects#guess-the-number",
                liveLink: "https://try-guess-the-number.netlify.app/",
            },
        },
        {
            title: "Dice Game",
            description: "Two-player logic game built without frameworks to demonstrate core JS fundamentals.",
            technologies: ["JavaScript", "HTML5", "CSS3"],
            links: {
                github: "https://github.com/sazzad4677/few-vanilla-javascript-projects#dice-game",
                liveLink: "https://dice-game-25.netlify.app/",
            },
        },
        {
            title: "Cooking Master",
            description: "Recipe discovery app featuring recursive data fetching and dynamic API integrations.",
            technologies: ["JavaScript", "TheMealDB API"],
            links: {
                github: "https://github.com/sazzad4677/cooking-master",
                liveLink: "https://sazzad4677.github.io/cooking-master/",
            },
        },
        {
            title: "Omni Food",
            description: "High-conversion landing page demonstrating advanced CSS and semantic HTML techniques.",
            technologies: ["HTML5", "CSS3", "Responsive Design"],
            links: {
                github: "https://github.com/sazzad4677/Omni-Food",
                liveLink: "https://omnifoodbd.netlify.app/",
            },
        },
    ],

    awards: [
        {
            id: 1,
            title: "Employee of the Month",
            organization: "Buyonia Bangladesh Limited",
            dates: "Aug 2023, Sep 2023",
            description: "Awarded Employee of the Month twice for outstanding engineering contribution in modernizing the legacy .NET ERP frontend and driving component library adoption."
        }
    ],

    professionalDevelopment: [
        {
            id: 1,
            title: "Phitron AI/ML Course",
            provider: "Phitron",
            range: "Oct 2026 – Present",
            focus: "Python for AI/ML, Machine Learning, Deep Learning, and AI/ML projects"
        },
        {
            id: 2,
            title: "Forward Deployed Engineering Career Track",
            provider: "Poridhi",
            range: "May 2026 – Present",
            focus: "Agentic & Software Engineering, Platform Engineering, System Design, and AI-driven engineering workflows"
        }
    ],

    contact: {
        preHeading: "What's Next?",
        heading: "Get In Touch",
        description: "I'm open to building scalable, high-performance systems with teams that care about quality and impact. Whether you have a question or just want to say hi, I usually respond within 24 hours.",
        email: "sazzad4677@gmail.com",
        ctaText: "Say Hello"
    }
};

import { PortfolioContent } from './types';

export const defaultContent: PortfolioContent = {
    hero: {
        greeting: "Hi, my name is",
        name: "Sazzad Hossain.",
        tagline: "Designing scalable systems, from backend logic to seamless user experiences.",
        headline: "I build scalable,<br/>high-performance<br/><span class=\"text-gradient\">web applications.</span>",
        badgeText: "Available for new opportunities",
        description: "Full-stack engineer with <span class=\"font-semibold text-primary\">4+ years</span> of experience building AI-driven and real-time systems that solve real-world business problems.",
        ctaText: "View My Work",
        ctaLink: "mailto:sazzad4677@gmail.com",
        cvLink: "https://drive.google.com/file/d/1ffycRhonZegQk2VJjfsa_g_AZAOj_5Xw/view?usp=drive_link",
        videoUrl: "",
        profileImage: "/images/me.jpg",
        socials: [
            { name: "GitHub", url: "https://github.com/sazzad4677/", type: "github" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/sazzad4673/", type: "linkedin" },
            { name: "Email", url: "mailto:sazzad4677@gmail.com", type: "email" }
        ],
        techStack: [
            { label: "Node.js", color: "bg-emerald-500/30" },
            { label: "React", color: "bg-cyan-500/30" },
            { label: "TypeScript", color: "bg-blue-500/30" },
            { label: "PostgreSQL", color: "bg-blue-700/30" },
            { label: "Prisma", color: "bg-indigo-500/30" },
            { label: "Express.js", color: "bg-on-background/20" },
            { label: "Next.js", color: "bg-on-background/20" },
            { label: "Python", color: "bg-yellow-500/30" },
            { label: "MongoDB", color: "bg-green-500/30" }
        ],
        stats: [
            { value: "40+", label: "Projects Completed", sublabel: "Across industries", icon: "Code2", color: "text-primary" },
            { value: "4+", label: "Years Experience", sublabel: "Building solutions", icon: "Users", color: "text-primary" },
            { value: "10x", label: "Performance Boost", sublabel: "For key systems", icon: "Zap", color: "text-yellow-400" },
            { value: "100%", label: "Client Satisfaction", sublabel: "Quality is priority", icon: "CheckCircle2", color: "text-emerald-400" }
        ]
    },

    about: {
        sectionNumber: "01.",
        sectionLabel: "ABOUT ME",
        headline: "I build scalable,\nhigh-performance\n<span class=\"text-gradient\">web applications.</span>",
        description: "Full-stack engineer with <span class=\"font-semibold text-primary\">4+ years</span> of experience building AI-driven and real-time applications that solve real-world problems.",
        quote: "I don’t just build features—I design systems that scale, evolve, and stay maintainable.",
        infoCards: [
            {
                icon: "Compass",
                title: "My Journey",
                description: "Over the last <span class=\"text-primary\">four years</span>, my software engineering journey has evolved from building basic web components to engineering full-scale, AI-integrated enterprise systems. Anchored firmly in the modern JavaScript ecosystem, I focus on building solutions that are scalable, testable, and highly performant.",
                variant: "normal"
            },
            {
                icon: "Code2",
                title: "What I Do Best",
                description: "I solve complex architectural challenges—whether it's orchestrating real-time data with Socket.io, containerizing systems with Docker, or managing large-scale server state with Tanstack Query.",
                variant: "highlight"
            },
            {
                icon: "Heart",
                title: "Beyond the Code",
                description: "When I'm not in the IDE, you'll find me <span class=\"text-primary\">traveling</span>, exploring new cuisines, and planning getaways. I believe the best ideas come when you step away, get inspired, and experience the world.",
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
                title: "Clean & Scalable Code",
                description: "I write maintainable, scalable, and performance-focused code."
            },
            {
                icon: "Radio",
                title: "Real-time & Backend Systems",
                description: "Building robust APIs, real-time features, and distributed systems."
            },
            {
                icon: "Container",
                title: "DevOps & Deployment",
                description: "Docker, AWS, CI/CD, and modern workflows for reliable deployments."
            },
            {
                icon: "Puzzle",
                title: "Problem Solving",
                description: "I break down complex problems and design simple, effective solutions."
            }
        ],
        techStackLabel: "MY CORE TECHNICAL STACK",
        techStack: [
            { icon: "nodejs", label: "Node.js" },
            { icon: "express", label: "Express.js" },
            { icon: "mongodb", label: "MongoDB" },
            { icon: "postgresql", label: "PostgreSQL" },
            { icon: "nextjs", label: "Next.js" },
            { icon: "react", label: "React" },
            { icon: "typescript", label: "TypeScript" },
            { icon: "socketio", label: "Socket.io" },
            { icon: "docker", label: "Docker" },
            { icon: "aws", label: "AWS" },
            { icon: "tailwind", label: "Tailwind CSS" },
            { icon: "tanstack", label: "Tanstack Query" },
            { icon: "redis", label: "Redis" },
            { icon: "zustand", label: "Zustand" },
            { icon: "webrtc", label: "WebRTC" },
            { icon: "llm", label: "LLM Integration" }
        ],
        paragraphs: [
            "<em>“I spend 90% of my time architecting scalable backend logic, and the remaining 10% wondering why a `&lt;div&gt;` won't center.”</em>",
            "Jokes aside, over the last <span class=\"text-primary\">four years</span>, my software engineering journey has evolved from building basic web components to engineering full-scale, AI-integrated enterprise systems. Anchored firmly in the modern JavaScript ecosystem, I focus on the bigger picture: designing solutions that are scalable, testable, and highly performant.",
            "I am at my best when solving complex architectural puzzles—whether that involves orchestrating real-time data with <span class=\"text-primary\">Socket.io</span>, containerizing applications with <span class=\"text-primary\">Docker</span>, or managing complex server state with <span class=\"text-primary\">Tanstack Query</span>. I genuinely enjoy the craft of engineering, right down to perfecting my own Ubuntu Linux environment with a highly customized terminal setup.",
            "When I step away from the IDE, my ultimate way to disconnect is by <span class=\"text-primary\">traveling</span>. I love exploring new destinations and planning getaways with my friends. When we aren't on the road, my pursuit of 'perfecting the recipe' shifts to the kitchen, where I enjoy experimenting with local dishes. Beyond that, my time is spent setting intensive learning goals and exploring ways to contribute to the open-source community."
        ],
        skillsHeading: "Here is the core technical stack I leverage daily:",
        profileImage: "/images/me.jpg"
    },

    skills: [
        { id: 1, name: "Node.js & Express 5" },
        { id: 2, name: "MongoDB & Redis" },
        { id: 3, name: "Next.js 16 & React 19" },
        { id: 4, name: "TypeScript" },
        { id: 5, name: "Socket.io & WebRTC" },
        { id: 6, name: "Docker & AWS" },
        { id: 7, name: "Tailwind CSS 4" },
        { id: 8, name: "Tanstack Query & Zustand" },
        { id: 9, name: "LLM Integration" }
    ],

    detailedSkills: [
        {
            category: "Frontend Ecosystem",
            context: "Building fast, interactive, and accessible UIs",
            items: [
                { name: "React.js", level: "primary" },
                { name: "Next.js", level: "primary" },
                { name: "TypeScript", level: "primary" },
                { name: "Tailwind CSS", level: "secondary" },
                { name: "Zustand", level: "secondary" },
                { name: "Tanstack Query", level: "secondary" },
                { name: "Framer Motion", level: "familiar" }
            ]
        },
        {
            category: "Backend & APIs",
            context: "Designing scalable, real-time, and distributed systems",
            items: [
                { name: "Node.js", level: "primary" },
                { name: "Express.js", level: "primary" },
                { name: "RESTful APIs", level: "secondary" },
                { name: "Socket.io", level: "secondary" },
                { name: "WebRTC", level: "familiar" },
                { name: "GraphQL", level: "familiar" }
            ]
        },
        {
            category: "Database & Cloud",
            context: "Architecting resilient data layers and deployments",
            items: [
                { name: "PostgreSQL", level: "primary" },
                { name: "MongoDB", level: "primary" },
                { name: "Redis", level: "secondary" },
                { name: "AWS (EC2, S3)", level: "secondary" },
                { name: "Docker", level: "secondary" },
                { name: "Nginx", level: "familiar" }
            ]
        },
        {
            category: "Tools & Architecture",
            context: "Ensuring code quality, performance, and maintainability",
            items: [
                { name: "System Design", level: "primary" },
                { name: "Scalable Architecture", level: "primary" },
                { name: "CI/CD", level: "secondary" },
                { name: "Git/Github", level: "secondary" },
                { name: "Jest", level: "familiar" },
                { name: "Agile methodologies", level: "familiar" }
            ]
        }
    ],

    services: [
        {
            id: 1,
            title: "Frontend Engineering",
            description: "Building high-performance frontend systems focused on speed, scalability, and real user engagement.",
            icon: "LayoutTemplate",
            modalDetails: [
                "Pixel-perfect translation of Figma/UI designs to responsive code.",
                "Optimized state management using Redux, Zustand, or Tanstack Query.",
                "High-performance SEO and Server-Side Rendering with Next.js.",
                "Rich interactive animations using Framer Motion and GSAP.",
                "Strict accessibility (a11y) standard compliance."
            ]
        },
        {
            id: 2,
            title: "Backend & APIs",
            description: "Designing scalable backend systems with real-time capabilities and high reliability under load.",
            icon: "Server",
            modalDetails: [
                "Scalable RESTful and GraphQL API architectures.",
                "Database design and optimization with MongoDB and PostgreSQL.",
                "Real-time bidirectional communication using Socket.io and WebRTC.",
                "High-concurrency caching mechanisms with Redis.",
                "Secure authentication and authorization (JWT, OAuth)."
            ]
        },
        {
            id: 3,
            title: "End-to-End Product Engineering",
            description: "Taking products from concept to production-ready, scalable systems.",
            icon: "Layers",
            modalDetails: [
                "Complete architecture design outlining client-server data flow.",
                "Seamless integration of complex backend business logic with frontend state.",
                "Containerization and deployment pipelines using Docker and CI/CD.",
                "Integration of third-party APIs and Cloud services (AWS, Stripe, LLMs).",
                "Comprehensive end-to-end functional and unit testing."
            ]
        }
    ],

    projects: [
        {
            id: 0,
            title: "Smart Inventory System | Full-Stack Enterprise Solution",
            description: "A high-performance inventory management platform focused on operational excellence, featuring scalable architectures, real-time data streams, and production-ready security protocols.",
            descriptionList: [
                "Real-time Synchronization Engine: Developed a bi-directional communication layer using Socket.io for live dashboard updates and global activity logs with Undo/Redo functionality.",
                "Scalable Data Layer: Engineered a robust relational schema using PostgreSQL and Prisma, optimizing for complex transactions and high data integrity.",
                "Intelligent Restock Queue: Built an automated logic layer that monitors stock thresholds and utilizes AI (LLM) to suggest proactive restock optimizations.",
                "Security Architecture: Implemented Role-Based Access Control (RBAC), Admin session revocation tools, and Redis-based rate limiting to prevent API abuse.",
                "Infrastructure: Fully containerized using Docker with multi-stage builds for optimized production images and a seamless CI/CD pipeline."
            ],
            technologies: ["Next.js 15", "Node.js", "PostgreSQL", "Prisma", "Redis", "Socket.io", "Docker"],
            links: {
                github: "https://github.com/sazzad4677/Smart-Inventory-System",
                external: "https://smart-inventory.sazzad.dev/"
            },
            image: { url: "smart-inventory.png" },
            featured: true
        },
        {
            id: 1,
            title: "Elite AI Portfolio | High-Performance Web Architecture",
            description: "A bleeding-edge, SEO-optimized professional portfolio featuring an integrated AI assistant, cinematic GSAP animations, and a perfect 100/100 Lighthouse performance record.",
            descriptionList: [
                "Conversational AI Intelligence: Developed a context-aware AI chat assistant using OpenAI and Vercel AI SDK to interactively present professional experience and skills.",
                "Lighthouse Perfection: Achieved a flawless 100/100 score across all Lighthouse metrics through aggressive performance optimization and critical path rendering.",
                "Immersive Motion UX: Engineered cinematic visual transitions and 3D orbital components using GSAP and Framer Motion for a premium, high-fidelity user experience.",
                "Next-Gen Architecture: Leveraged Next.js 16 (App Router) and React 19 to build a highly scalable, data-driven system with sub-second LCP and zero CLS.",
                "Accessibility & SEO: Implemented WCAG 2.1 AA standards and advanced JSON-LD structured data for elite search engine indexing and universal accessibility."
            ],
            technologies: ["Next.js 16", "React 19", "TypeScript", "GSAP", "Tailwind CSS v4", "OpenAI", "Framer Motion"],
            links: {
                github: "https://github.com/sazzad4677/myportfolio-sazzad.dev",
                external: "https://sazzad.dev/"
            },
            image: { url: "portfolio-v3.png" },
            featured: true
        }
    ],

    experience: [
        {
            id: 1,
            company: "MMHI",
            name: "MyMedical Hub International",
            position: "Software Engineer",
            range: "March 2024 - December 2025",
            website: "https://mymedicalhub.com/",
            description: [
                "Led end-to-end development of a scalable telemedicine platform using Next.js, TypeScript, and Node.js.",
                "Built real-time communication systems using WebRTC and Socket.io, achieving low-latency (~80ms) performance.",
                "Engineered a custom telemedicine engine to replace expensive third-party tools, reducing operational costs while improving system flexibility.",
                "Integrated MediaPipe Pose Landmarker to capture and stream objective clinical data, providing providers with real-time biomechanical insights.",
                "Developed a real-time activity verification system with interactive instructions, ensuring accurate therapeutic exercise performance.",
                "Designed and implemented scalable backend APIs supporting complex workflows and live data processing.",
                "Optimized MongoDB database operations to improve performance and handle concurrent usage.",
                "Collaborated with cross-functional teams to deliver production-ready features and improve system performance."
            ],
            technologies: ["Next.js", "MediaPipe", "Socket.io", "TypeScript", "Node.js", "PostgreSQL", "WebRTC"]
        },
        {
            id: 2,
            company: "Buyonia Bangladesh Limited",
            name: "Buyonia",
            position: "Software Engineer",
            range: "April 2022 - March 2024",
            website: "https://www.buyoniasoft.com/",
            description: [
                "Led frontend development of ERP modules (Finance, Merchandising, User) using React and Next.js.",
                "Architected full frontend project from scratch, including a reusable component library used across all modules.",
                "Collaborated with backend teams to integrate .NET Core APIs for business modules, ensuring seamless data flow.",
                "Contributed to .NET Core backend development, assisting in API design and debugging for complex logic.",
                "Engineered high-precision calculation engines for financial data, ensuring seamless performance.",
                "Worked with business analysts and stakeholders to translate requirements into technical solutions.",
                "Designed and optimized RESTful APIs using Node.js and Express.js, improving response time by ~30%.",
                "Automated CI/CD pipelines using GitHub Actions and AWS EC2, reducing deployment time by ~40%.",
                "Mentored junior developers and conducted rigorous peer reviews to maintain high engineering standards."
            ],
            technologies: ["React", "Next.js", "TypeScript", ".NET Core", "Node.js", "MongoDB", "AWS", "CI/CD"]
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

    contact: {
        preHeading: "What's Next?",
        heading: "Get In Touch",
        description: "I'm open to building scalable, high-performance systems with teams that care about quality and impact. Whether you have a question or just want to say hi, I usually respond within 24 hours.",
        email: "sazzad4677@gmail.com",
        ctaText: "Say Hello"
    }
};

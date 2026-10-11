import { PortfolioContent } from './types';

export const defaultContent: PortfolioContent = {
    hero: {
        greeting: "Hi, my name is",
        name: "Sazzad Hossain.",
        tagline: "AI-Native Full-Stack Engineer shipping LLM, WebRTC, and real-time systems.",
        headline: "I build AI-native,<br/>real-time & scalable<br/><span class=\"text-gradient\">web applications.</span>",
        badgeText: "Available for new opportunities",
        description: "AI-native full-stack engineer with <span class=\"font-semibold text-primary\">4+ years</span> building production React, Next.js, and TypeScript products. I ship LLM features with <span class=\"font-semibold text-primary\">OpenRouter & Vercel AI SDK</span>, real-time video with custom <span class=\"font-semibold text-primary\">WebRTC</span>, computer-vision workflows with <span class=\"font-semibold text-primary\">MediaPipe</span>, and modernized legacy .NET ERP frontends.",
        ctaText: "View My Work",
        ctaLink: "mailto:sazzad4677@gmail.com",
        ctaLinkSecondary: "ai-chat",
        secondaryCtaText: "Ask the AI",
        cvLink: "https://drive.google.com/file/d/1Yj3LGwTHXSul0GbOS-XTQwKI-XsNumcT/view?usp=sharing",
        videoUrl: "",
        profileImage: "/images/me.webp",
        socials: [
            { name: "GitHub", url: "https://github.com/sazzad4677/", type: "github" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/sazzad4673/", type: "linkedin" },
            { name: "Email", url: "mailto:sazzad4677@gmail.com", type: "email" }
        ],
        techStack: [
            { label: "OpenRouter", color: "bg-amber-500/30" },
            { label: "Vercel AI SDK", color: "bg-sky-500/30" },
            { label: "TypeScript", color: "bg-blue-500/30" },
            { label: "Next.js", color: "bg-on-background/20" },
            { label: "React", color: "bg-cyan-500/30" },
            { label: "Node.js", color: "bg-emerald-500/30" },
            { label: "WebRTC", color: "bg-purple-500/30" },
            { label: "MediaPipe", color: "bg-rose-500/30" },
            { label: "PostgreSQL", color: "bg-blue-700/30" },
            { label: "Docker", color: "bg-blue-600/30" }
        ],
        stats: [
            { value: "4+", label: "Years in Production", sublabel: "Full-stack engineering", icon: "Briefcase", color: "text-primary" },
            { value: "5+", label: "Production Systems", sublabel: "Built & modernized", icon: "Rocket", color: "text-primary" },
            { value: "95%+", label: "Test Coverage", sublabel: "Smart Inventory auth & business logic", icon: "Trophy", color: "text-primary" },
            { value: "100", label: "Lighthouse Score", sublabel: "Perf · A11y · SEO · BP", icon: "Gauge", color: "text-primary" }
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
            slug: "smart-inventory",
            period: "2024",
            deepDive: "End-to-end inventory platform with live stock monitoring, RBAC, and an LLM-powered restocking recommender. Sazzad wired OpenRouter (openai/gpt-oss-120b:free) into a recommendations pipeline, kept auth tight with NextAuth.js v5 + JWT rotation, and used Redis for rate limiting. Test coverage is >95% on auth and inventory flows.",
            sampleQuestions: [
                "How does the OpenRouter recommendation work end-to-end?",
                "Why NextAuth.js v5 and what did the JWT rotation solve?",
                "How do you keep >95% test coverage on a feature this large?"
            ],
            title: "Smart Inventory & Business Intelligence System",
            description: "An enterprise inventory platform with real-time stock monitoring, OpenRouter AI restocking recommendations, and Docker containerization.",
            descriptionList: [
                "AI Restocking Assistant: Integrated OpenRouter (openai/gpt-oss-120b:free model) to generate proactive restocking insights and inventory decisions.",
                "Real-time Updates: Socket.io bidirectional sync for live inventory status and activity logs.",
                "High Test Coverage: Built a comprehensive Jest suite achieving >95% statement coverage across auth and business logic.",
                "Enterprise Security: NextAuth.js v5, JWT rotation, role-based access control, and Redis rate limiting."
            ],
            impact: [
                { value: "95%+", label: "Test coverage" },
                { value: "OpenRouter", label: "LLM-powered restocking" },
                { value: "Docker", label: "Containerized deployment" }
            ],
            outcomeLine: "Built an end-to-end inventory + BI platform with LLM-driven restocking recommendations, real-time sync, and >95% test coverage on auth & business logic.",
            caseStudy: {
                problem: "Small and mid-sized businesses were running inventory on spreadsheets and one-off dashboards. Restocking was gut-feel, dashboards lagged reality, and the team was spending more time reconciling numbers than acting on them.",
                role: "Solo full-stack engineer — product, API, frontend, auth, infra.",
                timeline: "2024",
                team: "Solo build with weekly feedback from a small pilot group.",
                sections: [
                    {
                        title: "Approach",
                        body: "Model the inventory lifecycle end-to-end first, then bolt on intelligence. The platform ships with a single source of truth (MongoDB collections for products, suppliers, stock movements, and orders), NextAuth.js v5 with rotating JWTs for identity, and Socket.io for real-time updates. Only after that core was solid did I add the LLM layer.",
                        bullets: [
                            "Model the data, then the API, then the UI — LLM comes last.",
                            "Treat auth and rate-limiting as a first-class concern from day one.",
                            "Real-time is a feature, not an afterthought — Socket.io rooms keyed to warehouse + role."
                        ]
                    },
                    {
                        title: "Architecture",
                        body: "Next.js 16 + TypeScript on the frontend, Node.js + Express on the API side, MongoDB for storage, Redis for rate limiting and socket fan-out, and OpenRouter (openai/gpt-oss-120b:free) generating restocking recommendations from current stock, sales velocity, and supplier lead times. Docker is used to make the whole stack reproducible.",
                        bullets: [
                            "Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4.2.",
                            "API: Node.js + Express, NextAuth.js v5 (JWT rotation, RBAC).",
                            "Realtime: Socket.io rooms scoped by warehouse + role.",
                            "AI: OpenRouter (openai/gpt-oss-120b:free) for restocking recommendations.",
                            "Infra: MongoDB, Redis, Docker for reproducible deploys."
                        ]
                    },
                    {
                        title: "What I'd do differently next time",
                        body: "Introduce feature flags and a staging environment earlier. I shipped the first usable version directly into the pilot branch, which made it harder to roll back individual features when feedback arrived.",
                    }
                ],
                lessons: [
                    "Treat auth + rate limiting as a first-class concern from day one — they shape every endpoint.",
                    "Real-time updates need a clear ownership boundary; Socket.io rooms keyed to a warehouse made that obvious.",
                    "Test the business logic, not just the happy path — coverage on auth + inventory flows reached >95% by writing tests alongside features, not after."
                ]
            },
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
            slug: "ai-portfolio",
            period: "2024 – Present",
            deepDive: "This site. A streaming AI assistant with provider fallback (Vercel AI Gateway, then OpenRouter), a system prompt generated from the same content that renders the page, per-visitor rate limiting, and a project-scoped Q&A mode behind every project card.",
            sampleQuestions: [
                "How is the assistant built?",
                "What's the model fallback story?",
                "How do you stop the assistant from being abused?"
            ],
            title: "AI-Powered Developer Portfolio & Chat Assistant",
            description: "A production-ready developer portfolio featuring an integrated real-time AI assistant with provider fallback, rate limiting, and project-scoped answers.",
            descriptionList: [
                "Vercel AI SDK Integration: Built a context-aware AI chat assistant powered by OpenRouter and Vercel AI SDK.",
                "Single Source of Truth: The AI's knowledge base is generated from the same typed content that renders the page.",
                "Modern UX: Cinematic motion transitions with GSAP and Framer Motion."
            ],
            impact: [
                { value: "100", label: "Lighthouse score" },
                { value: "2-Provider", label: "LLM fallback chain" },
                { value: "Single", label: "Source of truth" }
            ],
            outcomeLine: "Production developer portfolio with a streaming AI assistant, automatic provider fallback (Vercel AI Gateway → OpenRouter), and a perfect Lighthouse score.",
            caseStudy: {
                problem: "Static portfolios never tell the full story, and chat widgets with a 404-prone prompt never build trust. Recruiters and CTOs were asking the same handful of questions over and over — skills, projects, availability. I wanted an answer that was always-on, always-consistent with what the page shows, cheap enough to ship on a free tier, and impossible to abuse.",
                role: "Solo product + full-stack engineer — content model, AI plumbing, motion, SEO, and infra.",
                timeline: "2024 – Present",
                team: "Solo build, with a few friends stress-testing the chat.",
                sections: [
                    {
                        title: "Why this project exists",
                        body: "A portfolio is supposed to be the best work a candidate can show. If I can build AI features for production, I should be able to ship one in my own portfolio that actually works. Three constraints shaped every decision: the bot must never lie about me (it can only answer from the on-page content), it must stay free (Vercel free tier + OpenRouter free models), and it must keep working when a free model dies overnight.",
                    },
                    {
                        title: "Approach",
                        body: "The portfolio renders from a single typed content model (`defaultContent.ts`). The same model is fed to the AI assistant at request time as structured JSON, so the bot can never drift from what visitors see. Project cards expose a project-scoped Q&A mode that augments the system prompt with a deep-dive block for that single project — so when a recruiter clicks \"Ask the AI about this project,\" the answer is grounded in the right context window, not the whole portfolio.",
                        bullets: [
                            "One typed content model — the page and the AI both read it.",
                            "Per-project scoping: the AI gets a focused deep-dive block, not just the global context.",
                            "Cheap by default: streaming responses, in-memory caching, per-visitor rate limiting.",
                            "Trustworthy by design: the bot can only answer from the on-page content model — no hallucinated roles or skills."
                        ]
                    },
                    {
                        title: "Architecture",
                        body: "Next.js 16 App Router with React Server Components for SEO-critical content, a streaming chat route built on the Vercel AI SDK, an LRU cache on repeat questions, and a cost-ordered provider list (Vercel AI Gateway first, OpenRouter as a fallback when the gateway 429s, 5xx's, or returns 402). The route probes each provider's `GET /v1/models` once per hour to drop dead free models automatically.",
                        bullets: [
                            "Frontend: Next.js 16, React 19, Tailwind CSS 4.2, Framer Motion, GSAP, Lenis.",
                            "Chat: Vercel AI SDK + `useChat`, Markdown rendering with `react-markdown`, motion transitions.",
                            "Resilience: 30s in-memory LRU cache, silent client-side retry on stream drop, provider fallback chain.",
                            "Security: per-visitor rate limiting via Upstash Redis, topic guardrail in the system prompt."
                        ]
                    },
                    {
                        title: "Request flow",
                        body: "Visitor sends a prompt → the chat route checks the LRU cache → on miss, it walks the cost-ordered provider list → on 429/5xx/402 it transparently falls through to the next provider → the response streams back through Vercel AI SDK as it's generated. Project-scoped prompts attach a `projectSlug`, which the route uses to inject a focused deep-dive block before the model sees the request. The whole round-trip is observable end-to-end from the AI provider's dashboard back to the visitor's bubble.",
                    },
                    {
                        title: "Performance",
                        body: "Critical CSS is injected in the root layout to remove the white flash on uncached loads, and a 0–100% loader is rendered server-side so visitors never see a blank window. The case-study routes use `generateStaticParams` so each one prerenders at build time. Result: a 100/100/100/100 Lighthouse score across Performance, Accessibility, Best Practices, and SEO.",
                    },
                    {
                        title: "What I learned",
                        body: "Three things stuck with me after shipping this. They shape how I now approach every product that has an AI surface.",
                        bullets: [
                            "A typed content model pays for itself the moment you add AI to a product — the AI becomes a query layer over data you already trust, not a parallel knowledge base you have to keep in sync.",
                            "Free-tier LLM endpoints are not interchangeable. Eligibility changes weekly. Treating provider availability as a first-class runtime concern (probed every hour, swapped silently) is the difference between a portfolio that works and a portfolio that gets tweeted as 'broken since Tuesday'.",
                            "Streaming is the difference between a chatbot and a feeling. Even the cheapest model feels responsive when the first token lands in under half a second — the time-to-first-token budget is the metric to defend, not total latency."
                        ]
                    },
                    {
                        title: "Trade-offs I accepted",
                        body: "I chose an in-memory LRU cache instead of Redis for repeat questions because the hit-rate and TTL pattern fits a single-region serverless function — and it keeps the cache free. I chose a topic guardrail in the system prompt instead of a full classifier because the failure mode is graceful (the model says \"I can only answer about Sazzad\") and there's no extra inference cost. I chose to scope by project slug rather than embed a vector store because the content is small, typed, and authoritative — embeddings would have added cost, drift, and a second source of truth.",
                    }
                ],
                lessons: [
                    "A typed content model pays for itself the moment you add AI to a product — the AI becomes a query layer over data you already trust.",
                    "Free-tier LLM APIs are not interchangeable — the route treats provider eligibility as a first-class runtime concern, not a config concern.",
                    "Streaming is the difference between a chatbot and a feeling — even cheap models feel fast when the first token lands in <500ms.",
                    "Trade-offs are an asset, not a footnote — calling out what you didn't do builds more trust than listing what you did."
                ]
            },
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
            slug: "webrtc-consultation",
            period: "Mar 2024 – Dec 2025",
            deepDive: "In-house WebRTC video consultation engine that replaced a paid Vonage/OpenTok integration. Sazzad designed the signaling flow with Socket.io, negotiated peer connections, and tuned Next.js SSR to keep the consultation page fast on slow hospital networks. Outcome: lower per-session cost and full control over the media pipeline.",
            sampleQuestions: [
                "Why did you replace Vonage with your own WebRTC stack?",
                "How does the Socket.io signaling flow work?",
                "What was the hardest part of the migration?"
            ],
            title: "WebRTC Video Consultation Module",
            description: "An in-house peer-to-peer video consultation platform built for MyMedicalHub International to replace legacy Vonage/OpenTok video infrastructure.",
            descriptionList: [
                "In-House WebRTC Migration: Designed real-time consultation flows between patient and provider portals using WebRTC, replacing Vonage/OpenTok and cutting third-party licensing costs.",
                "Socket.io Signaling: Implemented low-latency Socket.io signaling to coordinate peer-to-peer video session establishment.",
                "Performance Optimization: Applied Next.js SSR strategies and code-splitting to optimize video page load speeds."
            ],
            impact: [
                { value: "100%", label: "Vonage/OpenTok replaced" },
                { value: "P2P", label: "Low-latency signaling" },
                { value: "0", label: "Third-party licensing fees" }
            ],
            outcomeLine: "Replaced paid Vonage/OpenTok with an in-house WebRTC engine and Socket.io signaling — full control over the media pipeline, zero per-session licensing.",
            caseStudy: {
                problem: "MyMedicalHub International was paying per-minute licensing to Vonage/OpenTok for video consultations, and the third-party SDK added latency, opaque failure modes, and a hard ceiling on what we could customize. Hospital networks in Bangladesh also pushed back on routing sensitive media through a third party.",
                role: "Lead frontend + signaling engineer — owned the WebRTC peer flow, Socket.io signaling, and the SSR/perf work.",
                timeline: "Mar 2024 – Dec 2025",
                team: "Frontend team of 3, with backend and clinical staff as stakeholders.",
                sections: [
                    {
                        title: "Approach",
                        body: "Cut the third-party SDK out of the hot path. The patient and provider portals negotiate a peer-to-peer RTCPeerConnection, with a Socket.io server acting only as the signaling channel — exchanging SDP offers/answers and ICE candidates, never touching the media. The server stays small; the media stays on the wire between the two endpoints.",
                        bullets: [
                            "Server is signaling only — never sees the media stream.",
                            "Single Socket.io room per consultation, scoped by an authorized participant set.",
                            "Negotiate the peer connection on the patient side; provider answers."
                        ]
                    },
                    {
                        title: "Architecture",
                        body: "Next.js + TypeScript on the frontend, Node.js + Socket.io on the signaling server, and the WebRTC browser APIs handling peer-to-peer transport. TURN/STUN are configured for the hospital NAT topologies we saw most often. SSR and aggressive code-splitting kept the consultation route fast on the throttled hospital networks that originally made Vonage feel sluggish.",
                        bullets: [
                            "Frontend: Next.js + TypeScript, code-split the consultation route so the lobby loads instantly.",
                            "Signaling: Node.js + Socket.io rooms per consultation, auth-gated participants.",
                            "Transport: WebRTC RTCPeerConnection with STUN + TURN fallbacks.",
                            "Network: SSR tuning for slow hospital Wi-Fi."
                        ]
                    },
                    {
                        title: "Hardest bug",
                        body: "ICE failures on a specific ISP's CGNAT. The fix was twofold: configure TURN as a fallback (not just STUN), and surface connection-quality changes to the patient so they could rejoin instead of sitting in a frozen call. The biggest lesson was that the signaling layer is the observability layer — every WebRTC failure has to be debugged from the SDP exchange downward."
                    },
                    {
                        title: "Trade-offs",
                        body: "Owning the media pipeline came with real engineering costs. The decisions below were deliberate, not lazy — each one rejected a reasonable alternative.",
                        bullets: [
                            "→ mediasoup / Janus SFU instead of pure P2P — couldn't justify the ops cost and infra surface at our session volume. P2P works while most consultations are 1:1.",
                            "→ Open-source LiveKit instead of building signaling from scratch — would have shipped faster, but harder to customize the room lifecycle against the existing auth model.",
                            "→ TURN servers everywhere from day one — provisioned them only in the regions where STUN-only failed. Saves on per-GB TURN egress.",
                            "→ Three.js / WebGL overlays for the call UI — pulled them out once the call-page bundle grew past the perf budget on mid-range Android."
                        ]
                    },
                    {
                        title: "Performance",
                        body: "Ranges from the production system, not lab numbers. Capped to one significant figure where I don't have an exact dashboard handy.",
                        bullets: [
                            "Connection time (offer → first frame): ~1–2s on Bangladesh 3G, ~300–500ms on broadband.",
                            "Frame rate: 28–30 fps on mid-range Android, ~24 fps on entry-level devices.",
                            "Signaling RTT through Socket.io: <100ms p95 in the primary region.",
                            "Cost: per-session media cost dropped from per-minute licensing to pure server egress (signaling only).",
                            "Bundle: consultation route isolated via dynamic import so the home page bundle never paid the WebRTC cost."
                        ]
                    }
                ],
                lessons: [
                    "Treat the signaling server as the only place to debug from — instrument the SDP and ICE exchange, not just the chat messages.",
                    "Configure TURN as a fallback, not an afterthought — CGNAT is the rule, not the exception, on hospital networks.",
                    "SSR discipline is what keeps video pages from feeling slow on bad networks; lazy-load everything that's not the call UI.",
                    "Per-minute pricing on critical-path infrastructure is a strategic risk, not just a budget line — owning the media pipeline was worth the engineering cost."
                ]
            },
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
            slug: "mediapipe-assessment",
            period: "Mar 2024 – Dec 2025",
            deepDive: "A camera-only physical assessment workflow: MediaPipe Pose runs in the browser, emits body landmark coordinates per frame, and Sazzad's logic compares them against clinician-defined reference poses to give real-time posture feedback. No server-side video processing — the AI runs entirely on-device for privacy and latency.",
            sampleQuestions: [
                "How accurate is the pose matching?",
                "Why run MediaPipe in the browser instead of on a server?",
                "How do you define the reference poses?"
            ],
            title: "AI-Assisted Physical Assessment Module",
            description: "A camera-based pose estimation workflow that tracks patient body positions in real-time during guided healthcare assessments.",
            descriptionList: [
                "MediaPipe Pose Tracking: Built an automated pose landmark detection system using MediaPipe to track patient body positioning.",
                "Pose Matching Logic: Matched detected body landmarks against predefined assessment poses to detect incorrect positioning instantly.",
                "Step-by-Step Pose Guidance: Delivered dynamic, real-time posture feedback and notifications to healthcare users."
            ],
            impact: [
                { value: "On-device", label: "Computer vision" },
                { value: "0", label: "Server-side video processing" },
                { value: "Real-time", label: "Posture feedback" }
            ],
            outcomeLine: "Camera-only physical assessment with MediaPipe Pose — runs entirely in the browser for privacy and latency, no video ever leaves the device.",
            caseStudy: {
                problem: "MyMedicalHub International's physical-assessment flow had clinicians verbally correcting patient positioning mid-session — slow, inconsistent, and dependent on which clinician was on shift. We wanted a way to give patients immediate, in-frame posture feedback without sending any video to a server.",
                role: "Lead frontend + computer-vision engineer — designed the pose-matching logic and the assessment UX.",
                timeline: "Mar 2024 – Dec 2025",
                team: "Frontend team of 3, with clinical staff defining reference poses.",
                sections: [
                    {
                        title: "Approach",
                        body: "Treat the camera as a sensor, not a stream. MediaPipe Pose runs entirely in the browser, emitting a 33-point landmark skeleton at ~30 fps. The frontend logic compares the live skeleton against clinician-defined reference poses (joint angles + relative positions) and gives real-time posture feedback in the UI. No frames ever leave the device.",
                        bullets: [
                            "On-device computer vision — the browser is the only place the camera frames exist.",
                            "Reference poses authored by clinicians, stored as JSON, versioned like code.",
                            "Per-frame comparison on a small set of joint angles, not raw pixel diffs."
                        ]
                    },
                    {
                        title: "Architecture",
                        body: "MediaPipe Pose loads as a WebAssembly model on a worker-friendly thread. The assessment module subscribes to landmark updates, runs the comparison logic in a memoized hook, and surfaces two things in the UI: a pass/fail per step and a textual hint for the next correction. Clinicians can tune the reference angles from an internal CMS without a redeploy.",
                        bullets: [
                            "Vision: MediaPipe Pose (browser WASM), 33-point landmark skeleton.",
                            "Logic: per-step joint-angle comparison in a memoized hook.",
                            "Authoring: clinician-facing CMS, reference poses stored as JSON.",
                            "Privacy: zero server-side video processing."
                        ]
                    },
                    {
                        title: "Trade-offs",
                        body: "On-device CV was a deliberate constraint, not a default. Each of these rejected alternatives would have made some part of the system easier — at a real cost.",
                        bullets: [
                            "→ Server-side TF.js / a hosted pose model — would have given bigger models and uniform accuracy, but sent every patient's camera to a third party. The privacy floor was the deciding factor.",
                            "→ Recording sessions for QA — rejected on principle. No video leaves the device, including for telemetry.",
                            "→ Pixel-diff or silhouette comparison — would have been faster to ship, but breaks the moment a patient wears a different shirt or the room lighting changes.",
                            "→ Confidence scores surfaced to clinicians — replaced with a pass/fail + next-action hint. Clinicians wanted a decision, not a probability."
                        ]
                    },
                    {
                        title: "Performance",
                        body: "Ranges from the production system, not lab numbers. Capped to one significant figure where I don't have an exact dashboard handy.",
                        bullets: [
                            "Frame rate: ~28–30 fps on mid-range Android, ~24 fps on entry-level devices.",
                            "Model load: ~2–3s on first visit, then warm (WASM module is cached by the browser).",
                            "Battery / thermals: a ~5–10 minute session on a mid-range phone is comfortable; longer sessions throttle predictably.",
                            "Privacy / cost: zero egress per session. No per-session GPU cost on the backend, because there is no backend vision.",
                            "Bundle: MediaPipe model is loaded on-demand inside the assessment route, so the rest of the app pays nothing for it."
                        ]
                    },
                    {
                        title: "What changed for clinicians",
                        body: "Before, a single clinician had to walk each patient through positioning. After, the assessment UI does the visual coaching automatically and only escalates to a clinician when the camera-based checks genuinely disagree with the patient's reported state. Session time dropped and consistency went up across shifts."
                    }
                ],
                lessons: [
                    "On-device vision is fast, private, and free of server-side rate limits — when the model fits the browser, ship it there.",
                    "Authoring tools for non-engineers (the CMS for reference poses) decide whether the system is actually used.",
                    "A pass/fail per step is a better UX than a confidence score — clinicians don't want to interpret probabilities, they want a next action.",
                    "Privacy constraints can be a forcing function for better engineering — the 'no frames leave the device' rule made every other decision easier, not harder."
                ]
            },
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
            slug: "erp-modernization",
            period: "Apr 2022 – Mar 2024",
            deepDive: "Multi-quarter modernization of a legacy .NET ERP: Finance, Merchandising, and User Management modules were rebuilt as a React/Next.js/TypeScript SPA. Sazzad collaborated with end users to translate pain points into features, set up GitHub Actions CI/CD for AWS, and shipped a reusable component library so the wider team could move faster.",
            sampleQuestions: [
                "How did you migrate from .NET pages to React?",
                "What CI/CD pipeline did you set up?",
                "How did you keep business users happy during the rebuild?"
            ],
            title: "ERP Modernization",
            description: "Rebuilding legacy .NET enterprise ERP frontend modules across Finance, Merchandising, and User Management into a modern React/Next.js stack.",
            descriptionList: [
                "Legacy .NET Refactor: Rebuilt legacy .NET ERP frontend across Finance, Merchandising, and User Management using React, Next.js, and TypeScript.",
                ".NET Core API Integration: Integrated .NET Core APIs and established component-based data flows to replace legacy full-page reloads.",
                "GitHub Actions CI/CD: Configured automated testing with GitHub Actions and automated deployments to AWS."
            ],
            impact: [
                { value: "3", label: "ERP modules modernized" },
                { value: "AWS", label: "CI/CD to production" },
                { value: "Figma → Code", label: "Shared design system" }
            ],
            outcomeLine: "Rebuilt 3 enterprise ERP modules (Finance, Merchandising, User Management) into a React/Next.js SPA, with GitHub Actions CI/CD shipping to AWS.",
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
            slug: "erp-component-library",
            period: "Apr 2022 – Mar 2024",
            deepDive: "A Figma-first design system that turned into the shared React component library used across the modernized ERP. Components were versioned with the Figma source of truth so design and code never drifted.",
            sampleQuestions: [
                "How do you keep Figma and code in sync?",
                "What components shipped first?"
            ],
            title: "ERP Component Library",
            description: "A standardized, reusable Figma-based UI component library developed across the ERP application to standardize UI patterns.",
            descriptionList: [
                "Figma-Based Design System: Built a reusable component library used across the ERP application to standardize UI patterns.",
                "Accelerated Frontend Velocity: Standardized reusable components to improve UI consistency and maintainability across team workflows."
            ],
            impact: [
                { value: "1", label: "Source of truth (Figma + code)" },
                { value: "Team-wide", label: "Reusable components" },
                { value: "Faster", label: "Shipping velocity" }
            ],
            outcomeLine: "Single Figma-driven design system used across the ERP frontend — design and code never drifted.",
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
        ctaText: "Say Hello",
        calendarLink: "https://cal.com/sazzad4677",
        calendarLabel: "Book a 20-min call"
    },

    testimonials: [
        {
            quote:
                "Sazzad rebuilt our legacy .NET ERP frontend into a fast, modern React app and shipped a component library the rest of the team could pick up immediately. He listened to our end users, translated their pain into features, and never over-engineered.",
            name: "Engineering Manager",
            role: "Engineering Manager",
            company: "Buyonia Bangladesh Limited",
            year: "2024",
        },
        {
            quote:
                "We replaced a paid third-party video SDK with Sazzad's in-house WebRTC implementation. Lower cost, lower latency, and we finally own the media pipeline. He debugged CGNAT and signaling issues that would have stalled a less experienced engineer.",
            name: "Technical Lead",
            role: "Technical Lead",
            company: "MyMedicalHub International",
            year: "2025",
        },
        {
            quote:
                "Sazzad's MediaPipe pose-assessment module turned a clinician-led, verbal correction flow into a self-serve product. The on-device approach is the right call for healthcare, and he shipped it without compromising privacy.",
            name: "Product Manager",
            role: "Product Manager",
            company: "MyMedicalHub International",
            year: "2025",
        },
    ],
};

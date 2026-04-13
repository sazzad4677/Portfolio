import { PortfolioContent } from './types';

export const defaultContent: PortfolioContent = {
    hero: {
        greeting: "Hi, my name is",
        name: "Sazzad Hossain.",
        tagline: "Architecting the web, from server to screen.",
        description: "Software Engineer with <span class=\"text-primary\">almost 4 years of experience</span> building high-performance, AI-driven applications. I bridge the gap between robust backend architectures <span class=\"text-primary\">(Node.js, Express, MongoDB)</span> and modern frontend ecosystems <span class=\"text-primary\">(Next.js, React)</span> to engineer real-time, full-stack solutions.",
        ctaText: "Get In Touch",
        ctaLink: "mailto:sazzad4677@gmail.com",
        cvLink: "https://drive.google.com/file/d/1ffycRhonZegQk2VJjfsa_g_AZAOj_5Xw/view?usp=drive_link",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        profileImage: "/images/me.jpg"
    },

    about: {
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
            items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Tanstack Query", "Framer Motion"]
        },
        {
            category: "Backend & APIs",
            items: ["Node.js", "Express.js", "RESTful APIs", "Socket.io", "WebRTC", "GraphQL"]
        },
        {
            category: "Database & Cloud",
            items: ["MongoDB", "Redis", "PostgreSQL", "AWS (EC2, S3)", "Docker", "Nginx"]
        },
        {
            category: "Tools & Architecture",
            items: ["Git/Github", "CI/CD", "Jest", "Microservices", "System Design", "Agile methodologies"]
        }
    ],

    services: [
        {
            id: 1,
            title: "Frontend Development",
            description: "Building responsive, highly-interactive, and accessible user interfaces using modern ecosystem tools.",
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
            title: "Backend Development",
            description: "Architecting secure, scalable, and high-performance server-side APIs and microservices.",
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
            title: "Full-Stack Development",
            description: "End-to-end engineered web solutions from robust database architecture to interactive client applications.",
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
            title: "Smart Inventory & Business Intelligence System",
            description: "An AI-driven enterprise inventory platform featuring real-time state orchestration via Socket.io and Redis. Engineered high-performance analytics dashboards using complex MongoDB aggregations and integrated Google Gemini to transform static data into predictive business insights. Secured with a scalable RBAC governance layer and optimized client-side performance using Zustand and Next.js Server Actions.",
            technologies: ["Next.js 16", "Node.js", "MongoDB", "Zustand", "Socket.io", "Redis", "Docker", "Gemini AI"],
            links: {
                github: "https://github.com/sazzad4677/Smart-Inventory-System",
                external: "https://smart-inventory.sazzad.dev/"
            },
            image: { url: "smart-inventory.png" },
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
                "Developed and maintained responsive, user-friendly web interfaces for the company's healthcare platform, improving patient and provider engagement.",
                "Collaborated with UX/UI designers to implement modern, accessible designs using HTML, CSS, and JavaScript frameworks.",
                "Optimized web applications for performance, ensuring fast load times and seamless functionality across multiple devices and browsers.",
                "Integrated frontend components with backend APIs to enable dynamic data display and interactive features.",
                "Participated in code reviews and worked closely with the development team to maintain high code quality and adhere to best practices.",
                "Troubleshot and resolved frontend bugs and issues promptly, contributing to enhanced user satisfaction.",
                "Stayed updated with the latest frontend technologies to continuously improve the application's interface and user experience."
            ],
            technologies: ["React", "JavaScript", "HTML/CSS", "Next.js", "Context API", "Responsive Design"]
        },
        {
            id: 2,
            company: "Buyonia Bangladesh Limited",
            name: "Buyonia",
            position: "Software Engineer",
            range: "April 2022 - March 2024",
            website: "https://www.buyoniasoft.com/",
            description: [
                "I have extensive experience working with a diverse range of platforms, frameworks, and content management systems. These include JavaScript, TypeScript, React, Next.js, Express, and MongoDB. I am adept at leveraging these technologies to deliver high-quality solutions and optimize business operations.",
                "Demonstrated success in managing server infrastructure with AWS, leading and motivating teams, and fostering strong relationships with colleagues."
            ],
            technologies: ["TypeScript", "Next.js", "Express.js", "MongoDB", "AWS", "UI/UX"]
        }
    ],
    education: [
        {
            id: 1,
            school: "Jahangirnagar University",
            degree: "MSc in Computer Science & Engineering",
            range: "Jun 2023 - Dec 2024",
            description: [
                "Advanced studies in Computer Science, focusing on complex systems and research-driven methodologies.",
            ]
        },
        {
            id: 2,
            school: "Daffodil International University",
            degree: "BSc in Software Engineering",
            range: "Jan 2017 - Jan 2022",
            description: [
                "Successfully completed a comprehensive degree program with a strong focus on Software Engineering principles, Data Structures, and Algorithmic logic.",
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
            description: "Built a modern, responsive frontend for an online stationary shop using React, TypeScript, Vite, Tailwind CSS, ESLint, Node Js, Express Js, Mongoose and ShadCN UI. Features include dynamic product filtering, a functional shopping cart, and mobile-friendly design. Ensured code quality with ESLint and a type-safe architecture.",
            technologies: ["React", "TypeScript", "ExpressJs", "Mongoose", "Redux"],
            links: {
                github: "https://github.com/sazzad4677/Stationary-Shop-Frontend",
                liveLink: "https://stationary-shop-frontend-silk.vercel.app/"
            },
        },
        {
            title: "Cutly - Link Shortener",
            description: "A web application for shortening long URLs. Here I used a url validator. I didn't use any third-party APIs. Instead, I built my own API with my proper error handling.",
            technologies: ["React", "Express JS", "Tailwind CSS", "Mongoose"],
            links: {
                github: "https://github.com/sazzad4677/cutly-frontend",
                liveLink: "https://cutly.netlify.app/"
            },
        },
        {
            title: "Interactive Comments Section",
            description: "Users can read, add, edit, and delete comments in this project. Comments can be voted up or down by the user. The most popular comments will be displayed first. After the comment, the user can observe how much time has passed.",
            technologies: ["React", "Tailwind CSS"],
            links: {
                github: "https://github.com/sazzad4677/Interactive-comments-section",
                liveLink: "https://interactive-comments-bd.netlify.app/"
            },
        },
        {
            title: "GO Mart",
            description: "A grocery delivery system controlled by voice. where the user may utilize voice commands to purchase items. A person with the authority to add, remove, and update products. Voice commands may be used to add items to the cart. Sorting and pagination of the products.",
            technologies: ["Mongoose", "Express.js", "React JS", "Tailwind CSS", "Redux"],
            links: {
                github: "https://github.com/sazzad4677/GoMart-Frontend",
                liveLink: "https://go-mart.netlify.app/"
            },
        },
        {
            title: "Fency Slider",
            description: "An interactive image search and slider tool powered by Pixabay API. Allows users to dynamicly generate sliders with custom timing and image selections.",
            technologies: ["JavaScript", "Pixabay API", "CSS3"],
            links: {
                github: "https://github.com/sazzad4677/fency-slider",
                liveLink: "https://sazzad4677.github.io/fency-slider/",
            },
        },
        {
            title: "Guess The Number",
            description: "A pure Vanilla JavaScript game focusing on DOM manipulation and state management. Simple, clean, and interactive gaming experience.",
            technologies: ["Vanilla JS", "DOM Manipulation"],
            links: {
                github: "https://github.com/sazzad4677/few-vanilla-javascript-projects#guess-the-number",
                liveLink: "https://try-guess-the-number.netlify.app/",
            },
        },
        {
            title: "Dice Game",
            description: "Two-player dice rolling game built with pure JavaScript. Demonstrates foundational logic and real-time UI updates without heavy frameworks.",
            technologies: ["JavaScript", "HTML5", "CSS3"],
            links: {
                github: "https://github.com/sazzad4677/few-vanilla-javascript-projects#dice-game",
                liveLink: "https://dice-game-25.netlify.app/",
            },
        },
        {
            title: "Cooking Master",
            description: "Meal discovery application using TheMealDB API. Features dynamic searching and recursive data fetching for recipe details.",
            technologies: ["JavaScript", "TheMealDB API"],
            links: {
                github: "https://github.com/sazzad4677/cooking-master",
                liveLink: "https://sazzad4677.github.io/cooking-master/",
            },
        },
        {
            title: "Omni Food",
            description: "Responsive landing page designed with semantic HTML and modern CSS techniques. Focused on layout precision and responsive behavior.",
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
        description: "I'd like to work for any company that believes my skills will be helpful to them. Please let me know if you're seeking for someone similar to me. You can just simply 'say hello' and I'll do my best to respond!",
        email: "sazzad4677@gmail.com",
        ctaText: "Say Hello"
    }
};
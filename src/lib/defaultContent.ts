import { PortfolioContent } from './types';

export const defaultContent: PortfolioContent = {
    hero: {
        greeting: "Hi, my name is",
        name: "Sazzad Hossain.",
        tagline: "Software Engineer with <span class=\"text-primary\">4 years of experience</span> architecting scalable systems.",
        description: "I specialize in building high-performance, AI-driven applications. I bridge the gap between robust backend architectures <span class=\"text-primary\">(Node.js, Express, MongoDB)</span> and modern frontend ecosystems <span class=\"text-primary\">(Next.js, React)</span> to engineer real-time, full-stack solutions.",
        ctaText: "Get In Touch",
        ctaLink: "mailto:sazzad4677@gmail.com",
        cvLink: "https://drive.google.com/file/d/1ffycRhonZegQk2VJjfsa_g_AZAOj_5Xw/view?usp=drive_link",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },

    about: {
        paragraphs: [
            "With nearly <span class=\"text-primary\">4 years of professional experience</span> as a Software Engineer, I focus on high-performance Full-Stack architecture, real-time systems, and AI-driven analytics. I move beyond standard feature implementation to engineer solutions that scale and drive business impact.",
            "My expertise spans the entire stack. On the backend, I architect scalable APIs and microservices using <span class=\"text-primary\">Node.js, Express 5, and MongoDB</span>, optimizing for high concurrency with Redis. On the frontend, I manage complex server state with <span class=\"text-primary\">Tanstack Query</span> and translate those robust backends into seamless user experiences using Next.js 16 and React 19.",
            "I thrive on solving complex engineering challenges—from orchestrating real-time data with <span class=\"text-primary\">WebRTC and Socket.io</span> to integrating LLMs into enterprise workflows. I am dedicated to clean architecture, CI/CD automation, and delivering highly testable, accessible applications."
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

    projects: [
        {
            id: 0,
            title: "My Portfolio",
            description: "A personal portfolio website showcasing my projects and skills. Converted from a React project to a Next.js project for better performance and SEO. Features a dynamic admin panel for content management.",
            technologies: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
            links: {
                github: "https://github.com/sazzad4677/myportfolio",
                external: "https://test.sazzad.dev",
                admin: "https://test.sazzad.dev/admin"
            },
            image: { url: "portfolio.png" },
            featured: true
        },
        {
            id: 1,
            title: "Stationary Shop",
            description: "Built a modern, responsive frontend for an online stationary shop using React, TypeScript, Vite, Tailwind CSS, ESLint, Node Js, Express Js, Mongoose and ShadCN UI. Features include dynamic product filtering, a functional shopping cart, and mobile-friendly design. Ensured code quality with ESLint and a type-safe architecture.",
            technologies: ["React", "TypeScript", "ExpressJs", "Mongoose", "Redux"],
            links: {
                github: "https://github.com/sazzad4677/Stationary-Shop-Frontend",
                external: "https://stationary-shop-frontend-silk.vercel.app/"
            },
            image: { url: "Pappier.png" },
            featured: true
        },
        {
            id: 2,
            title: "Cutly - Link Shortener",
            description: "A web application for shortening long URLs. Here I used a url validator. I didn't use any third-party APIs. Instead, I built my own API with my proper error handling.",
            technologies: ["React", "Express JS", "Tailwind CSS", "Mongoose"],
            links: {
                github: "https://github.com/sazzad4677/cutly-frontend",
                external: "https://cutly.netlify.app/"
            },
            image: { url: "cutly.webp" },
            featured: true
        },
        {
            id: 3,
            title: "Interactive Comments Section",
            description: "Users can read, add, edit, and delete comments in this project. Comments can be voted up or down by the user. The most popular comments will be displayed first. After the comment, the user can observe how much time has passed.",
            technologies: ["React", "Tailwind CSS"],
            links: {
                github: "https://github.com/sazzad4677/Interactive-comments-section",
                external: "https://interactive-comments-bd.netlify.app/"
            },
            image: { url: "comment.webp" },
            featured: true
        },
        {
            id: 4,
            title: "GO Mart",
            description: "A grocery delivery system controlled by voice. where the user may utilize voice commands to purchase items. A person with the authority to add, remove, and update products. Voice commands may be used to add items to the cart. Sorting and pagination of the products.",
            technologies: ["Mongoose", "Express.js", "React JS", "Tailwind CSS", "Redux"],
            links: {
                github: "https://github.com/sazzad4677/GoMart-Frontend",
                external: "https://go-mart.netlify.app/"
            },
            image: { url: "gomart.webp" },
            featured: true
        }
    ],

    experience: [
        {
            id: 1,
            company: "MMHI",
            name: "MyMedical Hub International",
            position: "Software Engineer",
            range: "March 2024 - Present",
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

    contact: {
        preHeading: "What's Next?",
        heading: "Get In Touch",
        description: "I'd like to work for any company that believes my skills will be helpful to them. Please let me know if you're seeking for someone similar to me. You can just simply 'say hello' and I'll do my best to respond!",
        email: "sazzad4677@gmail.com",
        ctaText: "Say Hello"
    }
};

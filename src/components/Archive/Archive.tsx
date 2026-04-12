"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import { Github, ExternalLink, Folder } from "lucide-react";

interface ArchiveProject {
    title: string;
    description: string;
    technologies: string[];
    links: {
        github: string;
        liveLink: string;
    };
}

const Archive: React.FC = () => {
    const archive: ArchiveProject[] = [
        // ... projects data ...
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
            title: "Simple Bank",
            description: "A foundational banking simulation focused on deposit, withdrawal, and balance management using pure DOM manipulation.",
            technologies: ["JavaScript", "CSS3"],
            links: {
                github: "https://github.com/sazzad4677/simple-bank-management",
                liveLink: "https://sazzad4677.github.io/simple-bank-management/",
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
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <Element id="archive" name="archive" className="scroll-anchor">
            <section className="py-16 md:py-24">
                <div className="mb-14 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold text-foreground md:text-3xl tracking-tight">
                            Other Noteworthy Projects
                        </h2>
                        <a 
                            href="/archive" 
                            className="group mt-4 inline-flex items-center gap-2 font-mono text-sm text-primary transition-all hover:gap-3"
                        >
                            <span>view the archive</span>
                            <span className="block h-px w-8 bg-primary/40 transition-all group-hover:w-12 group-hover:bg-primary" />
                        </a>
                    </motion.div>
                </div>

                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {archive.map((project, index) => (
                        <motion.li
                            key={index}
                            variants={itemVariants}
                            whileHover={{ 
                                y: -10,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                            className="h-full"
                        >
                            <div className="flex h-full flex-col justify-between rounded-xl border border-border/40 bg-surface/20 p-8 shadow-sm backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 group">
                                <header>
                                    <div className="mb-8 flex items-center justify-between">
                                        <div className="relative">
                                            <div className="absolute -inset-2 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                                            <div className="relative text-primary transition-transform duration-500 group-hover:-translate-y-1">
                                                <Folder size={42} strokeWidth={1} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-secondary-foreground/60 transition-colors">
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary transition-all duration-300 hover:-translate-y-1"
                                                aria-label="GitHub Link"
                                            >
                                                <Github size={20} />
                                            </a>
                                            <a
                                                href={project.links.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary transition-all duration-300 hover:-translate-y-1"
                                                aria-label="External Link"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <h3 className="mb-2 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                                        <a href={project.links.liveLink} target="_blank" rel="noopener noreferrer">
                                            {project.title}
                                        </a>
                                    </h3>
                                    <p className="text-secondary-foreground/80 leading-relaxed text-sm line-clamp-4">
                                        {project.description}
                                    </p>
                                </header>
                                
                                <footer className="mt-8 pt-6 border-t border-border/10">
                                    <ul className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] text-primary/80">
                                        {project.technologies.map((tech, i) => (
                                            <li 
                                                key={i} 
                                                className="flex items-center gap-1.5 rounded-md border border-primary/10 bg-primary/5 px-2.5 py-1 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary"
                                            >
                                                <span className="h-1 w-1 rounded-full bg-primary/40 animate-pulse" />
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </footer>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </section>
        </Element>
    );
};

export default Archive;

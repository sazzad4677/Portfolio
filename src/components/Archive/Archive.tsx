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
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <Element id="archive" name="archive" className="scroll-anchor">
            <section className="py-16 md:py-20">
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                        Other Noteworthy Projects
                    </h2>
                    <p className="mt-4 font-mono text-sm text-primary">view the archive</p>
                </div>

                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {archive.map((project, index) => (
                        <motion.li
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="h-full"
                        >
                            <div className="flex h-full flex-col justify-between rounded-md glass p-8 shadow-xs transition-shadow hover:shadow-xl group">
                                <header>
                                    <div className="mb-8 flex items-center justify-between">
                                        <div className="text-primary group-hover:scale-110 transition-transform">
                                            <Folder size={40} strokeWidth={1} />
                                        </div>
                                        <div className="flex items-center gap-3 text-secondary-foreground/80">
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary transition-colors"
                                                aria-label="GitHub Link"
                                            >
                                                <Github size={20} />
                                            </a>
                                            <a
                                                href={project.links.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary transition-colors"
                                                aria-label="External Link"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                                        <a href={project.links.liveLink} target="_blank" rel="noopener noreferrer">
                                            {project.title}
                                        </a>
                                    </h3>
                                    <p className="text-secondary-foreground leading-relaxed text-sm">
                                        {project.description}
                                    </p>
                                </header>
                                
                                <footer className="mt-8">
                                    <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-primary/70">
                                        {project.technologies.map((tech, i) => (
                                            <li key={i}>{tech}</li>
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

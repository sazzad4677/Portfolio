"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import { Github, ExternalLink, Folder } from "lucide-react";
import contentManager from "../../lib/contentManager";

interface ArchiveProject {
    title: string;
    description: string;
    technologies: string[];
    links: { github: string; liveLink: string };
}

const Archive: React.FC = () => {
    const archive: ArchiveProject[] = contentManager.getArchiveProjects();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };
    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <Element name="archive" className="scroll-anchor">
            <section id="archive" className="py-14 sm:py-20 md:py-24 relative overflow-hidden">
                <div className="site-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 sm:mb-12 md:mb-16"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                            Other Noteworthy Projects
                        </h2>
                        <div className="h-1 w-16 sm:w-20 bg-primary mx-auto rounded-full" />
                    </motion.div>

                    <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                    >
                        {archive.map((project, index) => (
                            <motion.li key={index} variants={itemVariants} className="group h-full">
                                <div className="h-full flex flex-col p-5 sm:p-8 rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-md hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl">
                                    <header className="mb-5 sm:mb-8">
                                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                                            <Folder className="text-primary w-8 h-8 sm:w-10 sm:h-10" />
                                            <div className="flex items-center gap-3 sm:gap-4 text-secondary-foreground/60">
                                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                                    <Github size={18} className="sm:w-[22px] sm:h-[22px]" />
                                                </a>
                                                <a href={project.links.liveLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                                    <ExternalLink size={18} className="sm:w-[22px] sm:h-[22px]" />
                                                </a>
                                            </div>
                                        </div>
                                        <h3 className="text-base sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 sm:mb-4">
                                            {project.title}
                                        </h3>
                                        <p className="text-secondary-foreground/80 text-xs sm:text-sm leading-normal sm:leading-relaxed">
                                            {project.description}
                                        </p>
                                    </header>
                                    <footer className="mt-auto">
                                        <ul className="flex flex-wrap gap-x-2.5 gap-y-1.5 font-mono text-[10px] sm:text-xs text-secondary-foreground/60">
                                            {project.technologies.map((tech, i) => (
                                                <li key={i}>{tech}</li>
                                            ))}
                                        </ul>
                                    </footer>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </section>
        </Element>
    );
};

export default Archive;
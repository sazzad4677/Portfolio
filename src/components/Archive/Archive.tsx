"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import { ExternalLink, Folder } from "lucide-react";
import { GitHubIcon } from "@/components/ui/brand-icons";
import contentManager from "../../lib/contentManager";

interface ArchiveProject {
    title: string;
    description: string;
    technologies: string[];
    featured?: boolean;
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
            <section id="archive" className="pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-28 md:pb-32 relative overflow-hidden">
                <div className="site-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-16 md:mb-20"
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
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                    >
                        {archive?.map((project, index) => (
                            <motion.li key={index} variants={itemVariants} className="group h-full">
                                <div className={`h-full flex flex-col p-5 sm:p-8 rounded-2xl border ${project.featured ? 'border-primary/40 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]' : 'border-border/40 shadow-sm'} bg-surface/20 backdrop-blur-md hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative`}>
                                    {project.featured && (
                                        <div className="absolute top-0 right-0 -mt-2 -mr-2 rotate-12">
                                            <span className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-primary backdrop-blur-md shadow-lg shadow-primary/20">
                                                <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                                                Highlighted
                                            </span>
                                        </div>
                                    )}
                                    <header className="mb-5 sm:mb-8">
                                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                                            <Folder className="text-primary w-8 h-8 sm:w-10 sm:h-10" />
                                            <div className="flex items-center gap-2 sm:gap-3 text-secondary-foreground/60">
                                                <a 
                                                    href={project.links.github} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/40 hover:text-primary hover:border-primary/30 transition-all"
                                                    aria-label={`View source code for ${project.title} (opens in a new tab)`}
                                                >
                                                    <GitHubIcon size={18} className="sm:w-[22px] sm:h-[22px]" aria-hidden="true" />
                                                </a>
                                                <a 
                                                    href={project.links.liveLink} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/40 hover:text-primary hover:border-primary/30 transition-all"
                                                    aria-label={`View live demo for ${project.title} (opens in a new tab)`}
                                                >
                                                    <ExternalLink size={18} className="sm:w-[22px] sm:h-[22px]" aria-hidden="true" />
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
                                    <footer className="mt-auto pt-4 border-t border-border/20">
                                        <ul className="flex flex-wrap gap-x-2 gap-y-2 font-mono text-[10px] sm:text-xs">
                                            {project.technologies?.map((tech, i) => (
                                                <li key={i} className="rounded border border-primary/10 bg-primary/5 px-2 py-0.5 text-primary/70 transition-colors group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary/90">
                                                    {tech}
                                                </li>
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
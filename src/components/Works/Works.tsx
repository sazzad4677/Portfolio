import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll/modules";
import { Github, ExternalLink, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import contentManager from "@/lib/contentManager";
import { Project } from "@/lib/types";

const Works: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const projectsData = contentManager.getProjects();
        if (projectsData) setProjects(projectsData);
    }, []);

    const projectVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <Element name="projects" className="scroll-anchor">
            <section id="projects" className="py-16 md:py-20 overflow-hidden">
                <div className="site-container">
                    <div className="mb-10 flex items-center gap-4 md:mb-14">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold tracking-tight text-foreground before:mr-2 before:font-mono before:text-base before:text-primary before:content-['03.'] md:text-3xl">
                            Some Things I&apos;ve Built
                        </h2>
                        <div className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>

                    <div className="flex flex-col gap-24 md:gap-32">
                        {projects.map((project, index) => {
                            const projectNum = (index + 1).toString().padStart(2, '0');
                            
                            return (
                                <motion.article
                                    key={project.id || index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={projectVariants}
                                    className="group/card relative rounded-2xl border border-border/40 bg-surface/20 p-4 sm:p-6 shadow-sm shadow-black/5 backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 md:p-10"
                                >
                                    {/* Editorial Background Numeral - Consistent positioning */}
                                    <div className="absolute -top-10 left-6 font-sans text-9xl font-black text-primary/[0.03] select-none pointer-events-none z-0">
                                        {projectNum}
                                    </div>

                                    <div className="grid grid-cols-1 items-center gap-8 xl:grid-cols-2 xl:gap-16 relative z-10">
                                        {/* Content - Always Left */}
                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-primary">
                                                    <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                                                    Featured Project
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                                                <a
                                                    href={project.links.external || project.links.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="transition-colors group-hover/card:text-primary"
                                                >
                                                    {project.title}
                                                </a>
                                            </h3>

                                            <div className="rounded-xl border border-border/30 bg-background/50 p-6 text-sm leading-relaxed text-secondary-foreground/90 shadow-lg shadow-black/5 backdrop-blur-xl md:p-7 md:text-base">
                                                <p>{project.description}</p>
                                            </div>

                                            <ul className="flex flex-wrap gap-x-2 gap-y-2 font-mono text-[10px] sm:text-xs text-primary/80 sm:gap-x-3">
                                                {project.technologies.map((tech, i) => (
                                                    <li 
                                                        key={i} 
                                                        className="flex items-center gap-1.5 rounded-md border border-primary/10 bg-primary/5 px-2.5 py-1 transition-all duration-300 group-hover/card:border-primary/30 group-hover/card:bg-primary/10 group-hover/card:text-primary"
                                                    >
                                                        <span className="h-1 w-1 rounded-full bg-primary/40 animate-pulse" />
                                                        {tech}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex items-center gap-6 pt-2 text-foreground/70">
                                                {project.links.github && (
                                                    <a
                                                        href={project.links.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/icon rounded-lg p-2 transition-all hover:bg-primary/10 hover:text-primary"
                                                        aria-label="View source on GitHub"
                                                    >
                                                        <Github size={20} className="transition-transform group-hover/icon:-translate-y-1" />
                                                    </a>
                                                )}
                                                {project.links.external && (
                                                    <a
                                                        href={project.links.external}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/icon rounded-lg p-2 transition-all hover:bg-primary/10 hover:text-primary"
                                                        aria-label="Open live site"
                                                    >
                                                        <ExternalLink size={20} className="transition-transform group-hover/icon:-translate-y-1" />
                                                    </a>
                                                )}
                                                {project.links.admin && (
                                                    <a
                                                        href={project.links.admin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/icon rounded-lg p-2 transition-all hover:bg-primary/10 hover:text-primary"
                                                        aria-label="Admin"
                                                    >
                                                        <ShieldCheck size={20} className="transition-transform group-hover/icon:-translate-y-1" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Image - Always Right */}
                                        <div className="relative lg:min-h-[300px]">
                                            <a
                                                href={project.links.external || project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative block aspect-video overflow-hidden rounded-xl border border-border/40 transition-all duration-700 group-hover/card:scale-[1.03] group-hover/card:shadow-2xl group-hover/card:shadow-primary/10"
                                            >
                                                {/* Branded Primary Tint Overlay */}
                                                <div className="absolute inset-0 z-10 bg-primary/20 mix-blend-multiply opacity-100 transition-all duration-700 group-hover/card:bg-transparent group-hover/card:opacity-0" />
                                                
                                                {/* Ambient Glow behind image */}
                                                <div className="absolute inset-0 z-0 bg-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-2xl" />
                                                
                                                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-background/40 via-transparent to-primary/5 opacity-80 transition-opacity duration-500 group-hover/card:opacity-0" />
                                                <img
                                                    src={`/images/${project.image.url}`}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover transition-all duration-1000 group-hover/card:scale-110"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </Element>
    );
};

export default Works;

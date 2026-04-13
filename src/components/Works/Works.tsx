import { motion, Variants } from "framer-motion";
import React from "react";
import { Element } from "react-scroll/modules";
import { Github, ExternalLink, ShieldCheck } from "lucide-react";
import contentManager from "@/lib/contentManager";
import { Project } from "@/lib/types";

const Works: React.FC = () => {
    const projects = contentManager.getProjects();

    const projectVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <Element name="projects" className="scroll-anchor">
            <section id="projects" className="py-14 sm:py-16 md:py-20 overflow-hidden">
                <div className="site-container">
                    <div className="mb-8 sm:mb-10 md:mb-14 flex items-center gap-4">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold tracking-tight text-foreground before:mr-2 before:font-mono before:text-base before:text-primary before:content-['05.'] md:text-3xl">
                            Some Things I&apos;ve Built
                        </h2>
                        <div className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>

                    <div className="flex flex-col gap-10 sm:gap-16 md:gap-24 lg:gap-32">
                        {projects.map((project: Project, index: number) => {
                            const projectNum = (index + 1).toString().padStart(2, "0");
                            return (
                                <motion.article
                                    key={project.id || index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={projectVariants}
                                    className="group/card relative rounded-2xl border border-border/40 bg-surface/20 p-4 sm:p-6 md:p-10 shadow-sm shadow-black/5 backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
                                >
                                    <div className="absolute -top-10 left-6 font-sans text-9xl font-black text-primary/[0.03] select-none pointer-events-none z-0">
                                        {projectNum}
                                    </div>

                                    <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 xl:grid-cols-2 xl:gap-16 relative z-10">
                                        {/* Content */}
                                        <div className="flex flex-col gap-4 sm:gap-6">
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-primary">
                                                    <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                                                    Featured Project
                                                </span>
                                            </div>

                                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                                                <a
                                                    href={project.links.external || project.links.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="transition-colors group-hover/card:text-primary"
                                                >
                                                    {project.title}
                                                </a>
                                            </h3>

                                            <div className="rounded-xl border border-border/30 bg-background/50 p-4 sm:p-6 md:p-7 text-xs sm:text-sm leading-normal sm:leading-relaxed text-secondary-foreground/90 shadow-lg shadow-black/5 backdrop-blur-xl md:text-base">
                                                <p>{project.description}</p>
                                            </div>

                                            <ul className="flex flex-wrap gap-1.5 sm:gap-x-2 sm:gap-y-2 font-mono text-[10px] sm:text-xs text-primary/80">
                                                {project.technologies.map((tech: string, i: number) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-center gap-1 sm:gap-1.5 rounded-md border border-primary/10 bg-primary/5 px-2 py-1 sm:px-2.5 transition-all duration-300 group-hover/card:border-primary/30 group-hover/card:bg-primary/10 group-hover/card:text-primary"
                                                    >
                                                        <span className="h-1 w-1 rounded-full bg-primary/40 animate-pulse" />
                                                        {tech}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-4 border-t border-border/20">
                                                {project.links.github && (
                                                    <a 
                                                        href={project.links.github} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="group flex items-center gap-2 rounded-lg bg-surface/60 px-4 py-2.5 text-xs font-mono text-foreground transition-all duration-300 hover:bg-primary/5 hover:text-primary hover:border-primary/30 border border-border/40 backdrop-blur-sm shadow-sm"
                                                    >
                                                        <Github size={16} className="transition-transform group-hover:-translate-y-0.5 text-primary/80 group-hover:text-primary" />
                                                        <span className="font-semibold">Source Code</span>
                                                    </a>
                                                )}
                                                {project.links.external && (
                                                    <a 
                                                        href={project.links.external} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="group flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-mono text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-[1.02] border border-primary/20 shadow-md shadow-primary/5"
                                                    >
                                                        <ExternalLink size={16} className="transition-transform group-hover:-translate-y-0.5" />
                                                        <span className="font-bold">Live Demo</span>
                                                    </a>
                                                )}
                                                {project.links.admin && (
                                                    <a 
                                                        href={project.links.admin} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="group flex items-center gap-2 rounded-lg bg-surface/40 px-3 py-2 text-xs font-mono text-secondary-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary border border-transparent"
                                                    >
                                                        <ShieldCheck size={16} className="transition-transform group-hover:-translate-y-0.5" />
                                                        <span className="font-semibold">Admin Panel</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div className="relative">
                                            <a
                                                href={project.links.external || project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative block aspect-[16/10] sm:aspect-video overflow-hidden rounded-xl border border-border/40 bg-surface/10 transition-all duration-700 group-hover/card:scale-[1.02] group-hover/card:shadow-2xl group-hover/card:shadow-primary/10"
                                            >
                                                <div className="absolute inset-0 z-10 bg-primary/20 mix-blend-multiply opacity-100 transition-all duration-700 group-hover/card:bg-transparent group-hover/card:opacity-0" />
                                                <div className="absolute inset-0 z-20 bg-gradient-to-tr from-background/40 via-transparent to-primary/5 opacity-80 transition-opacity duration-500 group-hover/card:opacity-0" />
                                                
                                                <img
                                                    src={`/images/${project.image.url}`}
                                                    alt={project.title}
                                                    className="w-full h-auto object-top transition-transform duration-[5000ms] ease-in-out group-hover/card:-translate-y-[calc(100%-240px)] md:group-hover/card:-translate-y-[calc(100%-320px)] lg:group-hover/card:-translate-y-[calc(100%-380px)]"
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
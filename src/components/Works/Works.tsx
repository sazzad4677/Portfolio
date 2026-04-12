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
            <section id="projects" className="py-16 md:py-20">
                <div className="site-container">
                    <div className="mb-10 flex items-center gap-4 md:mb-14">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold tracking-tight text-foreground before:mr-2 before:font-mono before:text-base before:text-primary before:content-['03.'] md:text-3xl">
                            Some Things I&apos;ve Built
                        </h2>
                        <div className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>

                    <div className="flex flex-col gap-16 md:gap-20">
                        {projects.map((project, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.article
                                    key={project.id || index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={projectVariants}
                                    whileHover={{
                                        y: -6,
                                        transition: { type: "spring", stiffness: 400, damping: 25 },
                                    }}
                                    className={cn(
                                        "group/card rounded-2xl border border-border/50 bg-surface/25 p-6 shadow-lg shadow-black/10 backdrop-blur-sm transition-[border-color,box-shadow] duration-500",
                                        "hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 md:p-8"
                                    )}
                                >
                                    {/* ... rest of the article content ... */}
                                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
                                        <div
                                            className={cn(
                                                "flex flex-col gap-5",
                                                !isEven && "lg:order-2 lg:text-right"
                                            )}
                                        >
                                            <p className="font-mono text-sm font-medium tracking-wide text-primary">
                                                Featured Project
                                            </p>
                                            <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                                                <a
                                                    href={project.links.external || project.links.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="transition-colors hover:text-primary"
                                                >
                                                    {project.title}
                                                </a>
                                            </h3>

                                            <div
                                                className={cn(
                                                    "rounded-xl border border-border/40 bg-background/75 p-5 text-sm leading-relaxed text-secondary-foreground/90 shadow-inner backdrop-blur-md md:p-6 md:text-base",
                                                    !isEven && "lg:ml-auto"
                                                )}
                                            >
                                                <p>{project.description}</p>
                                            </div>

                                            <ul
                                                className={cn(
                                                    "flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-primary/85",
                                                    !isEven && "lg:justify-end"
                                                )}
                                            >
                                                {project.technologies.map((tech, i) => (
                                                    <li key={i}>{tech}</li>
                                                ))}
                                            </ul>

                                            <div
                                                className={cn(
                                                    "flex items-center gap-5 text-foreground/90",
                                                    !isEven && "lg:justify-end"
                                                )}
                                            >
                                                {project.links.github && (
                                                    <a
                                                        href={project.links.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="rounded-lg p-2 transition-colors hover:bg-primary/10 hover:text-primary"
                                                        aria-label="View source on GitHub"
                                                    >
                                                        <Github size={22} />
                                                    </a>
                                                )}
                                                {project.links.external && (
                                                    <a
                                                        href={project.links.external}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="rounded-lg p-2 transition-colors hover:bg-primary/10 hover:text-primary"
                                                        aria-label="Open live site"
                                                    >
                                                        <ExternalLink size={22} />
                                                    </a>
                                                )}
                                                {project.links.admin && (
                                                    <a
                                                        href={project.links.admin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="rounded-lg p-2 transition-colors hover:bg-primary/10 hover:text-primary"
                                                        aria-label="Admin"
                                                    >
                                                        <ShieldCheck size={22} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            className={cn(
                                                "relative lg:min-h-[280px]",
                                                !isEven && "lg:order-1"
                                            )}
                                        >
                                            <a
                                                href={project.links.external || project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative block aspect-video overflow-hidden rounded-xl border border-border/40 ring-1 ring-inset ring-white/5 transition-transform duration-500 group-hover/card:scale-[1.02]"
                                            >
                                                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-background/20 via-transparent to-primary/10 opacity-80 transition-opacity duration-500 group-hover/card:opacity-40" />
                                                <img
                                                    src={`/images/${project.image.url}`}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover/card:scale-105 group-hover/card:grayscale-0"
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

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, Variants, useMotionValue } from "framer-motion";
import { Element } from "react-scroll";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/brand-icons";
import contentManager from "@/lib/contentManager";
import { Project } from "@/lib/types";

const Works: React.FC = () => {
    const projects = contentManager.getProjects();

    return (
        <Element name="projects" className="scroll-anchor">
            <section id="projects" className="pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-28 md:pb-32 overflow-hidden">
                <div className="site-container">
                    <div className="mb-12 sm:mb-16 md:mb-20 flex items-center gap-4">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold tracking-tight text-foreground before:mr-2 before:font-mono before:text-base before:text-primary before:content-['05.'] md:text-3xl">
                            <span className="sr-only">05. </span>
                            Some Things I&apos;ve Built
                        </h2>
                        <div className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-border to-transparent" aria-hidden="true" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-8 xl:gap-12">
                        {projects?.map((project: Project, index: number) => (
                            <ProjectCard key={project.id || index} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </Element>
    );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const projectNum = (index + 1).toString().padStart(2, "0");
    const rectRef = useRef<DOMRect | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseEnter({ currentTarget }: React.MouseEvent) {
        rectRef.current = currentTarget.getBoundingClientRect();
    }

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        if (!rectRef.current) return;
        const { left, top } = rectRef.current;
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    function handleMouseLeave() {
        rectRef.current = null;
    }

    const projectVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <motion.article
            initial="hidden"
            whileInView="visible"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            viewport={{ once: true, amount: 0.2 }}
            variants={projectVariants}
            className="group/card relative rounded-2xl border border-border/40 bg-surface/20 p-4 sm:p-6 md:p-8 shadow-sm shadow-black/5 backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 h-full flex flex-col"
        >
            {/* Spotlight Glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl transition duration-300 opacity-0 group-hover/card:opacity-100"
                style={{
                    background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, hsla(var(--primary-hsl) / 0.15), transparent 80%)`,
                }}
            />

            <div className="absolute -top-10 left-6 font-sans text-9xl font-black text-primary/[0.03] select-none pointer-events-none z-0">
                {projectNum}
            </div>

            <div className="flex flex-col gap-6 sm:gap-8 relative z-10 h-full">
                {/* Image moved to top */}
                <div className="relative order-first">
                    <a
                        href={project.links.external || project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block aspect-[16/10] sm:aspect-video overflow-hidden rounded-xl border border-border/40 bg-surface/10 transition-all duration-700 group-hover/card:scale-[1.02] group-hover/card:shadow-2xl group-hover/card:shadow-primary/10"
                        aria-label={`View ${project.title} live demo`}
                    >
                        <div className="absolute inset-0 z-10 bg-primary/20 mix-blend-multiply opacity-100 transition-all duration-700 group-hover/card:bg-transparent group-hover/card:opacity-0" />
                        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-background/40 via-transparent to-primary/5 opacity-80 transition-opacity duration-500 group-hover/card:opacity-0" />

                        <Image
                            src={`/images/${project.image.url}`}
                            alt={project.title}
                            width={700}
                            height={438}
                            className="w-full h-auto object-top transition-transform duration-[5000ms] ease-in-out group-hover/card:-translate-y-[calc(100%-240px)] md:group-hover/card:-translate-y-[calc(100%-320px)] lg:group-hover/card:-translate-y-[calc(100%-280px)] xl:group-hover/card:-translate-y-[calc(100%-340px)]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </a>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6 sm:gap-7 flex-1">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-primary">
                                <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                                Featured Project
                            </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            <a
                                href={project.links.external || project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors group-hover/card:text-primary"
                            >
                                {project.title}
                            </a>
                        </h3>

                        <div className="rounded-xl border border-border/30 bg-background/50 p-4 sm:p-6 text-xs sm:text-sm leading-normal sm:leading-relaxed text-secondary-foreground/90 shadow-lg shadow-black/5 backdrop-blur-xl">
                            <p className="font-medium text-foreground">{project.description}</p>
                            {project.descriptionList && (
                                <ul className="mt-4 space-y-3 text-secondary-foreground/80">
                                    {project.descriptionList?.map((item, i) => {
                                        const isImpact = item.startsWith("Impact:");
                                        return (
                                            <li key={i} className={`flex gap-2.5 ${isImpact ? "text-primary/90 font-medium mt-3 bg-primary/[0.03] p-2 rounded-lg border border-primary/10" : ""}`}>
                                                <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${isImpact ? "bg-primary animate-pulse" : "bg-primary/60"}`} />
                                                <span>
                                                    {isImpact ? (
                                                        <>
                                                            <span className="font-bold text-primary">Impact:</span> {item.replace("Impact:", "").trim()}
                                                        </>
                                                    ) : (
                                                        item
                                                    )}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto space-y-6">
                        <ul className="flex flex-wrap gap-1.5 sm:gap-x-2 sm:gap-y-2 font-mono text-[10px] sm:text-xs text-primary/80">
                            {project.technologies?.map((tech: string, i: number) => (
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
                                    aria-label={`View source code for ${project.title} on GitHub`}
                                >
                                    <GitHubIcon size={16} className="transition-transform group-hover:-translate-y-0.5 text-primary/80 group-hover:text-primary" aria-hidden="true" />
                                    <span className="font-semibold">Source Code</span>
                                </a>
                            )}
                            {project.links.external && (
                                <a
                                    href={project.links.external}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-mono text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-[1.02] border border-primary/20 shadow-md shadow-primary/5"
                                    aria-label={`View live demo of ${project.title}`}
                                >
                                    <ExternalLink size={16} className="transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                                    <span className="font-bold">Live Demo</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default Works;
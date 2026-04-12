import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll/modules";
import { Github, ExternalLink, ShieldCheck } from "lucide-react";
import contentManager from "@/lib/contentManager";
import { Project } from "@/lib/types";

const Works: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const projectsData = contentManager.getProjects();
        if (projectsData) setProjects(projectsData);
    }, []);

    const projectVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
        }
    };

    return (
        <Element name="projects">
            <section className="py-24">
                <div className="mb-12 flex items-center space-x-4">
                    <h2 className="whitespace-nowrap font-sans text-3xl font-bold text-foreground before:mr-2 before:font-mono before:text-xl before:text-primary before:content-['03.'] md:text-4xl">
                        Some Things I've Built
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-24 md:space-y-32">
                    {projects.map((project, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={project.id || index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={projectVariants}
                                className="group relative grid grid-cols-12 items-center gap-4"
                            >
                                {/* Project Content */}
                                <div className={`
                                    z-20 col-span-12 row-span-full md:col-span-7 
                                    ${isEven ? 'md:col-start-1 md:text-left' : 'md:col-start-6 md:text-right'}
                                `}>
                                    <p className="font-mono text-sm text-primary mb-2">Featured Project</p>
                                    <h3 className="text-2xl font-bold text-foreground mb-4 md:text-3xl hover:text-primary transition-colors">
                                        <a href={project.links.external || project.links.github} target="_blank" rel="noopener noreferrer">
                                            {project.title}
                                        </a>
                                    </h3>
                                    
                                    <div className="relative z-10 p-6 rounded-md glass-dark shadow-xl mb-4 text-secondary-foreground/90 text-lg">
                                        <p>{project.description}</p>
                                    </div>

                                    <ul className={`flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-primary/80 mb-6 ${!isEven && 'md:justify-end'}`}>
                                        {project.technologies.map((tech, i) => (
                                            <li key={i}>{tech}</li>
                                        ))}
                                    </ul>

                                    <div className={`flex items-center gap-4 ${!isEven && 'md:justify-end text-right'}`}>
                                        {project.links.github && (
                                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                                <Github size={22} />
                                            </a>
                                        )}
                                        {project.links.external && (
                                            <a href={project.links.external} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                                <ExternalLink size={22} />
                                            </a>
                                        )}
                                        {project.links.admin && (
                                            <a href={project.links.admin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                                <ShieldCheck size={22} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Project Image */}
                                <div className={`
                                    relative col-span-12 row-span-full h-[350px] md:h-auto md:col-span-8 
                                    ${isEven ? 'md:col-start-5 md:col-end-13' : 'md:col-start-1 md:col-end-9'}
                                    overflow-hidden rounded-md group
                                `}>
                                    <a href={project.links.external || project.links.github} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                                        <div className="absolute inset-0 z-10 bg-primary/20 transition-all duration-300 group-hover:bg-transparent" />
                                        <img
                                            src={`/images/${project.image.url}`}
                                            alt={project.title}
                                            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                        />
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </Element>
    );
};

export default Works;

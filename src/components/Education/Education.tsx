"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import { GraduationCap, Calendar, Award } from "lucide-react";
import contentManager from "../../lib/contentManager";

const Education: React.FC = () => {
    const educationList = contentManager.getEducation();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <Element name="education" className="scroll-anchor">
            <section id="education" className="pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-28 md:pb-32 overflow-hidden relative">
                <div className="site-container">
                    {/* Heading */}
                    <div className="mb-12 sm:mb-16 md:mb-20 flex items-center space-x-4">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold text-foreground before:mr-2 before:font-mono before:text-lg before:text-primary before:content-['06.'] md:text-3xl">
                            Education
                        </h2>
                        <div className="h-px bg-border/40 w-full max-w-[300px]" />
                    </div>

                    <div className="mx-auto max-w-[900px]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="space-y-12 sm:space-y-16 md:space-y-20"
                        >
                            {educationList.map((edu) => (
                                <motion.div
                                    key={edu.id}
                                    variants={itemVariants}
                                    className="group relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6"
                                >
                                    {/* Icon Column */}
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                            <GraduationCap size={24} />
                                        </div>
                                        <div className="hidden md:block w-px h-full bg-border/40 mt-4 group-last:hidden" />
                                    </div>

                                    {/* Content Column */}
                                    <div className="pb-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                                    {edu.school}
                                                </h3>
                                                <p className="font-mono text-sm text-primary/80 flex items-center gap-2 mt-1">
                                                    <Award size={14} />
                                                    {edu.degree}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-surface/40 backdrop-blur-sm self-start sm:self-center">
                                                <Calendar size={12} className="text-primary/70" />
                                                <span className="font-mono text-[10px] sm:text-xs text-secondary-foreground/80">
                                                    {edu.range}
                                                </span>
                                            </div>
                                        </div>

                                        {edu.description && (
                                            <ul className="space-y-3">
                                                {edu.description.map((item, index) => (
                                                    <li key={index} className="flex gap-3 text-sm sm:text-base text-secondary-foreground/80 leading-relaxed italic">
                                                        <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </Element>
    );
};

export default Education;

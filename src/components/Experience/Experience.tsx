"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Element } from "react-scroll";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";
import contentManager from "@/lib/contentManager";

const Experience: React.FC = () => {
    const jobs = contentManager.getExperience();
    const [tabIndex, setTabIndex] = useState(0);

    const selectedJob = jobs[tabIndex];

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <Element name="jobs" className="scroll-anchor">
            <motion.section
                id="jobs"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-28 md:pb-32 overflow-hidden"
            >
                <div className="site-container">

                    {/* Heading */}
                    <div className="mb-12 sm:mb-16 md:mb-20 flex items-center space-x-4">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold text-foreground before:mr-2 before:font-mono before:text-lg before:text-primary before:content-['04.'] md:text-3xl">
                            Where I&apos;ve worked
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
                    </div>

                    <div className="mx-auto max-w-[900px]">
                        <div className="flex flex-col lg:flex-row">

                            {/* Tab List */}
                            <div className="relative flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar border-b lg:border-b-0 lg:border-l border-border/40 pb-1 lg:pb-0">
                                {jobs.map((job, index) => (
                                    <button
                                        key={job.id || index}
                                        onClick={() => setTabIndex(index)}
                                        className={`
                                            group relative flex flex-col justify-center items-start h-14 sm:h-16 px-4 sm:px-5
                                            min-w-[120px] sm:min-w-[140px] lg:min-w-[180px]
                                            transition-all duration-300
                                            ${tabIndex === index
                                                ? "text-primary bg-primary/[0.08]"
                                                : "text-secondary-foreground/60 hover:text-primary hover:bg-primary/[0.02]"
                                            }
                                        `}
                                    >
                                        <span className="relative z-10 font-mono text-xs lg:text-sm">{job.company}</span>
                                        <span className={`relative z-10 font-mono text-[10px] mt-0.5 ${tabIndex === index ? 'text-primary/70' : 'text-secondary-foreground/40'}`}>
                                            {job.range}
                                        </span>
                                        {tabIndex === index && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-x-0 bottom-0 h-0.5 bg-primary lg:inset-y-0 lg:left-0 lg:right-auto lg:h-full lg:w-0.5"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Job Details */}
                            <div className="mt-6 sm:mt-8 lg:mt-0 lg:pl-12 flex-1">
                                <AnimatePresence mode="wait">
                                    {selectedJob && (
                                        <motion.div
                                            key={selectedJob.id || tabIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            className="relative"
                                        >
                                            {/* Job Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-5 sm:mb-7 md:mb-8">
                                                <div>
                                                    <div className="flex items-center gap-2 sm:gap-3 mb-1">
                                                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                                                            <Briefcase size={14} className="sm:w-4 sm:h-4" />
                                                        </div>
                                                        <h3 className="text-base sm:text-xl font-semibold text-foreground md:text-2xl">
                                                            {selectedJob.position}
                                                        </h3>
                                                    </div>
                                                    <a
                                                        href={selectedJob.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 font-mono text-sm sm:text-lg text-primary hover:underline group"

                                                    >
                                                        @ {selectedJob.name}
                                                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                </div>

                                                {/* Date badge (hidden on desktop since it's in the tab) */}
                                                <div className="flex lg:hidden items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-surface/40 backdrop-blur-sm self-start sm:self-center">
                                                    <Calendar size={12} className="text-primary/70 sm:w-3.5 sm:h-3.5" />
                                                    <span className="font-mono text-[10px] sm:text-xs text-secondary-foreground/80">
                                                        {/* ↑ text-[10px] on mobile */}
                                                        {selectedJob.range}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Experience Timeline */}
                                            <div className="relative ml-2 sm:ml-4 pl-5 sm:pl-8 border-l border-border/40 space-y-6 sm:space-y-8">
                                                {selectedJob.description.map((item, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="relative"
                                                    >
                                                        {/* Timeline Dot */}
                                                        <motion.div
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            whileInView={{ scale: 1, opacity: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.15 }}
                                                            className="absolute -left-[29px] sm:-left-[41px] top-[7px] h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-primary bg-background z-10"
                                                        />
                                                        <p className="text-xs sm:text-sm leading-normal sm:leading-relaxed text-secondary-foreground/90 md:text-base">
                                                            {item}
                                                        </p>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Core Technologies */}
                                            {selectedJob.technologies && selectedJob.technologies.length > 0 && (
                                                <div className="mt-7 sm:mt-10 md:mt-12 pt-5 sm:pt-7 md:pt-8 border-t border-border/30">

                                                    <p className="mb-3 sm:mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                                                        Technical Arsenal
                                                    </p>
                                                    <div className="flex flex-wrap gap-1.5 sm:gap-2.5">

                                                        {selectedJob.technologies.map((tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[10px] sm:text-[11px] text-primary transition-all hover:border-primary/50 hover:bg-primary/10"

                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </Element>
    );
};

export default Experience;
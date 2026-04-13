import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Element } from "react-scroll/modules";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";
import contentManager from "@/lib/contentManager";
import { Experience as ExperienceType } from "@/lib/types";

const Experience: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [jobs, setJobs] = useState<ExperienceType[]>([]);

    useEffect(() => {
        const jobsData = contentManager.getExperience();
        if (jobsData) setJobs(jobsData);
    }, []);

    const selectedJob = jobs[tabIndex];

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 1, 
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1 
            }
        }
    };

    return (
        <Element name="jobs" className="scroll-anchor">
            <motion.section
                id="jobs"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="py-24 overflow-hidden"
            >
                <div className="site-container">
                    <div className="mb-12 flex items-center space-x-4">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold text-foreground before:mr-2 before:font-mono before:text-lg before:text-primary before:content-['04.'] md:text-3xl">
                            Where I&apos;ve worked
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
                    </div>

                    <div className="mx-auto max-w-[900px]">
                        <div className="flex flex-col lg:flex-row min-h-[450px]">
                            {/* Tab List */}
                            <div className="relative flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar border-b lg:border-b-0 lg:border-l border-border/40 pb-2 lg:pb-0">
                                {jobs.map((job, index) => (
                                    <button
                                        key={job.id || index}
                                        onClick={() => setTabIndex(index)}
                                        className={`
                                            group relative flex items-center h-12 px-5 min-w-[140px] lg:min-w-[180px] 
                                            font-mono text-xs transition-all duration-300 lg:text-sm
                                            ${tabIndex === index ? 'text-primary' : 'text-secondary-foreground/60 hover:text-primary hover:bg-primary/5'}
                                        `}
                                    >
                                        <span className="relative z-10">{job.company}</span>
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
                            <div className="mt-10 lg:mt-0 lg:pl-12 flex-1">
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
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                                                            <Briefcase size={16} />
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                                                            {selectedJob.position}
                                                        </h3>
                                                    </div>
                                                    <a
                                                        href={selectedJob.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 font-mono text-lg text-primary hover:underline group"
                                                    >
                                                        @ {selectedJob.name}
                                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-surface/40 backdrop-blur-sm self-start sm:self-center">
                                                    <Calendar size={14} className="text-primary/70" />
                                                    <span className="font-mono text-xs text-secondary-foreground/80">
                                                        {selectedJob.range}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Experience Timeline */}
                                            <div className="relative ml-4 pl-8 border-l border-border/40 space-y-6">
                                                {selectedJob.description.map((item, index) => (
                                                    <motion.div 
                                                        key={index}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="relative"
                                                    >
                                                        {/* Timeline Dot */}
                                                        <div className="absolute -left-[41px] top-[7px] h-4 w-4 rounded-full border-2 border-primary bg-background z-10" />
                                                        <p className="text-sm leading-relaxed text-secondary-foreground/90 md:text-base">
                                                            {item}
                                                        </p>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Core Technologies */}
                                            {selectedJob.technologies && selectedJob.technologies.length > 0 && (
                                                <div className="mt-12 pt-8 border-t border-border/30">
                                                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                                                        Technical Arsenal
                                                    </p>
                                                    <div className="flex flex-wrap gap-2.5">
                                                        {selectedJob.technologies.map((tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-[11px] text-primary transition-all hover:border-primary/50 hover:bg-primary/10"
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

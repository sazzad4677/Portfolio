import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Element } from "react-scroll/modules";
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
                className="py-24"
            >
                <div className="site-container">
                    <div className="mb-12 flex items-center space-x-4">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold text-foreground before:mr-2 before:font-mono before:text-lg before:text-primary before:content-['02.'] md:text-3xl">
                            Where I&apos;ve worked
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
                    </div>

                    <div className="mx-auto max-w-[800px]">
                        <div className="mt-10 flex flex-col md:flex-row min-h-[400px]">
                            {/* Tab List */}
                            <div className="relative flex md:flex-col overflow-x-auto md:overflow-visible no-scrollbar border-b md:border-b-0 md:border-l border-border">
                                {jobs.map((job, index) => (
                                    <button
                                        key={job.id || index}
                                        onClick={() => setTabIndex(index)}
                                        className={`
                                            flex items-center h-12 px-5 min-w-[120px] md:min-w-[160px] 
                                            font-mono text-xs transition-all duration-300 md:text-sm
                                            ${tabIndex === index ? 'text-primary bg-primary/5' : 'text-secondary-foreground/80 hover:text-primary hover:bg-primary/5'}
                                        `}
                                    >
                                        {job.company}
                                    </button>
                                ))}
                                {/* Dynamic Indicator */}
                                <motion.div
                                    className="absolute bg-primary"
                                    initial={false}
                                    animate={{
                                        y: typeof window !== 'undefined' && window.innerWidth >= 768 ? tabIndex * 48 : 0,
                                        x: typeof window !== 'undefined' && window.innerWidth < 768 ? tabIndex * 120 : 0,
                                        height: typeof window !== 'undefined' && window.innerWidth >= 768 ? 48 : 2,
                                        width: typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 2,
                                        bottom: 0,
                                        left: 0,
                                        top: typeof window !== 'undefined' && window.innerWidth >= 768 ? 0 : 'auto',
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            </div>

                            {/* Job Details */}
                            <div className="mt-8 md:mt-0 md:pl-8 flex-1">
                                <AnimatePresence mode="wait">
                                    {selectedJob && (
                                        <motion.div
                                            key={selectedJob.id || tabIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                                                {selectedJob.position}{" "}
                                                <a
                                                    href={selectedJob.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                >
                                                    @ {selectedJob.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 font-mono text-sm text-secondary-foreground">
                                                {selectedJob.range}
                                            </p>

                                            <ul className="mt-6 space-y-4">
                                                {selectedJob.description.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3 text-sm text-secondary-foreground">
                                                        <span className="mt-1.5 text-primary text-xs shrink-0">▹</span>
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {selectedJob.technologies && selectedJob.technologies.length > 0 && (
                                                <div className="mt-8">
                                                    <p className="mb-4 font-mono text-xs uppercase tracking-widest text-primary/80">
                                                        Technologies Used
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedJob.technologies.map((tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[10px] text-primary transition-all hover:bg-primary/10"
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

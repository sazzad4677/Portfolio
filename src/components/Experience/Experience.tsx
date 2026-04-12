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
            transition: { duration: 0.6, staggerChildren: 0.1 }
        }
    };

    return (
        <Element name="jobs">
            <motion.section
                id="jobs"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="py-24 max-w-[800px] mx-auto"
            >
                <div className="mb-12 flex items-center space-x-4">
                    <h2 className="whitespace-nowrap font-sans text-3xl font-bold text-foreground before:mr-2 before:font-mono before:text-xl before:text-primary before:content-['02.'] md:text-4xl">
                        Where I've worked
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <div className="mt-10 flex flex-col md:flex-row min-h-[400px]">
                    {/* Tab List */}
                    <div className="relative flex md:flex-col overflow-x-auto md:overflow-visible no-scrollbar border-b md:border-b-0 md:border-l border-border">
                        {jobs.map((job, index) => (
                            <button
                                key={job.id || index}
                                onClick={() => setTabIndex(index)}
                                className={`
                                    flex items-center h-12 px-5 min-w-[120px] md:min-w-[160px] 
                                    font-mono text-sm transition-all duration-300
                                    ${tabIndex === index ? 'text-primary bg-primary/5' : 'text-secondary-foreground/60 hover:text-primary hover:bg-primary/5'}
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
                                    <h3 className="text-2xl font-semibold text-foreground">
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
                                    <p className="mt-1 font-mono text-sm text-secondary-foreground/70">
                                        {selectedJob.range}
                                    </p>

                                    <ul className="mt-6 space-y-4">
                                        {selectedJob.description.map((item, index) => (
                                            <li key={index} className="flex items-start space-x-3 text-secondary-foreground/90">
                                                <span className="mt-1.5 text-primary text-xs shrink-0">▹</span>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.section>
        </Element>
    );
};

export default Experience;

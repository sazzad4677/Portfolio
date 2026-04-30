"use client";

import { motion } from "framer-motion";
import { Element } from "react-scroll";
import contentManager from "../../lib/contentManager";
import { Code2, Database, LayoutTemplate, Layers } from "lucide-react";

const Skills = () => {
    const detailedSkills = contentManager.getDetailedSkills();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };
    const getIcon = (index: number) => {
        switch (index % 4) {
            case 0: return <LayoutTemplate className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />;
            case 1: return <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />;
            case 2: return <Database className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />;
            case 3: return <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />;
            default: return <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />;
        }
    };

    return (
        <Element name="skills" className="scroll-anchor">
            <section id="skills" className="pt-8 sm:pt-12 md:pt-16 pb-24 sm:pb-28 md:pb-32 overflow-hidden relative">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="site-container">
                    <div className="flex flex-col items-center mb-10 sm:mb-12 md:mb-16 space-y-4 sm:space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.8 }}
                            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground relative"
                        >
                            <span aria-hidden="true" className="text-primary font-mono text-xl mr-2 absolute -left-10 top-2 opacity-50 hidden sm:inline-block">02.</span>
                            Technical Arsenal
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-secondary-foreground max-w-xl text-center text-sm md:text-base"
                        >
                            Technologies I use to build scalable, real-time, production-ready systems.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            whileInView={{ opacity: 1, width: "60px" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="h-1 bg-primary/50 relative"
                        >
                            <div className="absolute top-0 right-0 w-2 h-1 bg-primary" />
                        </motion.div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
                    >
                        {detailedSkills?.map((skillGroup, idx) => (
                            <motion.div key={idx} variants={itemVariants} className="group relative">
                                <div className="absolute -inset-px bg-gradient-to-r from-primary/20 via-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                                <div className="relative h-full rounded-2xl border border-primary/10 bg-primary/[0.02] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:bg-primary/[0.04] hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(var(--primary-rgb),0.05)]">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                                            {getIcon(idx)}
                                        </div>
                                        <div>
                                            <h3 className="text-base sm:text-xl font-semibold text-foreground tracking-wide leading-tight mb-1">
                                                {skillGroup.category}
                                            </h3>
                                            {skillGroup.context && (
                                                <p className="text-xs sm:text-sm text-secondary-foreground leading-relaxed">
                                                    {skillGroup.context}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <ul className="flex flex-wrap gap-3">
                                        {skillGroup.items?.map((item, itemIdx) => {
                                            let levelClasses = "";
                                            
                                            // Fallback for deprecated highlight
                                            if (item.highlight && !item.level) {
                                                levelClasses = "bg-primary/10 border border-primary/40 text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.1)] font-semibold";
                                            } else {
                                                switch (item.level) {
                                                    case "primary":
                                                        levelClasses = "bg-primary/10 border border-primary/40 text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.15)] font-bold tracking-wide";
                                                        break;
                                                    case "secondary":
                                                        levelClasses = "bg-surface/60 border border-primary/20 text-primary/80 font-medium hover:border-primary/40 hover:text-primary";
                                                        break;
                                                    case "familiar":
                                                    default:
                                                        levelClasses = "bg-surface/30 border border-border/30 text-secondary-foreground/50 hover:text-secondary-foreground/80 hover:border-border/50";
                                                        break;
                                                }
                                            }

                                            return (
                                                <li
                                                    key={itemIdx}
                                                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-mono text-xs sm:text-sm transition-all duration-300 cursor-default ${levelClasses}`}
                                                >
                                                    {item.name}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </Element>
    );
};

export default Skills;
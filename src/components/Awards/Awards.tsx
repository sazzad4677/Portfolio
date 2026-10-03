"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, Building2 } from "lucide-react";
import contentManager from "../../lib/contentManager";

const Awards: React.FC = () => {
    const awards = contentManager.getAwards();

    if (!awards || awards.length === 0) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section id="awards" className="pt-14 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 overflow-hidden relative">
            <div className="site-container">
                <div className="flex flex-col items-center mb-8 sm:mb-10 space-y-3">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-center"
                    >
                        Awards & Recognition
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: "50px" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="h-1 bg-primary/50 relative"
                    >
                        <div className="absolute top-0 left-0 w-2 h-1 bg-primary" />
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    {awards.map((award) => (
                        <motion.div
                            key={award.id}
                            variants={itemVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group relative flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl border border-primary/20 bg-surface/30 backdrop-blur-md shadow-lg hover:border-primary/40 transition-all duration-300"
                        >
                            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-background transition-colors duration-300 shrink-0">
                                <Trophy size={28} />
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                        {award.title}
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20 shrink-0">
                                        <Calendar size={12} />
                                        {award.dates}
                                    </span>
                                </div>

                                <p className="text-xs font-mono text-primary/80 flex items-center gap-1.5">
                                    <Building2 size={13} />
                                    {award.organization}
                                </p>

                                {award.description && (
                                    <p className="text-sm text-secondary-foreground/80 leading-relaxed pt-1">
                                        {award.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Awards;

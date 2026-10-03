"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Rocket } from "lucide-react";
import contentManager from "../../lib/contentManager";

const ProfessionalDevelopment: React.FC = () => {
    const items = contentManager.getProfessionalDevelopment();

    if (!items || items.length === 0) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section id="professional-development" className="pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 overflow-hidden relative">
            <div className="site-container">
                <div className="flex flex-col items-center mb-8 sm:mb-10 space-y-3">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-center"
                    >
                        Professional Development
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"
                >
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            className="group relative flex flex-col h-full p-6 rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-md shadow-md hover:border-primary/40 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                    <BookOpen size={22} />
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
                                    <Calendar size={12} />
                                    {item.range}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                                {item.title}
                            </h3>

                            <p className="text-xs font-mono text-primary/80 mb-3 flex items-center gap-1.5">
                                <Rocket size={13} />
                                {item.provider}
                            </p>

                            <p className="text-sm text-secondary-foreground/80 leading-relaxed mt-auto pt-2 border-t border-border/30">
                                <span className="font-semibold text-foreground/90">Focus: </span>
                                {item.focus}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProfessionalDevelopment;

"use client";

import { motion } from "framer-motion";
import { Element } from "react-scroll";
import contentManager from "../../lib/contentManager";
import { Award, ExternalLink, Calendar } from "lucide-react";

const Certifications = () => {
    const certifications = contentManager.getCertifications();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <Element name="certifications" className="scroll-anchor">
            <section id="certifications" className="pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-28 md:pb-32 overflow-hidden relative">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="site-container">
                    <div className="flex flex-col items-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.8 }}
                            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground relative z-10"
                        >
                            <span className="text-primary font-mono text-xl mr-2 absolute -left-10 top-2 opacity-50 hidden sm:inline-block">07.</span>
                            Certifications
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            whileInView={{ opacity: 1, width: "60px" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
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
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 relative z-10"
                    >
                        {certifications.map((cert) => (
                            <motion.div
                                key={cert.id}
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group flex flex-col h-full rounded-2xl border border-border/40 bg-surface/20 p-4 sm:p-6 shadow-sm backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        <Award size={20} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
                                    </div>
                                    {cert.link && (
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-secondary-foreground hover:text-primary transition-colors p-2 -mr-2"
                                            aria-label={`View credential for ${cert.title}`}
                                        >
                                            <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                                        </a>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col">
                                    {cert.link ? (
                                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="group/title">
                                            <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5 leading-tight group-hover:text-primary group-hover/title:underline transition-colors duration-300">
                                                {cert.title}
                                            </h3>
                                        </a>
                                    ) : (
                                        <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5 leading-tight group-hover:text-primary transition-colors duration-300">
                                            {cert.title}
                                        </h3>
                                    )}

                                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono text-primary/70 mb-3 sm:mb-4 flex-wrap">
                                        <span className="font-semibold">{cert.issuer}</span>
                                        <div className="flex items-center gap-1.5 opacity-80 border-l border-primary/20 pl-3 sm:pl-4">
                                            <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                                            <span>{cert.date}</span>
                                        </div>
                                    </div>

                                    <p className="text-secondary-foreground/80 text-xs sm:text-sm leading-normal sm:leading-relaxed mt-auto">
                                        {cert.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </Element>
    );
};

export default Certifications;
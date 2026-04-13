import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Element } from "react-scroll";
import contentManager from "../../lib/contentManager";
import { LayoutTemplate, Server, Layers, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { Service } from "../../lib/types";

const iconMap: Record<string, React.ReactNode> = {
    LayoutTemplate: <LayoutTemplate size={28} strokeWidth={1.5} />,
    Server: <Server size={28} strokeWidth={1.5} />,
    Layers: <Layers size={28} strokeWidth={1.5} />
};

const Services = () => {
    const services = contentManager.getServices();
    const [activeService, setActiveService] = useState<Service | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <Element name="services" className="scroll-anchor">
            <section id="services" className="py-24 overflow-hidden relative">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="site-container">
                    <div className="flex flex-col items-center mb-16 space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.8 }}
                            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground relative z-10"
                        >
                            <span className="text-primary font-mono text-xl mr-2 absolute -left-10 top-2 opacity-50 hidden sm:inline-block">03.</span>
                            Services
                        </motion.h2>
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
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 relative z-10"
                    >
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                onClick={() => setActiveService(service)}
                                className="group flex flex-col h-full rounded-2xl border border-border/40 bg-surface/20 p-8 shadow-sm backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden cursor-pointer"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        {iconMap[service.icon] || <Layers size={28} />}
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    <p className="text-secondary-foreground/80 text-sm leading-relaxed mb-8 flex-1">
                                        {service.description}
                                    </p>

                                    <button
                                        className="mt-auto group/btn flex items-center gap-2 font-mono text-sm text-primary transition-colors hover:text-primary/80 self-start"
                                    >
                                        View Details
                                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {activeService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveService(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg bg-surface border border-border/40 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                        {iconMap[activeService.icon] || <Layers size={24} />}
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">{activeService.title}</h3>
                                </div>
                                <button 
                                    onClick={() => setActiveService(null)}
                                    className="p-1 rounded-md text-secondary-foreground hover:text-foreground hover:bg-surface-variant/50 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <p className="text-secondary-foreground leading-relaxed">
                                    {activeService.description}
                                </p>
                                
                                <div>
                                    <h4 className="font-mono text-sm tracking-widest uppercase text-primary/80 mb-4">What I Deliver</h4>
                                    <ul className="space-y-3">
                                        {activeService.modalDetails.map((detail, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-secondary-foreground">
                                                <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Element>
    );
};

export default Services;

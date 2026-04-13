import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { defaultContent } from "../../lib/defaultContent";
import { Code2, Database, LayoutTemplate, Layers } from "lucide-react";

const Skills = () => {
    const { detailedSkills } = defaultContent;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const getIcon = (index: number) => {
        switch (index % 4) {
            case 0: return <LayoutTemplate className="w-6 h-6 text-primary" />;
            case 1: return <Code2 className="w-6 h-6 text-primary" />;
            case 2: return <Database className="w-6 h-6 text-primary" />;
            case 3: return <Layers className="w-6 h-6 text-primary" />;
            default: return <Code2 className="w-6 h-6 text-primary" />;
        }
    };

    return (
        <Element name="skills" className="scroll-anchor">
            <section id="skills" className="py-24 overflow-hidden relative">
                {/* Decorative background elements */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="site-container">
                    <div className="flex flex-col items-center mb-16 space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.8 }}
                            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground relative"
                        >
                            <span className="text-primary font-mono text-xl mr-2 absolute -left-10 top-2 opacity-50 hidden sm:inline-block">02.</span>
                            Technical Arsenal
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
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
                    >
                        {detailedSkills.map((skillGroup, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="group relative"
                            >
                                <div className="absolute -inset-px bg-gradient-to-r from-primary/20 via-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                                <div className="relative h-full rounded-2xl border border-primary/10 bg-primary/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:bg-primary/[0.04]">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                                            {getIcon(idx)}
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground tracking-wide">
                                            {skillGroup.category}
                                        </h3>
                                    </div>
                                    <ul className="flex flex-wrap gap-2.5">
                                        {skillGroup.items.map((item, itemIdx) => (
                                            <li
                                                key={itemIdx}
                                                className="px-4 py-2 rounded-md bg-surface/50 border border-border/40 font-mono text-sm text-secondary-foreground hover:text-primary hover:border-primary/40 transition-colors duration-300 cursor-default"
                                            >
                                                {item}
                                            </li>
                                        ))}
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

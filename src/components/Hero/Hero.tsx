import { motion, AnimatePresence, Variants } from "framer-motion";
import React, { useState } from "react";
import { Element } from "react-scroll";
import { FileText, Play, X } from "lucide-react";
import contentManager from "@/lib/contentManager";

const Hero: React.FC = () => {
    const content = contentManager.getHero();
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const container: Variants = {
        animate: {
            transition: { delayChildren: 0.3, staggerChildren: 0.1 },
        },
    };

    const item: Variants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, 0.05, 0.01, 0.9],
            },
        },
    };

    return (
        <Element name="home" className="scroll-anchor">
            <motion.section
                id="home"
                variants={container}
                initial="initial"
                animate="animate"
                className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-clip
                           pt-28 pb-10 sm:pt-32 sm:pb-12
                           [@media(min-width:768px)_and_(min-height:780px)]:pt-0
                           [@media(min-width:768px)_and_(min-height:780px)]:pb-0"
              
            >
              
                <div className="absolute -left-16 top-20 z-[1] h-72 w-72 rounded-full bg-primary/10 blur-[80px]" />
                <div className="absolute -right-8 bottom-20 z-[1] h-96 w-96 rounded-full bg-secondary/10 blur-[90px]" />

                <div className="site-container relative z-10 flex flex-col items-center text-center">

                   
                    <motion.div variants={item} className="mb-5 sm:mb-8 md:mb-10 relative">
                     
                        <div className="relative h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 overflow-hidden rounded-full border-2 border-primary/30 p-1 bg-background shadow-2xl">
                        
                            <div className="h-full w-full overflow-hidden rounded-full">
                                <img
                                    src={content.profileImage}
                                    alt={content.name}
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </div>
                        <div className="absolute -inset-4 z-[-1] rounded-full bg-primary/10 blur-xl animate-pulse" />
                    </motion.div>

                    <motion.div variants={item}>
                        <h1 className="mb-3 sm:mb-4 font-mono text-xs sm:text-sm tracking-[0.2em] text-primary md:text-base">
                            
                            {content.greeting}
                        </h1>
                    </motion.div>

                    <motion.div variants={item}>
                        <h2 className="font-sans font-semibold text-on-background" style={{ fontSize: "clamp(28px, 7vw, 64px)", lineHeight: 1.25 }}>
                           
                            <span className="text-gradient">{content.name}</span>
                        </h2>
                    </motion.div>

                    <motion.div variants={item}>
                        <h3
                            className="mt-1 sm:mt-2 font-sans font-semibold leading-tight text-on-surface-variant/80"
                            style={{ fontSize: "clamp(16px, 4.5vw, 48px)", lineHeight: 1.2 }}
                            dangerouslySetInnerHTML={{ __html: content.tagline }}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <p
                            className="mt-4 sm:mt-6 md:mt-8 mx-auto max-w-[650px] text-sm sm:text-base leading-relaxed text-on-surface-variant/80 md:text-lg text-balance"
                         
                            dangerouslySetInnerHTML={{ __html: content.description }}
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="mt-7 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
                    >
                        <motion.a
                            href={content.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary
                                       px-5 py-3 sm:px-8 sm:py-5
                                       font-mono text-xs sm:text-sm font-bold text-primary-foreground
                                       transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary-hsl),0.3)]
                                       shadow-xl shadow-primary/10"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <FileText size={15} className="sm:w-[18px] sm:h-[18px]" />
                                Download CV
                            </span>
                            <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:animate-shine" />
                        </motion.a>

                        <motion.button
                            onClick={() => setIsVideoOpen(true)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl
                                       border border-border/40 bg-surface/20
                                       px-5 py-3 sm:px-8 sm:py-5
                                       font-mono text-xs sm:text-sm font-bold text-foreground
                                       transition-all duration-300 hover:border-primary/50 hover:bg-surface/40 hover:text-primary backdrop-blur-md"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Play size={15} fill="currentColor" className="sm:w-[18px] sm:h-[18px]" />
                                Watch Video CV
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-background/80"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-[1000px] overflow-hidden rounded-3xl border border-border/40 bg-surface shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-border/30 bg-surface/50 p-5 backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Play size={20} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60">Portfolio Feature</p>
                                        <h4 className="font-sans text-sm font-bold text-foreground">Video CV</h4>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsVideoOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/5 text-secondary-foreground transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Video */}
                            <div className="relative aspect-video w-full bg-black">
                                <iframe
                                    src={content.videoUrl}
                                    title="YouTube video player"
                                    style={{ border: 0 }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 h-full w-full"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Element>
    );
};

export default Hero;
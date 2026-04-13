import { motion, AnimatePresence, Variants } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Element } from "react-scroll/modules";
import { FileText, Play, X } from "lucide-react";
import contentManager from "@/lib/contentManager";
import { HeroContent } from "@/lib/types";

const Hero: React.FC = () => {
    const [content, setContent] = useState<HeroContent>({
        greeting: "Hi, my name is",
        name: "Sazzad Hossain.",
        tagline: "I build things for the web.",
        description: "A self-motivated and enthusiastic full stack developer with a deep interest in JavaScript.",
        ctaText: "Get In Touch",
        ctaLink: "mailto:sazzad4677@gmail.com"
    });

    const [isVideoOpen, setIsVideoOpen] = useState(false);

    useEffect(() => {
        const heroData = contentManager.getHero();
        if (heroData) {
            setContent(heroData);
        }
    }, []);

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

    const cvLink = "https://drive.google.com/file/d/1ffycRhonZegQk2VJjfsa_g_AZAOj_5Xw/view?usp=drive_link";
    const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

    return (
        <Element name="home" className="scroll-anchor">
            <motion.section
                id="home"
                variants={container}
                initial="initial"
                animate="animate"
                className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-clip"
            >
                {/* Scroll parallax orbs */}
                <div className="absolute -left-16 top-20 z-[1] h-72 w-72 rounded-full bg-primary/10 blur-[80px]" />
                <div className="absolute -right-8 bottom-20 z-[1] h-96 w-96 rounded-full bg-secondary/10 blur-[90px]" />

                <div className="site-container relative z-10 flex flex-col items-center text-center">
                    {/* Minimalist Profile Image */}
                    <motion.div variants={item} className="mb-10 relative">
                        <div className="relative h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-full border-2 border-primary/30 p-1 bg-background shadow-2xl">
                            <div className="h-full w-full overflow-hidden rounded-full">
                                <img
                                    src="/images/me.jpg"
                                    alt="Sazzad Hossain"
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </div>
                        <div className="absolute -inset-4 z-[-1] rounded-full bg-primary/10 blur-xl animate-pulse" />
                    </motion.div>

                    <motion.div variants={item}>
                        <h1 className="mb-4 font-mono text-sm tracking-[0.2em] text-primary md:text-base">
                            {content.greeting}
                        </h1>
                    </motion.div>

                    <motion.div variants={item}>
                        <h2 className="font-sans font-semibold text-on-background" style={{ fontSize: "clamp(32px, 7vw, 64px)", lineHeight: 1.25 }}>
                            <span className="text-gradient">{content.name}</span>
                        </h2>
                    </motion.div>


                    <motion.div variants={item}>
                        <h3
                            className="mt-2 font-sans font-semibold leading-tight text-on-surface-variant/80"
                            style={{ fontSize: "clamp(20px, 4.5vw, 48px)", lineHeight: 1.2 }}
                            dangerouslySetInnerHTML={{ __html: content.tagline }}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <p
                            className="mt-8 mx-auto max-w-[650px] text-base leading-relaxed text-on-surface-variant/80 md:text-lg text-balance"
                            dangerouslySetInnerHTML={{ __html: content.description }}
                        />
                    </motion.div>

                    <motion.div variants={item} className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                        <motion.a
                            href={cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 py-5 font-mono text-sm font-bold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary-hsl),0.3)] shadow-xl shadow-primary/10"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <FileText size={18} />
                                Download CV
                            </span>
                            <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:animate-shine" />
                        </motion.a>

                        <motion.button
                            onClick={() => setIsVideoOpen(true)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-border/40 bg-surface/20 px-8 py-5 font-mono text-sm font-bold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-surface/40 hover:text-primary backdrop-blur-md"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Play size={18} fill="currentColor" />
                                Watch Video CV
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Premium Video Modal */}
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

                            {/* Aspect Ratio Container for Video */}
                            <div className="relative aspect-video w-full bg-black">
                                <iframe
                                    src={videoUrl}
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

import { motion, Variants } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Element } from "react-scroll/modules";
import { HeroInteractiveBackground } from "@/components/motion/HeroInteractiveBackground";
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

    return (
        <Element name="home" className="scroll-anchor">
            <motion.section
                id="home"
                variants={container}
                initial="initial"
                animate="animate"
                className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-clip"
            >

                {/* Scroll parallax orbs (HeroParallax) — sit above grid, below copy */}
                <div
                    data-parallax-orb="a"
                    className="absolute -left-16 top-20 z-[1] h-72 w-72 rounded-full bg-primary/10 blur-[80px]"
                />
                <div
                    data-parallax-orb="b"
                    className="absolute -right-8 bottom-20 z-[1] h-96 w-96 rounded-full bg-secondary/10 blur-[90px]"
                />

                <div className="site-container relative z-10 flex flex-col items-center text-center">
                    {/* Minimalist Profile Image */}
                    <motion.div 
                        variants={item}
                        className="mb-10 relative"
                    >
                        <div className="relative h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-full border-2 border-primary/30 p-1 bg-background shadow-2xl">
                            <div className="h-full w-full overflow-hidden rounded-full">
                                <img
                                    src="/images/me.jpg"
                                    alt="Sazzad Hossain"
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </div>
                        {/* Subtle Aura */}
                        <div className="absolute -inset-4 z-[-1] rounded-full bg-primary/10 blur-xl animate-pulse" />
                    </motion.div>

                    <motion.div variants={item}>
                        <h1 className="mb-4 font-mono text-sm tracking-[0.2em] text-primary md:text-base">
                            {content.greeting}
                        </h1>
                    </motion.div>

                    <motion.div variants={item}>
                        <h2
                            className="font-sans font-semibold text-on-background"
                            style={{ fontSize: "clamp(38px, 8vw, 76px)", lineHeight: 1.25 }}
                        >
                            <span className="text-gradient">{content.name}</span>
                        </h2>
                    </motion.div>

                    <motion.div variants={item}>
                        <h3
                            className="mt-2 font-sans font-semibold leading-tight text-on-surface-variant/80"
                            style={{ fontSize: "clamp(24px, 5.5vw, 60px)", lineHeight: 1.2 }}
                        >
                            {content.tagline}
                        </h3>
                    </motion.div>

                    <motion.div variants={item}>
                        <p className="mt-8 max-w-[650px] text-base leading-relaxed text-on-surface-variant/80 md:text-lg">
                            {content.description}
                        </p>
                    </motion.div>

                    <motion.div variants={item} className="mt-12">
                        <motion.a
                            href={content.ctaLink}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md border-2 border-primary bg-transparent px-10 py-5 font-mono text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(var(--primary-hsl),0.2)]"
                        >
                            <span className="relative z-10">{content.ctaText}</span>
                        </motion.a>
                    </motion.div>
                </div>
            </motion.section>
        </Element>
    );
};

export default Hero;

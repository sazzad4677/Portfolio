import { motion, Variants } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Element } from "react-scroll/modules";
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
        <Element name="home">
            <motion.section
                variants={container}
                initial="initial"
                animate="animate"
                className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden py-20"
            >
                {/* Background decorative element */}
                <div className="absolute -left-10 top-20 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-0 bottom-20 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

                <motion.div variants={item}>
                    <h1 className="mb-4 ml-1 font-mono text-base tracking-widest text-primary md:text-lg">
                        {content.greeting}
                    </h1>
                </motion.div>

                <motion.div variants={item}>
                    <h2
                        className="font-sans font-bold tracking-tight text-on-background"
                        style={{ fontSize: "clamp(48px, 10vw, 92px)", lineHeight: 1.1 }}
                    >
                        <span className="text-gradient">{content.name}</span>
                    </h2>
                </motion.div>

                <motion.div variants={item}>
                    <h3
                        className="mt-2 font-sans font-bold leading-tight text-on-surface-variant/80"
                        style={{ fontSize: "clamp(36px, 8vw, 76px)" }}
                    >
                        {content.tagline}
                    </h3>
                </motion.div>

                <motion.div variants={item}>
                    <p className="mt-8 max-w-[650px] text-lg leading-relaxed text-on-surface-variant/90 md:text-xl">
                        {content.description}
                    </p>
                </motion.div>

                <motion.div variants={item} className="mt-16">
                    <motion.a
                        href={content.ctaLink}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-md border-2 border-primary bg-transparent px-10 py-5 font-mono text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(var(--primary-hsl),0.2)]"
                    >
                        <span className="relative z-10">{content.ctaText}</span>
                    </motion.a>
                </motion.div>
            </motion.section>
        </Element>
    );
};

export default Hero;

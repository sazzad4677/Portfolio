"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import contentManager from "@/lib/contentManager";
import { Skill } from "@/lib/types";

const About: React.FC = () => {
    const content = contentManager.getAbout();
    const skills = contentManager.getSkills();

    const revealVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <Element name="about" className="scroll-anchor">
            <motion.section
                id="about"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={revealVariants}
                className="py-14 sm:py-20 md:py-32 relative overflow-hidden"
            >
                <div className="site-container relative z-10">

                    {/* Section Heading */}
                    <div className="mb-8 sm:mb-12 md:mb-14 flex items-center space-x-4">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold text-foreground before:mr-2 before:font-mono before:text-lg before:text-primary before:content-['01.'] md:text-3xl">
                            About Me
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">

                        {/* Text + Skills */}
                        <div className="flex flex-col space-y-5 sm:space-y-8">
                            <div className="space-y-3 sm:space-y-4 font-sans text-sm sm:text-base leading-normal sm:leading-relaxed text-secondary-foreground">
                                {content.paragraphs.map((paragraph: string, index: number) => (
                                    <p
                                        key={index}
                                        className="max-w-[700px] tracking-normal sm:tracking-wide"
                                        dangerouslySetInnerHTML={{ __html: paragraph }}
                                    />
                                ))}
                            </div>

                            <div className="space-y-3 sm:space-y-6">
                                <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary/80">
                                    {content.skillsHeading || "Recently Mastered"}
                                </p>
                                <div className="flex flex-wrap gap-2 sm:gap-2.5 max-w-[800px]">
                                    {skills.map((skill: Skill, index: number) => (
                                        <motion.div
                                            key={skill.id || index}
                                            whileHover={{ y: -2, scale: 1.02 }}
                                            className="glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-mono border-primary/20 text-secondary-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                                           
                                        >
                                            <span className="mr-1.5 text-primary">#</span>
                                            {skill.name}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Profile Image */}
                        <div className="relative mx-auto lg:mt-0 lg:ml-auto">
                            <motion.div
                                whileHover={{ x: -12, y: -12 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="group relative h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80"
                            >
                                {/* The Frame */}
                                <div className="absolute inset-0 translate-x-5 translate-y-5 sm:translate-x-6 sm:translate-y-6 rounded-md border-2 border-primary/30 transition-all duration-500 group-hover:translate-x-4 group-hover:translate-y-4 group-hover:border-primary" />

                                {/* Background Glow */}
                                <div className="absolute -inset-4 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

                                <div className="relative h-full w-full overflow-hidden rounded-md border border-primary/20 shadow-2xl">
                                    <img
                                        src={content.profileImage}
                                        alt="Profile"
                                        className="h-full w-full object-cover mix-blend-multiply grayscale transition-all duration-700 group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-primary/5 group-hover:opacity-0 transition-opacity duration-500" />
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </motion.section>
        </Element>
    );
};

export default About;
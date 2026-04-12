import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import contentManager from "@/lib/contentManager";
import { AboutContent, Skill } from "@/lib/types";

const About: React.FC = () => {
    const [content, setContent] = useState<AboutContent>({
        paragraphs: [],
        skillsHeading: "",
        profileImage: "/images/me.jpg"
    });
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        const aboutData = contentManager.getAbout();
        const skillsData = contentManager.getSkills();
        if (aboutData) setContent(aboutData);
        if (skillsData) setSkills(skillsData);
    }, []);

    const revealVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, 0.05, 0.01, 0.9],
            },
        },
    };

    return (
        <Element name="about">
            <motion.section
                id="about"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={revealVariants}
                className="py-24"
            >
                <div className="mb-12 flex items-center space-x-4">
                    <h2 className="whitespace-nowrap font-sans text-3xl font-bold text-foreground before:mr-2 before:font-mono before:text-xl before:text-primary before:content-['01.'] md:text-4xl">
                        About Me
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr]">
                    <div className="space-y-6">
                        <div className="space-y-4 font-sans text-lg leading-relaxed text-secondary-foreground/90">
                            {content.paragraphs.map((paragraph: string, index: number) => (
                                <p
                                    key={index}
                                    className="max-w-[800px]"
                                    dangerouslySetInnerHTML={{ __html: paragraph }}
                                />
                            ))}
                            <p className="font-medium text-foreground">
                                {content.skillsHeading}
                            </p>
                        </div>

                        <ul className="grid grid-cols-2 gap-2 font-mono text-sm text-secondary-foreground/80 md:grid-cols-3">
                            {skills.map((skill, index) => (
                                <motion.li
                                    key={skill.id || index}
                                    whileHover={{ x: 5, color: "var(--primary)" }}
                                    className="flex items-center space-x-2 transition-colors"
                                >
                                    <span className="text-primary">▹</span>
                                    <span>{skill.name}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative mx-auto mt-12 lg:mt-0 lg:ml-auto">
                        <motion.div
                            whileHover={{ x: -5, y: -5 }}
                            className="group relative h-72 w-72 md:h-80 md:w-80"
                        >
                            <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-md border-2 border-primary transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
                            <div className="relative h-full w-full overflow-hidden rounded-md bg-primary/20 backdrop-blur-xs">
                                <img
                                    src={content.profileImage}
                                    alt="Profile"
                                    className="h-full w-full object-cover mix-blend-multiply grayscale transition-all duration-300 group-hover:mix-blend-normal group-hover:grayscale-0"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </Element>
    );
};

export default About;

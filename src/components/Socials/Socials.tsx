"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import Magnetic from "@/components/motion/Magnetic";

const Socials: React.FC = () => {
    const socialLinks = [
        { name: "Github", url: "https://github.com/sazzad4677/", icon: GitHubIcon },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/sazzad4673/", icon: LinkedInIcon },
    ];

    const containerVariants: Variants = {
        animate: {
            transition: {
                staggerChildren: 0.1,
                duration: 0.5,
            },
        },
    };

    const itemVariants: Variants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <div className="hidden fixed bottom-0 left-6 lg:left-12 z-40 lg:flex flex-col items-center">
            <motion.ul
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center gap-2 mb-4"
            >
                {socialLinks.map((link) => (
                    <motion.li
                        key={link.name}
                        variants={itemVariants}
                        className="p-1"
                    >
                        <Magnetic strength={0.3}>
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary-foreground/60 hover:text-primary transition-colors duration-300 block p-2"
                                aria-label={link.name}
                                data-cursor-hover
                            >
                                <link.icon size={22} strokeWidth={1.5} />
                            </a>
                        </Magnetic>
                    </motion.li>
                ))}
            </motion.ul>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100px" }}
                transition={{ duration: 0.8}}
                className="w-px bg-gradient-to-t from-transparent via-primary/35 to-primary/15"
            />
        </div>
    );
};

export default Socials;

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Github, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

const Socials: React.FC = () => {
    const socialLinks = [
        { name: "Github", url: "https://github.com/sazzad4677/", icon: Github },
        { name: "Twitter", url: "https://twitter.com/sazzad4677/", icon: Twitter },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/sazzad4673/", icon: Linkedin },
        { name: "Facebook", url: "https://facebook.com/sazzad4677/", icon: Facebook },
    ];

    const containerVariants: Variants = {
        animate: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 1.5, // Appear after loader
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
        <div className="hidden fixed bottom-0 left-6 lg:left-12 z-40 md:flex flex-col items-center">
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
                        whileHover={{ y: -3 }}
                        className="p-2"
                    >
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary-foreground/60 hover:text-primary transition-colors duration-300 block"
                            aria-label={link.name}
                        >
                            <link.icon size={22} strokeWidth={1.5} />
                        </a>
                    </motion.li>
                ))}
            </motion.ul>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100px" }}
                transition={{ duration: 0.8, delay: 2 }}
                className="w-px bg-gradient-to-t from-transparent via-primary/35 to-primary/15"
            />
        </div>
    );
};

export default Socials;

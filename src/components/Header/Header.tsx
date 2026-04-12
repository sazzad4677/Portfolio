"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import useScrollPosition from "../../hooks/useScrollPosition";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";

interface NavLink {
    name: string;
    url: string;
}

const Header: React.FC = () => {
    const scrollPosition = useScrollPosition();
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isDesktop) setIsOpen(true);
    }, [isDesktop]);

    const navLinks: NavLink[] = [
        { name: "About", url: "about" },
        { name: "Experience", url: "jobs" },
        { name: "Work", url: "projects" },
        { name: "Contact", url: "contact" },
    ];

    const logoVariants: Variants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const navVariants: Variants = {
        initial: { opacity: 0, y: -20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const linkVariants: Variants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <header
            className={cn(
                "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1200px] transition-all duration-500 rounded-2xl px-6 md:px-12",
                scrollPosition > 50
                    ? "bg-background/70 backdrop-blur-xl shadow-2xl border border-white/5 py-3 h-16"
                    : "bg-transparent py-5 h-24"
            )}
        >
            <nav className="mx-auto flex h-full max-w-[1200px] items-center justify-between">
                {/* Logo */}
                <motion.div variants={logoVariants} initial="initial" animate="animate">
                    <a href="#home" className="group flex items-center gap-2">
                        <div className="h-10 w-10 text-primary transition-transform duration-300 group-hover:rotate-12">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <text
                                    x="50%"
                                    y="55"
                                    fill="currentColor"
                                    fontSize="45px"
                                    fontWeight="bold"
                                    style={{ fontFamily: 'monospace' }}
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                >
                                    S
                                </text>
                            </svg>
                        </div>
                    </a>
                </motion.div>

                {/* Mobile Menu Toggle */}
                <button
                    className="flex flex-col gap-1.5 md:hidden z-50"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <span className={cn("h-0.5 w-6 bg-primary transition-all", isOpen && "rotate-45 translate-y-2")} />
                    <span className={cn("h-0.5 w-6 bg-primary transition-all", isOpen && "opacity-0")} />
                    <span className={cn("h-0.5 w-6 bg-primary transition-all", isOpen && "-rotate-45 -translate-y-2")} />
                </button>

                {/* Desktop Navigation */}
                <AnimatePresence>
                    {(isOpen || isDesktop) && (
                        <motion.div
                            variants={navVariants}
                            initial="initial"
                            animate="animate"
                            exit={{ opacity: 0, y: -20 }}
                            className={cn(
                                "fixed inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-lg md:static md:flex md:flex-row md:bg-transparent md:backdrop-blur-none",
                                !isDesktop && !isOpen && "hidden"
                            )}
                        >
                            <ol className="flex flex-col items-center gap-8 md:flex-row md:gap-10">
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        key={link.url}
                                        variants={linkVariants}
                                        className="font-mono text-sm tracking-wide"
                                    >
                                        <a
                                            href={`#${link.url}`}
                                            className="group flex flex-col items-center text-foreground hover:text-primary transition-colors"
                                            onClick={() => !isDesktop && setIsOpen(false)}
                                        >
                                            <span className="mb-1 text-xs text-primary/70">0{index + 1}.</span>
                                            {link.name}
                                        </a>
                                    </motion.li>
                                ))}
                                <motion.li variants={linkVariants} className="flex items-center gap-6">
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded border border-primary px-6 py-2.5 font-mono text-sm text-primary transition-all hover:bg-primary/10"
                                    >
                                        Resume
                                    </a>
                                    <ThemeSwitcher />
                                </motion.li>
                            </ol>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Header;

"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Link } from "react-scroll";
import { useMediaQuery } from "react-responsive";
import useScrollPosition from "../../hooks/useScrollPosition";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";

const NAV_SCROLL_OFFSET = -108;
const NAV_SCROLL_DURATION = 500;

interface NavLink {
    name: string;
    url: string;
}

const Header: React.FC = () => {
    const scrollPosition = useScrollPosition();
    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
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
                "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
                scrollPosition > 50
                    ? "top-4 w-[calc(100%-2rem)] max-w-[1400px] rounded-2xl glass h-16 shadow-2xl"
                    : "top-0 w-full bg-transparent h-24"
            )}
        >
            <nav className="site-container flex h-full items-center justify-between">
                {/* Logo */}
                <motion.div variants={logoVariants} initial="initial" animate="animate">
                    <Link
                        to="home"
                        smooth
                        duration={NAV_SCROLL_DURATION}
                        offset={NAV_SCROLL_OFFSET}
                        className="group flex cursor-pointer items-center gap-2"
                        aria-label="Home"
                    >
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
                    </Link>
                </motion.div>

                {/* Mobile Menu Toggle */}
                <button
                    className="flex flex-col gap-1.5 lg:hidden z-50"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <span className={cn("h-0.5 w-6 bg-primary transition-all duration-300", isOpen && "rotate-45 translate-y-2")} />
                    <span className={cn("h-0.5 w-6 bg-primary transition-all duration-300", isOpen && "opacity-0 scale-x-0")} />
                    <span className={cn("h-0.5 w-6 bg-primary transition-all duration-300", isOpen && "-rotate-45 -translate-y-2")} />
                </button>

                {/* Desktop and Mobile Navigation */}
                <AnimatePresence>
                    {(isOpen || isDesktop) && (
                        <motion.div
                            variants={navVariants}
                            initial="initial"
                            animate="animate"
                            exit={{ opacity: 0, y: -20 }}
                            className={cn(
                                "absolute top-full left-0 right-0 w-full glass-dark rounded-b-2xl py-8 px-6 shadow-2xl flex flex-col items-start gap-8 z-40 overflow-hidden border-t-0 lg:overflow-visible lg:static lg:flex lg:flex-row lg:items-center lg:justify-end lg:bg-transparent lg:backdrop-blur-none lg:border-0 lg:p-0 lg:shadow-none lg:w-auto lg:gap-10",
                                !isDesktop && !isOpen && "hidden"
                            )}
                        >
                            <ol className="flex flex-col items-start gap-8 lg:flex-row lg:gap-10 w-full lg:w-auto">
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        key={link.url}
                                        variants={linkVariants}
                                        className="font-mono text-sm tracking-wide w-full lg:w-auto my-auto"
                                    >
                                        <Link
                                            to={link.url}
                                            smooth
                                            duration={NAV_SCROLL_DURATION}
                                            offset={NAV_SCROLL_OFFSET}
                                            spy
                                            activeClass="!text-primary"
                                            className="group flex cursor-pointer flex-row items-baseline gap-2 text-foreground transition-colors hover:text-primary py-2 lg:py-0 border-b border-border/10 lg:border-none w-full lg:w-auto"
                                            onClick={() => !isDesktop && setIsOpen(false)}
                                        >
                                            <span className="text-xs text-primary font-bold">0{index + 1}.</span>
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                ))}
                                <motion.li variants={linkVariants} className="flex flex-row items-center justify-between gap-6 w-full lg:w-auto lg:justify-end pt-4 lg:pt-0">
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-xl border border-primary px-6 py-2.5 font-mono text-sm text-primary transition-all hover:bg-primary/10 flex-1 text-center md:flex-initial"
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

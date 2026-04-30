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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isDesktop) setIsOpen(true);
    }, [isDesktop]);

    const navLinks: NavLink[] = [
        { name: "About", url: "about" },
        { name: "Skills", url: "skills" },
        { name: "Services", url: "services" },
        { name: "Experience", url: "jobs" },
        { name: "Work", url: "projects" },
        { name: "Education", url: "education" },
        { name: "Certifications", url: "certifications" },
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
                "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-2rem)] max-w-[1440px]",
                scrollPosition > 50
                    ? "top-4 rounded-2xl glass h-16 shadow-2xl"
                    : "top-0 rounded-none bg-transparent h-24"
            )}
        >
            <nav className="site-container flex h-full items-center justify-between">
                {/* Logo */}
                <motion.div variants={logoVariants} initial="initial" animate="animate">
                    <Link
                        to="home"
                        href="#home"
                        offset={NAV_SCROLL_OFFSET}
                        className="group flex cursor-pointer items-center gap-2"
                        aria-label="Home"
                    >
                        <div className="h-11 w-11 text-primary transition-transform duration-300 group-hover:rotate-12">
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
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden z-50">
                    <a
                        href="https://drive.google.com/file/d/1ffycRhonZegQk2VJjfsa_g_AZAOj_5Xw/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-lg border border-primary/40 px-3.5 h-11 font-mono text-[10px] font-bold text-primary transition-all hover:bg-primary/10 active:scale-95 whitespace-nowrap bg-primary/5"
                    >
                        Resume
                    </a>

                    <div className="flex items-center">
                        <ThemeSwitcher />
                    </div>

                    <button
                        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-transparent transition-all active:scale-90"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        <span className={cn("h-0.5 w-5 bg-primary transition-all duration-300", isOpen && "rotate-45 translate-y-2")} />
                        <span className={cn("h-0.5 w-5 bg-primary transition-all duration-300", isOpen && "opacity-0 scale-x-0")} />
                        <span className={cn("h-0.5 w-5 bg-primary transition-all duration-300", isOpen && "-rotate-45 -translate-y-2")} />
                    </button>
                </div>

                {/* Mobile Menu Backdrop */}
                <AnimatePresence>
                    {mounted && isOpen && !isDesktop && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden h-screen w-screen -left-[calc((100vw-100%)/2)]"
                        />
                    )}
                </AnimatePresence>

                {/* Desktop and Mobile Navigation */}
                <AnimatePresence mode="wait">
                    {mounted && (isOpen || isDesktop) && (
                        <motion.div
                            variants={navVariants}
                            initial="initial"
                            animate="animate"
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                            className={cn(
                                "absolute top-[calc(100%+0.5rem)] right-0 w-[min(calc(100vw-2rem),20rem)] glass-dark rounded-2xl py-8 px-6 shadow-2xl flex flex-col items-start gap-8 z-40 overflow-hidden border border-primary/10",
                                "lg:overflow-visible lg:static lg:flex lg:flex-row lg:items-center lg:justify-end lg:bg-transparent lg:backdrop-blur-none lg:border-0 lg:p-0 lg:shadow-none lg:w-auto lg:gap-0",
                                !isDesktop && !isOpen && "hidden"
                            )}
                        >
                            <ol className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-1 xl:gap-2 w-full lg:w-auto">
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        key={link.url}
                                        variants={linkVariants}
                                        className="font-mono tracking-wide w-full lg:w-auto my-auto"
                                    >
                                        <Link
                                            to={link.url}
                                            href={`#${link.url}`}
                                            offset={NAV_SCROLL_OFFSET}
                                            spy
                                            activeClass="!text-primary !bg-primary/5 border-primary/20"
                                            className="group flex cursor-pointer flex-row items-center gap-3 lg:gap-1.5 text-foreground transition-all hover:text-primary py-3 px-4 rounded-xl border border-transparent hover:border-primary/10 hover:bg-primary/5 lg:py-2 lg:px-3 w-full lg:w-auto text-sm lg:text-[11px] xl:text-xs"
                                            onClick={() => !isDesktop && setIsOpen(false)}
                                        >
                                            <span className="text-[10px] lg:text-[9px] text-primary font-bold">
                                                0{index + 1}.
                                            </span>
                                            <span className="font-semibold lg:font-normal leading-none">{link.name}</span>
                                        </Link>
                                    </motion.li>
                                ))}

                                {/* Resume + ThemeSwitcher (Desktop only) */}
                                <motion.li
                                    variants={linkVariants}
                                    className="hidden lg:flex flex-row items-center justify-end gap-3 xl:gap-4 lg:ml-4 xl:ml-6"
                                >
                                    <a
                                        href="https://drive.google.com/file/d/1ffycRhonZegQk2VJjfsa_g_AZAOj_5Xw/view"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-xl border border-primary px-4 xl:px-5 py-2 font-mono text-xs text-primary transition-all hover:bg-primary/10 whitespace-nowrap"
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

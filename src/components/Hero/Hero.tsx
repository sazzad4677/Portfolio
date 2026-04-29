"use client";

import { motion, Variants } from "framer-motion";
import React from "react";
import { ArrowRight, Download, Mail, Code2 } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import contentManager from "@/lib/contentManager";
import TechOrbit from "./TechOrbit";
import StatsBar from "./StatsBar";

const container: Variants = {
    animate: { transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
};

const item: Variants = {
    initial: { opacity: 0, y: 28 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const SOCIAL_ICON_MAP: Record<string, React.FC<{ size: number }>> = {
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    email: ({ size }) => <Mail size={size} />,
};

const Hero: React.FC = () => {
    const content = contentManager.getHero();

    return (
        <motion.section
            id="home"
            variants={container}
            initial="initial"
            animate="animate"
            className="relative flex min-h-[100dvh] w-full flex-col overflow-x-clip scroll-anchor pt-[104px] pb-6"
        >
                {/* Background glow blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px]" />
                    <div className="absolute -right-24 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/6 blur-[100px]" />
                    <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-secondary/5 blur-[100px]" />
                </div>

                {/* Main two-column content */}
                <div className="site-container relative z-10 my-auto flex w-full flex-col py-4 sm:py-8 lg:py-12">
                    <div className="grid w-full grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_0.65fr] lg:gap-12 lg:px-4 xl:gap-16 xl:px-8">
                        {/* LEFT — Text Content */}
                        <motion.div variants={item} className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            {/* Availability badge */}
                            <motion.div
                                variants={item}
                                className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/30 px-3 py-1.5 backdrop-blur-md sm:mb-7 sm:gap-2.5 sm:px-4 sm:py-2"
                            >
                                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-full w-full rounded-full bg-emerald-400" />
                                </span>
                                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-300 sm:text-[11px] sm:tracking-[0.15em]">
                                    {content.badgeText}
                                </span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                variants={item}
                                className="font-sans font-bold leading-[1.1] tracking-tight text-on-background max-w-[580px] [&_.text-gradient]:animate-pulse-glow"
                                style={{ fontSize: "clamp(28px, 5.5vw, 64px)" }}
                                dangerouslySetInnerHTML={{ __html: content.headline }}
                            />

                            {/* Description */}
                            <motion.p
                                variants={item}
                                className="mt-4 max-w-[500px] text-sm leading-relaxed text-on-surface-variant/85 sm:mt-6 sm:text-base md:text-[17px]"
                                dangerouslySetInnerHTML={{ __html: content.description }}
                            />

                            {/* CTA buttons */}
                            <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4 lg:justify-start">
                                <motion.div
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <a
                                        href="#projects"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const el = document.getElementById("projects");
                                            if (el) {
                                                const y = el.getBoundingClientRect().top + window.scrollY - 80;
                                                window.scrollTo({ top: y, behavior: "smooth" });
                                            }
                                        }}
                                        className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-primary px-5 py-3 font-sans text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/35 sm:gap-2.5 sm:px-6 sm:py-3.5"
                                    >
                                        <Code2 size={16} />
                                        {content.ctaText}
                                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                        <div className="absolute -inset-full z-[5] block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:animate-shine" />
                                    </a>
                                </motion.div>
                                <motion.a
                                    href={content.cvLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center gap-2 rounded-xl border border-border/40 bg-surface/30 px-5 py-3 font-sans text-sm font-semibold text-on-background backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-surface/50 sm:gap-2.5 sm:px-6 sm:py-3.5"
                                >
                                    <Download size={16} />
                                    Download Resume
                                </motion.a>
                            </motion.div>

                            {/* Social row */}
                            <motion.div variants={item} className="mt-8 flex items-center gap-4 sm:mt-10 sm:gap-5">
                                <span className="text-xs text-on-surface-variant/50 sm:text-sm">Let&apos;s connect</span>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    {content.socials.map((social) => {
                                        const IconComp = SOCIAL_ICON_MAP[social.type];
                                        return (
                                            <a
                                                key={social.name}
                                                href={social.url}
                                                target={social.type !== "email" ? "_blank" : undefined}
                                                rel={social.type !== "email" ? "noopener noreferrer" : undefined}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-surface/30 text-on-surface-variant/60 transition-all duration-300 hover:border-primary/40 hover:text-primary sm:h-10 sm:w-10"
                                                aria-label={social.name}
                                            >
                                                {IconComp && <IconComp size={18} />}
                                            </a>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* RIGHT — Profile + Orbital System */}
                        <motion.div
                            variants={item}
                            className="relative mx-auto flex items-center justify-center lg:mx-0 lg:-translate-x-2 xl:-translate-x-4"
                        >
                            <TechOrbit
                                profileImage={content.profileImage}
                                name={content.name}
                                techStack={content.techStack}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom stats bar */}
                <StatsBar stats={content.stats} />
        </motion.section>
    );
};

export default Hero;